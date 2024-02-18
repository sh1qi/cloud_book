<template>
  <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
    <el-form-item v-for="(item, i) in FormHeader" :key="i" :label="item.name">
      <div v-if="item.type === 'container'">
        <WangEditor @getContainer="getContainer" ref="editor" />
      </div>
      <el-select
        v-else-if="item.type === 'state' || item.type === 'sort'"
        v-model="form[item.type]"
        placeholder="请选择"
      >
        <el-option
          v-for="optionsItem in options"
          :key="optionsItem.value"
          :label="optionsItem.label"
          :value="optionsItem.value"
        >
        </el-option>
      </el-select>
      <el-upload
        v-else-if="item.type === 'pic' || item.type === 'img'"
        class="avatar-uploader"
        :action="BaseUrl + '/img'"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="BaseUrl + '/' + imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-input v-else v-model="form[item.type]"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">立即添加</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import WangEditor from "@/components/WangEditor.vue";
import { mapState } from "vuex";
export default {
  computed: { ...mapState(["BaseUrl"]) },
  components: { WangEditor },
  props: ["formData", "header", "options", "img", "pic"],
  data() {
    return {
      imageUrl: "",
      newHtml: "",
      form: {},
      FormHeader: [],
    };
  },
  methods: {
    getContainer(newHtml) {
      this.form.container = newHtml;
    },
    submitForm() {
      if (this.pic) {
        console.log("pic");
        this.form.pic = this.imageUrl;
      }
      if (this.img) {
        console.log("img");
        this.form.img = this.imageUrl;
      }
      this.$emit("setFromData", this.form);
      this.$emit("sendData");
      this.form = JSON.parse(JSON.stringify(this.formData));
      this.imageUrl = "";
     this.$refs.editor[0].empty()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      console.log("res", res);
      console.log("file", file);
      this.imageUrl = res.fileName;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式和 png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  created() {
    this.form = JSON.parse(JSON.stringify(this.formData));
    this.FormHeader = JSON.parse(JSON.stringify(this.header));
  },
};
</script>

<style lang='scss' scoped>
.avatar-uploader {
  width: 178px;
  height: 178px;
  box-shadow: 0 0 4px rgba($color: #000000, $alpha: 0.3);
  border: 1px solid #f1f1f1;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  img {
    width: 178px;
    height: 178px;
    object-fit: cover;
  }
  &:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
</style>