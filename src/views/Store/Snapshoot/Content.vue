<template>
  <div>
    <div class="table-operator" style="margin-bottom: 16px;">
      <a-row type="flex" justify="space-between">
        <a-col>
          <a-row type="flex" justify="space-between">
            <a-button icon="sync" @click="handleRefresh" style="margin-right: 10px;" title="刷新"></a-button>
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
      :rowKey="record => record.login.uuid"
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

    <CreateModal/>
    <EditModal/>
    <DeleteModal/>
  </div>
</template>

<script>
import CreateModal from "./Modal/Create";
import EditModal from "./Modal/Edit";
import DeleteModal from "./Modal/Delete";
import DetailModal from "./Modal/Detail";

import tablePageMixins from "../tablePageMixins";
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
  mixins: [tablePageMixins],
  components: {
    CreateModal,
    EditModal,
    DeleteModal,
    DetailModal
  },

  data() {
    return {
      name: "snapshoot",
      confirmLoading: false,
      showDeleteModal: false,
      columns,
      singleOperations: [
        {
          modalName: "create",
          text: "创建硬盘"
        },
        {
          modalName: "edit",
          text: "编辑硬盘快照"
        },
        {
          modalName: "delete",
          text: "删除硬盘快照"
        }
      ]
    };
  },
  computed: {},
  methods: {
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
    }
  }
};
</script>

<style>
.ant-tabs-bar {
  margin: 0;
}
</style>