<template>
  <div class="isHome">
    <div class="cardItem">
      <div class="newBook">
        <router-link :to="{ name: 'NewBookItem' }">添加新的书籍</router-link>
      </div>
      <div class="newNotice">
        <router-link :to="{ name: 'NewNoticeItem' }">添加新的通知</router-link>
      </div>
      <div class="newBorrow">
        <router-link :to="{ name: 'BorrowApply' }"
          >有新的借阅申请：{{ borrowLen }}条</router-link
        >
      </div>
      <div class="newBacktrack">
        <router-link :to="{ name: 'BacktrackApply' }"
          >有新的还书申请：{{ backtrackLen }}条</router-link
        >
      </div>
    </div>
    <div class="viewItem">
      <div id="sortView" class="sortView"></div>
      <div id="borrowView" class="borrowView"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aqqlyeLen: 0,
      backtrackLen: 0,
      borrowLen: 0,
      sortLen: [],
      sortVal: [],
    };
  },
  async mounted() {
    const res = await this.$api.getHome();
    this.backtrackLen = res.data.backtrackLen;
    this.borrowLen = res.data.borrowLen;
    this.aqqlyeLen = res.data.aqqlyeLen;

    for (const item of res.data.sortLen) {
      this.sortLen.push(item.len);
      this.sortVal.push(item.label);
    }

    let sortView = this.$echarts.init(document.getElementById("sortView"));
    sortView.setOption({
      title: {
        text: "书籍数量",
      },
      tooltip: {},
      xAxis: {
        data: this.sortVal,
      },
      yAxis: {},
      series: [
        {
          name: "数量",
          type: "bar",
          data: this.sortLen,
        },
      ],
    });

    let borrowView = this.$echarts.init(document.getElementById("borrowView"));
    borrowView.setOption({
      series: [
        {
          type: "pie",
          data: [
            {
              value: this.aqqlyeLen - (this.backtrackLen + this.borrowLen),
              name: "已处理请求",
            },
            {
              value: this.backtrackLen + this.borrowLen,
              name: "未处理请求",
            },
          ],
        },
      ],
    });
  },
};
</script>

<style lang='scss' scoped>
.isHome {
  width: 100%;
  .cardItem {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    div {
      width: 220px;
      height: 120px;
      line-height: 120px;
      background-image: url("@/assets/img/card.jpg");
      background-size: 220px;
      background-position: 0 0;
      border-radius: 25px;
      text-align: center;
      transition: 0.3s ease-in;
      box-shadow: 3px 3px 10px rgba($color: #000000, $alpha: 0.2);
      a {
        color: #fff;
      }
      &:hover {
        background-position: 0 -100px;
      }
    }
  }
  .viewItem {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    .sortView {
      width: 700px;
      height: 400px;
      padding: 20px;
      margin: 0 30px 20px;
      background-color: #fff;
      box-shadow: 3px 3px 10px rgba($color: #000000, $alpha: 0.2);
    }
    .borrowView {
      padding: 20px;
      width: 600px;
      height: 400px;
      margin: 0 30px;
      background-color: #fff;
      box-shadow: 3px 3px 10px rgba($color: #000000, $alpha: 0.2);
    }
  }
}
</style>