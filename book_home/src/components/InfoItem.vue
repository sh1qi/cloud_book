<template>
  <div class="box">
    <div class="left">
      <ul>
        <li v-for="item in data" :key="item.id">
          <routerLink :to="{ name: 'NoticeItem', params: { id: item.id } }">{{
            item.title
          }}</routerLink>
        </li>
      </ul>
    </div>
    <div class="right">
      <img src="@/assets/img/banner.jpg" alt="" srcset="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          title: "五一假期五一假期五一假期五一假期五一假期五一假期",
          id: 1,
          date: "2020/3/22",
        },
        {
          title: "五一假期五一假期五一假期五一假期",
          id: 2,
          date: "2020/3/22",
        },
        {
          title: "五一假五一假期五一假期期",
          id: 3,
        },
        {
          title: "开发五一假期五一假期通知",
          id: 4,
        },
        {
          title: "五五一假期一假期",
          id: 5,
        },
        {
          title: "开发五一假期五一假期通知",
          id: 6,
        },
        {
          title: "五一假期五一假期假期",
          id: 7,
        },
        {
          title: "开发通知",
          id: 8,
          date: "2020/3/22",
        },
      ],
    };
  },
  async created() {
    const res = await this.$api.getNotice({ page: 1 });
    console.log(res);
    this.data = res.data.data;
  },
};
</script>

<style lang='scss' scoped>
.box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .left {
    width: 600px;
    padding: 20px;
    border-radius: 15px;
    background: white;
    box-shadow: 0px 0px 10px rgba($color: #000000, $alpha: 0.2);
    ul {
      li {
        width: 600px;
        line-height: 35px;
        a {
          color: #333;
          display: inline-block;
          width: 500px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &:hover {
            color: red;
          }
        }
      }
    }
  }
  .right {
    width: 500px;
    height: 420px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0px 0px 10px rgba($color: #000000, $alpha: 0.2);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>