<template>
  <div>
    <PageLayout>
      <div slot="header">
        <p>如果您使用的是 Linux 主机，强烈建议使用 SSH 公钥/私钥 （Keypair）进行远程登录身份验证。您可以创建一个 SSH 密钥，并立刻下载其私钥。请保管好私钥，因为 YPCloud 是不保存您的私钥的。</p>
      </div>
      <div class="content">
        <div class="table-operator" style="margin-bottom: 16px;">
          <a-row type="flex" justify="space-between">
            <a-col>
              <a-row type="flex" justify="space-between">
                <a-button
                  type="primary"
                  style="margin-right: 10px;"
                  icon="plus"
                  @click="handleMenuClick('create')"
                >创建</a-button>
                <a-button
                  type="primary"
                  style="margin-right: 10px;"
                  icon="upload"
                  @click="handleMenuClick('import')"
                >导入密钥对</a-button>
                <a-dropdown>
                  <a-menu slot="overlay" @click="handleMenuClick($event.key)">
                    <a-menu-item
                      v-for="item in menuOptions"
                      v-show="item.type === 'batch'"
                      :key="item.id"
                    >{{item.name}}</a-menu-item>
                  </a-menu>
                  <a-button type="primary" style="margin-left: 8px">批量操作
                    <a-icon type="down"/>
                  </a-button>
                </a-dropdown>
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
          :rowKey="record => record.id"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <template slot="operation" slot-scope="record">
            <a-dropdown style="margin-right: 10px;">
              <a-menu slot="overlay" @click="handleMenuClick($event.key, record)">
                <a-menu-item
                  v-for="item in menuOptions"
                  v-show="item.type === 'single'"
                  :disabled="record | downloadable(item.id)"
                  :key="item.id"
                >{{item.name}}</a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px">操作
                <a-icon type="down"/>
              </a-button>
            </a-dropdown>
          </template>
        </a-table>
      </div>
    </PageLayout>

    <CreateModal :module="id"/>
    <ImportModal :module="id"/>
    <tag-modal :module="id"/>
    <edit-modal :module="id"/>
    <Download :module="id"/>
  </div>
</template>

<script>
import CreateModal from "./Modal/Create";
import TagModal from "./Modal/Tag";
import ImportModal from "./Modal/Import";
import EditModal from "./Modal/Edit";
import Download from "./Modal/Download";
import PageLayout from "@/components/Layout/PageLayout.vue";

import tablePageMixins from "@/utils/mixins/tablePageMixins";

export default {
  mixins: [tablePageMixins],
  components: {
    CreateModal,
    TagModal,
    ImportModal,
    EditModal,
    Download,
    PageLayout
  },

  data() {
    return {
      module: "compute",
      id: "keypair",
      name: "密钥对",
    };
  },
  computed: {},
  filters: {
    downloadable(record, key) {
      if (key === "download") return true;
    }
  },
  methods: {

  }
};
</script>

<style>
.ant-tabs-bar {
  margin: 0;
}
</style>
