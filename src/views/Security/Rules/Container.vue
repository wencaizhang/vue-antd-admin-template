<template>
  <div>
    <PageLayout>

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
                >添加规则</a-button>
                <a-button
                  type="danger"
                  style="margin-right: 10px;"
                  icon="delete"
                  :disabled="!selectedRowKeys.length"
                  @click="handleMultiMenuClick('multiDeleta')"
                >删除规则</a-button>
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
          :rowKey="record => record.id"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <template slot="operation" slot-scope="text, record">
            <a-button
              type="danger"
              style="margin-right: 10px;"
              icon="delete"
              @click="handleSingleMenuClick('delete', record)"
            >删除规则</a-button>
          </template>
        </a-table>
      </div>
    </PageLayout>

    <CreateModal />
    <DeleteModal />
    <MultiDelete />
  </div>
</template>

<script>
import CreateModal from "./Modal/Create";
import DeleteModal from "./Modal/Delete";
import MultiDelete from "./Modal/MultiDelete";
import PageLayout from "@/components/Layout/PageLayout.vue";

import tablePageMixins from "@/mixins/tablePageMixins";

import { getRuleList as getList } from "@/api/security/index";
export default {
  mixins: [tablePageMixins],
  components: {
    CreateModal,
    MultiDelete,
    DeleteModal,
    PageLayout
  },

  data() {
    return {
      getList,
      module: "security",
      id: "rules",
      name: "管理安全组规则",
    };
  },
  beforeMount () {
    const secGroupId = this.$route.params.id
    this.payload = { secGroupId }
  },

  methods: {

  }
};
</script>

<style scoped>
.ant-tabs-bar {
  margin: 0;
}
</style>
