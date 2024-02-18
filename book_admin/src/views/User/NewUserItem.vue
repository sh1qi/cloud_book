<template>
  <div class="item">
    <div class="title">添加新的用户</div>
    <FormItem :formData="formData" :header="header" />
  </div>
</template>

<script>
import FormItem from "@/components/FormItem.vue";
export default {
  components: { FormItem },
  data() {
    return {
      formData: {
        uid: 0,
        name: "",
        pic: "",
      },
      header: [
        { name: "uid", type: "uid" },
        { name: "昵称", type: "name" },
        { name: "头像", type: "pic" },
      ],
    };
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
  box-shadow: 3px 3px 10px rgba($color: #000000, $alpha: 0.1);
  background-color: #fff;
  .title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 30px;
  }
}
</style>