<template>
  <div class="box">
    <ul>
      <li
        v-for="item in data"
        :class="{ on: carouselVal === item.id }"
        :key="item.id"
        @click="clickCarousel(item.id)"
      >
        <img :src="BaseUrl + '/' + item.img" alt="" srcset="" />
        <router-link :to="{ name: 'BookItem', params: { id: item.id } }">{{
          item.title
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: { ...mapState(["BaseUrl"]) },
  data() {
    return {
      carouselVal: 1,
      carouselLock: false,
      data: [
        {
          id: 1,
          name: "三国演义",
          title: "三国演义",
        },
        {
          id: 2,
          name: "三国演义",
          title: "三国演义",
        },
        {
          id: 3,
          name: "三国演义",
          title: "三国演义",
        },
        {
          id: 4,
          name: "三国演义",
          title: "三国演义",
        },
      ],
    };
  },
  methods: {
    clickCarousel(id) {
      if (this.carouselLock) {
        return;
      }
      this.carouselLock = true;
      this.carouselVal = id;
      setTimeout(() => {
        this.carouselLock = false;
      }, 400);
    },
  },
  async created() {
    const res = await this.$api.getHomeBook();
    if (res.data.data) {
      this.data = res.data.data;
      this.carouselVal = res.data.data[0].id;
    }
  },
};
</script>

<style lang='scss' scoped>
.box {
  width: 1200px;
  margin: auto;
  margin: 30px 0;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    li {
      width: 120px;
      height: 300px;
      background: aqua;
      border-radius: 15px;
      transition: 0.4s ease-in;
      position: relative;
      overflow: hidden;
      box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.2);
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      a {
        display: none;
        width: 100%;
        position: absolute;
        text-align: center;
        line-height: 40px;
        color: #fff;
        height: 40px;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0.3)
        );
        left: 0;
        bottom: 0;
        &:hover {
          color: red;
        }
      }
    }
    .on {
      width: 600px;
      a {
        display: block;
      }
    }
  }
}
</style>