<template>
  <div>
    <div class="menu">
      <el-select v-model="searchVal.SortVal" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div class="book">
        <span>书本名称：</span>
        <el-input
          v-model="searchVal.bookName"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <el-button type="primary" @click="searchBtn()">搜索</el-button>
    </div>
    <div v-if="total != 0" class="bookBox">
      <div v-for="item in data" :key="item.id" class="bookItem">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="BaseUrl + '/' + item.img" class="image" />
          <div style="padding: 14px">
            <span>{{ item.name }}</span>
            <div class="bottom clearfix">
              <span class="isWriter">{{ item.writer }}</span>
              <el-button type="text" @click="goBook(item.id)" class="button"
                >查看详情</el-button
              >
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div v-else class="nobook">内容为空</div>
    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        :hide-on-single-page="pageHide"
        :page-size="8"
        :pager-count="11"
        :current-page.sync="pageVal"
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["BaseUrl"]),
  },
  data() {
    return {
      pageHide: true,
      pageVal: parseInt(this.$route.query.pageVal) || 1,
      total: 0,
      searchVal: {
        bookName: this.$route.query.bookName || "",
        SortVal: this.$route.query.SortVal || "",
      },
      sendData: {},
      options: [
        {
          value: "history",
          label: "历史",
        },
        {
          value: "literature",
          label: "文学",
        },
        {
          value: "Technology",
          label: "科技",
        },
        {
          value: "novel",
          label: "小说",
        },
        {
          value: "Science",
          label: "科学",
        },
        {
          value: "political",
          label: "政治",
        },
      ],

      data: [],
    };
  },
  methods: {
    async getData() {
      let searchData = {
        search: this.searchVal.bookName,
        page: this.pageVal,
        sort: this.searchVal.SortVal,
      };
      const res = await this.$api.getBook({ ...searchData });
      console.log(res);
      this.data = JSON.parse(JSON.stringify(res.data.data));
      this.total = res.data.total;
    },
    goBook(id) {
      this.$router.push({ name: "BookItem", params: { id: id } });
    },
    searchBtn() {
      this.sendData = JSON.parse(JSON.stringify(this.searchVal));
      this.pageVal = 1;
      this.$router.push({
        query: {
          ...this.sendData,
          pageVal: this.pageVal,
        },
      });
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageVal = val;
      this.getData();
    },
  },
  async created() {
    this.getData();
  },
};
</script>

<style lang='scss' scoped>
.menu {
  width: 1200px;
  margin: auto;
  height: 80px;
  background: #fafafa;
  border-radius: 5px;
  box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.2);
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .book,
  .writer {
    span {
      width: 120px;
      line-height: 40px;
    }
    width: 320px;
    display: flex;
  }
}
.bookBox {
  width: 1200px;
  margin: auto;
  margin-top: 30px;
  gap: 24px;
  .bookItem {
    width: 235  px;
    display: inline-block;
    margin: 20px 30px;
    .image {
      width: 235px;
      height: 235px;
      object-fit: cover;
    }
    .isWriter {
      font-size: 13px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0;
      float: right;
    }
  }
}
.nobook {
  text-align: center;
  width: 1200px;
  height: 600px;
  line-height: 600px;
  font-size: 36px;
  background: #fff;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
}
.page {
  width: 1200px;
  text-align: center;
  margin: auto;
  margin-bottom: 30px;
}
</style>