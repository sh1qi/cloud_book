<template>
  <div class="item">
    <div class="title">添加新的书籍</div>
    <FormItem
      @setFromData="setFromData"
      @sendData="sendData"
      :formData="formData"
      :header="header"
      :options="options"
      :img="true"
    />
  </div>
</template>

<script>
import FormItem from "@/components/FormItem.vue";
export default {
  components: { FormItem },
  data() {
    return {
      formData: {
        name: "",
        img: "",
        writer: "",
        sort: "",
        area: "",
      },
      sendDataForm: {
        name: "",
        img: "",
        writer: "",
        sort: "",
        area: "",
      },
      header: [
        { name: "书名", type: "name" },
        { name: "封面", type: "img" },
        { name: "作者", type: "writer" },
        { name: "分类", type: "sort" },
        { name: "分区", type: "area" },
      ],
      options: [
        {
          value: "history",
          label: "历史",
        },
        {
          value: "literature",
          label: "文学",
        },
        {
          value: "Technology",
          label: "科技",
        },
        {
          value: "novel",
          label: "小说",
        },
        {
          value: "Science",
          label: "科学",
        },
        {
          value: "political",
          label: "政治",
        },
      ],
    };
  },
  methods: {
    setFromData(form) {
      this.sendDataForm = form;
    },
    async sendData() {
      const res = await this.$api.newBook(this.sendDataForm);
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