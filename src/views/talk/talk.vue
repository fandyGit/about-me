<script setup>
import { ref, h, reactive, onMounted, onBeforeUnmount } from "vue";
import { user } from "@/store";

import { returnTime } from "@/utils/tool";
import { addLike, cancelLike } from "@/api/like";
import { getTalkList } from "@/api/talk";

import { ElNotification } from "element-plus";
import TextOverflow from "@/components/TextOverflow/index.vue";
import Comment from "@/components/Comment/Comment.vue";
import SkeletonItem from "@/components/SkeletonItem/skeleton-item.vue";
import PageHeader from "@/components/PageHeader/index.vue";

const userStore = user();
const talkList = ref([]);
const total = ref(0);
const loading = ref(false);
const scrollLoading = ref(false);
const talkCommentRef = ref(null);
let observe;
let box;
const param = reactive({
  current: 1,
  size: 5,
  user_id: userStore.getUserInfo.id,
});

const likePending = ref(false);

const observeBox = () => {
  // 获取要监听的元素
  box = document.querySelector(".observer");
  observe = new IntersectionObserver(
    (entries) => {
      entries.forEach(async (e) => {
        if (e.isIntersecting && e.intersectionRatio > 0) {
          if (total.value > talkList.value.length) {
            param.current++;
            pageGetTalkList();
          }
        }
      });
    },
    { rootMargin: "0px 0px 300px 0px" }
  );
  observe.observe(box);
};

const pageGetTalkList = async () => {
  try {
    if (param.current == 1) {
      loading.value = true;
    } else {
      scrollLoading.value = true;
    }
    let res = {
      "code": 0,
      "message": "获取说说列表成功",
      "result": {
        "current": 1,
        "size": 5,
        "list": [
          {
            "createdAt": "2025-03-20 13:37:28",
            "updatedAt": "2025-06-16 23:58:08",
            "id": 65,
            "content": "我的Nest后台终于是写的差不多了，在线体验地址: https://nest.mrzym.top \n欢迎大家体验",
            "user_id": 1,
            "status": 1,
            "is_top": 2,
            "like_times": 10,
            "nick_name": "fandy",
            "avatar": "/blog-images/iBvceOjUQOux",
            "is_like": false
          },
          {
            "createdAt": "2025-01-24 11:54:31",
            "updatedAt": "2025-05-24 07:38:14",
            "id": 64,
            "content": "看起来进度挺慢的，感觉最多的是在适应nest框架，后面开发其他模块应该会快很多，慢就慢在nest和其他框架的使用上，以及理解基础的后端知识，如异常处理，部门、角色、菜单、权限之间的业务逻辑，后面开发其他的模块应该会快一些。不过当我尝试着去写出来的时候，会有一种莫名的成就感。\n后面的计划是完善基础模块，做好框架的权限控制，然后再写前端部分，前端也是个大问题，我太想从零到一了，宁愿多花些时间，平时工作也是接触不到太多的框架编写，基本上是在框架的基础上写点奇奇怪怪的业务逻辑。\n新的一年，加油吧！",
            "user_id": 1,
            "status": 1,
            "is_top": 2,
            "like_times": 11,
            "nick_name": "fandy",
            "avatar": "/blog-images/iBvceOjUQOux",
            "is_like": false
          },
          {
            "createdAt": "2024-12-25 00:38:17",
            "updatedAt": "2025-06-10 16:11:44",
            "id": 63,
            "content": "我正在尝试使用Nest搭建一个通用的服务端框架。我考虑的东西很多，如各种基础模块（日志、swagger接口、参数校验等），以及如何进阶使用typeorm操作数据库等。这间接导致了我的进度有点慢，不过好在是有进展的。",
            "user_id": 1,
            "status": 1,
            "is_top": 2,
            "like_times": 6,
            "talkImgList": [
              "http://img.mrzym.top/FoFMcPwgo-Fw9OXCETgxounvpMZQ",
              "http://img.mrzym.top/FoTlGu0xWmXiPxpfJZGiTp4MCDiu"
            ],
            "nick_name": "fandy",
            "avatar": "/blog-images/iBvceOjUQOux",
            "is_like": false
          },
          {
            "createdAt": "2024-10-14 16:04:41",
            "updatedAt": "2025-05-30 11:32:02",
            "id": 62,
            "content": "不想上班的心 到达了顶点",
            "user_id": 1,
            "status": 1,
            "is_top": 2,
            "like_times": 31,
            "talkImgList": [
              "http://img.mrzym.top/FhR-iEqrjQcZT2VVC0QQH_y-QyLr"
            ],
            "nick_name": "fandy",
            "avatar": "/blog-images/iBvceOjUQOux",
            "is_like": false
          },
          {
            "createdAt": "2024-08-29 11:28:23",
            "updatedAt": "2025-05-30 11:32:05",
            "id": 61,
            "content": "无力感\n真的就是代码半小时 等待一整天",
            "user_id": 1,
            "status": 1,
            "is_top": 2,
            "like_times": 18,
            "nick_name": "fandy",
            "avatar": "/blog-images/iBvceOjUQOux",
            "is_like": false
          }
        ],
        "total": 38
      }
    }
    if (res.code == 0) {
      talkList.value =
        param.current == 1 ? res.result.list : talkList.value.concat(res.result.list);
      total.value = res.result.total;
    }
  } finally {
    loading.value = false;
    scrollLoading.value = false;
  }
};

