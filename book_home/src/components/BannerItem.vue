<template>
  <div class="banner">
    <el-carousel
      :interval="5000"
      height="500px"
      arrow="always"
    >
      <el-carousel-item v-for="(item, i) in bannerData" :key="i">
        <img class="bannerImg" src="@/assets/img/banner.jpg" alt="" srcset="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerData: [
        {
          img: "@/assets/img/banner.jpg",
        },
        {
          img: "@/assset/img/banner",
        },
        {
          img: "@/assset/img/banner",
        },
        {
          img: "@/assset/img/banner",
        },
      ],
    };
  },
};
</script>

<style lang='scss' scoped>
.bannerImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>