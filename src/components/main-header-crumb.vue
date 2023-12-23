<template>
  <div class="crumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breakcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/pinia/login/login'
import { mapPathToBreakcrumbs } from '@/utils/map-menus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userMenus = useLoginStore().userMenus

const breakcrumbs = computed(() => {
  return mapPathToBreakcrumbs(route.path, userMenus)
})
</script>

<style lang="less" scoped>
.crumb {
  color: gray;
}
</style>
