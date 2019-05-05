<template>
  <div>
    <router-view v-if="$route.matched.length === 4"></router-view>
    <PageLayout v-else>
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
                  @click="handleMultiMenuClick('multiDeleta')"
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
          :rowKey="record => record.id"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >

          <template slot="operation" slot-scope="text, record">
            <a-dropdown>
              <a-menu slot="overlay" @click="handleSingleMenuClick($event.key, record)">
                <a-menu-item
                  v-for="item in record.singleMenuOptions"
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

    <CreateModal />
    <DeleteModal />
    <EditModal />
    <MultiDelete />
  </div>
</template>

<script>
import CreateModal from "./Modal/Create";
import DeleteModal from "./Modal/Delete";
import EditModal   from "./Modal/Edit";
import MultiDelete from './Modal/MultiDelete';

import PageLayout from "@/components/Layout/PageLayout.vue";

import tablePageMixins from "@/mixins/tablePageMixins";

import { getGroupList as getList } from "@/api/security/index";

export default {
  mixins: [tablePageMixins],
  components: {
    CreateModal,
    DeleteModal,
    EditModal,
    MultiDelete,
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
    handleSingleMenuClick(key, record) {
      if (key === 'editRule') {
        this.$router.push({ name: "rules", params: { id: record.id, name: record.name }})
        return;
      }
      // 单项操作
      this.currRecord = record;
      this.handleShowModal(key);
    },
    __handleFilterOptions ({ name }) {
      // 操作菜单权限过滤
      // default 安全组只能编辑规则，不能修改名称或者删除
      if (name === 'default') {
        return [{ visible: false, type: 'single', id: 'editRule',    name: '编辑规则', },]
      } else {
        return JSON.parse(JSON.stringify(this.singleMenuOptions))
      }
    },
    handleParseData (data) {
      data.forEach(item => {
        item.singleMenuOptions = [ ...this.__handleFilterOptions(item) ]
      })
      return data;
    }
  }
};
</script>

<style scoped>
.ant-tabs-bar {
  margin: 0;
}
</style>
