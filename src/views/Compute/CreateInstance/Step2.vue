<template>
  <div>
    <div class="table-operator" style="margin-bottom: 16px; margin-left: 16px; text-align: left;">
      <span style="margin-bottom: 16px; ">私有网络：保证租户之间 100% 隔离的专属网络，推荐使用。</span>
      <a-button type="primary" style="margin-right: 10px;" icon="plus">新建</a-button>
    </div>
    <a-alert type="info" showIcon style="margin-bottom: 16px; text-align: left;">
      <div slot="message">
        已选择&nbsp;
        <a style="font-weight: 600">{{ selectedNetworkRowKeys.length }}</a>&nbsp;&nbsp;项
        <a style="margin-left: 24px" @click="onNetworkClearSelected">清空</a>
      </div>
    </a-alert>
    <a-table
      :rowSelection="{selectedRowKeys: selectedNetworkRowKeys, onChange: onNetworkSelectChange}"
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
    ></a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "ID",
    dataIndex: "cell"
  },
  {
    title: "名称",
    dataIndex: "name.first"
  },
  {
    title: "子网",
    dataIndex: "login.password"
  },
  {
    title: "类型",
    dataIndex: "id"
  }
];
export default {
  mounted() {
    this.fetch();
  },
  data() {
    return {
      data: [],
      columns,
      loading: false,
      pagination: {
        showSizeChanger: true
      },
      selectedNetworkRowKeys: [],
    };
  },
  methods: {
    handleSubmit() {
      // 网络需要单独处理
      if (!this.selectedNetworkRowKeys.length) {
        this.$message.warn("请至少选择一个私有网络");
        return false;
      }
      this.$emit("next", {
        step3: Object.assign({}, {
          selectedNetworkRowKeys: this.selectedNetworkRowKeys
        })
      });
    },
    onNetworkSelectChange(selectedRowKeys) {
      this.selectedNetworkRowKeys = selectedRowKeys;
    },
    onNetworkClearSelected() {
      this.selectedNetworkRowKeys = [];
    },
    fetch(params = {}) {
      this.loading = true;
      let url = "demo";
      this.$http
        .get(url, {
          params: {
            results: 10,
            ...params
          }
        })
        .then(data => {
          const pagination = { ...this.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = 200;
          this.loading = false;
          this.data = data.results;
          this.pagination = pagination;
        });
    }
  }
};
</script>
<style>
</style>