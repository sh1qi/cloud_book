<template>
  <div class="box">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="primary">搜索</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
};
</script>

<style lang='scss' scoped>
.box {
  width: 600px;
  padding: 80px 100px;
  display: flex;
  border-radius: 35px;
  margin: 30px 0;
  background: white;
  box-shadow: 0px 0px 10px rgba($color: #000000, $alpha: 0.2);
  .el-button {
    margin-left: 20px;
    width: 100px;
  }
}
</style>