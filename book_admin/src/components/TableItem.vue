<template>
  <div class="table">
    <el-table :data="resData" border style="width: 100%">
      <el-table-column
        v-for="(item, i) in TableHeader"
        :key="i"
        fixed
        :prop="item.type"
        :label="item.name"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">
            查看
          </el-button>
          <el-button
            v-if="passBtn"
            @click="isPass(scope.row)"
            type="text"
            size="small"
            >修改密码</el-button
          >
          <el-popconfirm
            v-if="delBtn"
            title="这是一段内容确定删除吗？"
            @confirm="del(scope.row)"
          >
            <template #reference>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="dialogFormData" label-position="top">
        <el-form-item
          v-for="(item, i) in TableHeader"
          :key="i"
          :label="item.name"
        >
          <div v-if="item.type === 'container'">
            <WangEditor
              @getContainer="getContainer"
              :html="dialogFormData.container"
            />
          </div>
          <el-upload
            v-else-if="item.type === 'pic' || item.type === 'img'"
            class="avatar-uploader"
            :action="BaseUrl + '/img'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="imageUrl"
              :src="BaseUrl + '/' + imageUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-input
            v-else-if="item.type === 'id' || item.type === 'uid'"
            :disabled="true"
            v-model="dialogFormData[item.type]"
          ></el-input>
          <el-select
            v-else-if="item.type === 'state' || item.type === 'sort'"
            v-model="dialogFormData[item.type]"
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
          <el-input v-else v-model="dialogFormData[item.type]"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendData()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="dialogPassVisible" width="30%">
      <el-input v-model="passForm.pass" placeholder="请输入密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPassVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendPass()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import WangEditor from "@/components/WangEditor.vue";
import { mapState } from "vuex";
export default {
  computed: { ...mapState(["BaseUrl"]) },
  components: { WangEditor },
  props: ["header", "resData", "options", "delBtn", "passBtn", "pic", "img"],

  methods: {
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
    getContainer(newHtml) {
      this.dialogFormData.container = newHtml;
    },
    handleClick(row) {
      this.dialogFormData = JSON.parse(JSON.stringify(row));
      if (this.pic) {
        console.log("pic");
        this.imageUrl = this.dialogFormData.pic;
      }
      if (this.img) {
        console.log("img");
        this.imageUrl = this.dialogFormData.img;
      }
      this.dialogFormVisible = true;
    },
    sendData() {
      if (this.pic) {
        console.log("pic");
        this.dialogFormData.pic = this.imageUrl;
      }
      if (this.img) {
        console.log("img");
        this.dialogFormData.img = this.imageUrl;
      }
      console.log(this.dialogFormData);
      this.$emit("upData", this.dialogFormData);
      this.dialogFormVisible = false;
    },
    del(row) {
      this.$emit("delData", row);
    },
    isPass(row) {
      this.passForm.uid = row.uid;
      this.dialogPassVisible = true;
    },
    sendPass() {
      this.$emit("updataPass", this.passForm);
      this.dialogPassVisible = false;
    },
  },

  data() {
    return {
      newHtml: "",
      dialogFormData: {},
      dialogFormVisible: false,
      dialogPassVisible: false,
      passForm: { uid: "", pass: "" },
      TableHeader: [],
      imageUrl: "",
    };
  },

  async created() {
    this.TableHeader = JSON.parse(JSON.stringify(this.header));
  },
};
</script>

<style lang='scss' scoped>
.table {
  width: 1000px;
  margin: auto;
  margin-top: 40px;
  padding: 10px;
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
  .el-button {
    margin: 0 3px;
  }
}
</style>