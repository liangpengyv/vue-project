<template>
  <div class="border-gradient"></div>
</template>

<script setup></script>

<style>
.border-gradient {
  width: 200px;
  height: 200px;
  border: 10px solid transparent;
  background-image: linear-gradient(to right, yellow, blue), linear-gradient(to right, red, green);
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
}
</style>
