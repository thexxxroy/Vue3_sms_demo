<template>
  <div class="home">
    <el-container>
      <el-aside :width="isFoldHere ? '60px' : '210px'">
        <main-menu :isFoldHere="isFoldHere"></main-menu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @icon-change="foldAside"></main-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu.vue'
import MainHeader from '@/components/main-header.vue'
import { ref } from 'vue'

const isFoldHere = ref(false)

//接受子组件传的参数，并操作折叠aside
const foldAside = (isFold: boolean) => {
  isFoldHere.value = isFold
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}
.home .el-aside {
  background-color: #001529;
  transition: width 0.3s ease;
}
.home .el-container {
  height: 100%;

  .el-header {
    background-color: white;
  }
  .el-main {
    background-color: #f0f2f5;

  }
}
</style>
