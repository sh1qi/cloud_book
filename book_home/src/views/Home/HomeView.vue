<template>
  <div class="home">
    <div class="header">
      <div class="logo"><img src="@/assets/logo.png" alt="" /></div>
      <nav>
        <ul>
          <li><router-link :to="{ name: 'HomeView' }">首页</router-link></li>
          <li>
            <router-link :to="{ name: 'BookView' }">书籍资源</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'NoticeView' }">全部通知</router-link>
          </li>
        </ul>
      </nav>
      <div v-if="isLogin === true || isLogin !== '2'" class="user">
        <div class="userFace" @click="userMenu = !userMenu">
          <span class="userName">{{ name }}</span> <img :src="BaseUrl + '/' + pic" alt="" />
        </div>
        <div class="userMenu" v-if="userMenu">
          <span @click="goUser()">用户中心</span>
          <span @click="outUser()">退出登录</span>
        </div>
      </div>

      <div v-else class="login">
        <router-link :to="{ name: 'LoginView' }">登录</router-link>
      </div>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
    <div class="footer">私有云图书馆版权所有</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      userMenu: false,
    };
  },
  computed: {
    ...mapState(["isLogin", "uid", "apply", "name", "pic", "BaseUrl"]),
  },
  methods: {
    ...mapMutations(["setApply", "setIsLogin", "setToken"]),
    goUser() {
      this.userMenu = false;
      this.$router.push({ name: "UserView" });
    },
    outUser() {
      this.setToken(false);
      this.setIsLogin("2");
      this.setApply(false);
      console.log(this.isLogin);
      this.$router.push({ name: "HomeView" });
      this.$message({
        message: "账户已退出",
        type: "success",
      });
    },
  },
  async created() {
    console.log(this.isLogin);
    if (this.isLogin === true || this.isLogin === "1") {
      const res = await this.$api.getUserApply({ uid: this.uid });
      this.setApply(JSON.stringify(res.data));
    }
  },
};
</script>

<style lang='scss' scoped>
.home {
  min-width: 1200px;
  .header {
    width: 100%;
    height: 60px;
    padding: 10px 0;
    box-shadow: 3px 3px 10px rgba($color: #000000, $alpha: 0.2);
    background: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .logo {
      height: 60px;
      width: 120px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    nav {
      ul {
        li {
          float: left;
          line-height: 60px;
          padding: 0 20px;
          a {
            color: #333;
            &:hover {
              color: red;
            }
          }
        }
        &::after {
          content: "";
          clear: both;
        }
      }
    }
    .user {
      cursor: pointer;
      .userFace {
        height: 50px;
        width: 120px;
        line-height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        transition: 0.3s all;
        position: relative;
        box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.3);
        .userName{
          width:50px;
          white-space: nowrap;
          overflow: hidden;
          text-align: center;
          font-size: 14px;
        }
        img {
          width: 40px;
          height: 40px;
          object-fit: cover;
        }
        &:hover {
          background: #f1f1f1;
        }
      }
      .userMenu {
        width: 120px;
        height: 80px;
        position: absolute;
        background: #2da5d4;
        z-index: 10000;
        span {
          display: block;
          text-align: center;
          line-height: 40px;
        }
      }
    }
    .login {
      line-height: 60px;
    }
  }
  .container {
    width: 100%;
  }
  .footer {
    background: white;
    height: 60px;
    line-height: 60px;
    text-align: center;
    width: 100%;
  }
}
</style>