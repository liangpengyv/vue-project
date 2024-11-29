<template>
  <div
    ref="lottieContainer"
    class="lottie-container"
    :style="{
      width: props.width + 'px',
      height: props.height + 'px',
    }"
  ></div>
</template>

<script setup>
import lottie from 'lottie-web'
import { onMounted, onUnmounted, useTemplateRef } from 'vue'

const props = defineProps({
  width: Number,
  height: Number,
})

const lottieRef = useTemplateRef('lottieContainer')

let animation

onMounted(() => {
  animation = lottie.loadAnimation({
    container: lottieRef.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/lottie-json/LottieLogo1.json',
  })
})

onUnmounted(() => {
  if (animation) {
    animation.destroy()
  }
})
</script>

<style scoped></style>
