<template>
  <canvas :id="id" ref="pag"></canvas>
</template>

<script setup lang="ts">
import { PAGInit } from 'libpag'
import type { PAG } from 'libpag/types/types'
import type { PAGView } from 'libpag/types/pag-view'
import { onActivated, onDeactivated, onMounted, onUnmounted, useTemplateRef, watch } from 'vue'

const props = defineProps<{
  url: string
  width?: number
  height?: number
  id?: string
}>()

const pagCanvasRef = useTemplateRef('pag')

let pagInstance: PAG | null
let pagView: PAGView | null

async function initPAG() {
  if (!pagInstance) {
    pagInstance = await PAGInit({
      locateFile(file) {
        if (file === 'libpag.wasm') {
          return '/libpag.wasm'
        }
        return file
      },
    })
  }
}

function destroyPrevPagInstance() {
  if (pagInstance) {
    pagInstance = null
  }
}

async function loadPagView() {
  if (!pagCanvasRef.value) return
  await initPAG()
  destroyPrevPagView()

  const blob = await (await fetch(props.url)).blob()
  const file = new window.File([blob], props.url)
  const pagFile = await pagInstance!.PAGFile.load(file)

  pagCanvasRef.value.width = props.width ?? pagFile.width()
  pagCanvasRef.value.height = props.height ?? pagFile.height()

  pagView = (await pagInstance!.PAGView.init(pagFile, pagCanvasRef.value)) as PAGView
  pagView.setRepeatCount(0)
  await pagView.play()
}

function destroyPrevPagView() {
  if (pagView) {
    pagView.destroy()
    pagView = null
  }
}

watch(
  () => props.url,
  () => loadPagView(),
)

onMounted(() => {
  loadPagView()
})

onUnmounted(() => {
  destroyPrevPagView()
  destroyPrevPagInstance()
})

onActivated(async () => {
  if (pagView && !pagView.isPlaying) {
    await pagView.play()
  }
})

onDeactivated(() => {
  if (pagView) {
    pagView.pause()
  }
})
</script>
