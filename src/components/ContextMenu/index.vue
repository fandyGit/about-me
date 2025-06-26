<template>
  <div
    v-show="visible"
    class="context-menu"
    :style="{ left: adjustedX + 'px', top: adjustedY + 'px' }"
  >
    <div class="menu-item" @click="handleRefresh">
      <img src="@/assets/context-menu/shuaxin.png" alt="" srcset="" />
      刷新页面
    </div>
    <div class="menu-item" @click="handleBack">
      <img src="@/assets/context-menu/xiangzuo.png" alt="" srcset="" />
      返回上页
    </div>
    <div class="menu-item" @click="handleForward">
      <img src="@/assets/context-menu/xiangyou.png" alt="" srcset="" />
      前进下页
    </div>
    <div class="menu-item" @click="handleCopyUrl">
      <img src="@/assets/context-menu/fuzhi1.png" alt="" srcset="" />
      复制链接
    </div>
    <div class="menu-item" @click="toggleTheme">
      <img :src="isDark ? lightIcon : darkIcon" alt="切换主题" />
      {{ isDark ? "浅色模式" : "深色模式" }}
    </div>
    <div class="menu-item" @click="() => router.push('/link/list')">
      <img src="@/assets/context-menu/link.png" alt="" srcset="" />
      添加友链
    </div>
    <div class="menu-item" @click="handleRandomClick">
      <img src="@/assets/context-menu/suiji.png" alt="随便逛逛" />
      随便逛逛
    </div>
    <div class="menu-item" @click="() => router.push('/category')">
      <img src="@/assets/context-menu/fenlei.png" alt="" srcset="" />
      全部分类
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from "vue";
import http from "@/config/request.js";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import { staticData } from "@/store/index.js";
const staticStore = staticData();
const { mainTheme } = storeToRefs(staticStore);
const articles = ref([]);
const isDark = computed(() => mainTheme.value);
const lightIcon = new URL("@/assets/context-menu/qiansemoshi.png", import.meta.url).href;
const darkIcon = new URL("@/assets/context-menu/shensemoshi.png", import.meta.url).href;
const visible = ref(false);
const x = ref(0);
const y = ref(0);
const menuWidth = ref(0);
const menuHeight = ref(0);
const router = useRouter();

const adjustedX = computed(() => {
  const windowWidth = window.innerWidth;
  return x.value + menuWidth.value > windowWidth ? x.value - menuWidth.value : x.value;
});

const adjustedY = computed(() => {
  const windowHeight = window.innerHeight;
  return y.value + menuHeight.value > windowHeight ? y.value - menuHeight.value : y.value;
});

const show = (event) => {
  event.preventDefault();
  x.value = event.clientX;
  y.value = event.clientY;
  visible.value = true;

  nextTick(() => {
    const el = document.querySelector(".context-menu");
    if (el) {
      menuWidth.value = el.offsetWidth;
      menuHeight.value = el.offsetHeight;
    }
  });
};

const hide = () => {
  visible.value = false;
};

const handleRefresh = () => {
  window.location.reload();
  hide();
};

const handleBack = () => {
  router.back();
  hide();
};

const handleForward = () => {
  router.forward();
  hide();
};

const handleCopyUrl = () => {
  navigator.clipboard.writeText(window.location.href);
  ElMessage.success("链接已复制到剪贴板");
  hide();
};

const toggleTheme = () => {
  staticStore.switchMainTheme();
  hide();
};

defineExpose({
  show,
  hide,
});

