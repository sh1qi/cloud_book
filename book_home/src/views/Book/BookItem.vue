<template>
  <div class="item">
    <div class="title">书籍详情</div>
    <div class="box">
      <div class="pic">
        <img :src="BaseUrl + '/' + data.img" alt="" />
      </div>
      <ul>
        <li>
          <b>书名：</b><span>{{ data.name }}</span>
        </li>
        <li>
          <b>作者：</b><span>{{ data.writer }}</span>
        </li>
        <li>
          <b>书籍分区：</b><span>{{ data.area }}</span>
        </li>
        <li>
          <b>分类：</b><span>{{ data.sortName }}</span>
        </li>
      </ul>
      <div class="btn">
        <el-button @click="borrowBook()" :disabled="btn" type="success"
          >申请借阅</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["apply", "uid", "name", "isLogin", "apply", "BaseUrl"]),
  },
  data() {
    return {
      btn: false,
      data: {},
    };
  },
  methods: {
    async borrowBook() {
      if (this.isLogin === "1" || this.isLogin === true) {
        const sendData = {
          uid: this.uid,
          user: this.name,
          bid: this.$route.params.id,
          book: this.data.name,
        };
        const res = await this.$api.newBorrow(sendData);
        if (res.data.mode === "ok") {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        }
        this.btn = true;
        return;
      }
      this.$message.error("请先登录账户");
      this.$router.push({ name: "LoginView" });
    },
  },
  async created() {
    console.log(this.$route.params.id);
    const res = await this.$api.getBookItem({ id: this.$route.params.id });
    this.data = res.data.data;
    const data = JSON.parse(this.apply).data;
    for (const item of data) {
      if (item.bid === this.$route.params.id) {
        this.btn = true;
      }
    }
  },
};
</script>

<style lang='scss' scoped>
.item {
  width: 1200px;
  background: #fafafa;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 50px;
  box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.3);
  border-radius: 25px;
  .title {
    width: 100%;
    line-height: 80px;
    font-size: 24px;
    text-indent: 30px;
    font-weight: bold;
    background: #f1f1f1;
    border-radius: 25px 25px 0 0;
  }
  .box {
    padding-bottom: 50px;
    .pic {
      width: 170px;
      height: 235px;
      margin: auto;
      margin-top: 30px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    ul {
      width: 800px;
      margin: auto;
      li {
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #000;
        line-height: 40px;
      }
    }
    .btn {
      margin-top: 50px;
      text-align: center;
    }
  }
}
</style>