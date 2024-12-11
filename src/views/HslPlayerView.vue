<template>
  <h1>HLS Player</h1>
  <HlsPlayer streamUrl="http://192.168.0.43:8080/live/test1/hls.m3u8" width="800px" />
  <HlsPlayer streamUrl="http://192.168.0.43:8080/live/test2/hls.m3u8" width="800px" />
  <HlsPlayer streamUrl="http://192.168.0.43:8080/live/test3/hls.m3u8" width="800px" />
</template>

<script setup lang="ts">
import HlsPlayer from '@/components/HlsPlayer.vue'
</script>

<style scoped></style>
