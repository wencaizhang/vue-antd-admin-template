<template>
  <div>
    <PageLayout>
      <div slot="header">
        <p>如果您使用的是 Linux 主机，强烈建议使用 SSH 公钥/私钥 （Keypair）进行远程登录身份验证。您可以创建一个 SSH 密钥，并立刻下载其私钥。请保管好私钥，因为 YPCloud 是不保存您的私钥的。</p>
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
                    <a-menu-item key="1">删除</a-menu-item>
                    <a-menu-item key="2">绑定标签</a-menu-item>
                  </a-menu>
                  <a-button type="primary" style="margin-left: 8px">批量操作
                    <a-icon type="down"/>
                  </a-button>
                </a-dropdown>
              </a-row>
            </a-col>
            <a-col>
              <a-row type="flex" justify="space-between"></a-row>
            </a-col>
          </a-row>
        </div>
        <a-alert type="info" showIcon style="margin-bottom: 16px;">
          <div slot="message">
            已选择&nbsp;
            <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>&nbsp;&nbsp;项
            <a style="margin-left: 24px" @click="onClearSelected">清空</a>
          </div>
        </a-alert>
        <a-table
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :columns="columns"
          :rowKey="record => record.login.uuid"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <template slot="operation" slot-scope="text, record">
            <a-button type="primary" icon="edit">修改</a-button>
          </template>
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
      <p>
        您已选择了秘钥
        <span style="color: #ff4d4f;">“test-keypair”</span>，请确认你的操作，
      </p>
      <p>删除前请确认你已经备份该秘钥，或者确定已不再使用该秘钥。</p>
    </a-modal>
    <tag-modal :visible="showTagModal" v-on:cancel="showTagModal = false;" />
  </div>
</template>

<script>
import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
import TagModal from "./TagModal";
import ImportModal from "./ImportModal";
import PageLayout from "@/components/Layout/PageLayout.vue";
const columns = [
  {
    title: "名称",
    dataIndex: "name.first"
  },
  {
    title: "创建时间",
    dataIndex: "phone"
  },
  {
    title: "加密方法",
    dataIndex: "id.name"
  },
  {
    title: "所属项目",
    dataIndex: "id.value"
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

export default {
  components: {
    CreateModal,
    EditModal,
    TagModal,
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
      showTagModal: false,
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
    handleMenuClick({ key }) {
      console.log(`Click on item ${key}`);
      switch (key) {
        case "1":
          // 删除
          this.showDeleteModal = true;
          console.log(`Click on item ${key}`);
          break;
        case "2":
          // 打标签
          this.showTagModal = true;
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
    onClearSelected() {
      this.selectedRowKeys = [];
    },

    // 删除弹框
    handleDeleteModalOk() {}
  }
};
</script>

<style>
.ant-tabs-bar {
  margin: 0;
}
</style>