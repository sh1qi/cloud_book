<template>
  <div class="item">
    <div class="title">{{ data.title }}</div>
    <div class="container" v-html="data.container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        id: 1,
        title: "开放通知",
        container: "<p>123123123123</p>",
      },
    };
  },
  async created() {
    console.log(this.$route.params.id);
    const res = await this.$api.getNoticeItem({ id: this.$route.params.id });
    console.log(res);
    this.data = res.data.data;
  },
};
</script>

<style lang='scss' scoped>
.item {
  width: 1000px;
  padding: 30px 100px 100px;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  background: #fafafa;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.2);
  .title {
    font-size: 24px;
    line-height: 60px;
    margin-bottom: 20px;
    font-weight: bold;
    text-align: center;
  }
}
</style>