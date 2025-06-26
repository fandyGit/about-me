<script setup>
import { ref, reactive, onMounted } from "vue";

import { blogTimelineGetArticleList } from "@/api/article";

import PageHeader from "@/components/PageHeader/index.vue";
import TimeLine from "@/components/TimeLine/time-line.vue";

const archives = ref([]);
let param = reactive({
  // 放置页码及相关数据
  current: 1, //当前页
  size: 5, //每页条目数
});
let archivesTotal = ref(0); // 记录总数
const loading = ref(false);

const pagination = (page) => {
  param.current = page.current;
  getArchives();
};

// 获取时间轴
const getArchives = async () => {
  try {
    let res = {
      "code": 0,
      "message": "获取文章时间轴列表成功",
      "result": {
        "current": "1",
        "size": "5",
        "list": [
          {
            "year": "2025",
            "articleList": [
              {
                "createdAt": "2025-04-22 17:11:49",
                "id": 43,
                "article_title": "Docker 部署",
                "article_cover": "http://img.mrzym.top/FsmFwJb-phLb9aNSiKLYZP-s_vAk"
              },
              {
                "createdAt": "2025-03-17 10:18:59",
                "id": 39,
                "article_title": "Vue3动态渲染组件$t动态切换时更新失效",
                "article_cover": "http://img.mrzym.top/FrvTH-DB2AhtpSk8TCPUZBTdDuEn"
              },
              {
                "createdAt": "2025-02-13 18:13:27",
                "id": 38,
                "article_title": "半年隔绝，归来已是“前端新时代”",
                "article_cover": "http://img.mrzym.top/Fg2GFAUcF5pBLzaLN0dKaIDeK_f8"
              }
            ]
          },
          {
            "year": "2024",
            "articleList": [
              {
                "createdAt": "2024-12-11 01:09:18",
                "id": 37,
                "article_title": "Docker的坑",
                "article_cover": "http://img.mrzym.top/FmnBC-KQncIt0qzQfhVe4YsoAZ6Z"
              },
              {
                "createdAt": "2024-08-16 10:47:54",
                "id": 36,
                "article_title": "如何处理Promise.reject返回的数据",
                "article_cover": "http://img.mrzym.top/FsmqBpLiVVh0kmiywKWqHlQApIN3"
              }
            ]
          }
        ],
        "total": 26
      }
    }
    if (res.code == 0) {
      const { total, list } = res.result;
      archives.value = list;
      archivesTotal.value = total;
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loading.value = true;
  getArchives();
});
</script>

<template>
  <PageHeader :loading="loading" />
  <div class="archives">
    <el-row class="center_box">
      <el-col :span="24">
        <el-card class="archives-card">
          <TimeLine
            :archives="archives"
            :total="archivesTotal"
            :loading="loading"
            :param="param"
            @pagination="pagination"
          ></TimeLine>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.archives {
  &-card {
    padding: 40px 50px;
  }
}
</style>
