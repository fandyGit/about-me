<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAllPhotosByAlbumId } from "@/api/photo";
import { getAllAlbum } from "@/api/photo";

import PageHeader from "@/components/PageHeader/index.vue";
import SkeletonItem from "@/components/SkeletonItem/skeleton-item.vue";
import { isMobile } from "@/utils/tool";

const route = useRoute();
const router = useRouter();
const photoList = ref([]);
const photoAlbumList = ref([]);
const loading = ref(false);
const drawerShow = ref(false);

const pageGetPhotos = async (id) => {
  loading.value = true;
  let res = {
    "code": 0,
    "message": "获取相册所有照片成功",
    "result": [
      {
        "createdAt": "2023-11-20 09:10:18",
        "updatedAt": "2023-11-20 09:10:18",
        "id": 290,
        "album_id": 9,
        "url": "http://img.mrzym.top/Flrfz7em668tGBi9XIWC_fhy_ogx",
        "status": 1
      },
      {
        "createdAt": "2023-11-20 09:10:18",
        "updatedAt": "2023-11-20 09:10:18",
        "id": 291,
        "album_id": 9,
        "url": "http://img.mrzym.top/Fgy6EcVRcrGlvccdUp89rc8aegMV",
        "status": 1
      },
      {
        "createdAt": "2023-11-20 09:10:18",
        "updatedAt": "2023-11-20 09:10:18",
        "id": 292,
        "album_id": 9,
        "url": "http://img.mrzym.top/Fg1iBKXcsQWNHSzbq2BcmY00b1Hm",
        "status": 1
      },
      {
        "createdAt": "2023-09-29 23:52:50",
        "updatedAt": "2023-09-29 23:52:50",
        "id": 263,
        "album_id": 9,
        "url": "http://img.mrzym.top/Fi25f-LMEZ9FwIxxOdkQ_wc2JAXy",
        "status": 1
      },
      {
        "createdAt": "2023-09-29 23:52:50",
        "updatedAt": "2023-09-29 23:52:50",
        "id": 264,
        "album_id": 9,
        "url": "http://img.mrzym.top/FqMYVmreXo0AwlJFZNxL7t3gkC0P",
        "status": 1
      },
      {
        "createdAt": "2023-09-29 23:52:50",
        "updatedAt": "2023-09-29 23:52:50",
        "id": 265,
        "album_id": 9,
        "url": "http://img.mrzym.top/FuyJ_bJv1Qeem8X7PKZTpytUaPvg",
        "status": 1
      },
      {
        "createdAt": "2023-09-29 23:52:50",
        "updatedAt": "2023-09-29 23:52:50",
        "id": 266,
        "album_id": 9,
        "url": "http://img.mrzym.top/FuyTkh4KHX4KaZ3VtuTHh9JMA0Xs",
        "status": 1
      },
      {
        "createdAt": "2023-08-30 01:47:15",
        "updatedAt": "2023-08-30 01:47:15",
        "id": 236,
        "album_id": 9,
        "url": "http://img.mrzym.top/Fu2ALo9O9TC3nOCLbqUhWo8yzEl8",
        "status": 1
      },
      {
        "createdAt": "2023-07-01 21:14:04",
        "updatedAt": "2023-07-01 21:14:04",
        "id": 206,
        "album_id": 9,
        "url": "http://img.mrzym.top/Frn56RoydbET-Uzo7tkjZ-Pt-bKZ",
        "status": 1
      },
      {
        "createdAt": "2023-07-01 21:09:36",
        "updatedAt": "2023-07-01 21:09:36",
        "id": 202,
        "album_id": 9,
        "url": "http://img.mrzym.top/Fja7Iuei--SImFccR7jaDAScZPUS",
        "status": 1
      },
      {
        "createdAt": "2023-07-01 21:07:10",
        "updatedAt": "2023-07-01 21:07:10",
        "id": 198,
        "album_id": 9,
        "url": "http://img.mrzym.top/FqfsAwGKpuRBEhCHQyDT7kYdD1qt",
        "status": 1
      },
      {
        "createdAt": "2023-07-01 21:07:10",
        "updatedAt": "2023-07-01 21:07:10",
        "id": 199,
        "album_id": 9,
        "url": "http://img.mrzym.top/Frn9rLokt1UvKz61ktqXhPVmUE4l",
        "status": 1
      },
      {
        "createdAt": "2023-07-01 21:07:10",
        "updatedAt": "2023-07-01 21:07:10",
        "id": 200,
        "album_id": 9,
        "url": "http://img.mrzym.top/FnNKYn9uD-6SAHsPUJE0kEkhkPjQ",
        "status": 1
      },
      {
        "createdAt": "2023-07-01 21:07:10",
        "updatedAt": "2023-07-01 21:07:10",
        "id": 201,
        "album_id": 9,
        "url": "http://img.mrzym.top/Fi3TrbWYANj7o5Igr1oqFwK4HSRe",
        "status": 1
      },
      {
        "createdAt": "2023-06-26 15:43:00",
        "updatedAt": "2023-06-26 15:43:00",
        "id": 196,
        "album_id": 9,
        "url": "http://img.mrzym.top/Fjf-lP5E-yBvr2slpIdpN2ppFSci",
        "status": 1
      },
      {
        "createdAt": "2023-06-25 16:38:10",
        "updatedAt": "2023-06-25 16:38:10",
        "id": 194,
        "album_id": 9,
        "url": "http://img.mrzym.top/FsFHMOkuqBAEVElT4U0PUyWV1txM",
        "status": 1
      },
      {
        "createdAt": "2023-06-25 16:38:10",
        "updatedAt": "2023-06-25 16:38:10",
        "id": 195,
        "album_id": 9,
        "url": "http://img.mrzym.top/FjCsA0fZ8FBxR6btVw4ynZkO8Nd1",
        "status": 1
      },
      {
        "createdAt": "2023-05-29 12:50:15",
        "updatedAt": "2023-05-29 12:50:15",
        "id": 182,
        "album_id": 9,
        "url": "http://img.mrzym.top/FjIiVNgHbnAETjZyofKmO0ECKVzK",
        "status": 1
      },
      {
        "createdAt": "2023-05-29 12:50:15",
        "updatedAt": "2023-05-29 12:50:15",
        "id": 183,
        "album_id": 9,
        "url": "http://img.mrzym.top/Fty0mLoOcCAlnB5941-unsUy_Akx",
        "status": 1
      },
      {
        "createdAt": "2023-05-29 12:50:15",
        "updatedAt": "2023-05-29 12:50:15",
        "id": 184,
        "album_id": 9,
        "url": "http://img.mrzym.top/Fgy2lGGQ6Qz_674Ok9vA4dMluCSk",
        "status": 1
      },
      {
        "createdAt": "2023-05-29 12:50:15",
        "updatedAt": "2023-05-29 12:50:15",
        "id": 185,
        "album_id": 9,
        "url": "http://img.mrzym.top/Flp8Hefgh5P4b_L7EGHX7Jnvs2jd",
        "status": 1
      },
      {
        "createdAt": "2023-05-26 12:20:00",
        "updatedAt": "2023-05-26 12:20:00",
        "id": 179,
        "album_id": 9,
        "url": "http://img.mrzym.top/FsAW8bHVRlzknQejQ8QKdpnqbPW3",
        "status": 1
      },
      {
        "createdAt": "2023-05-26 12:20:00",
        "updatedAt": "2023-05-26 12:20:00",
        "id": 180,
        "album_id": 9,
        "url": "http://img.mrzym.top/Fm6yv47EWlzDFoXzGMYAVav0neFE",
        "status": 1
      },
      {
        "createdAt": "2023-05-26 12:20:00",
        "updatedAt": "2023-05-26 12:20:00",
        "id": 181,
        "album_id": 9,
        "url": "http://img.mrzym.top/FsM1XsO1klu62n8gtGIhn-npBvVY",
        "status": 1
      },
      {
        "createdAt": "2023-05-26 12:19:30",
        "updatedAt": "2023-05-26 12:19:30",
        "id": 176,
        "album_id": 9,
        "url": "http://img.mrzym.top/Fs-t2dTZ3aDQJI0bvQXRvxvvnRs7",
        "status": 1
      },
      {
        "createdAt": "2023-05-26 12:19:30",
        "updatedAt": "2023-05-26 12:19:30",
        "id": 177,
        "album_id": 9,
        "url": "http://img.mrzym.top/Fpk1370uhwgyhz9ixk3qiTtmcf_r",
        "status": 1
      },
      {
        "createdAt": "2023-05-26 12:19:30",
        "updatedAt": "2023-05-26 12:19:30",
        "id": 178,
        "album_id": 9,
        "url": "http://img.mrzym.top/Fox--qIyQsye6Qaudn9Fy0u_ipZQ",
        "status": 1
      },
      {
        "createdAt": "2023-05-19 22:17:45",
        "updatedAt": "2023-05-19 22:17:45",
        "id": 163,
        "album_id": 9,
        "url": "http://img.mrzym.top/FvUzHeCKO0Bhmod6dSHz3ZN2Tjdb",
        "status": 1
      },
      {
        "createdAt": "2023-05-19 22:17:45",
        "updatedAt": "2023-05-19 22:17:45",
        "id": 164,
        "album_id": 9,
        "url": "http://img.mrzym.top/Fh9YCq0YsioPYZUo8ym3ENXpeerm",
        "status": 1
      },
      {
        "createdAt": "2023-05-19 22:17:45",
        "updatedAt": "2023-05-19 22:17:45",
        "id": 165,
        "album_id": 9,
        "url": "http://img.mrzym.top/FgQ56h8x8umwB6Xgg6h3TrWJ1SuU",
        "status": 1
      }
    ]
  }
  if (res.code == 0) {
    photoList.value = res.result;
    loading.value = false;
  }
};

