<script setup>
import PagContainer from '@/components/PagContainer.vue'
import { ref } from 'vue'

const url = ref('/pag/like.pag')
function toggle() {
  url.value === '/pag/like.pag' ? (url.value = '/pag/fans.pag') : (url.value = '/pag/like.pag')
}
</script>

<template>
  <div>
    <h1>测试 Pag 动效资源</h1>
  </div>

  <button @click="toggle">切换</button>
  <PagContainer :url="url" :width="100" :height="100"></PagContainer>
</template>

<style></style>
