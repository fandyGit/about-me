<script setup>
import { ref, onMounted, h, onBeforeUnmount } from "vue";
import { isMobile, getWelcomeSay } from "@/utils/tool";
import { addView, getAllPageHeader } from "@/api/config";
import { useRoute, useRouter } from "vue-router";
import { ElNotification } from "element-plus";

import { storeToRefs } from "pinia";
import { user, staticData } from "@/store/index.js";

import MusicPlayer from "@/components/Music/index";
import BackTop from "@/components/BackTop/index";
import ChatRoom from "@/components/ChatRoom/index";
import ContextMenu from "@/components/ContextMenu/index.vue";

const userStore = user();
const router = useRouter();
const route = useRoute();
const { getUserInfo } = storeToRefs(userStore);
const isPc = ref(true);
const ContextMenuRef = ref(null);

const goBack = () => {
  router.go(-1);
};

// 获取所有的网站页面背景图
const getAllPageHeaderBg = async () => {
  const res = {
    "code": 0,
    "message": "获取所有背景成功",
    "result": [
      {
        "id": 8,
        "route_name": "Archives",
        "bg_url": "http://img.mrzym.top/FlFlA2XjKkwPD4lRlFwxZc4mUsLt"
      },
      {
        "id": 9,
        "route_name": "Front",
        "bg_url": "http://img.mrzym.top/FspmnaMX03SBQnSSOrc89AYU6WD6"
      },
      {
        "id": 10,
        "route_name": "Back",
        "bg_url": "http://img.mrzym.top/Fuu4w1ZRXo4qteomv0iInTWaZJnV"
      },
      {
        "id": 11,
        "route_name": "SiteList",
        "bg_url": "http://img.mrzym.top/Fk7tZJknslpjfuWYJ7t7WBRp1fko"
      },
      {
        "id": 13,
        "route_name": "Category",
        "bg_url": "http://img.mrzym.top/Fjiasg7yStHBnRk2kjz1xknjF3iJ"
      },
      {
        "id": 14,
        "route_name": "Tag",
        "bg_url": "http://img.mrzym.top/FglVTbjobxaerUyYjxcr8aSbe--G"
      },
      {
        "id": 15,
        "route_name": "PhotoAlbum",
        "bg_url": "http://img.mrzym.top/FhVJ8zBgi7pNy33yhQh9Lh05wOr5"
      },
      {
        "id": 16,
        "route_name": "Photos",
        "bg_url": "http://img.mrzym.top/Fj9jQJlzi5AjYhdTtdhbSF_5RPcZ"
      },
      {
        "id": 17,
        "route_name": "Talk",
        "bg_url": "http://img.mrzym.top/FjYSZMQauEspbLmbU33FZkQ_35Zp"
      },
      {
        "id": 21,
        "route_name": "UserCenter",
        "bg_url": "http://img.mrzym.top/FkmggZhOwM_6eq-_vX6P8iSiWctb"
      },
      {
        "id": 22,
        "route_name": "resume",
        "bg_url": "http://img.mrzym.top/FiCIpxwaz2M5GwNrq7U0r3OQ2eaT"
      },
      {
        "id": 25,
        "route_name": "ArticleList",
        "bg_url": "http://img.mrzym.top/FsNNILnTcg_VzzEXbZQl-qLnFNje"
      },
      {
        "id": 26,
        "route_name": "Home",
        "bg_url": "http://img.mrzym.top/FjBqQgWdcox_N9RhZWHXTqll4Jy_"
      },
      {
        "id": 27,
        "route_name": "MessageList",
        "bg_url": "http://img.mrzym.top/Fn7_qvNgz2DgtMUoQ325n8lZDfcI"
      },
      {
        "id": 28,
        "route_name": "PublishMessage",
        "bg_url": "http://img.mrzym.top/FuAUQpSw6P99HzYyNwkR3zNFGFA3"
      },
      {
        "id": 29,
        "route_name": "MessageDetail",
        "bg_url": "http://img.mrzym.top/FmfkN2rm6thxK9lHfTGyaYL_H3Qb"
      }
    ]
  }
  if (res.code == 0) {
    staticData().setPageHeaderLIst(res.result);
  } else {
    ElNotification({
      offset: 60,
      title: "错误提示",
      message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, res.message),
    });
  }
};

const welcome = () => {
  // 欢迎
  let msg = getWelcomeSay(getUserInfo.value.nick_name);
  if (getUserInfo.value.id == 3) {
    msg = "小婷光临，真是三生有幸";
  }
  ElNotification({
    offset: 60,
    title: "欢迎～",
    message: h("div", { style: "font-weight: 600;" }, msg),
  });
};

const handleContextMenu = (e) => {
  ContextMenuRef.value?.show(e);
};

const handleClick = () => {
  ContextMenuRef.value?.hide();
};

onMounted(async () => {
  isPc.value = !isMobile();

  // 获取背景图片
  getAllPageHeaderBg();
  welcome();

  document.addEventListener("contextmenu", handleContextMenu);
  document.addEventListener("click", handleClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("contextmenu", handleContextMenu);
  document.removeEventListener("click", handleClick);
});
</script>

<template>
  <div class="app">
    <router-view></router-view>
    <BackTop v-if="route.path !== '/'" :right="isPc ? 3 : 0" />
    <i
      v-if="!isPc && ['home', '/'].includes(route.path)"
      class="iconfont icon-fanhui"
      @click="goBack"
    ></i>
    <MusicPlayer />
<!--    <ChatRoom :isPc="isPc" v-if="route.path !== '/'" />-->
    <ContextMenu ref="ContextMenuRef" />
  </div>
</template>

<style lang="scss">
.app {
  width: 100%;
  box-sizing: border-box;
}

.icon-fanhui {
  position: fixed;
  left: 5px;
  top: 60px;
  font-size: 2.2rem;
  color: var(--font-color);
  z-index: 999;
}
</style>
