<template>
  <div class="enrol">
    <div class="title">用户注册</div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="uid">
        <el-input v-model="ruleForm.uid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.number="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      let reg_tel =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      if (!reg_tel.test(value)) {
        return callback(new Error("请正确填写你的手机号"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      let reg_tel = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/;
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      if (!reg_tel.test(value)) {
        return callback(
          new Error("密码必须由数字、字母两种字符组成，长度在8-15位之间")
        );
      } else {
        callback();
      }
    };
    var validateUser = (rule, value, callback) => {
      let reg_tel = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      if (!reg_tel.test(value)) {
        return callback(
          new Error("用户名由4到16位组成，可以使用字母，数字，下划线，减号")
        );
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        uid: "",
        phone: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        uid: [{ validator: validateUser, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.newUser(this.ruleForm);
          if (res.data.mode) {
            this.$message({ message: res.data.msg, type: "success" });
            this.$router.push({ name: "LoginView" });
            return;
          }
          if (res.data.error) {
            this.$message.error(res.data.msg);
            return;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.enrol {
  width: 600px;
  padding: 50px;
  margin: auto;
  margin-top: 100px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.3);
  .title {
    font-size: 24px;
    text-align: center;
    margin: 20px 0;
  }
}
</style>