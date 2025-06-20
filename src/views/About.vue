<template>
  <transition name="slide">
    <div id="about" v-if="isVisible">
      <h1>自我介绍</h1>
      <div class="about-content">
        <p>我叫张三，是一名有多年经验的前端开发者。</p>
        <p>擅长 Vue、React 等前端框架，热衷于探索新的技术和解决方案。</p>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted } from 'vue'
const isVisible = ref(false)
onMounted(() => {
  nextTick(() => {
    isVisible.value = true
  })
})
</script>

<style scoped>
#about {
  width: 100%;
  height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #4ecdc4, #1a535c);
}
.about-content {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  background-color: #f7fff7;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #1a535c;
}
.slide-enter-active {
  transition: all 0.5s ease;
}
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>