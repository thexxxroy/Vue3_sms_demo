<template>
  <div class="panel-account">
    <el-form :model="accountForm" label-width="60px" :rules="accountRules" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="accountForm.name" status-icon />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="accountForm.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/pinia/login/login'
import type { FormRules, ElForm } from 'element-plus'
import type { IAccount } from '@/types/login.types'
import { localCache } from '@/utils/cache'

//数据
const accountForm = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

//校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 6, message: '必须>3位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, message: '密码须大于3位', trigger: 'blur' }
  ]
}

//执行账号登陆逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
const loginAction = (isRemenberPsw: boolean) => {
  // console.log(accountForm.name, accountForm.password)
  formRef.value?.validate((valid) => {
    if (valid) {
      //1.获取用户输入的账号和密码
      const name = accountForm.name
      const password = accountForm.password

      //2.向服务器发送请求（携带账号和密码）
      loginStore.loginAccountAction({ name, password }).then(() => {
        //判断是否记住密码
        if (isRemenberPsw) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })
    } else {
      ElMessage.error('Oops,登陆信息有误')
    }
  })
}
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.panel-account {
  color: gray;
}
</style>
