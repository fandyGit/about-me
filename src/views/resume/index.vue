<template>
  <PageHeader :loading="loading" />
  <div class="resume-page">
    <!-- 头像与标签 -->
    <div class="resume-header">
      <img class="avatar" src="https://your-avatar-url.jpg" alt="avatar" />
      <div class="tags">
        <span class="tag">全栈工程师</span>
        <span class="tag">@KOI-ADMIN</span>
        <span class="tag">@KOI-BLOG</span>
        <span class="tag">@CV深度特师</span>
      </div>
    </div>

    <div class="resume-main">
      <!-- 左侧信息卡片 -->
      <div class="resume-left">
        <section>
          <h3>期望目标</h3>
          <p>职位：全栈工程师</p>
          <p>工作经验：5年</p>
          <p>期望薪资：10000元</p>
        </section>
        <section>
          <h3>个人信息</h3>
          <p>年龄：25岁</p>
          <p>性别：男</p>
          <p>籍贯：河南</p>
          <p>电话：18593114301</p>
          <p>邮箱：1736306607@qq.com</p>
        </section>
        <section>
          <h3>教育背景</h3>
          <p>学校：河南工业大学</p>
          <p>专业：计算机科学与技术</p>
          <p>毕业时间：2019年9月</p>
        </section>
        <section>
          <h3>技能特长</h3>
          <div class="skill-bar" v-for="skill in skills" :key="skill.name">
            <span>{{ skill.name }}</span>
            <div class="bar">
              <div class="progress" :style="{ width: skill.percent + '%' }"></div>
            </div>
            <span>{{ skill.percent }}%</span>
          </div>
        </section>
      </div>

      <!-- 右侧经历卡片 -->
      <div class="resume-right">
        <div class="timeline">
          <div class="timeline-item" v-for="exp in experiences" :key="exp.time">
            <div class="timeline-time">{{ exp.time }}</div>
            <div class="timeline-content">
              <h4>{{ exp.company }}</h4>
              <p>{{ exp.position }}</p>
              <p>{{ exp.desc }}</p>
              <div class="project">
                <h5>项目简介：</h5>
                <p>{{ exp.projectIntro }}</p>
                <h5>项目亮点：</h5>
                <ul>
                  <li v-for="point in exp.projectPoints" :key="point">{{ point }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageHeader from "@/components/PageHeader/index.vue";

const skills = ref([
  { name: 'SpringBoot', percent: 80 },
  { name: 'Vue2/Vue3', percent: 80 },
  { name: 'Uniapp', percent: 70 },
  { name: 'TypeScript', percent: 70 },
  { name: 'SpringCloud Alibaba', percent: 50 },
])

const experiences = ref([
  {
    time: '2019-09 ~ 至今',
    company: '大灰狼科技有限公司',
    position: '全栈工程师',
    desc: 'KOI-ADMIN项目开发',
    projectIntro: 'KOI-ADMIN是一款企业级别的中后台管理平台模板，基于Vue3, Vite, TypeScript, Pinia, Unocss和ElementPlus等前端新技术栈。',
    projectPoints: [
      '使用ElementPlus, Pinia, Vite, TypeScript, Vue3开发前端模板。',
      '多种布局和丰富的主题配色功能，iPad和PC端。',
      '再开发和项目配置更高效，代码生成器极大提升效率。',
      '使用SpringBoot, Sa-Token, Redis等后端开发，内置多种插件。',
    ],
  },
  // 可继续添加更多经历
])
</script>

<style scoped>
.resume-page {
  padding-bottom: 40px;
}
.resume-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 24px;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 2px 8px #eee;
}
.tags {
  margin-top: 16px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.tag {
  background: #fff;
  border-radius: 16px;
  padding: 4px 16px;
  font-size: 14px;
  color: #666;
  box-shadow: 0 1px 4px #eee;
}
.resume-main {
  display: flex;
  justify-content: center;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}
.resume-left, .resume-right {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #eee;
  padding: 32px 24px;
}
.resume-left {
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.resume-left section h3 {
  margin-bottom: 8px;
  font-size: 18px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 4px;
}
.skill-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.bar {
  flex: 1;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  margin: 0 8px;
  overflow: hidden;
}
.progress {
  height: 100%;
  background: #ffd700;
  border-radius: 4px;
}
.resume-right {
  flex: 1;
  min-width: 400px;
}
.timeline {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.timeline-item {
  display: flex;
  gap: 16px;
}
.timeline-time {
  min-width: 100px;
  color: #bfa76a;
  font-weight: bold;
  text-align: right;
}
.timeline-content {
  background: #f7f7fa;
  border-radius: 8px;
  padding: 16px 20px;
  flex: 1;
}
.timeline-content h4 {
  margin: 0 0 4px 0;
  color: #333;
}
.timeline-content h5 {
  margin: 8px 0 2px 0;
  font-size: 15px;
  color: #666;
}
.timeline-content ul {
  margin: 0;
  padding-left: 18px;
}
</style>
