<template>
  <div class="main-header">
    <!-- 折叠图标 -->
    <div class="icon" @click="iconClick">
      <el-icon size="30px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <!-- header内容 -->
    <div class="content">
      <!-- 面包屑 -->
      <div class="breadcrumb">面包屑</div>
      <!-- 个人信息和头像图标 -->
      <div class="infos">
        <div class="icons">
          <el-icon><Message /></el-icon>
          <el-icon><ChatDotRound /></el-icon>
          <el-icon><Search /></el-icon>
        </div>

        <el-dropdown>
          <div class="user">
            <el-avatar
              :size="30"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <span class="el-dropdown-link"> Roy </span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logOutBtn">
                <span>退出登陆</span>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <span>个人信息</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span>修改密码</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['iconChange'])

//记录状态
const isFold = ref(false)
const iconClick = () => {
  //内部改变状态
  isFold.value = !isFold.value

  //把事件和状态穿给父组件main.vue
  emit('iconChange', isFold.value)
}

const router = useRouter()
const logOutBtn = () => {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('login')
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  height: 100%;
  .icon {
    display: flex;
    align-items: center;
    padding-right: 10px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    .infos {
      display: flex;

      .icons {
        display: flex;
        align-items: center;

        .el-icon {
          margin-right: 15px;
        }
      }
      .user {
        display: flex;
        align-items: center;
        cursor: pointer;
        span {
          margin-left: 5px;
        }
      }
      .user:focus {
        outline: none;
      }
    }
  }
}
</style>
