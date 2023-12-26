<template>
  <div class="user">
    <userSearch @query-click="handleQueryClick" />
    <UserContent ref="contentRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import userSearch from './2-user-search.vue'
import UserContent from './2-user-content.vue'
import { ref } from 'vue'

const contentRef = ref()
function handleQueryClick(FormData: any) {
  console.log('FormData', FormData)
  contentRef.value?.fetchUserListData()
}
</script>

<style scoped></style>
