<template>
  <div>
    <div class="banner">
      <BannerItem />
    </div>
    <div class="title">通知中心</div>
    <div class="notice">
      <NoticeItem />
    </div>
    <div class="title">书籍推荐</div>
    <div class="notice">
      <BookCarouselItem />
    </div>
  </div>
</template>

<script>
import BannerItem from "@/components/BannerItem.vue";
import NoticeItem from "@/components/InfoItem.vue";
import BookCarouselItem from "@/components/BookCarouselItem.vue";
export default {
  components: { BannerItem, NoticeItem, BookCarouselItem },
};
</script>

<style lang='scss' scoped>
.title {
  text-align: center;
  line-height: 80px;
  font-size: 24px;
}
.search {
  width: 800px;
  margin: auto;
}
.notice {
  width: 1200px;
  margin: auto;
}
</style>