<template>
  <div class="user-content">
    <!-- 头部 -->
    <div class="header">
      <h3 class="text">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="userList" style="width: 100%">
        <el-table-column type="selection" width="30px" />
        <el-table-column align="center" type="index" label="序号" width="60px" />
        <el-table-column prop="name" label="用户名" width="120" />
        <el-table-column align="center" prop="realname" label="真实姓名" width="120" />
        <el-table-column align="center" prop="cellphone" label="手机号码" width="180" />
        <el-table-column align="center" prop="enable" label="状态" width="100px">
          <!-- 作用与插槽拿prop里的enable数据 -->
          <template #default="solt">
            <el-button size="small" plain :type="solt.row.enable ? 'primary' : 'danger'">
              {{ solt.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="slot">{{ formatUTC(slot.row.createAt) }}</template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="slot">{{ formatUTC(slot.row.updateAt) }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <el-button size="small" type="primary">编辑</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <!-- 翻页 -->
    <div class="pagination">
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="userTotalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/pinia/main/system'
import { computed } from 'vue'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'

const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()

const userList = computed(() => systemStore.userList)
const userTotalCount = computed(() => systemStore.userTotalCount)

//分页

function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}

function fetchUserListData() {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }
  // console.log('info',info);
  systemStore.postUserListAction(info)
}

defineExpose({ fetchUserListData })
</script>

<style lang="less" scoped>
.user-content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
