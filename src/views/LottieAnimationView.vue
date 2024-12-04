<template>
  <h1>Lottie Animation</h1>
  <LottieContainer :path="path" :width="300" :height="300" :speed="speed" />
  <button @click="toggleAnimation">切换动画</button>
  <button @click="speed += 1">加速</button>
  <button @click="speed -= 1">减速</button>
</template>

<script setup lang="ts">
import LottieContainer from '@/components/LottieContainer.vue'
import { ref } from 'vue'

const path = ref('/lottie-json/LottieLogo1.json')

const toggleAnimation = () => {
  path.value =
    path.value === '/lottie-json/LottieLogo1.json'
      ? '/lottie-json/LottieLogo2.json'
      : '/lottie-json/LottieLogo1.json'
}

const speed = ref(1)
</script>

<style scoped></style>
