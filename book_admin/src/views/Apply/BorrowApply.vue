<template>
  <div>
    <div class="search">
      <SearchItem @search="search" @getData="getData" />
    </div>
    <div class="table">
      <TableItem
        :options="options"
        @upData="upData"
        :header="header"
        :resData="resData"
      />
    </div>
    <div class="page">
      <PageItem
        @setPage="setPage"
        :page="page"
        :total="total"
        @getData="getData"
      />
    </div>
  </div>
</template>

<script>
import SearchItem from "@/components/SearchItem.vue";
import TableItem from "@/components/TableItem.vue";
import PageItem from "@/components/PageItem.vue";
export default {
  components: { SearchItem, TableItem, PageItem },
  data() {
    return {
      total: 1,
      page: this.$route.query.page || 1,
      searchVal: this.$route.query.search || "",
      header: [
        { name: "id", type: "id" },
        { name: "用户", type: "user" },
        { name: "书籍", type: "book" },
        { name: "时间", type: "date" },
        { name: "状态", type: "state" },
      ],
      options: [
        {
          value: "申请借阅",
          label: "申请借阅",
        },
        {
          value: "拒绝借阅申请",
          label: "拒绝借阅申请",
        },
        {
          value: "待取书",
          label: "待取书",
        },
        {
          value: "借阅中",
          label: "借阅中",
        },
        {
          value: "申请还书",
          label: "申请还书",
        },
        {
          value: "待还书",
          label: "待还书",
        },
        {
          value: "拒绝还书申请",
          label: "拒绝还书申请",
        },
        {
          value: "已归还",
          label: "已归还",
        },
      ],
      resData: [],
    };
  },
  methods: {
    search(val) {
      this.searchVal = val;
      this.$router.push({ query: { search: val } });
    },
    setPage(val) {
      this.page = val;
      console.log(this.page);
      if (this.searchVal != "") {
        this.$router.push({ query: { search: this.searchVal, page: val } });
        return;
      }
      this.$router.push({ query: { page: val } });
    },
    async getData() {
      let searchData = {
        search: this.searchVal,
        page: this.page,
      };
      const res = await this.$api.getBorrow({ ...searchData });
      this.resData = JSON.parse(JSON.stringify(res.data.data));
      this.total = res.data.total;
    },
    async upData(form) {
      if (form.state) {
        form.stateType = 3;
        if (form.state === "申请借阅") {
          form.stateType = 1;
        }
        if (form.state === "申请还书") {
          form.stateType = 2;
        }
      }
      const res = await this.$api.updataApply(form);
      await this.getData();
      if (res.data.mode === "ok") {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
        return;
      }
    },
  },

  async created() {
    this.getData();
  },
};
</script>

<style>
</style>