<template>
  <div>
    <page-layout>
      <div slot="header">
        <p>如果您使用的是 Linux 云主机，强烈建议使用 SSH 公钥/私钥 （Keypair）进行远程登录身份验证。您可以创建一个 SSH 密钥，并立刻下载其私钥。请保管好私钥，因为 YPCloud 是不保存您的私钥的。</p>
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
                >
                  创建
                </a-button>
                <a-button
                  type="primary"
                  style="margin-right: 10px;"
                  icon="upload"
                  @click="handleSingleMenuClick('import')"
                >
                  导入密钥对
                </a-button>
                <a-button
                  type="danger"
                  style="margin-right: 10px;"
                  icon="delete"
                  :disabled="!selectedRowKeys.length"
                  @click="handleMultiMenuClick('batchDeleta')"
                >
                  删除
                </a-button>
                <a-button
                  type="primary"
                  style="margin-right: 10px;"
                  icon="edit"
                  :disabled="selectedRowKeys.length !== 1"
                  :title="selectedRowKeys.length !== 1 ? '您只能选择其中一项进行修改' : '修改密钥对属性'"
                  @click="handleMultiMenuClick('edit')"
                >
                  编辑
                </a-button>
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
        </a-table>
      </div>
    </page-layout>

    <create-modal />
    <import-modal />
    <!-- <tag-modal /> -->
    <!-- TODO -->
    <delete-modal />
    <edit-modal />
    <download-modal />
  </div>
</template>

<script>
import CreateModal from "./Modal/Create";
// import TagModal from "./Modal/Tag";
import DeleteModal from "./Modal/Delete";
import ImportModal from "./Modal/Import";
import EditModal from "./Modal/Edit";
import DownloadModal from "./Modal/Download";
import PageLayout from "@/components/Layout/PageLayout.vue";

import tablePageMixins from "@/mixins/tablePageMixins";

import { getKeyPairList as getList } from "@/api/compute/keypair";
export default {
  mixins: [tablePageMixins],
  components: {
    CreateModal,
    // TagModal,
    DeleteModal,
    ImportModal,
    EditModal,
    DownloadModal,
    PageLayout
  },

  data() {
    return {
      getList,
      module: "compute",
      id: "keypair",
      name: "密钥对",
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
