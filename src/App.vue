<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/pag">Pag</RouterLink>
        <RouterLink to="/svg">Svg</RouterLink>
        <RouterLink to="/border-gradient">Border Gradient</RouterLink>
        <RouterLink to="/lottie-animation">Lottie Animation</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.nav {
  display: flex;
  gap: 16px;
}
</style>
