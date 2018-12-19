<template>
  <div>
    <PageLayout>
      <div slot="header">
        <p
          style="margin: 0;"
        >镜像（Image） 是基于主流的操作系统的进行定制，用于实例创建的模板。用户也可以基于己有镜像创建主机，也可以将自有主机捕获为新镜像，以备后用。</p>
        <a-tabs
          defaultActiveKey="1"
          @change="handleTabChange"
          style="position:relative; top: 17px;"
        >
          <a-tab-pane tab="系统" key="1"></a-tab-pane>
          <a-tab-pane tab="自有" key="2"></a-tab-pane>
        </a-tabs>
      </div>
      <div class="content">
        <div class="table-operator" style="margin-bottom: 16px;">
          <a-row type="flex" justify="space-between">
            <a-col>
              <p v-show="tabKey == 1">系统：是友普官方基于主流的Linux，Windows提供的镜像模板，并与上游厂商的更新保持及时更新。</p>
              <p v-show="tabKey == 2">自有：是用户自己上传或者将云主机制作为镜像模板，用于日后创建云主机使用。</p>
            </a-col>
            <a-col>
              <a-row type="flex" justify="space-between">
                <edit-modal v-bind:obj="obj"/>
                <create-modal/>
              </a-row>
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
            <span title="点击查看镜像属性" @click="handleViewDetail(record)">{{text}}</span>
          </template>
        </a-table>
      </div>

      <detail-modal
        :visible="showDetailModal"
        :data="selectedRowData"
        v-on:cancel="showDetailModal = false"
      />
    </PageLayout>
  </div>
</template>

<script>
import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
import DetailModal from "./DetailModal";
import PageLayout from "@/components/Layout/PageLayout.vue";

import tablePageMixins from "@/utils/mixins/tablePageMixins";
const columns = [
  {
    title: "ID",
    dataIndex: "cell",
    scopedSlots: { customRender: "operation" }
  },
  {
    title: "名称",
    dataIndex: "name.first"
  },
  {
    title: "状态",
    dataIndex: "phone",
    filters: [
      { text: "状态", value: "状态" },
      { text: "等待中", value: "等待中" },
      { text: "运行中", value: "运行中" },
      { text: "已暂停", value: "已暂停" },
      { text: "已关闭", value: "已关闭" },
      { text: "已删除", value: "已删除" },
      { text: "重启中", value: "重启中" }
    ],
    filterMultiple: false
  },
  {
    title: "容量（G)",
    dataIndex: "id.name"
  },
  {
    title: "平台",
    dataIndex: "id.value"
  }
];

export default {
  mixins    : [tablePageMixins],
  components: {
    CreateModal,
    EditModal,
    DetailModal,
    PageLayout
  },

  data() {
    return {
      tabKey: 1,
      obj: {
        名称: "aaa1231313aaa",
        描述: "bbbb",
        minMomery: "22",
        minDisk: "42",
        镜像格式: "Yiminghe"
      },
      columns,
      showDetailModal: false,
      selectedRowData: {}
    };
  },

  methods: {

    handleTabChange(v) {
      this.tabKey = v;
    },
    handleViewDetail(record) {
      console.log(record);
      Object.assign(this.selectedRowData, record);
      this.showDetailModal = true;
    }
  }
};
</script>

<style>
.ant-tabs-bar {
  margin: 0;
}
</style>