// 获取文章列表
async function fetchArticles() {
  try {
    const res = {
      "code": 0,
      "message": "获取文章列表成功",
      "result": {
        "current": "1",
        "size": "999",
        "list": [
          {
            "createdAt": "2023-05-19 19:47:44",
            "updatedAt": "2025-06-15 14:51:40",
            "id": 6,
            "article_title": "博客部署教程-宝塔面板",
            "author_id": 1,
            "category_id": 2,
            "article_description": "这篇文章是在第一篇普通部署教程的基础上，使用宝塔面板部署的，确实方便了很多。",
            "article_cover": "http://img.mrzym.top/FtAnnRvDr78EeHrSJc9IM3fabRiN",
            "is_top": 1,
            "order": 1,
            "status": 1,
            "type": 1,
            "view_times": 14281,
            "thumbs_up_times": 113,
            "reading_duration": 11020623208,
            "categoryName": "博客部署",
            "tagNameList": [
              "linux",
              "阿里云轻量服务器",
              "宝塔面板"
            ]
          },
          {
            "createdAt": "2025-04-22 17:11:49",
            "updatedAt": "2025-04-22 17:11:49",
            "id": 43,
            "article_title": "Docker 部署",
            "author_id": 1,
            "category_id": 2,
            "article_description": "Docker 部署博客",
            "article_cover": "http://img.mrzym.top/FsmFwJb-phLb9aNSiKLYZP-s_vAk",
            "is_top": 1,
            "order": 2,
            "status": 1,
            "type": 1,
            "view_times": 291,
            "thumbs_up_times": 1,
            "reading_duration": 117715220,
            "categoryName": "博客部署",
            "tagNameList": [
              "阿里云轻量服务器",
              "宝塔面板",
              "Docker"
            ]
          },
          {
            "createdAt": "2023-07-05 09:55:27",
            "updatedAt": "2024-04-02 10:18:06",
            "id": 8,
            "article_title": "博客开发记录......持续更新",
            "author_id": 1,
            "category_id": 2,
            "article_description": "描述博客的优化史，以及需要优化的事项",
            "article_cover": "http://img.mrzym.top/FswlMLf30bR2MeXCgorQSkUQ3ky1",
            "is_top": 1,
            "order": 2,
            "status": 1,
            "type": 1,
            "view_times": 4574,
            "thumbs_up_times": 154,
            "reading_duration": 4097320516,
            "categoryName": "博客部署",
            "tagNameList": [
              "vue3"
            ]
          },
          {
            "createdAt": "2025-03-17 10:18:59",
            "updatedAt": "2025-03-18 16:40:27",
            "id": 39,
            "article_title": "Vue3动态渲染组件$t动态切换时更新失效",
            "author_id": 1,
            "category_id": 3,
            "article_description": "封装的高级组件，组件内部$t渲染的label在切换国际化时响应式失效，不能实时更新",
            "article_cover": "http://img.mrzym.top/FrvTH-DB2AhtpSk8TCPUZBTdDuEn",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 271,
            "thumbs_up_times": 2,
            "reading_duration": 8392461,
            "categoryName": "博客组件开发",
            "tagNameList": [
              "vue3",
              "typescript"
            ]
          },
          {
            "createdAt": "2025-02-13 18:13:27",
            "updatedAt": "2025-02-14 10:13:41",
            "id": 38,
            "article_title": "半年隔绝，归来已是“前端新时代”",
            "author_id": 1,
            "category_id": 1,
            "article_description": "重见天日，世界已变，但技术的追求永不止步。",
            "article_cover": "http://img.mrzym.top/Fg2GFAUcF5pBLzaLN0dKaIDeK_f8",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 402,
            "thumbs_up_times": 2,
            "reading_duration": 90086245,
            "categoryName": "前端",
            "tagNameList": [
              "vue3",
              "typescript"
            ]
          },
          {
            "createdAt": "2024-12-11 01:09:18",
            "updatedAt": "2024-12-11 01:10:02",
            "id": 37,
            "article_title": "Docker的坑",
            "author_id": 1,
            "category_id": 2,
            "article_description": "我和Docker斗智斗勇",
            "article_cover": "http://img.mrzym.top/FmnBC-KQncIt0qzQfhVe4YsoAZ6Z",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 312,
            "thumbs_up_times": 5,
            "reading_duration": 408298856,
            "categoryName": "博客部署",
            "tagNameList": [
              "Docker"
            ]
          },
          {
            "createdAt": "2024-08-16 10:47:54",
            "updatedAt": "2024-11-10 14:54:07",
            "id": 36,
            "article_title": "如何处理Promise.reject返回的数据",
            "author_id": 1,
            "category_id": 1,
            "article_description": "本文讲述了我在工作中使用Promise时遇到的问题",
            "article_cover": "http://img.mrzym.top/FsmqBpLiVVh0kmiywKWqHlQApIN3",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 683,
            "thumbs_up_times": 8,
            "reading_duration": 199368307,
            "categoryName": "前端",
            "tagNameList": [
              "axios",
              "Promise"
            ]
          },
          {
            "createdAt": "2024-07-11 22:44:39",
            "updatedAt": "2025-04-22 16:08:34",
            "id": 30,
            "article_title": "闲来无事 我又写了一款旋转菜单",
            "author_id": 1,
            "category_id": 1,
            "article_description": "这款旋转菜单逻辑更简单 并且效果也更好",
            "article_cover": "http://img.mrzym.top/Fv9jnKxhtwfA_-x5mdJ63w0Ma_E5",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 572,
            "thumbs_up_times": 13,
            "reading_duration": 198506645,
            "categoryName": "前端",
            "tagNameList": [
              "css动画",
              "javascript"
            ]
          },
          {
            "createdAt": "2024-06-04 15:04:47",
            "updatedAt": "2025-04-22 16:09:58",
            "id": 29,
            "article_title": "vue2/3如何快速重置表单数据",
            "author_id": 1,
            "category_id": 1,
            "article_description": "vue 利用函数闭包特性 快速重置表单数据",
            "article_cover": "http://img.mrzym.top/FilU_M85SiUo4Vh7aWkLOGAGC-Yo",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 423,
            "thumbs_up_times": 5,
            "reading_duration": 156656060,
            "categoryName": "前端",
            "tagNameList": [
              "vue2",
              "vue3",
              "javascript"
            ]
          },
          {
            "createdAt": "2024-06-03 00:33:10",
            "updatedAt": "2025-04-22 16:21:11",
            "id": 28,
            "article_title": "Websocket简易聊天室",
            "author_id": 1,
            "category_id": 1,
            "article_description": "后端使用Node+ws，前端使用Vite+Vue3实现简易的聊天室",
            "article_cover": "http://img.mrzym.top/Fp7eO8m3z4CGamfKMWLdNONP8yZb",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 530,
            "thumbs_up_times": 7,
            "reading_duration": 220710050,
            "categoryName": "前端",
            "tagNameList": [
              "vue3",
              "websocket",
              "node"
            ]
          },
          {
            "createdAt": "2024-05-08 14:03:03",
            "updatedAt": "2025-04-22 16:22:07",
            "id": 27,
            "article_title": "如何制作一款炫酷的旋转菜单",
            "author_id": 1,
            "category_id": 1,
            "article_description": "使用原生的js、css、html制作一款炫酷的旋转菜单",
            "article_cover": "http://img.mrzym.top/FpngKOAhIMgUTASD3tVrEYb5gnR7",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 258,
            "thumbs_up_times": 3,
            "reading_duration": 233355691,
            "categoryName": "前端",
            "tagNameList": [
              "javascript"
            ]
          },
          {
            "createdAt": "2024-04-17 18:11:23",
            "updatedAt": "2025-04-22 16:24:15",
            "id": 26,
            "article_title": "如何使用js写一个消息提示",
            "author_id": 1,
            "category_id": 3,
            "article_description": "本文讲述了作者如何手写了一个简单的消息提示",
            "article_cover": "http://img.mrzym.top/FlB9-TF2O_bzf0K7E8ySaSOfhbdE",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 260,
            "thumbs_up_times": 4,
            "reading_duration": 342504888,
            "categoryName": "博客组件开发",
            "tagNameList": [
              "css动画",
              "hooks",
              "javascript"
            ]
          },
          {
            "createdAt": "2024-04-11 16:58:02",
            "updatedAt": "2025-04-22 16:24:55",
            "id": 25,
            "article_title": "利用 css 渐变背景写好看的按钮",
            "author_id": 1,
            "category_id": 3,
            "article_description": "如何利用 css 渐变背景 写一个好看的按钮",
            "article_cover": "http://img.mrzym.top/FqNKvJsuXaC6nYzc-k2WEtb-tAdg",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 272,
            "thumbs_up_times": 4,
            "reading_duration": 186568550,
            "categoryName": "博客组件开发",
            "tagNameList": [
              "css动画"
            ]
          },
          {
            "createdAt": "2024-04-03 21:19:52",
            "updatedAt": "2025-04-22 16:25:13",
            "id": 24,
            "article_title": "博客音乐播放器的状态管理",
            "author_id": 1,
            "category_id": 3,
            "article_description": "本文讲述了一位菜鸡试图阅读 pinia 源码，从而给自己的音乐播放器单独增加状态管理，最后自己写不出来的无奈",
            "article_cover": "http://img.mrzym.top/FukTV6vVI_kZcK5ch72AFTp9RrMH",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 486,
            "thumbs_up_times": 3,
            "reading_duration": 99851708,
            "categoryName": "博客组件开发",
            "tagNameList": [
              "vue3",
              "hooks",
              "pinia"
            ]
          },
          {
            "createdAt": "2024-03-27 23:13:02",
            "updatedAt": "2025-04-22 16:25:48",
            "id": 23,
            "article_title": "如何制作水煮牛肉",
            "author_id": 1,
            "category_id": 4,
            "article_description": "文章描述了小张是怎么通过已知食材和制作方法来计算出小张需要去超市购买哪些食材 肥肠方便",
            "article_cover": "http://img.mrzym.top/FhCFIgnPSXejRnV5AzoAAABQmXV3",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 341,
            "thumbs_up_times": 9,
            "reading_duration": 157830145,
            "categoryName": "生活与前端",
            "tagNameList": [
              "javascript"
            ]
          },
          {
            "createdAt": "2024-03-25 23:05:35",
            "updatedAt": "2025-04-22 16:26:16",
            "id": 22,
            "article_title": "Sort函数",
            "author_id": 1,
            "category_id": 1,
            "article_description": "你不知道的sort函数",
            "article_cover": "http://img.mrzym.top/Fgb7bJWoMF0k27FrrRrCjPX0Kx1i",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 92,
            "thumbs_up_times": 1,
            "reading_duration": 2428919,
            "categoryName": "前端",
            "tagNameList": [
              "javascript"
            ]
          },
          {
            "createdAt": "2023-11-10 18:14:30",
            "updatedAt": "2024-02-19 18:34:23",
            "id": 15,
            "article_title": "Axios 二次封装",
            "author_id": 1,
            "category_id": 1,
            "article_description": "二次封装Axios",
            "article_cover": "http://img.mrzym.top/FpJN5xtRl37rIAJj1rUl04m1nQLe",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 746,
            "thumbs_up_times": 21,
            "reading_duration": 328555395,
            "categoryName": "前端",
            "tagNameList": [
              "axios"
            ]
          },
          {
            "createdAt": "2023-10-27 17:55:11",
            "updatedAt": "2023-10-27 17:55:11",
            "id": 14,
            "article_title": "学习React Hooks的基础使用",
            "author_id": 1,
            "category_id": 1,
            "article_description": "React文档里的一些Hooks的使用方法、谈谈使用场景和个人理解。",
            "article_cover": "http://img.mrzym.top/FhiFEPCAphNufdMG3zrGWZbRS21g",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 322,
            "thumbs_up_times": 2,
            "reading_duration": 21016216,
            "categoryName": "前端",
            "tagNameList": [
              "react",
              "hooks"
            ]
          },
          {
            "createdAt": "2023-10-25 22:10:43",
            "updatedAt": "2023-10-25 22:10:43",
            "id": 13,
            "article_title": "React API的基础使用",
            "author_id": 1,
            "category_id": 1,
            "article_description": "React文档里的一些API的使用方法、谈谈使用场景和个人理解。",
            "article_cover": "http://img.mrzym.top/Fv9vw18edFUy0VHHOs_sisXokEEb",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 339,
            "thumbs_up_times": 2,
            "reading_duration": 37188623,
            "categoryName": "前端",
            "tagNameList": [
              "react"
            ]
          },
          {
            "createdAt": "2023-10-17 15:35:02",
            "updatedAt": "2023-10-17 15:35:02",
            "id": 12,
            "article_title": "前端如何实现SVG hover高亮",
            "author_id": 1,
            "category_id": 1,
            "article_description": "使用最简单的方式实现svg hover高亮",
            "article_cover": "http://img.mrzym.top/Fs3PEYfIqUeFMQi3DQJgXlOMuZng",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 241,
            "thumbs_up_times": 3,
            "reading_duration": 105076572,
            "categoryName": "前端",
            "tagNameList": [
              "svg"
            ]
          },
          {
            "createdAt": "2023-08-30 10:20:17",
            "updatedAt": "2023-08-30 10:20:17",
            "id": 11,
            "article_title": "博客开发之打字机",
            "author_id": 1,
            "category_id": 3,
            "article_description": "随着博客开发的需要，发现许多博客都有打字机，所以在开发首页的时候，就想着增加一个打字机",
            "article_cover": "http://img.mrzym.top/Fo9FuRbQ9oVQQ0LWpnIzF7DbIYC8",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 812,
            "thumbs_up_times": 17,
            "reading_duration": 148742433,
            "categoryName": "博客组件开发",
            "tagNameList": [
              "vue3",
              "react",
              "css动画"
            ]
          },
          {
            "createdAt": "2023-07-19 22:30:08",
            "updatedAt": "2023-07-19 22:30:08",
            "id": 9,
            "article_title": "使用vite搭一个react项目",
            "author_id": 1,
            "category_id": 1,
            "article_description": "react搭建项目系列 -- 第一期",
            "article_cover": "http://img.mrzym.top/FnuwCjFHjRNYw4-vVFxeeoKU3xKD",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 460,
            "thumbs_up_times": 1,
            "reading_duration": 126958303,
            "categoryName": "前端",
            "tagNameList": [
              "react-router",
              "typescript",
              "react"
            ]
          },
          {
            "createdAt": "2023-06-20 17:05:08",
            "updatedAt": "2023-06-20 17:05:08",
            "id": 7,
            "article_title": "mac快速切换node版本",
            "author_id": 1,
            "category_id": 1,
            "article_description": "一款非常好用的node版本管理器-mac系统",
            "article_cover": "http://img.mrzym.top/FhB8dbo7d3CBgLEMXHwLZajU16oD",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 366,
            "thumbs_up_times": 6,
            "reading_duration": 24463560,
            "categoryName": "前端",
            "tagNameList": [
              "node版本控制"
            ]
          },
          {
            "createdAt": "2023-03-30 21:09:11",
            "updatedAt": "2023-03-30 21:09:11",
            "id": 3,
            "article_title": "vue3项目页面首次加载慢优化",
            "author_id": 1,
            "category_id": 2,
            "article_description": "vue3项目部署以后，首次访问白屏时间过长，采用了gzip压缩以后时间缩短70%。",
            "article_cover": "http://img.mrzym.top/Fn6hrb8r86xBIBwgjDxnVLLl6oP9",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 1206,
            "thumbs_up_times": 55,
            "reading_duration": 1749053771,
            "categoryName": "博客部署",
            "tagNameList": [
              "vue3",
              "gzip"
            ]
          },
          {
            "createdAt": "2023-03-27 20:46:57",
            "updatedAt": "2023-03-27 20:46:57",
            "id": 2,
            "article_title": " vue2中keep-alive缓存机制",
            "author_id": 1,
            "category_id": 1,
            "article_description": "keepALive的生命周期，以及如何处理数据获取重复的问题",
            "article_cover": "http://img.mrzym.top/Fn6hrb8r86xBIBwgjDxnVLLl6oP9",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 345,
            "thumbs_up_times": 44,
            "reading_duration": 17791683,
            "categoryName": "前端",
            "tagNameList": [
              "vue2",
              "keepAlive"
            ]
          },
          {
            "createdAt": "2023-03-27 20:23:20",
            "updatedAt": "2023-03-27 20:23:20",
            "id": 1,
            "article_title": "git常用方法",
            "author_id": 1,
            "category_id": 1,
            "article_description": "工作中经常会用到的git方法",
            "article_cover": "http://img.mrzym.top/Foklccw_3-Rg6IyRbKdUM8La55sj",
            "is_top": 2,
            "order": null,
            "status": 1,
            "type": 1,
            "view_times": 804,
            "thumbs_up_times": 30,
            "reading_duration": 117875158,
            "categoryName": "前端",
            "tagNameList": [
              "git"
            ]
          }
        ],
        "total": 26
      }
    }
    if (res.code === 0) {
      articles.value = res.result.list;
    } else {
      console.error("获取文章列表失败:", res.result.message);
    }
  } catch (error) {
    console.error("获取文章列表失败:", error);
  }
}