const toggleAlbum = (item) => {
  router.push({
    path: "/photos",
    query: {
      id: item.id,
      pageTitle: item.album_name,
      bg: item.album_cover,
    },
  });
};

const getAll = async (id) => {
  let res = {
    "code": 0,
    "message": "获取所有相册列表成功",
    "result": [
      {
        "createdAt": "2023-05-19 22:16:38",
        "updatedAt": "2023-05-19 22:16:38",
        "id": 9,
        "album_name": "风景",
        "album_cover": "http://img.mrzym.top/FqLN_X1p_IH1S7UhMSd82IRXSwPx",
        "description": "记录沿途的风景"
      },
      {
        "createdAt": "2023-03-31 19:14:05",
        "updatedAt": "2023-04-20 20:57:47",
        "id": 4,
        "album_name": "美食",
        "album_cover": "http://img.mrzym.top/FpJtG2g5_GP-_V1LOsA6VY2iwx8o",
        "description": "唯有美食不可辜负"
      },
      {
        "createdAt": "2023-03-30 20:39:12",
        "updatedAt": "2023-04-20 20:57:47",
        "id": 3,
        "album_name": "日常",
        "album_cover": "http://img.mrzym.top/FgYccg_-CG_WDs9YDPTfvy92PxtK",
        "description": "随手拍拍~~"
      },
      {
        "createdAt": "2023-03-30 20:33:11",
        "updatedAt": "2025-04-28 17:11:26",
        "id": 2,
        "album_name": "风车车",
        "album_cover": "http://img.mrzym.top/Fj-eFJaRl0XpzC-WiFA3zSxITH2T",
        "description": "让俺看看谁还没有可爱的小猫咪"
      }
    ]
  }
  if (res.code == 0) {
    photoAlbumList.value = res.result;
    pageGetPhotos(Number(id));
  }
};