const like = async (item, index) => {
  if (likePending.value) return;
  likePending.value = true;
  // 取消点赞
  if (item.is_like) {
    const res = await cancelLike({ for_id: item.id, type: 2, user_id: userStore.getUserInfo.id });
    if (res.code == 0) {
      talkList.value[index].is_like = false;
      talkList.value[index].like_times--;
      likePending.value = false;

      ElNotification({
        offset: 60,
        title: "提示",
        message: h("div", { style: "color: #7ec050; font-weight: 600;" }, "已取消点赞"),
      });
    }
  }
  // 点赞
  else {
    const res = await addLike({ for_id: item.id, type: 2, user_id: userStore.getUserInfo.id });
    if (res.code == 0) {
      talkList.value[index].is_like = true;
      talkList.value[index].like_times++;
      likePending.value = false;

      ElNotification({
        offset: 60,
        title: "提示",
        message: h("div", { style: "color: #7ec050; font-weight: 600;" }, "点赞成功"),
      });
    }
  }
};

const toggleComment = (index) => {
  talkCommentRef.value[index].toggleExpand();
};

onMounted(async () => {
  await pageGetTalkList();
  if (talkList.value.length < total.value) {
    observeBox();
  }
});

onBeforeUnmount(() => {
  observe && observe.unobserve(box);
  observe = null;
});
</script>

