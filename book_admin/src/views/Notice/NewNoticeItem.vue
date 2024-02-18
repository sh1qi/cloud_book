<template>
  <div class="item">
    <div class="title">添加新的通知</div>
    <FormItem
      @setFromData="setFromData"
      @sendData="sendData"
      :formData="formData"
      :header="header"
    />
  </div>
</template>

<script>
import FormItem from "@/components/FormItem.vue";
export default {
  components: { FormItem },
  data() {
    return {
      sendDataForm: {
        title: "",
        container: "",
      },
      formData: {
        title: "",
        container: "",
      },
      header: [
        { name: "标题", type: "title" },
        { name: "内容", type: "container" },
      ],
    };
  },
  methods: {
    setFromData(form) {
      this.sendDataForm = form;
    },
    async sendData() {
      const res = await this.$api.newnotice(this.sendDataForm);
      if (res.data.mode === "ok") {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
        return;
      }
      if (res.data.error) {
        this.$message.error(res.data.msg);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.item {
  width: 800px;
  padding: 40px;
  margin: auto;
  margin-top: 30px;
  border-radius: 25px;
  box-shadow: 3px 3px 10px rgba($color: #000000, $alpha: 0.4);
  background-color: #fff;
  .title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 30px;
  }
}
</style>