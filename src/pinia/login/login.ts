import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenuByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types/login.types'
import { localCache } from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      //1.账号登陆，获取用户信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2.获取登录用户的详细信息(role信息)
      const userInfoResult = await getUserInfoById(id) //传入id异步请求服务器数据并存到userInfoResult的变量
      const userInfo = userInfoResult.data //把上面取到的数据存到
      this.userInfo = userInfo

      //3、根据角色请求权限(不同菜单)
      const userMenuRes = await getUserMenuByRoleId(this.userInfo.role.id)
      const userMenus = userMenuRes.data //请求到数据后保存到state里
      this.userMenus = userMenus

      //4.本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenuRes.data)

      //动态添加路由（重要）
      const routes = mapMenusToRoutes(userMenus)

      routes.forEach((route) => router.addRoute('main', route))

      //.页面跳转
      router.push('/main')
    },
    loadLocalCacheAction() {
      //用户刷新页面时默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
        //动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