// 随机获取一个文章 ID
function getRandomArticleId() {
  if (articles.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * articles.value.length);
    return articles.value[randomIndex].id;
  }
  return null;
}

// 点击事件处理函数
async function handleRandomClick() {
  if (articles.value.length === 0) {
    await fetchArticles();
  }
  const id = getRandomArticleId();
  if (id) {
    router.push(`/article?id=${id}`);
  } else {
    console.error("没有可用的文章 ID");
  }
}
// 初始化获取文章列表
onMounted(fetchArticles);
</script>

<style scoped>
.context-menu {
  width: 130px;
  position: fixed;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 5px 0;
  z-index: 2000;
}

img {
  width: 20px;
  height: 20px;
}

.current-song-title {
  max-width: 100%;
  font-size: 14px;
  text-align: center;
  /* 根据需要你可以改为固定宽度 */
  max-height: 40px;
  /* 限制显示高度 */
  overflow: hidden;
  /* 超出隐藏 */
  white-space: nowrap;
  /* 不换行 */
  text-overflow: ellipsis;
  /* 超出显示省略号 */
  line-height: 40px;
  /* 让文本垂直居中看起来更整齐 */
}

.menu-item {
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
}

.menu-item img {
  margin-left: 7px;
}

.menu-item:hover {
  background-color: var(--hover-bg);
}

.menu-item i {
  width: 14px;
}

.divider {
  height: 1px;
  background-color: var(--border-color);
  margin: 5px 0;
}
</style>
