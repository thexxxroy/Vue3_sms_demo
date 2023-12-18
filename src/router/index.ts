import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/1.login.vue') //路由懒加载
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue') //路由懒加载
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/NotFound.vue') //路由懒加载
    }
  ]
})


//导航守卫
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  //访问home页面并且没有token的时候跳转login页面
  if (to.path === '/main' && !token) {
    return '/login'
  }
})

export default router