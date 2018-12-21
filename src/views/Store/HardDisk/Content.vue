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
        <a style="margin-left: 24px" @click="handleClearSelected">清空</a>
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
            <a-menu-item v-for="(item, index) in singleOperations" :key="index" v-if="item.menu !== false">{{ item.name }}</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">操作
            <a-icon type="down"/>
          </a-button>
        </a-dropdown>
      </template>
    </a-table>

    <CreateModal :module="id"/>
    <EditModal :module="id"/>
    <Uninstall :module="id"/>
    <Dilatation :module="id"/>
    <Mount :module="id"/>
    <CreateSnapshoot :module="id"/>
    <CreateBackups :module="id"/>
    <Upload :module="id"/>
    <Delete :module="id"/>
    <ChangeDiskType :module="id"/>
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
      module: "store",
      id: "disk",
      name: "硬盘",
    };
  },
  computed: {},
  methods: {

  }
};
</script>

<style>
.ant-tabs-bar {
  margin: 0;
}
</style>