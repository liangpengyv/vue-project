<template>
  <div
    ref="lottieContainer"
    class="lottie-container"
    :style="{
      width: width + 'px',
      height: height + 'px',
    }"
  ></div>
</template>

<script setup lang="ts">
import lottie, { type AnimationItem } from 'lottie-web'
import { onMounted, onUnmounted, useTemplateRef } from 'vue'

const props = defineProps<{
  url: string
  width?: number
  height?: number
}>()

const lottieRef = useTemplateRef('lottieContainer')

let animation: AnimationItem

onMounted(() => {
  animation = lottie.loadAnimation({
    container: lottieRef.value as Element,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: props.url,
  })
})

onUnmounted(() => {
  if (animation) {
    animation.destroy()
  }
})
</script>

<style scoped></style>
