<template>
  <div class="search">
    <el-input
      class="seachInput"
      v-model="search"
      placeholder="请输入需要搜索的内容"
    ></el-input>
    <el-button @click="send()" class="searchBtn" type="primary">搜索</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  methods: {
    send() {
      this.$emit("search", this.search);
      this.$emit("getData");
    },
  },
};
</script>

<style lang='scss' scoped>
.search {
  display: flex;
  margin: auto;
  justify-content: space-around;
  margin-top: 20px;
  width: 800px;
  .seachInput {
    width: 600px;
  }
  .searchBtn {
    width: 120px;
  }
}
</style>