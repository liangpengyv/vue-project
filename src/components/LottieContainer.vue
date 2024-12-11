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
import { onMounted, onUnmounted, useTemplateRef, watch } from 'vue'

interface Props {
  path: string
  width?: number
  height?: number
  loop?: boolean
  speed?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 300,
  height: 300,
  loop: true,
  speed: 1,
})

const lottieRef = useTemplateRef('lottieContainer')

let animation: AnimationItem | null = null

const initAnimation = () => {
  animation = lottie.loadAnimation({
    container: lottieRef.value as Element,
    renderer: 'svg',
    autoplay: true,
    path: props.path,
    loop: props.loop,
  })

  animation.setSpeed(props.speed)
}

const destroyAnimation = () => {
  animation?.destroy()
  animation = null
}

watch(
  () => props.path,
  () => {
    destroyAnimation()
    initAnimation()
  },
)

watch(
  () => props.speed,
  () => {
    animation?.setSpeed(props.speed)
  },
)

onMounted(() => {
  initAnimation()
})

onUnmounted(() => {
  destroyAnimation()
})
</script>
