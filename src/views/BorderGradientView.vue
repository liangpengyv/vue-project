<template>
  <div class="border-gradient-1">构造简单，但不支持 border-radius</div>
  <br />
  <div class="border-gradient-2">支持 border-radius，但不支持背景色透明度</div>
  <br />
  <div class="border-gradient-3">两层模拟</div>
</template>

<script setup></script>

<style>
/* 构造简单，但不支持 border-radius */
.border-gradient-1 {
  width: 200px;
  height: 200px;
  border: 10px solid;
  border-image: linear-gradient(to right, red, green) 1;
  background-image: linear-gradient(to right, rgba(255, 255, 0, 0.2), rgba(0, 0, 255, 0.2));
}

/* 支持 border-radius，但不支持背景色透明度 */
.border-gradient-2 {
  width: 200px;
  height: 200px;
  border: 10px solid transparent;
  border-radius: 8px;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  /* 第一组是背景色，第二组是边框色 */
  background-image: linear-gradient(90deg, yellow, blue), linear-gradient(to right, red, green);
}

/* 两层模拟 */
/* todo: 边框在下，解决容器内元素位置问题 */
.border-gradient-3 {
  position: relative;
  width: 200px;
  height: 200px;
  background: linear-gradient(to right, red, green);
  border-radius: 20px;
  overflow: hidden;
}
.border-gradient-3::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background: linear-gradient(to right, yellow, blue);
  z-index: 1;
  border-radius: 20px;
  padding: 10px;
}
</style>
