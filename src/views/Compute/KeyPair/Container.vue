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
                <create-modal v-on:showDownload="showDownloadModal=true;"/>
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
          :rowKey="record => record.cell"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <template slot="operation" slot-scope="text, record">
            <a-dropdown style="margin-right: 10px;">
              <a-menu slot="overlay" @click="handleSingleMenuClick(record, $event)">
                <a-menu-item key="1">修改</a-menu-item>
                <a-menu-item key="2" :disabled="record | downloadable">下载</a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px">操作
                <a-icon type="down"/>
              </a-button>
            </a-dropdown>
          </template>
        </a-table>
      </div>
    </PageLayout>
    <a-modal
      title="下载密钥对"
      okText="下载"
      :visible="showDownloadModal"
      :confirmLoading="confirmLoading"
      @ok="handleDownloadModalOk"
      @cancel="showDownloadModal = false;"
    >
      <p>通过点击“下载”按钮，可以获取私钥，此下载链接将保留5分钟。</p>
    </a-modal>
    <tag-modal :visible="showTagModal" v-on:cancel="showTagModal = false;"/>
    <edit-modal :visible="showEditModal" v-on:cancel="showEditModal = false;"/>
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
    this.fetch();
  },
  data() {
    return {
      tabKey: 1,
      confirmLoading: false,
      showTagModal: false,
      showEditModal: false,
      showDownloadModal: false,
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
  filters: {
    downloadable(record) {
      return Math.random() > 0.5;
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
    handleBatchDelete() {
      const vm = this;
      const h = this.$createElement;
      const vnode = h(
        "ul",
        this.selectedRowKeys.map(item => {
          return h("li", item);
        })
      );

      // 批量删除
      this.$confirm({
        title:
          "您已经选择了下列密钥，删除前请确认你已经备份该秘钥，或者确定已不再使用该秘钥。",
        content: vnode,
        iconType: "warning",
        okText: "删除",
        okType: "danger",
        // content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(resolve, 1000);
          })
            .then(() => {
              const indexs = vm.selectedRowKeys.map(key => {
                return vm.data.findIndex(item => item.cell == key);
              });
              vm._deleteData(indexs);
            })
            .catch(() => console.log("Oops errors!"));
        },
        onCancel() {}
      });
    },
    handleMenuClick({ key }) {
      // 批量操作
      if (this.selectedRowKeys.length === 0) {
        this.$message.info("请先选择您要操作的实例");
        return;
      }
      switch (key) {
        case "1":
          // 删除
          this.handleBatchDelete();
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
    handleDeleteModalOk() {},
    handleEdit(record) {
      console.log(record);
      this.showEditModal = true;
    },
    handleDownload(record) {
      console.log(record);
      this.showDownloadModal = true;
    },
    handleDownloadModalOk() {
      this.showDownloadModal = false;
    },
    handleSingleMenuClick(record, { key }) {
      console.log(record, key);
      switch (key) {
        case "1":
          this.showEditModal = true;
          break;
        case "2":
          this.showDownloadModal = true;
          break;

        default:
          break;
      }
    },
    _deleteData(indexs = []) {
      if (!indexs.length) return;
      // 数组删除一个元素之后，索引会发生变化。所以要对删除目标的索引进行处理。
      const parseIndexs = indexs.map((item, index) => item - index);
      const keys = parseIndexs.map(index => {
        const key = this.data[index].cell;
        this.data.splice(index, 1);
        return key;
      });
      this.$message.success("删除成功！");
      this._updateSelectedRowKeys(keys);
    },
    _updateSelectedRowKeys(keys) {
      // 删除后需要更新 selectedRowKeys
      keys.forEach(key => {
        let index = this.selectedRowKeys.findIndex(item => item === key);
        if (index !== -1) {
          this.selectedRowKeys.splice(index, 1);
        }
      });
    }
  }
};
</script>

<style>
.ant-tabs-bar {
  margin: 0;
}
</style>