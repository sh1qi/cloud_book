<template>
  <div class="item">
    <div class="backdrop"></div>
    <div class="box">
      <div class="user">
        <div class="pic">
          <img :src="BaseUrl + '/' + pic" alt="" />
        </div>
        <div class="name">{{ name }}</div>
        <div class="btn">
          <el-button @click="dialogFormVisible = true" type="primary"
            >修改信息</el-button
          >
          <el-button @click="dialogPassVisible = true" type="primary"
            >修改密码</el-button
          >
        </div>
      </div>
      <div class="borrow">
        <div class="title">借阅详情</div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="借阅日期" width="180">
          </el-table-column>
          <el-table-column prop="book" label="书名" width="180">
          </el-table-column>
          <el-table-column prop="bid" label="书籍编号" width="180">
          </el-table-column>
          <el-table-column prop="state" label="借阅状态"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.state === '借阅中'"
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >发起归还申请</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            hide-on-single-page
            layout="prev, pager, next"
            :page-size="4"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>

    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
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
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="upData()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="dialogPassVisible"
      ><el-input v-model="pass" autocomplete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPassVisible = false">取 消</el-button>
        <el-button type="primary" @click="upPass()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["name", "pic", "phone", "uid", "BaseUrl", "apply"]),
  },
  data() {
    return {
      total: 0,
      page: 1,
      imageUrl: "",
      form: {
        name: "",
        pic: "",
        phone: "",
      },
      pass: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogPassVisible: false,
      tableData: [],
    };
  },

  methods: {
    ...mapMutations([
      "setToken",
      "setIsLogin",
      "setName",
      "setPhone",
      "setPic",
    ]),
    handleAvatarSuccess(res, file) {
      console.log("res", res);
      console.log("file", file);
      this.imageUrl = res.fileName;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTable();
    },
    async handleClick(row) {
      const res = await this.$api.newBacktrac({ id: row.id });
      if (res.data.mode === "ok") {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
        row.state = "申请正在发起中";
      }
    },
    async upData() {
      this.form.pic = this.imageUrl;
      const sendData = {
        ...JSON.parse(JSON.stringify(this.form)),
        uid: this.uid,
      };
      const res = await this.$api.updataUser(sendData);
      if (res.data.mode === "ok") {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
        this.setPic(this.form.pic);
        this.setName(this.form.name);
        this.setPhone(this.form.phone);
      }
      this.dialogFormVisible = false;
    },
    getTable() {
      let first = (this.page - 1) * 4;
      let last = this.page * 4;
      console.log(first, last);
      this.tableData = JSON.parse(this.apply).data.slice(first, last);
      for (const item of this.tableData) {
        console.log(item);
        for (const key in item) {
          if (key === "date") {
            item[key] = new Date(item[key]).toLocaleDateString();
          }
        }
      }
      console.log(this.tableData);
    },
    async upPass() {
      const sendData = {
        pass: this.pass,
        uid: this.uid,
      };
      const res = await this.$api.updataUserPass(sendData);
      console.log(res);
      this.$message({
        message: res.data.msg,
        type: "success",
      });
      this.$message({
        message: "修改密码成功,请重新登录",
        type: "success",
      });
      const isNo = false;
      this.setToken(isNo);
      this.setIsLogin(isNo);
      this.dialogPassVisible = false;
      this.$$router.push({ name: "LoginView" });
    },
  },
  created() {
    this.form.pic = this.pic;
    this.form.name = this.name;
    this.form.phone = this.phone;
    this.imageUrl = this.pic;
    this.total = JSON.parse(this.apply).total;
    this.getTable();
  },
};
</script>

<style lang='scss' scoped>
.item {
  width: 100%;
  .backdrop {
    width: 100%;
    height: 250px;
    background: #36466e;
  }
  .box {
    width: 1600px;
    margin: auto;
    display: flex;
    justify-content: space-around;
    margin-top: -150px;
    margin-bottom: 50px;
    .user {
      width: 500px;
      height: 400px;
      padding: 20px;
      border-radius: 20px;
      background: #fff;
      box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.2);
      .pic {
        width: 200px;
        height: 200px;
        overflow: hidden;
        border-radius: 10px;
        margin: auto;
        margin-top: 30px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .name {
        font-size: 22px;
        text-align: center;
        margin: 20px 0;
      }
      .btn {
        text-align: center;
      }
    }
    .borrow {
      width: 900px;
      height: 400px;
      padding: 20px;
      border-radius: 20px;
      background: #fff;
      box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.2);
      .title {
        margin-bottom: 20px;
      }
      .page {
        margin-top: 30px;
      }
    }
  }
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
}
</style>