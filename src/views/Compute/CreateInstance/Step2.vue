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
      @change="handleTableChange"
      :rowSelection="{selectedRowKeys: selectedNetworkRowKeys, onChange: onNetworkSelectChange}"
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      :hideDefaultSelections="false"
    >
      <template slot="id" slot-scope="id">
        {{ id.substr(0, 8) }}
      </template>
    </a-table>
  </div>
</template>
<script>
import { getNetworkList } from '@/api/network/subnet'
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    scopedSlots: { customRender: "id" }
  },
  {
    title: "名称",
    dataIndex: "name"
  },
  {
    title: "子网",
    dataIndex: "connectedSubnet"
  },
  {
    title: "类型",
    dataIndex: "type"
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
      pagination: {},
      paginationConfig: {
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40', '50']
      },
      selectedNetworkRowKeys: [],
    };
  },
  methods: {
    async fetch(payload={}) {
      this.loading = true;
      try {
        const resp = await getNetworkList(payload);
        /**
         *  routerExternal:
            type: integer
            format: int32
            description: 是否为外部路由[0:否 1:是]
         */
        this.data = resp.data.filter(item => item.routerExternal === 0);
        // 数据只有一页时不显示分页
        this.pagination = Object.assign({}, this.paginationConfig, { total: resp.count });
      } catch (err) {

      } finally {
        this.loading = false;
      }
    },
    handleTableChange({ current, pageSize, },) {
      this.fetch({
        pageSize,
        pageIndex: current,
      });
    },
    handleSubmit() {
      return new Promise((resolve, reject) => {
        if (!this.selectedNetworkRowKeys.length) {
          this.$message.warn("请至少选择一个私有网络");
          reject(err)
        }
        resolve(Object.assign({}, {
          network: this.selectedNetworkRowKeys
        }))
      })
    },
    onNetworkSelectChange(selectedRowKeys) {
      if (selectedRowKeys.length > 2) {
        this.$message.warn('最多可以选择两个网络')
      } else {
        this.selectedNetworkRowKeys = selectedRowKeys;
      }
    },
    onNetworkClearSelected() {
      this.selectedNetworkRowKeys = [];
    },
  }
};
</script>
<style>
</style>
