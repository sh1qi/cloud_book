<template>
  <div>
    <div class="search">
      <SearchItem @search="search" @getData="getData" />
    </div>
    <div class="table">
      <TableItem
        :delBtn="delBtn"
        :passBtn="passBtn"
        @upData="upData"
        :header="header"
        :resData="resData"
        @updataPass="updataPass"
        :pic="true"
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
      passBtn: true,
      delBtn: false,
      total: 1,
      page: this.$route.query.page || 1,
      searchVal: this.$route.query.search || "",
      header: [
        { name: "uid", type: "uid" },
        { name: "昵称", type: "name" },
        { name: "手机号", type: "phone" },
        { name: "头像", type: "pic" },
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
      const res = await this.$api.getUser({ ...searchData });
      this.resData = JSON.parse(JSON.stringify(res.data.data));
      this.total = res.data.total;
    },
    async upData(form) {
      const res = await this.$api.updataUser(form);
      await this.getData();
      if (res.data.mode === "ok") {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
        return;
      }
    },
    async updataPass(form) {
      console.log(form);
      const res = await this.$api.updataUserPass(form);
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