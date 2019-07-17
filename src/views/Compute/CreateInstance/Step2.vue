<template>
  <div>
    <div class="table-operator" style="margin-bottom: 16px; margin-left: 16px; text-align: left;">
      <span style="margin-bottom: 16px; ">私有网络：保证租户之间 100% 隔离的专属网络，推荐使用。</span>
      <a-button type="primary" @click="handleCreate" style="margin-right: 10px;" icon="plus">新建</a-button>
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
        {{ id.substring(0, 8) }}
      </template>
    </a-table>
    
    <create-network  />
  </div>
</template>
<script>
import { getNetworkList } from '@/api/network/network'
import subnet from '@/i18n/zh/subnet';
import CreateNetwork from '@/views/Network/Subnet/Modal/Create';
const statusDicts = subnet.subnet.status

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
  },
  {
    title: "状态",
    dataIndex: "adminState_zh"
  },
];
export default {
  components: { CreateNetwork },
  mounted() {
    this.fetch();
  },
  data() {
    return {
      columns,
      module: 'compute',
      id: 'createInstance',
      loading: false,
      showCreateNetwork: false,

      data: [],
      allData: [],
      pagination: {},
      initPagination: {
        total: 0,     // 数据个数
        current: 1,   // 当前页码
        pageSize: 10, // 每页显示数量
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
      },
      selectedNetworkRowKeys: [],
    };
  },
  methods: {
    handleRefresh () {
      this.fetch();
    },
    handleCreate () {
      this.$store.commit(`${this.id}/toggleModalVisible`, 'create');
    },
    __handleTransformToZh (status) {
      return statusDicts[status.toLowerCase()] || status
    },
    getCurrPageData () {
      const { total, current, pageSize  } = this.pagination;
      const begin = (current - 1) * pageSize;
      const end = current * pageSize;

      setTimeout(() => {
        this.data = this.allData.slice( begin, end );
        this.loading = false;
      }, 100);
    },
    handleTableChange(pagination) {
      this.loading = true;
      this.pagination = Object.assign({}, this.pagination, pagination);
      this.getCurrPageData();
    },
    async fetch(payload={}) {
      this.loading = true;
      try {
        const resp = await getNetworkList(payload);
        /**
         *  isRouterExternal:
            type: boolean
            description: 是否为外部路由
         */
        this.allData = resp.data
          .filter(item => !item.isRouterExternal && item.adminState.toLowerCase() === 'up' )
          .map(item => {
            return Object.assign(item, {
              adminState_zh: this.__handleTransformToZh(item.adminState),
            })
          })
        this.pagination = Object.assign({}, this.initPagination, { total: this.allData.length });
        this.getCurrPageData();
      } catch (err) {

      } finally {
        this.loading = false;
      }
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
