import { defineStore } from 'pinia'
import { postUsersListData } from '@/service/main/system'

interface ISystemState {
  userList: any[]
  userTotalCount: number
}

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    userTotalCount: 0
  }),
  actions: {
    async postUserListAction() {
      const userListResult = await postUsersListData()
      console.log('userListResult', userListResult)
      this.userList = userListResult.data.list
      this.userTotalCount = userListResult.data.totalCount
     
    }
  }
})

export default useSystemStore
