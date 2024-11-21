<template>
  <canvas ref="pag"></canvas>
</template>

<script setup>
import { PAGInit } from 'libpag'
import { onUnmounted, useTemplateRef, watch } from 'vue'

const props = defineProps({
  url: String,
  width: Number,
  height: Number,
})

const pagCanvasRef = useTemplateRef('pag')

let PAG
let pagView
async function loadPag() {
  if (!PAG)
    PAG = await PAGInit({
      locateFile(file) {
        if (file === 'libpag.wasm') {
          return '/libpag.wasm'
        }
        return file
      },
    })
  if (pagView) pagView.destroy()

  const blob = await (await fetch(props.url)).blob()
  const file = new window.File([blob], props.url)
  const pagFile = await PAG.PAGFile.load(file)
  pagCanvasRef.value.width = props.width ?? pagFile.width()
  pagCanvasRef.value.height = props.height ?? pagFile.height()
  pagView = await PAG.PAGView.init(pagFile, pagCanvasRef.value)
  pagView.setRepeatCount(0)
  await pagView.play()
}

watch(
  () => props.url,
  () => loadPag(),
  { immediate: true },
)

onUnmounted(() => {
  if (pagView) pagView.destroy()
})
</script>
