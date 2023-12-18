<template>
  <div class="main-menu">
    <!-- logo -->
    <div class="logo">
      <img src="/public/favicon.ico" alt="" />
      <div v-show="!isFoldHere" class="name">游哉管理系统</div>
    </div>
    <!-- main -->
    <div class="menu">
      <el-menu
        default-active="3"
        :collapse="isFoldHere"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)">
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script setup lang="ts">
import useLoginStore from '@/pinia/login/login'
import { useRouter } from 'vue-router';

//定义props接受父的数据
defineProps({
  isFoldHere: {
    type: Boolean,
    default: false
  }
})

// 1.获取动态的菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

// 2.监听item的点击
const router = useRouter()
function handleItemClick(item: any) {
  const url = item.url
  console.log(url);
  
  router.push(url)
}
</script>
<style lang="less" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #fff;

  img {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
}
.menu {
  color: white;
}
.el-menu {
  border: none;
}
.el-sub-menu {
  background-color: #001529;

  .el-menu-item {
    background-color: #0c2135;
  }
  .el-menu-item:hover {
    color: #fff;
  }
  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
