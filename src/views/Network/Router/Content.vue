<template>
  <div>
    <div class="table-operator" style="margin-bottom: 16px;">
      <a-row>
        <a-col>
          <a-row type="flex" justify="space-between">
            <span>
              <a-button icon="sync" :disabled="loading" @click="handleRefresh" style="margin-right: 10px;" title="刷新"></a-button>
              <a-button
                type="primary"
                style="margin-right: 10px;"
                icon="plus"
                @click="handleSingleMenuClick('create')"
              >创建</a-button>
              <a-button
                type="danger"
                style="margin-right: 10px;"
                icon="delete"
                @click="handleMultiMenuClick('delete')"
              >删除</a-button>
            </span>

            <span style="display: inline-flex;">
              <a-input-group compact class="compact-search-input">
                <a-select @change="v => searchValues.type = v" v-model="searchValues.type" style="width: 90px!important;">
                  <a-select-option value="name">名称</a-select-option>
                  <a-select-option value="id">ID</a-select-option>
                </a-select>
                <a-input
                  style="width: 200px"
                  @pressEnter="handleDATA" 
                  v-model="searchValues.inputValue"
                />
              </a-input-group>
              <a-button type="primary" @click="handleDATA" style="margin-left: 8px">搜索
                <a-icon type="search" />
              </a-button>
            </span>
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
      <template slot="name" slot-scope="text, record">
        <a href="javascript:;" @click="handleViewDetail(record)">{{text.first}} {{text.last}}</a>
      </template>
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

    <CreateModal />
    <EditModal />
    <ClearModal />
    <DeleteModal />
    <Gateway />
  </div>
</template>

<script>
import CreateModal from "./Modal/Create";
import EditModal from "./Modal/Edit";
import ClearModal from "./Modal/Clear";
import DeleteModal from "./Modal/Delete";
import Gateway from "./Modal/Gateway";

import tablePageMixins from "@/mixins/tablePageMixins";

import { getRouterList as getList } from "@/api/network/router";

import { getNetworkList } from "@/api/network/network";

import router from '@/i18n/zh/router'
import { debug } from 'util';
const statusDicts = router.router.status;

export default {
  mixins: [tablePageMixins],
  components: {
    CreateModal,
    EditModal,
    ClearModal,
    DeleteModal,
    Gateway
  },

  data() {
    return {
      getList,
      module: "network",
      id: "router",
      name: "路由",
      confirmLoading: false,

      networkList: [],
      searchValues: {
        type: 'name',
        inputValue: '',
      }
    };
  },
  mounted () {
    this.fetchNetworkList();
  },
  methods: {
    async fetchNetworkList () {
      try {
        const resp = await getNetworkList();
        this.networkList = resp.data.filter(item => item.routerExternal);
      } catch (error) {
        
      }
    },
    __handleTransformToZh (status) {
      return statusDicts[status] || status
    },
    handleParseData (data) {
      data.forEach(item => {
        item.status_zh = this.__handleTransformToZh(item.status);
      })
      return data;
    }
  }
};
</script>

<style>
</style>
