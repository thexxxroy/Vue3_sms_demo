<template>
  <div class="user-search">
    <!-- 搜索框 -->
    <el-form label-width="80px" size="large" :model="searchForm">
      <!-- 第一行 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名">
            <el-input placeholder="请输入用户名" v-model="searchForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名">
            <el-input placeholder="请输入真实姓名" v-model="searchForm.realname" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码">
            <el-input placeholder="请输入手机号码" v-model="searchForm.cellphone" />
          </el-form-item>
        </el-col>

        <!-- 第二行 -->
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select placeholder="请选择状态" style="width: 100%" v-model="searchForm.enable">
              <el-option label="启用" value="shanghai" />
              <el-option label="禁用" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间">
            <el-date-picker
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="searchForm.createAt"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 搜索按钮 -->
    <div class="btn">
      <el-button icon="Refresh" size="large" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" size="large" type="primary" @click="handleQueryClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

//定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick']) //定义两个事件名

const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: ''
})

function handleResetClick() {
  searchForm.name = ''
  searchForm.realname = ''
  searchForm.cellphone = ''
  searchForm.enable = ''
  searchForm.createAt = ''
}
function handleQueryClick() {
  //触发时发送这个事件，并传数据
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.user-search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 20px;
    margin-bottom: 0;
  }
  .btn {
    text-align: right;
    padding: 0 20px;
  }
}
</style>
