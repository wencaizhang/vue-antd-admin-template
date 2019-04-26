<template>
  <div>
    <PageLayout>
      <div slot="header">
        <p>友普云系统为每个用户提供了一个缺省安全组default,其允许所有下行端口,拒绝所有上行端口.您可以创建自己的安全组。初始状态下安全组任何端口都是封闭的，您需要建立规则以打开相应的端口,达到正常访问的目的.</p>
      </div>
      <div class="content">
        <div class="table-operator" style="margin-bottom: 16px;">
          <a-row type="flex" justify="space-between">
            <a-col>
              <a-row type="flex" justify="space-between">
                <a-button icon="sync" :disabled="loading" @click="handleRefresh" style="margin-right: 10px;" title="刷新"></a-button>
                <a-button
                  type="primary"
                  style="margin-right: 10px;"
                  icon="plus"
                  @click="handleSingleMenuClick('create')"
                >创建安全组</a-button>
                <a-button
                  type="danger"
                  style="margin-right: 10px;"
                  icon="delete"
                  :disabled="!selectedRowKeys.length"
                  @click="handleMultiMenuClick('batchDeleta')"
                >删除安全组</a-button>
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
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onTableSelectChange}"
          :columns="columns"
          :rowKey="record => record.name"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <template slot="operation" slot-scope="text, record">
            <a-dropdown>
              <a-menu slot="overlay" @click="handleSingleMenuClick($event.key, record)">
                <a-menu-item
                  v-for="item in singleMenuOptions"
                  :key="item.id"
                >{{ item.name }}</a-menu-item>
              </a-menu>
              <a-button>操作
                <a-icon type="down"/>
              </a-button>
            </a-dropdown>
          </template>
        </a-table>
      </div>
    </PageLayout>

    <create-modal />
    <delete-modal />
    <!-- <create-modal />
    <import-modal />

    <edit-modal />
    <download-modal /> -->
  </div>
</template>

<script>
import CreateModal from "./Modal/Create";
import DeleteModal from "./Modal/Delete";
// import EditModal   from "./Modal/Edit";

import PageLayout from "@/components/Layout/PageLayout.vue";

import tablePageMixins from "@/mixins/tablePageMixins";

import { getGroupList as getList } from "@/api/security/index";

export default {
  mixins: [tablePageMixins],
  components: {
    CreateModal,
    DeleteModal,
    PageLayout
  },

  data() {
    return {
      getList,
      module: "security",
      id: "group",
      name: "安全组",
    };
  },
  computed: {},

  methods: {

  }
};
</script>

<style scoped>
.ant-tabs-bar {
  margin: 0;
}
</style>
