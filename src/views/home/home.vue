<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import { user } from "@/store/index.js";

import { homeGetArticleList } from "@/api/article";
import { homeGetConfig } from "@/api/config";
import { getAllTag } from "@/api/tag";
import { homeGetStatistic } from "@/api/home";
import { randomFontColor, numberFormate } from "@/utils/tool";

import PageHeader from "@/components/PageHeader/index.vue";
import HomeArticleList from "@/components/HomeArticle/home-article-list.vue";
import RightSide from "@/components/RightSide/right-side.vue";
import MobileTopSkeleton from "@/components/RightSide/components/skeleton/mobile-top-skeleton.vue";
import RightSideItem from "@/components/RightSide/components/item/right-side-item.vue";
import RightSideTop from "@/components/RightSide/components/item/right-side-top.vue";
import RightSideSkeletonItem from "@/components/RightSide/components/skeleton/right-side-skeleton-item.vue";
import { gsapTransY } from "@/utils/transform";

defineOptions({
  name: "Home",
});

const userStore = user();

/** 文章 */
const param = reactive({
  current: 1, // 当前页
  size: 5, // 每页条目数
  loading: true, // 加载
});
const articleList = ref([]);
const articleTotal = ref();

const getHomeArticleList = async () => {
  try {
    let res = {
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
            "view_times": 14280,
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
          }
        ],
        "total": 5
      }
    }
    if (res.code == 0) {
      const { list, total } = res.result;
      articleList.value = list;
      articleTotal.value = total;
    }
  } finally {
    param.loading = false;
  }
};

const pagination = (page) => {
  param.current = page.current;
  getHomeArticleList();
};

/** 网站右侧 */
const rightSizeLoading = ref(false);
const runtime = ref(0);
let configDetail = ref({});
let tags = ref([]);

// 获取网站详细信息
const getConfigDetail = async () => {
  try {
    let res = {
      "code": 0,
      "message": "获取网站设置成功",
      "result": {
        "createdAt": "2023-03-27 20:07:39",
        "updatedAt": "2025-06-26 11:11:48",
        "id": 1,
        "blog_name": "fandy的个人博客",
        "blog_avatar": "/blog-images/imNBDzvwDezF",
        "avatar_bg": "/blog-images/kOSvLmSrXSYa",
        "personal_say": "为什么每天不能睡25个小时啊。",
        "blog_notice": "源码gitee地址：https://gitee.com/mrzym/stable-version-of-blog\n\n博客开发教程\nbilibili：https://www.bilibili.com/video/BV1Xi421e7At/?spm_id_from=333.999.0.0\n\n技术交流群：763111710\n\n新的Nuxt博客地址，欢迎大家访问：https://blog.mrzym.top/ ",
        "qq_link": "http://img.mrzym.top/Fp_TraXTDxFUL8ORt1aeEShTBBIN",
        "we_chat_link": "http://img.mrzym.top/Frpt1U4mkcx0ntzlgDafavbf0dyS",
        "github_link": "https://github.com/urschhh",
        "git_ee_link": "https://gitee.com/mrzym",
        "bilibili_link": "https://space.bilibili.com/419858932?spm_id_from=333.1007.0.0",
        "view_time": 51936,
        "we_chat_group": "http://img.mrzym.top/Fp7JYFiaUOr_aTvs7yrYGKuLQOt1",
        "qq_group": "/blog-images/mQrIJsMtySst",
        "we_chat_pay": "",
        "ali_pay": ""
      }
    }
    if (res.code == 0 && typeof res.result != "string") {
      configDetail.value = res.result;
      userStore.setBlogAvatar(res.result.blog_avatar);
      calcRuntimeDays(configDetail.value.createdAt);
    }
  } finally {
    rightSizeLoading.value = false;
  }
};
// 获取文章数、分类数、标签数
const getStatistic = async () => {
  let res = {
    "code": 0,
    "message": "获取数据统计成功",
    "result": {
      "articleCount": 26,
      "tagCount": 24,
      "categoryCount": 5,
      "userCount": 874
    }
  }
  if (res.code == 0) {
    Object.assign(configDetail.value, res.result);
  }
};

