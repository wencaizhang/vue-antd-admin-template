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
                <a-button
                  type="primary"
                  style="margin-right: 10px;"
                  icon="plus"
                  @click="handleShowModal('create')"
                >创建镜像</a-button>
                <a-button
                  type="primary"
                  style="margin-right: 10px;"
                  icon="edit"
                  @click="handleShowModal('edit')"
                >编辑镜像</a-button>
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
          <template slot="operation" slot-scope="text, record">
            <a title="点击查看镜像属性" @click="handleViewDetail(record)">{{text}}</a>
          </template>
        </a-table>
      </div>
    </PageLayout>
    <CreateModal :module="id"/>
    <EditModal :module="id"/>
    <DetailModal :module="id"/>
  </div>
</template>

<script>
import CreateModal from "./Modal/Create";
import EditModal from "./Modal/Edit";
import DetailModal from "./Modal/Detail";
import PageLayout from "@/components/Layout/PageLayout.vue";

import tablePageMixins from "@/utils/mixins/tablePageMixins";

export default {
  mixins: [tablePageMixins],
  components: {
    CreateModal,
    EditModal,
    DetailModal,
    PageLayout
  },

  data() {
    return {
      module: "compute",
      id: "mirror",
      name: "镜像",
      tabKey: 1,

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
      this.$store.commit(`${this.id}/toggleModalVisible`, 'detail');
    }
  }
};
</script>

<style>
.ant-tabs-bar {
  margin: 0;
}
</style>
