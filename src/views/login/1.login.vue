<template>
  <div class="login">
    <loginPanel></loginPanel>
  </div>
</template>

<script setup lang="ts">
import loginPanel from './2.login-panel.vue';
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  background: url(../../assets/img/login-bg.svg)
}
</style>
