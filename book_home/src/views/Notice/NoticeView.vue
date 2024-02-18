<template>
  <div class="notice">
    <h3>全部通知</h3>
    <ul>
      <li v-for="item in data" :key="item.id">
        <router-link :to="{ name: 'NoticeItem', params: { id: item.id } }">{{
          item.title
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
    };
  },
  async created() {
    const res = await this.$api.getNotice({ all: "all" });
    console.log(res);
    this.data = res.data.data;
  },
};
</script>

<style lang='scss' scoped>
.notice {
  width: 1200px;
  margin: auto;
  margin-top: 30px;
  h3 {
    font-size: 24px;
    margin-bottom: 30px;
  }
  ul {
    width: 100%;
    li {
      width: 100%;
      height: 60px;
      background: #fafafa;
      box-shadow: 0 1px 2px rgba($color: #000000, $alpha: 0.2);
      margin-bottom: 10px;
      line-height: 60px;
      a {
        margin-left: 20px;
        color: #333;
      }
    }
  }
}
</style>