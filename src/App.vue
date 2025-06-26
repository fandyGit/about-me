<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue'
import 'animate.css'

const theme = ref('light')

// 读取本地存储的主题
onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') theme.value = saved
})

// 切换主题并保存
function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}

// 主题 class 应用到 body
watchEffect(() => {
  document.body.classList.toggle('dark-theme', theme.value === 'dark')
  document.body.classList.toggle('light-theme', theme.value === 'light')
})
</script>

<template>
  <div :class="['app-root', theme]">
    <header class="global-navbar">
      <div class="navbar-left">
        <nav class="navbar-menu">
          <router-link to="/">首页</router-link>
          <router-link to="/about">关于</router-link>
          <router-link to="/projects">项目</router-link>
          <router-link to="/contact">联系</router-link>
          <router-link to="/resume">简历</router-link>
        </nav>
      </div>
      <div class="navbar-actions">
        <button class="theme-toggle" @click="toggleTheme">
          {{ theme === 'light' ? '🌙 暗黑' : '☀️ 明亮' }}
        </button>
      </div>
    </header>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style scoped>
body,
#app,
.app-root {
  background: var(--bg-color);
  color: var(--text-color);
  transition: background 0.2s, color 0.2s;
}

.global-navbar {
  background: var(--navbar-bg);
  color: var(--navbar-text);
}

.enhanced-nav router-link {
  text-decoration: none;
  color: #f7fff7;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  transition: all 0.3s ease;
}
.enhanced-nav router-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
}
.enhanced-nav router-link.active {
  background-color: #f7fff7;
  color: #1a535c;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.app-root {
  min-height: 100vh;
  background: #fafafa;
  color: #222;
}
.global-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 48px;
  background: var(--navbar-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
}
.navbar-menu a {
  color: var(--navbar-text);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 24px;
  transition: all 0.3s ease;
}
.navbar-menu a:hover {
  background: var(--navbar-hover-bg);
  color: var(--primary);
}
.navbar-menu a.router-link-active {
  background: var(--primary);
  color: white;
}
.theme-toggle {
  background: var(--button-bg);
  color: var(--button-text);
  border: none;
  border-radius: 24px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.theme-toggle:hover {
  background: var(--button-hover-bg);
  transform: translateY(-2px);
}
/* 定义主题变量 */
:root {
  --primary: #bfa76a;
  --primary-hover: #a38f5a;
  --navbar-bg: #ffffff;
  --navbar-text: #333333;
  --navbar-hover-bg: #f5f5f5;
  --button-bg: #f5f5f5;
  --button-text: #333333;
  --button-hover-bg: #e0e0e0;
}
.navbar-menu {
  display: flex;
  gap: 24px;
}
.navbar-menu a {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.2s;
}
.navbar-menu a.router-link-active {
  color: #bfa76a;
}
.navbar-actions {
  display: flex;
  align-items: center;
}
.theme-toggle {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 20px;
  padding: 6px 18px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 8px #eee;
  transition: background 0.2s;
}
.theme-toggle:hover {
  background: #f5f5f5;
}

/* 暗黑主题样式 */
.app-root.dark,
body.dark-theme {
  background: #23272e;
  color: #eee;
}
.app-root.dark .global-navbar,
body.dark-theme .global-navbar {
  background: #2d323b;
  border-bottom: 1px solid #444;
}
.app-root.dark .navbar-title,
body.dark-theme .navbar-title {
  color: #ffd700;
}
.app-root.dark .navbar-menu a,
body.dark-theme .navbar-menu a {
  color: #eee;
}
.app-root.dark .navbar-menu a.router-link-active,
body.dark-theme .navbar-menu a.router-link-active {
  color: #ffd700;
}
.app-root.dark .theme-toggle,
body.dark-theme .theme-toggle {
  background: #2d323b;
  color: #ffd700;
  border: 1px solid #444;
}

.skill-bar .progress {
  transition: width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}


</style>
