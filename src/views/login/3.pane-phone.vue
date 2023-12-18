<template>
  <div class="panel-phone">
    <el-form>
      <el-form-item label="手机号" label-width="54px" >
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <div class="VCode"> 
          <el-input></el-input>
          <el-button class="btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.panel-phone {
  color: gray;
  .VCode {
    display: flex;
    .btn{
      margin-left: 8px;
    }
  }
}
</style>
