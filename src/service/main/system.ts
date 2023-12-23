/**用户的网络请求 */

import hyRequest from '..'

export function postUsersListData() {
  return hyRequest.post({
    url: '/users/list',
    data: {
      offset: 0,
      size: 10
    }
  })
}
