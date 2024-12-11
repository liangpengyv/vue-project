<template>
  <div class="hls-player-container" :style="{ width, height }">
    <video ref="videoRef" class="hls-player" :controls="controls" muted></video>
    <div v-if="playerState === 'loading'" class="state-wrapper loading-state">Loading...</div>
    <div v-if="playerState === 'error'" class="state-wrapper error-state">Error</div>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, onMounted, onUnmounted } from 'vue'
import Hls from 'hls.js'

interface Props {
  streamUrl: string
  width?: string
  height?: string
  maxRetry?: number
  controls?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%',
  maxRetry: 3,
  controls: false,
})

const videoRef = useTemplateRef('videoRef')
const playerState = ref<'loading' | 'loaded' | 'error'>('loading')

let hls: Hls | null = null

const loadStreamUrl = () => {
  if (!videoRef.value) return

  if (Hls.isSupported()) {
    hls = new Hls({
      debug: false,
      // 配置参数
      maxBufferLength: 30,
      maxMaxBufferLength: 600,
      maxBufferSize: 60 * 1000 * 1000,
    })

    hls.loadSource(props.streamUrl)
    hls.attachMedia(videoRef.value)

    // 事件监听
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      // HLS 媒体已附加
      console.log('media attached', props.streamUrl)
    })

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      // HLS 清单文件解析完成
      console.log('manifest parsed', props.streamUrl)
      startPlay()
    })

    let retryCount = 0
    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            console.log('error...', data.type, props.streamUrl)
            // 网络错误，尝试恢复...
            if (retryCount < props.maxRetry) {
              hls?.startLoad()
              retryCount++
            } else {
              destroyPlayer()
            }
            break
          case Hls.ErrorTypes.MEDIA_ERROR:
            // 媒体错误，尝试恢复...
            if (retryCount < props.maxRetry) {
              hls?.recoverMediaError()
              retryCount++
            } else {
              destroyPlayer()
            }
            break
          default:
            // 无法恢复的错误，销毁 HLS 实例
            destroyPlayer()
            break
        }
      }
    })
  } else if (videoRef.value.canPlayType('application/vnd.apple.mpegurl')) {
    // 对于 Safari 等原生支持 HLS 的浏览器
    videoRef.value.src = props.streamUrl
    videoRef.value.addEventListener('loadedmetadata', () => {
      // 使用原生 HLS 播放
      startPlay()
    })
  } else {
    // 您的浏览器不支持 HLS 播放
  }
}

const startPlay = () => {
  playerState.value = 'loaded'
  videoRef.value?.play()
}

const destroyPlayer = () => {
  console.log('destroyPlayer', props.streamUrl)
  playerState.value = 'error'
  if (hls) {
    hls.destroy()
    hls = null
  }
  if (videoRef.value) {
    videoRef.value.removeAttribute('src')
    videoRef.value.load()
  }
}

onMounted(() => {
  setTimeout(() => {
    loadStreamUrl()
  }, 1000)
})

onUnmounted(() => {
  destroyPlayer()
})
</script>

<style scoped>
.hls-player-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.hls-player {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}

.state-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-state {
  background-color: rgba(0, 0, 0, 0.1);
}

.error-state {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
