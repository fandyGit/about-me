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

const skills = ref([
  { name: 'SpringBoot', percent: 80 },
  { name: 'Vue2/Vue3', percent: 80 },
  { name: 'Uniapp', percent: 70 },
  { name: 'TypeScript', percent: 70 },
  { name: 'SpringCloud Alibaba', percent: 50 },
  { name: 'Node.js', percent: 60 },
  { name: 'React', percent: 60 },
  { name: 'Docker', percent: 50 },
])

const experiences = ref([
  {
    time: '2022-06 ~ 至今',
    company: '未来科技有限公司',
    position: '前端负责人',
    desc: '主导企业级前端架构设计与开发',
    projectIntro: '负责公司主力产品的前端架构升级，推动微前端落地。',
    projectPoints: [
      '主导微前端架构设计，提升团队协作效率。',
      '引入自动化测试与CI/CD流程。',
      '推动TypeScript全量覆盖。',
    ],
  },
  {
    time: '2020-03 ~ 2022-05',
    company: '大灰狼科技有限公司',
    position: '全栈工程师',
    desc: 'KOI-ADMIN项目开发',
    projectIntro:
      'KOI-ADMIN是一款企业级别的中后台管理平台模板，基于Vue3, Vite, TypeScript, Pinia, Unocss和ElementPlus等前端新技术栈。',
    projectPoints: [
      '使用ElementPlus, Pinia, Vite, TypeScript, Vue3开发前端模板。',
      '多种布局和丰富的主题配色功能，iPad和PC端。',
      '再开发和项目配置更高效，代码生成器极大提升效率。',
      '使用SpringBoot, Sa-Token, Redis等后端开发，内置多种插件。',
    ],
  },
  // ...再加一两个经历
])
</script>

<template>
  <div :class="['app-root', theme]">
    <header class="global-navbar">
      <div class="navbar-left">
        <router-link to="/" class="logo">我的主页</router-link>
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

.card,
.resume-left,
.resume-right {
  background: var(--card-bg);
  color: var(--text-color);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s;
}

.card:hover,
.resume-left:hover,
.resume-right:hover {
  transform: translateY(-8px) scale(1.03) rotate(-1deg);
  box-shadow: 0 8px 32px #0002;
}

.resume-title,
.timeline-time {
  color: var(--primary);
}

.resume-desc,
.resume-info {
  color: var(--text-secondary);
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.enhanced-nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1.5rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #1a535c);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
.global-navbar:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
.navbar-left {
  display: flex;
  align-items: center;
  gap: 32px;
}
.logo {
  font-size: 24px;
  font-weight: bold;
  color: var(--primary);
  text-decoration: none;
  transition: color 0.3s ease;
}
.logo:hover {
  color: var(--primary-hover);
}
.navbar-menu {
  display: flex;
  gap: 24px;
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
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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
.dark-theme {
  --primary: #ffd700;
  --primary-hover: #e0c000;
  --navbar-bg: #2d2d2d;
  --navbar-text: #ffffff;
  --navbar-hover-bg: #444444;
  --button-bg: #444444;
  --button-text: #ffffff;
  --button-hover-bg: #555555;
}
.navbar-title {
  font-weight: bold;
  font-size: 20px;
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

.card {
  background: var(--navbar-bg);
  color: var(--text-color);
}

.resume-page {
  background: var(--bg-color);
  color: var(--text-color);
}
.resume-left,
.resume-right {
  background: var(--card-bg);
  color: var(--text-color);
}
.timeline-time {
  color: var(--primary);
}
.resume-info {
  color: var(--text-secondary);
}

.skill-bar .progress {
  transition: width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.resume-main {
  display: flex;
  justify-content: center;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 0;
}
.resume-left,
.resume-right {
  background: var(--card-bg);
  border-radius: 16px;
  box-shadow: 0 4px 24px #0001;
  padding: 32px 28px;
  min-width: 340px;
}
.resume-header {
  margin-bottom: 32px;
  text-align: center;
}

@media (max-width: 900px) {
  .resume-main {
    flex-direction: column;
    gap: 24px;
    padding: 16px 0;
  }
  .resume-left,
  .resume-right {
    min-width: unset;
    width: 100%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