// 获取所有的标签
const getAllTags = async () => {
  let res = {
    "code": 0,
    "message": "获取标签字典成功",
    "result": [
      {
        "id": 17,
        "tag_name": "axios"
      },
      {
        "id": 14,
        "tag_name": "css动画"
      },
      {
        "id": 25,
        "tag_name": "cursor"
      },
      {
        "id": 23,
        "tag_name": "Docker"
      },
      {
        "id": 8,
        "tag_name": "finalShell"
      },
      {
        "id": 1,
        "tag_name": "git"
      },
      {
        "id": 5,
        "tag_name": "gzip"
      },
      {
        "id": 16,
        "tag_name": "hooks"
      },
      {
        "id": 18,
        "tag_name": "javascript"
      },
      {
        "id": 3,
        "tag_name": "keepAlive"
      },
      {
        "id": 6,
        "tag_name": "linux"
      },
      {
        "id": 21,
        "tag_name": "node"
      },
      {
        "id": 10,
        "tag_name": "node版本控制"
      },
      {
        "id": 19,
        "tag_name": "pinia"
      },
      {
        "id": 22,
        "tag_name": "Promise"
      },
      {
        "id": 13,
        "tag_name": "react"
      },
      {
        "id": 11,
        "tag_name": "react-router"
      },
      {
        "id": 15,
        "tag_name": "svg"
      },
      {
        "id": 12,
        "tag_name": "typescript"
      },
      {
        "id": 2,
        "tag_name": "vue2"
      },
      {
        "id": 4,
        "tag_name": "vue3"
      },
      {
        "id": 20,
        "tag_name": "websocket"
      },
      {
        "id": 9,
        "tag_name": "宝塔面板"
      },
      {
        "id": 7,
        "tag_name": "阿里云轻量服务器"
      }
    ]
  }
  if (res.code == 0) {
    tags.value = res.result.map((r) => {
      r.color = randomFontColor();
      return r;
    });
  }
};
// 计算出网站运行天数
const calcRuntimeDays = (time) => {
  if (time) {
    // eslint-disable-next-line
    time = time.replace(/\-/g, "/"); // 解决ios系统上格式化时间出现NAN的bug
    const now = new Date().getTime();
    const created = new Date(time).getTime();
    const days = Math.floor((now - created) / 8.64e7);
    runtime.value = days;
  }
};

const init = async () => {
  param.loading = true;
  rightSizeLoading.value = true;
  await getHomeArticleList("init");
  await getConfigDetail();
  await getStatistic();
  await getAllTags();
};

const observeMobileBox = () => {
  nextTick(() => {
    gsapTransY([".mobile-top-card", ".mobile-bottom-card"], -30, 0.3, "bounce.in");
    gsapTransY([".mobile-bottom-card"], 30, 0.3, "none");
  });
};
onMounted(async () => {
  await init();
  await observeMobileBox();
});
</script>

