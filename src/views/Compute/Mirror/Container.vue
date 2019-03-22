<template>
  <div>
    <PageLayout>
      <div slot="header">
        <p
          style="margin: 0;"
        >镜像（Image） 是基于主流的操作系统的进行定制，用于实例创建的模板。用户也可以基于己有镜像创建主机，也可以将自有主机捕获为新镜像，以备后用。</p>
        <a-tabs
          defaultActiveKey="payload.imageSource"
          @change="handleTabChange"
          style="position:relative; top: 17px;"
        >
          <a-tab-pane tab="系统" key="0"></a-tab-pane>
          <a-tab-pane tab="自有" key="1"></a-tab-pane>
        </a-tabs>
      </div>
      <div class="content">
        <div class="table-operator" style="margin-bottom: 16px;">
          <a-row type="flex" justify="space-between">
            <a-col>
              <p v-show="payload.imageSource == 0">系统：是友普官方基于主流的Linux，Windows提供的镜像模板，并与上游厂商的更新保持及时更新。</p>
              <p v-show="payload.imageSource == 1">自有：是用户自己上传或者将云主机制作为镜像模板，用于日后创建云主机使用。</p>
            </a-col>
            <a-col>
              <a-row type="flex" justify="space-between">
                <a-button icon="sync" :disabled="loading" @click="handleRefresh" style="margin-right: 10px;" title="刷新"></a-button>
                <a-button
                  type="primary"
                  style="margin-right: 10px;"
                  icon="plus"
                  @click="handleSingleMenuClick('create')"
                >创建镜像</a-button>
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
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onTableSelectChange}"
          :columns="columns"
          :rowKey="record => record.id"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <template slot="operation" slot-scope="text, record">
            <a title="点击查看镜像属性" @click="handleSingleMenuClick('detail', record)">{{text}}</a>
          </template>
          <template slot="edit" slot-scope="text, record">
            <a-button
              type="primary"
              style="margin-right: 10px;"
              icon="edit"
              @click="handleSingleMenuClick('edit', record)"
            >编辑</a-button>
          </template>
        </a-table>
      </div>
    </PageLayout>
    <CreateModal />
    <EditModal />
    <DetailModal />
  </div>
</template>

<script>
import CreateModal from "./Modal/Create";
import EditModal from "./Modal/Edit";
import DetailModal from "./Modal/Detail";
import PageLayout from "@/components/Layout/PageLayout.vue";

import tablePageMixins from "@/mixins/tablePageMixins";

import { getImageList as getList } from "@/api/compute/images";

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
      getList,
      module: "compute",
      id: "mirror",
      name: "镜像",
      payload: {
        imageSource: 0,
      },
      selectedRowData: {}
    };
  },

  methods: {
    handleTabChange(v) {
      // 镜像类型[0:系统镜像 1:自有镜像 2:共享镜像]
      this.payload.imageSource = v;
      this.data = [];

      // this.source.cancel('取消请求');
      this.fetch();
    },
  }
};
</script>

<style scoped>
.ant-tabs-bar {
  margin: 0;
}
</style>
