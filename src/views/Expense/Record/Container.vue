<template>
  <div>
    <PageLayout>
      <div slot="header" >
        <p>子网即租户的私有网络（Vxnet）用于主机之间互联，它类似物理世界中使用交换机（L2Switch）组成的局域网。不同用户的私有网络之间是100%隔离的。私有网络可以作为子网加入到 路由器的端口上进而与互联网打通。</p>
      </div>
      <div class="content">
        <div class="table-operator" style="margin-bottom: 16px;">
          <a-row type="flex" justify="space-between">
            <a-col>
              <a-row type="flex" justify="space-between">
                <create-modal/>
                <import-modal v-bind:obj="obj"/>
                <a-dropdown>
                  <a-menu slot="overlay" @click="handleMenuClick">
                    <a-menu-item key="1">修改</a-menu-item>
                    <a-menu-item key="2">删除</a-menu-item>
                    <a-menu-item key="3">绑定标签</a-menu-item>
                  </a-menu>
                  <a-button type="primary" style="margin-left: 8px">批量操作
                    <a-icon type="down"/>
                  </a-button>
                </a-dropdown>
              </a-row>
            </a-col>
            <a-col>
              <a-row type="flex" justify="space-between">

              </a-row>
            </a-col>
          </a-row>
        </div>
        <a-alert type="info" showIcon style="margin-bottom: 16px;">
          <div slot="message">
            已选择&nbsp;
            <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>&nbsp;&nbsp;项
            <a style="margin-left: 24px" @click="handleClearSelected">清空</a>
          </div>
        </a-alert>
        <a-table
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :columns="columns"
          :rowKey="record => record.id"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
        </a-table>
      </div>
    </PageLayout>
    <a-modal
      title="删除秘钥对"
      okText="删除"
      okType="danger"
      :visible="showDeleteModal"
      :confirmLoading="confirmLoading"
      @ok="handleDeleteModalOk"
      @cancel="showDeleteModal = false;"
    >
      <p>您已选择了秘钥 <span style="color: #ff4d4f;">“test-keypair”</span>，请确认你的操作，</p>
      <p>删除前请确认你已经备份该秘钥，或者确定已不再使用该秘钥。</p>
    </a-modal>
  </div>
</template>

<script>
import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
import ImportModal from "./ImportModal";
import PageLayout from "@/components/Layout/PageLayout.vue";
const columns = [
  {
    title: "ID",
    dataIndex: "phone",
  },
  {
    title: "名称",
    dataIndex: "name.first"
  },
  {
    title: "状态",
    dataIndex: "id"
  },
  {
    title: "外部网络",
    dataIndex: "id"
  },
  {
    title: "可用域",
    dataIndex: "name.last"
  },
];

export default {
  components: {
    CreateModal,
    EditModal,
    ImportModal,
    PageLayout
  },
  mounted() {
    // this.fetch();
  },
  data() {
    return {
      tabKey: 1,
      confirmLoading: false,
      showDeleteModal: false,
      obj: {
        名称: "aaa1231313aaa",
        描述: "bbbb",
        最低内存: "dddddd",
        最小磁盘: "ccccc",
        镜像格式: "Yiminghe"
      },
      data: [],
      pagination: {
        showSizeChanger: true
      },
      loading: false,
      columns,
      selectedRowKeys: []
    };
  },
  computed: {
    message() {
      let len = this.selectedRowKeys.length;
      return `已选择 ${len} 项`;
    }
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },
    handleMenuClick ({ key }) {
      console.log(`Click on item ${key}`);
      switch (key) {
        case '1':
          
          break;
        case '2':
          this.showDeleteModal = true;
      console.log(`Click on item ${key}`);
          break;
        case '3':
          
          break;
      
        default:
          break;
      }
    },

    fetch(params = {}) {
      this.loading = true;
      let url = "https://randomuser.me/api";
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
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    handleClearSelected() {
      this.selectedRowKeys = [];
    },

    // 删除弹框
    handleDeleteModalOk () {},
  }
};
</script>

<style>
.ant-tabs-bar {
  margin: 0;
}
</style>