const openDrawer = () => {
  drawerShow.value = true;
};
const handleClose = () => {
  drawerShow.value = false;
};

watch(
  () => route.query.id,
  (newV) => {
    getAll(newV);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <PageHeader :bgUrl="route.query.bg" />
  <div class="photoList">
    <div class="center_box">
      <div class="photoList-card">
        <el-row v-if="loading" class="row-space">
          <el-col class="col-space" :xs="12" :sm="6" v-for="index in 6" :key="index">
            <div class="image-box">
              <el-skeleton animated>
                <template #template>
                  <SkeletonItem variant="image" width="100%" height="10rem" />
                </template>
              </el-skeleton>
            </div>
          </el-col>
        </el-row>
        <el-row v-else-if="photoList.length" class="row-space">
          <el-col
            class="col-space"
            :xs="12"
            :sm="6"
            v-for="(item, index) in photoList"
            :key="item.id"
          >
            <div v-image="item.url" class="image-box flex_center animate__animated animate__fadeIn">
              <el-image
                class="image"
                :src="item.url"
                fit="cover"
                lazy
                preview-teleported
                :initial-index="index"
                :preview-src-list="photoList.map((v) => v.url)"
              >
                <template #error>
                  <div class="w-[100%] h-[100%] grid place-items-center">
                    <svg-icon name="image404" :width="8" :height="6"></svg-icon>
                  </div>
                </template>
              </el-image>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
  <div class="affix">
    <i class="iconfont icon-arrowleft" @click="openDrawer"></i>
  </div>
  <el-drawer
    v-model="drawerShow"
    direction="rtl"
    :before-close="handleClose"
    :append-to-body="true"
    :size="isMobile() ? '30%' : '15%'"
  >
    <div class="image-list">
      <div
        :class="['album-box !mb-[5px]', route.query.id == item.id ? 'album-current' : '']"
        v-for="item in photoAlbumList"
        :key="item.id"
      >
        <el-image
          class="album-box__image"
          :src="item.album_cover"
          fit="cover"
          lazy
          @click="toggleAlbum(item)"
        >
          <template #error>
            <svg-icon name="image404" :width="4" :height="4"></svg-icon>
          </template>
        </el-image>
      </div>
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped>
.photoList {
  .photoList-card {
    min-height: 8rem;
    border-radius: 8px;
    background-color: var(--shadow-button-bg);
  }

  .image-box {
    width: 100%;
    height: 100%;
    transition: all 0.3s;
    border-radius: 5px;
    overflow: hidden;
    &:hover {
      transform: translateY(-5px);
      filter: saturate(2) drop-shadow(0 0 5px rgba(0, 0, 0, 0.66));
    }
  }

  .image {
    vertical-align: middle;
    cursor: pointer;
    width: 100%;
    object-fit: cover;
    display: grid;
    place-items: center;
  }
}

.row-space {
  padding: 5px !important;
}

.col-space {
  padding: 5px !important;
}

.image-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  padding: 3px;
  &::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
  }
}
.image-box {
  transition: all 0.3s;
  box-sizing: border-box;
  border: 3px solid transparent;
  border-radius: 3px;

  &:hover {
    box-shadow: 0 0 8px var(--global-white);
  }
}
.album-current {
  filter: saturate(2);
  border-right: 2px solid #9face6;
}

.affix {
  position: fixed;
  bottom: 30%;
  right: 0%;
  .icon-arrowleft {
    font-size: 1.8rem;
  }
}

// pc
@media screen and (min-width: 769px) {
  .image {
    height: 10rem;
  }

  .album-box {
    width: 100px;
    height: 70px;
    &__image {
      width: 94px;
      height: 70px;
      vertical-align: top;
    }
  }
}

@media screen and (max-width: 768px) {
  .image {
    height: 8rem;
  }

  .album-box {
    width: 70px;
    height: 50px;
    &__image {
      width: 64px;
      height: 50px;
      vertical-align: top;
    }
  }
}
</style>
