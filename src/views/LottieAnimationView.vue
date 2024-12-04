<template>
  <h1>Lottie Animation</h1>

  <h2>Lottie Json</h2>
  <LottieContainer :path="path" :width="400" :height="400" :speed="speed" />
  <button @click="toggleAnimation">切换动画</button>
  <button @click="speed += 1">加速</button>
  <button @click="speed -= 1">减速</button>

  <hr />

  <!--
  不建议使用 DotLottie 的数据形式
  1. 采用 canvas 容器，数量大时容易触发浏览器环境限制
  2. 渲染缩放比例的确定应该是发生在加载前，所以，渲染完成后动态调整大小，容器内视图没有自动跟随缩放，导致模糊
  -->
  <h2>DotLottie</h2>
  <DotLottieVue style="width: 400px; height: 400px" :src="src" autoplay loop />
  <div>
    <p>不建议使用 DotLottie 的数据形式</p>
    <p>1. 采用 canvas 容器，数量大时容易触发浏览器环境限制</p>
    <p>
      2.
      渲染缩放比例的确定应该是发生在加载前，所以，渲染完成后动态调整大小，容器内视图没有自动跟随缩放，导致模糊
    </p>
  </div>
</template>

<script setup lang="ts">
import LottieContainer from '@/components/LottieContainer.vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { ref } from 'vue'

const path = ref('/lottie-json/LottieLogo1.json')
const speed = ref(1)
const toggleAnimation = () => {
  path.value =
    path.value === '/lottie-json/LottieLogo1.json'
      ? '/lottie-json/LottieLogo2.json'
      : '/lottie-json/LottieLogo1.json'
}

const src = ref('/dotlottie/LottieLogo1.lottie')
</script>

<style scoped></style>
