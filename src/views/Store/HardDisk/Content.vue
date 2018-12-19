<template>
  <div class="content">
    <div class="table-operator" style="margin-bottom: 16px;">
      <a-row type="flex" justify="space-between">
        <a-col>
          <a-row type="flex" justify="space-between">
            <a-button icon="sync" @click="handleRefresh" style="margin-right: 10px;" title="刷新"></a-button>
            <a-button
              type="primary"
              style="margin-right: 10px;"
              icon="plus"
              @click="handleCreate"
            >创建</a-button>
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
      <template slot="name" slot-scope="name, record">
        <a href="javascript:;" @click="handleViewDetail(record)">{{name.first}} {{name.last}}</a>
      </template>
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
    <Uninstall/>
    <Dilatation/>
    <Mount/>
    <CreateSnapshoot/>
    <CreateBackups/>
    <Upload/>
    <Delete/>
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

import tablePageMixins from "@/utils/mixins/tablePageMixins";
const columns = [
  {
    title: "ID",
    dataIndex: "phone"
  },
  {
    title: "名称",
    dataIndex: "name",
    scopedSlots: { customRender: "name" }
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
    Uninstall,
    Dilatation,
    Mount,
    CreateSnapshoot,
    CreateBackups,
    Delete,
    Upload,
    ChangeDiskType
  },
  mounted() {
    if (this.$route.matched.length === 4) {
      this.$route.meta.title = "硬盘实例";
    }
  },
  data() {
    return {
      name: "disk",
      columns,
      // 状态为可用，则全部显示，状态为使用中，则显示 visible: true 的操作选项
      singleOperations: [
        { modalName: "edit", visible: true, text: "修改" },
        {
          modalName: "uninstall",
          visible: true,
          text: "卸载硬盘"
        },
        {
          modalName: "dilatation",
          visible: false,
          text: "扩容"
        },
        {
          modalName: "mount",
          visible: false,
          text: "加载硬盘到主机"
        },
        {
          modalName: "createSnapshoot",
          visible: true,
          text: "创建快照"
        },
        {
          modalName: "createBackups",
          visible: false,
          text: "创建备份"
        },
        {
          modalName: "changeDiskType",
          visible: false,
          text: "修改硬盘类型"
        },
        {
          modalName: "changeDiskType",
          visible: false,
          text: "克隆硬盘"
        },
        {
          modalName: "upload",
          visible: true,
          text: "上传镜像"
        },
        {
          modalName: "delete",
          visible: false,
          text: "删除硬盘"
        }
      ]
    };
  },
  computed: {},
  methods: {
    handleCreate() {
      this.$store.commit(`${this.name}/toggleModalVisible`, "create");
    },
    handleViewDetail(record) {
      this.$store.commit(`${this.name}/setHandleRowData`, record);
      this.$router.push({
        name: "diskInstance",
        params: { id: record.id.value || "abcdef" }
      });
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

    // 删除弹框
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