<template>
  <PageHeader :loading="loading" />
  <div class="talk center_box">
    <el-card class="talk-card">
      <el-skeleton :loading="loading" style="height: 100%" animated>
        <template #template>
          <div class="pc-skeleton flex justify-start w-[100%] !mt-[30px]" v-for="i in 3" :key="i">
            <SkeletonItem variant="text" width="80px" height="80px" />
            <div class="w-[70%] !ml-[10px]">
              <SkeletonItem variant="text" width="40%" height="20px" />
              <SkeletonItem variant="image" width="40%" height="180px" top="10px" />
              <div class="flex justify-between !w-[40%]">
                <SkeletonItem variant="text" width="10%" height="20px" top="10px" />
                <div class="flex w-[20%]">
                  <SkeletonItem variant="text" width="50%" height="20px" top="10px" />
                  <SkeletonItem variant="text" width="50%" height="20px" top="10px" left="10px" />
                </div>
              </div>
            </div>
          </div>
          <div
            class="mobile-skeleton flex justify-start w-[100%] !mt-[30px]"
            v-for="i in 3"
            :key="i"
          >
            <SkeletonItem variant="text" width="80px" height="80px" />
            <div class="w-[100%] !ml-[10px]">
              <SkeletonItem variant="text" width="80%" height="20px" />
              <SkeletonItem variant="image" width="80%" height="180px" top="10px" />
              <div class="flex justify-between !w-[80%]">
                <SkeletonItem variant="text" width="10%" height="20px" top="10px" />
                <div class="flex w-[20%]">
                  <SkeletonItem variant="text" width="50%" height="20px" top="10px" />
                  <SkeletonItem variant="text" width="50%" height="20px" top="10px" left="10px" />
                </div>
              </div>
            </div>
          </div>
        </template>
        <transition-group name="scroll-list" tag="div">
          <div class="w-[100%] talk-item-line" v-for="(talk, talkIndex) in talkList" :key="talk.id">
            <div class="talk-card__item animate__animated animate__fadeIn">
              <div class="left">
                <el-avatar class="left-avatar" :src="talk.avatar" shape="square" />
              </div>
              <div class="w-[100%]">
                <div class="right">
                  <div class="right-top relative">
                    <i v-if="talk.is_top == 1" class="iconfont icon-zhiding"></i>
                    <span class="nick-name">{{ talk.nick_name }}</span>
                    <TextOverflow
                      class="content"
                      :text="talk.content"
                      :maxLines="3"
                      :font-size="14"
                    >
                      <template v-slot:default="{ clickToggle, expanded }">
                        <span @click="clickToggle" class="btn">
                          {{ expanded ? "收起" : "展开" }}
                        </span>
                      </template>
                    </TextOverflow>
                  </div>
                  <div
                    class="right-bottom"
                    v-if="Array.isArray(talk.talkImgList) && talk.talkImgList.length > 1"
                  >
                    <div
                      class="image"
                      v-image="url"
                      v-for="(url, imageIndex) in talk.talkImgList"
                      :key="imageIndex"
                    >
                      <el-image
                        class="w-[100%] h-[100%]"
                        :src="url"
                        loading="lazy"
                        preview-teleported
                        :initial-index="imageIndex"
                        fit="cover"
                        :preview-src-list="talk.talkImgList.map((v) => v)"
                      >
                        <template #error>
                          <div class="w-[100%] h-[100%] grid place-items-center">
                            <svg-icon name="image404" :width="5" :height="5"></svg-icon>
                          </div>
                        </template>
                      </el-image>
                    </div>
                  </div>
                  <!-- 只有一张图片就单独大图展示 -->
                  <div
                    class="right-bottom-one"
                    v-else-if="Array.isArray(talk.talkImgList) && talk.talkImgList.length == 1"
                  >
                    <div
                      class="flex justify-center items-center w-[100%] h-[100%] overflow-hidden"
                      v-image="talk.talkImgList[0]"
                    >
                      <el-image
                        class="w-[100%] h-[100%]"
                        :src="talk.talkImgList[0]"
                        loading="lazy"
                        preview-teleported
                        :initial-index="0"
                        fit="cover"
                        :preview-src-list="talk.talkImgList.map((v) => v)"
                      >
                        <template #error>
                          <div class="w-[100%] h-[100%] grid place-items-center">
                            <svg-icon name="image404" :width="8" :height="8"></svg-icon>
                          </div>
                        </template>
                      </el-image>
                    </div>
                  </div>
                  <div class="like flex justify-between items-center !mt-[15px]">
                    <div class="time">{{ returnTime(talk.createdAt) }}前</div>
                    <div>
                      <i
                        class="comment-icon iconfont icon-pinglun"
                        @click="toggleComment(talkIndex)"
                      >
                      </i>
                      <i
                        :class="[
                          'iconfont',
                          'icon-icon1',
                          '!ml-[10px]',
                          talk.is_like ? 'is-like' : '',
                        ]"
                        @click="like(talk, talkIndex)"
                      >
                      </i>
                      <span :class="[talk.is_like ? 'is-like' : '', '!ml-[5px]']">{{
                        talk.like_times
                      }}</span>
                    </div>
                  </div>
                  <div class="!mt-[10px]">
                    <Comment
                      ref="talkCommentRef"
                      class="w-[100%]"
                      type="talk"
                      :id="talk.id"
                      :author-id="talk.user_id"
                      :is-show-toggle="false"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
        <div class="observer">
          <Loading :size="32" v-if="scrollLoading" />
          <template v-else>
            {{ talkList.length >= total ? "已经到底了~" : "下拉加载更多～" }}
          </template>
        </div>
      </el-skeleton>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.talk {
  .relative {
    position: relative;
  }

  .icon-zhiding {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.8rem;
    color: var(--top);
  }

  &-card {
    margin-top: 10px;

    &__item {
      max-width: 680px;
      padding: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }

  .like {
    width: 220px;
  }

  .nick-name {
    color: var(--font-color);
  }

  .mt-10 {
    margin-top: 10px;
  }
  .time {
    font-size: 12px;
    color: var(--font-color);
    letter-spacing: 1px;
  }

  .comment-icon {
    font-size: 16px;
    cursor: pointer;
    &:hover {
      color: var(--primary);
    }
  }

  .is-like {
    color: var(--primary);
  }

  .observer {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    color: var(--font-color);
    margin-top: 30px;
    letter-spacing: 1px;
  }
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
  color: var(--primary);
  cursor: pointer;
}

.talk-item-line {
  border-bottom: 1px solid #b8b8b8;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
}
.right {
  &-bottom-one {
    margin-top: 10px;
    width: 220px;
    height: 220px;
    display: grid;
    place-items: center;
  }
}
// pc
@media screen and (min-width: 768px) {
  .mobile-skeleton {
    display: none;
  }
  .talk-card {
    padding: 40px 50px;
  }
  .left {
    width: 60px;
    height: 60px;

    &-avatar {
      width: 60px;
      height: 60px;
    }
  }

  .right {
    width: 100%;
    margin-left: 10px;

    &-top {
      min-height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      .content {
        margin-top: 23px;
      }
    }

    &-bottom {
      margin-top: 10px;
      display: grid;
      grid-template-columns: 120px 120px 120px;
      grid-auto-rows: 120px;
      gap: 1px;
    }
  }
}

// mobile
@media screen and (max-width: 768px) {
  .pc-skeleton {
    display: none;
  }
  .talk-card {
    padding: 40px 3px;
  }
  .left {
    width: 40px;
    height: 40px;

    &-avatar {
      width: 40px;
      height: 40px;
    }
  }

  .right {
    width: 300px;
    margin-left: 10px;

    &-top {
      min-height: 40px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      .content {
        margin-top: 3px;
      }
    }

    &-bottom {
      margin-top: 5px;
      display: grid;
      grid-template-columns: 100px 100px 100px;
      grid-auto-rows: 100px;
      gap: 1px;
    }
  }
}
</style>
