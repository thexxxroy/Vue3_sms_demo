// import { localCache } from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/global/constants'

import { TreeOptionsEnum } from 'element-plus/es/components/tree-v2/src/virtual-tree.mjs'
import hyRequest from '..'
import type { IAccount } from '@/types/login.types'

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

//拿ID做角色权限验证
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`,
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

export function getUserMenuByRoleId(id:number){
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}



