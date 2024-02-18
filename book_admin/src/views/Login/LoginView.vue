<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/img/banner.jpg" alt="" />
    </div>

    <div class="form">
      <h3>账户登录</h3>
      <el-form
        :model="userForm"
        status-icon
        :rules="rules"
        ref="userForm"
        label-width="100px"
      >
        <el-form-item label="账户" prop="user">
          <el-input
            type="user"
            v-model="userForm.user"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="userForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      userForm: {
        user: "",
        pass: "",
      },
      rules: {
        user: [{ validator: validateUser, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations(["setToken", "setName"]),
    async submitForm() {
      const res = await this.$api.login(this.userForm);
      if (res.data.error) {
        this.$message.error(res.data.error);
        return;
      }
      this.setToken(res.data.token);
      this.setName(res.data.name);
      this.$message({
        message: "登录成功",
        type: "success",
      });
      this.$router.push({ name: "HomeView" });
    },
    resetForm(form) {
      this.$refs[form].resetFields();
    },
  },
};
</script>

<style lang='scss' scoped='scoped'>
.login {
  width: 800px;
  height: 400px;
  box-shadow: 0 2px 10px rgba($color: #000000, $alpha: 0.6);
  position: absolute;
  background: #fff;
  left: 50%;
  top: 50%;
  transform: translateX(-400px) translateY(-300px);
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  .logo {
    width: 300px;
    height: 400px;
    &::before {
      content: "";
      position: absolute;
      width: 300px;
      height: 400px;
      background: radial-gradient(rgba(0, 0, 0, 0), #000);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .form {
    width: 500px;
    h3 {
      text-align: center;
      font-size: 30px;
      padding: 10px 0;
    }
    .el-input {
      width: 300px;
    }
  }
}
</style>