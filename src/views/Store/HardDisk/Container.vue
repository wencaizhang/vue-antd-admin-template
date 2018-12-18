<template>
  <div>
    <PageLayout>
      <div slot="header">
        <p>硬盘为主机提供块存储设备，它独立于主机的生命周期而存在，可以被连接到任意运行中的主机上。注意，硬盘附加到主机上后，您还需要登录到您的主机的操作系统中去加载该硬盘。当然，也可以从主机上卸载硬盘、并转至其他主机。注意，请先在您的主机的操作系统中卸载硬盘，然后再在友普云控制台上卸载。</p>
      </div>
      <div class="content">
        <div class="table-operator" style="margin-bottom: 16px;">
          <a-row type="flex" justify="space-between">
            <a-col>
              <a-row type="flex" justify="space-between">
                <create-modal/>
                <a-button type="danger" @click="handleBatchDelete" style="margin-right: 10px;">删除</a-button>
                <a-input-search
                  placeholder="input search text"
                  @search="onSearch"
                  style="width: 200px"
                  enterButton
                />
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
          <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
          <template slot="operation" slot-scope="text, record">
            <a-dropdown style="margin-right: 10px;">
              <a-menu slot="overlay" @click="handleSingleMenuClick(record, $event)">
                <a-menu-item v-for="(item, index) in singleOperations" :key="index">{{ item.text }}</a-menu-item>
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

    <EditModal/>
    <Uninstall/>
    <Dilatation/>
    <Mount/>
    <CreateSnapshoot />
    <CreateBackups />
    <Upload />
    <Delete />
    <ChangeDiskType/>
  </div>
</template>

<script>
import CreateModal from "./Modal/CreateModal";
import EditModal from "./Modal/EditModal";
import Uninstall from "./Modal/Uninstall";
import Dilatation from "./Modal/Dilatation";
import Mount from "./Modal/Mount";
import CreateSnapshoot from "./Modal/CreateSnapshoot";
import CreateBackups from "./Modal/CreateBackups";
import Delete from "./Modal/Delete";
import Upload from "./Modal/Upload";
import ChangeDiskType from "./Modal/ChangeDiskType";
import PageLayout from "@/components/Layout/PageLayout.vue";
const columns = [
  {
    title: "ID",
    dataIndex: "phone"
  },
  {
    title: "名称",
    dataIndex: "name.first"
  },
  {
    title: "状态",
    dataIndex: "id.name"
  },
  {
    title: "外部网络",
    dataIndex: "id"
  },
  {
    title: "可用域",
    dataIndex: "name.last"
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
    Uninstall,
    Dilatation,
    Mount,
    CreateSnapshoot,
    CreateBackups,
    Delete,
    Upload,
    ChangeDiskType,
    PageLayout
  },
  mounted() {
    this.fetch();
  },
  data() {
    return {
      confirmLoading: false,
      showDeleteModal: false,
      obj: {
        名称: "aaa1231313aaa",
        描述: "bbbb",
        最低内存: "dddddd",
        最小磁盘: "ccccc",
        镜像格式: "Yiminghe"
      },
      // 状态为可用，则全部显示，状态为使用中，则显示 visible: true 的操作选项
      singleOperations: [
        { showModal: false, modalName: 'edit', visible: true, text: "修改" },
        { showModal: false, modalName: 'uninstall', visible: true, text: "卸载硬盘" },
        { showModal: false, modalName: 'dilatation', visible: false, text: "扩容" },
        { showModal: false, modalName: 'mount', visible: false, text: "加载硬盘到主机" },
        { showModal: false, modalName: 'createSnapshoot', visible: true, text: "创建快照" },
        { showModal: false, modalName: 'createBackups', visible: false, text: "创建备份" },
        { showModal: false, modalName: 'changeDiskType', visible: false, text: "修改硬盘类型" },
        { showModal: false, modalName: 'changeDiskType', visible: false, text: "克隆硬盘" },
        { showModal: false, modalName: 'upload', visible: true, text: "上传镜像" },
        { showModal: false, modalName: 'delete', visible: false, text: "删除硬盘" }
      ],
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
          break;
        case "2":
          this.showDeleteModal = true;
          console.log(`Click on item ${key}`);
          break;
        case "3":
          break;

        default:
          break;
      }
    },
    handleBatchDelete() {
      if (this.selectedRowKeys.length === 0) {
        this.$message.info("请先选择您要操作的硬盘");
        return;
      }

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
        title: "您已经选择了下列硬盘，即将进行删除，请确认你的操作。",
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
    onSearch(value) {
      console.log(value);
      this.fetch();
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

    handleSingleMenuClick(record, { key }) {
      console.log("key", key);
      const modalName = this.singleOperations[key].modalName;
      this.$store.commit("toggleModalVisible", modalName);
    },
    // 删除弹框
    handleDeleteModalOk() {},
    _deleteData(indexs = []) {
      if (!indexs.length) return;
      // 数组删除一个元素之后，索引会发生变化。所以要对删除目标的索引进行处理。
      const parseIndexs = indexs.map((item, index) => item - index);
      console.log(parseIndexs);
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