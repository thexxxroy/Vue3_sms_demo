<template>
  <div class="login-panel">
    <h1>游哉轻旅后台管理系统</h1>
    <!-- 登陆方式 -->
    <div class="login-way">
      
        <el-tabs type="border-card" stretch v-model="activeName">
       
          <el-tab-pane label="账号登陆" name="accountLogin">
            <template #label>
              <el-icon><User /></el-icon>
              <span class="text">账号登陆</span>
            </template>
            <panelAccount ref="accountRef"></panelAccount>
          </el-tab-pane>
          <el-tab-pane label="手机登陆" name="phoneLogin">
            <template #label>
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登陆</span>
            </template>
            <panelPhone></panelPhone>
          </el-tab-pane>
         
        </el-tabs>
     
    </div>
    <!-- 记住密码 -->
    <div class="control">
      <el-checkbox v-model="isRemenberPsw" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="loginBtn" type="primary" size="large" @click="loginBtnClick">
      立即登陆
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import panelAccount from './3.pane-account.vue'
import panelPhone from './3.pane-phone.vue'
import { localCache } from '@/utils/cache'

const activeName = ref('accountLogin')
const isRemenberPsw = ref<boolean>(localCache.getCache('isRemenberPsw') ?? false)
watch(isRemenberPsw, (newValue) => {
  localCache.setCache('isRemenberPsw', newValue)
})

const accountRef = ref<InstanceType<typeof panelAccount>>() //?????

const loginBtnClick = () => {
  if (activeName.value === 'accountLogin') {
    accountRef.value?.loginAction(isRemenberPsw.value)
  } else {
    console.log('手机登陆')
  }
}
</script>

<style lang="less" scoped>

.login-panel {
  width: 330px;
  .login-way {
    margin-top: 20px;
    .text {
      margin-left: 5px;
    }
  }
  .control {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .loginBtn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