<template>
  <PageHeader />
  <div class="home_center_box">
    <el-row>
      <el-col :xs="24" :sm="18">
        <el-card
          class="mobile-top-card mobile-card info-card animate__animated animate__fadeIn"
          shadow="hover"
        >
          <el-skeleton :loading="rightSizeLoading" animated>
            <template #template>
              <MobileTopSkeleton />
            </template>
            <template #default>
              <RightSideTop :configDetail="configDetail" />
            </template>
          </el-skeleton>
        </el-card>
        <!-- 博客文章 -->
        <HomeArticleList
          :articleList="articleList"
          :param="param"
          :articleTotal="articleTotal"
          @pageChange="pagination"
        ></HomeArticleList>
        <el-card
          class="mobile-bottom-card card-hover mobile-card info-card animate__animated animate__fadeIn"
          shadow="hover"
        >
          <el-skeleton :loading="rightSizeLoading" animated>
            <template #template>
              <RightSideSkeletonItem />
            </template>
            <template #default>
              <RightSideItem icon="icon-zixun" size="1.4rem" title="网站资讯">
                <div class="site-info">
                  <div class="flex_r_between">
                    <span>文章数目：</span>
                    <span class="value">{{ configDetail.articleCount }}</span>
                  </div>
                  <div class="flex_r_between">
                    <span>运行时间：</span>
                    <span class="value">{{ runtime }} 天</span>
                  </div>
                  <div class="flex_r_between">
                    <span>博客访问次数：</span>
                    <span class="value">{{ numberFormate(configDetail.view_time) }}</span>
                  </div>
                  <div class="group">
                    交流群
                    <div class="flex justify-end items-start flex-nowrap">
                      <div v-image="configDetail.qq_group">
                        <el-image
                          class="img !ml-[10px]"
                          :src="configDetail.qq_group"
                          fit="cover"
                          :preview-src-list="[configDetail.qq_group]"
                          preview-teleported
                          lazy
                        >
                          <template #error>
                            <div class="w-[100%] h-[100%] grid place-items-center">
                              <svg-icon name="image404" :width="4" :height="4"></svg-icon>
                            </div>
                          </template>
                        </el-image>
                      </div>
                      <div v-image="configDetail.we_chat_group">
                        <el-image
                          class="img"
                          :src="configDetail.we_chat_group"
                          fit="cover"
                          :preview-src-list="[configDetail.we_chat_group]"
                          preview-teleported
                          lazy
                        >
                          <template #error>
                            <div class="w-[100%] h-[100%] grid place-items-center">
                              <svg-icon name="image404" :width="4" :height="4"></svg-icon>
                            </div>
                          </template>
                        </el-image>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="group">
                    支持作者
                    <div class="flex justify-end items-start flex-nowrap">
                      <div v-image="configDetail.ali_pay">
                        <el-image
                          class="img"
                          :src="configDetail.ali_pay"
                          fit="cover"
                          :preview-src-list="[configDetail.ali_pay]"
                          preview-teleported
                          lazy
                        >
                          <template #error>
                            <div class="w-[100%] h-[100%] grid place-items-center">
                              <svg-icon name="image404" :width="4" :height="4"></svg-icon>
                            </div>
                          </template>
                        </el-image>
                      </div>
                      <div v-image="configDetail.we_chat_pay">
                        <el-image
                          class="img !ml-[10px]"
                          :src="configDetail.we_chat_pay"
                          fit="cover"
                          :preview-src-list="[configDetail.we_chat_pay]"
                          preview-teleported
                          lazy
                        >
                          <template #error>
                            <div class="w-[100%] h-[100%] grid place-items-center">
                              <svg-icon name="image404" :width="4" :height="4"></svg-icon>
                            </div>
                          </template>
                        </el-image>
                      </div>
                    </div>
                  </div> -->
                </div>
              </RightSideItem>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :xs="0" :sm="6">
        <!-- 博客我的信息 -->
        <RightSide
          :configDetail="configDetail"
          :tags="tags"
          :runtime="runtime"
          :loading="rightSizeLoading"
        />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.mobile-top-card {
  height: 31rem;
  margin: 4px;
  :deep(.info-avatar) {
    padding: 0 2rem;
  }
  :deep(.personal-say) {
    padding-left: 1rem;
  }
  :deep(.info-background) {
    height: 12rem;
    width: 100%;
  }
  :deep(.common-menu) {
    padding: 1rem 5.5rem;
  }
  :deep(.git-ee) {
    padding: 0 4rem;
  }
  :deep(.personal-link) {
    padding: 1rem 6rem;
  }
}
.mobile-bottom-card {
  margin: 4px;
  padding: 1rem;
  .icon-localoffer {
    font-weight: 900;
  }
  span {
    margin-left: 0.3rem;
  }
  .site-info {
    padding: 0.3rem 1rem;
    line-height: 2;
    font-size: 1rem;

    .value {
      font-weight: 600;
    }
  }
}

.group {
  margin-left: 0.3rem;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .img {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    margin-right: 10px;
  }
}
</style>
