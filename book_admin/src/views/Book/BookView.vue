<template>
  <div>
    <div class="search">
      <SearchItem @search="search" @getData="getData" />
    </div>
    <div class="table">
      <TableItem
        :options="options"
        @upData="upData"
        @delData="delData"
        :header="header"
        :resData="resData"
        :delBtn="delBtn"
        :img="true"
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
      delBtn: true,
      total: 1,
      page: this.$route.query.page || 1,
      searchVal: this.$route.query.search || "",
      header: [
        { name: "id", type: "id" },
        { name: "书名", type: "name" },
        { name: "作者", type: "writer" },
        { name: "分类", type: "sort" },
        { name: "封面", type: "img" },
        { name: "分区", type: "area" },
      ],
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
      const res = await this.$api.getBook({ ...searchData });
      this.resData = JSON.parse(JSON.stringify(res.data.data));
      this.total = res.data.total;
    },
    async upData(form) {
      const res = await this.$api.updataBook(form);
      await this.getData();
      if (res.data.mode === "ok") {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
        return;
      }
    },
    async delData(form) {
      console.log(form);
      const res = await this.$api.delBook(form);
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