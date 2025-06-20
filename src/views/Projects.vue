<template>
  <transition-group name="bounce" tag="div">
    <div id="projects" v-if="isVisible" key="projects">
      <h1>项目经验</h1>
      <div class="project-list">
        <div class="project-item" v-for="project in projects" :key="project.id">
          <h2>{{ project.title }}</h2>
          <p>{{ project.description }}</p>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted } from 'vue'
const isVisible = ref(false)
const projects = ref([
  { id: 1, title: '项目一：前端电商平台', description: '使用 Vue 3 + TypeScript 构建，实现商品展示、购物车、订单管理等功能。' },
  { id: 2, title: '项目二：React 管理后台', description: '基于 React + Ant Design 开发，包含用户管理、权限控制、数据统计等模块。' }
])
onMounted(() => {
  nextTick(() => {
    isVisible.value = true
  })
})
</script>

<style scoped>
#projects {
  width: 100%;
  height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #ff6b6b, #ffe66d);
}
.project-item {
  background-color: #f7fff7;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #1a535c;
  transition: all 0.3s ease;
}
.project-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}
.project-list {
  max-width: 800px;
  margin: 0 auto;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>