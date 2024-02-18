<template>
  <div class="home">
    <div class="menu">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" srcset="" />
      </div>
      <div class="userTag">你好，{{ name }}</div>
      <ul>
        <li>
          <router-link
            :class="{ on: onRouter === 'HomeView' }"
            :to="{ name: 'HomeView' }"
            >首页</router-link
          >
        </li>
        <li>
          <router-link
            :class="{ on: onRouter === 'BookView' }"
            :to="{ name: 'BookView' }"
            >书籍管理</router-link
          >
        </li>
        <li>
          <router-link
            :class="{ on: onRouter === 'UserView' }"
            :to="{ name: 'UserView' }"
            >用户管理</router-link
          >
        </li>
        <li>
          <router-link
            :class="{ on: onRouter === 'ApplyView' }"
            :to="{ name: 'ApplyView' }"
            >借阅管理</router-link
          >
        </li>
        <li>
          <router-link
            :class="{ on: onRouter === 'NoticeView' }"
            :to="{ name: 'NoticeView' }"
            >通知管理</router-link
          >
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="top">私有云后台管理系统</div>
      <div class="view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: { ...mapState(["name"]) },
  data() {
    return {
      onRouter: "",
    };
  },
  watch: {
    $route: "getRoute",
  },
  methods: {
    getRoute() {
      this.onRouter = this.$route.name;
    },
  },
};
</script>

<style lang='scss' scoped>
.home {
  display: flex;
  .menu {
    width: 400px;
    min-width: 400px;
    height: 100vh;
    min-height: 800px;
    background-color: white;
    position: fixed;
    z-index: 1000;
    box-shadow: 3px 3px 10px rgba($color: #000000, $alpha: 0.1);
    .logo {
      padding-top: 40px;
      width: 240px;
      height: 120px;
      margin: auto;
      margin-bottom: 20px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .userTag {
      text-align: center;
    }
    ul {
      width: 100%;
      margin-top: 20px;
      li {
        width: 100%;
        line-height: 60px;
        text-align: center;
        transition: 0.3s ease-in;
        a {
          color: #333;
        }
        .on {
          color: #52afe6 !important;
          font-size: 16px;
        }
        &:hover {
          transform: scale(1.2);
          a {
            color: red;
          }
        }
      }
    }
  }
  .content {
    width: calc(100% - 400px);
    margin-left: 400px;
    min-width: 1100px;
    height: 100vh;
    .top {
      width: 100%;
      line-height: 80px;
      text-align: center;
      background-color: #333;
      color: white;
      box-shadow: 3px 3px 10px rgba($color: #000000, $alpha: 0.1);
    }
    .view {
      max-width: 1500px;
      margin: auto;
      margin-top: 30px;
      background: #fff;
      padding: 30px 0;
      border-radius: 5px;
    }
  }
}
</style>