<template>
  <div class="home">
    <main class="main-content">
      <!-- 左侧：文章列表 -->
      <section class="post-list">
        <div class="post" v-for="post in posts" :key="post.id">
          <div class="post-title">{{ post.title }}</div>
          <div class="post-desc">{{ post.desc }}</div>
          <div class="post-date">{{ post.date }}</div>
        </div>
      </section>

      <!-- 右侧：个人信息卡片 -->
      <aside class="profile-card">
        <img
          class="avatar"
          src="https://avatars.githubusercontent.com/u/xxx?v=4"
          alt="avatar"
        />
        <div class="nickname">CrazyYan</div>
        <div class="desc">
          老严 专注于潜水、摸鱼、搬砖。兴趣使然的一个野生(FE)程序猿
        </div>
        <div class="skills">
          <span>JavaScript</span>
          <span>Vue</span>
          <span>CSS</span>
          <span>PHP</span>
          <span>Python</span>
          <!-- ... -->
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Setting } from '@element-plus/icons-vue'

const posts = ref([
  {
    id: 1,
    title: '添加友情链接格式',
    desc: '添加友情链接必看',
    date: '2021-01-21',
  },
  {
    id: 2,
    title: '测试 goPrint 局部打印',
    desc: '测试局部打印页面',
    date: '2021-01-13',
  },
  {
    id: 3,
    title: 'GitHub 2020年度报告请查收',
    desc: '取自开源，用于开源。',
    date: '2021-01-06',
  },
  {
    id: 4,
    title: '五分钟搭建博客评论组件-gitalk',
    desc: '需要有个评论功能...',
    date: '2021-01-03',
  },
  {
    id: 5,
    title: '悲伤日记祝您新年快乐',
    desc: '2021新年快乐',
    date: '2021-01-01',
  },
])
</script>

<style scoped>
.home {
  font-family: 'Segoe UI', Arial, sans-serif;
  background: linear-gradient(135deg, #f0f4f8, #dce6f2);
  min-height: 100vh;
}
.post-list {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.post {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.post:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.post-title {
  font-weight: bold;
  font-size: 20px;
  color: #1e293b;
}
.post-desc {
  color: #475569;
  margin: 8px 0;
}
.post-date {
  color: #64748b;
  font-size: 14px;
}
.profile-card {
  flex: 1;
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 24px;
  text-align: center;
  position: sticky;
  top: 80px;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 16px;
  border: 4px solid white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.nickname {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 8px;
  color: #1e293b;
}
.desc {
  color: #475569;
  margin-bottom: 16px;
}
.skills span {
  display: inline-block;
  background: #e2e8f0;
  border-radius: 6px;
  padding: 4px 12px;
  margin: 4px;
  font-size: 13px;
  color: #334155;
  transition: background 0.3s ease;
}
.skills span:hover {
  background: #cbd5e1;
}
</style>
