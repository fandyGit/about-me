<template>
  <transition name="rotate">
    <div id="contact" v-if="isVisible">
      <h1>联系我</h1>
      <div class="contact-info">
        <p><strong>邮箱：</strong>zhangsan@example.com</p>
        <p><strong>电话：</strong>13800138000</p>
        <p><strong>地址：</strong>北京市朝阳区XX街XX号</p>
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
#contact {
  width: 100%;
  height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #1a535c, #4ecdc4);
}
.contact-info {
  max-width: 800px;
  margin: 0 auto;
  line-height: 2;
  background-color: #f7fff7;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #1a535c;
}
.rotate-enter-active {
  transition: all 0.5s ease;
}
.rotate-leave-active {
  transition: all 0.3s ease;
}
.rotate-enter-from,
.rotate-leave-to {
  transform: rotate(90deg);
  opacity: 0;
}
</style>