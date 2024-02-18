<template>
  <div class="page">
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next,total"
      :page-size="8"
      :current-page.sync="curpage"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ["page", "total"],
  data() {
    return {
      curpage: this.page,
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("setPage", val);
      this.$emit("getData");
    },
  },
};
</script>

<style lang='scss' scoped>
.page {
  margin-top: 20px;
  text-align: center;
}
</style>