<template>
  <div id="container"></div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: { ...mapState(["BaseUrl"]) },
  props: ["html"],
  data() {
    return {
      container: "",
    };
  },
  methods: {
    empty(){
     this.container.txt.html('')
    }
  },
  mounted() {
    this.container = new this.$editor("#container");

    this.container.config.onchange = (newHtml) => {
      this.$emit("getContainer", newHtml);
    };
    this.container.config.uploadFileName = "file";
    this.container.config.uploadImgServer = this.BaseUrl + "/img";
    this.container.config.uploadImgHooks = {
      customInsert: (insertImgFn, res) => {
        // result 即服务端返回的接口

        const imgUrl = this.BaseUrl + "/" + res.fileName;
        console.log(imgUrl);
        // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
        insertImgFn(imgUrl);
      },
    };
    this.container.create();
    if (this.html) {
      this.container.txt.html(this.html);
    }
  },
  beforeDestroy() {
    // 销毁编辑器
    this.container.destroy();
    this.container = null;
  },
};
</script>

<style>
</style>