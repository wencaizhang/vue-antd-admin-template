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
              >创建网络</a-button>
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
                  <a-select-option value="shortID">ID</a-select-option>
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
      <template slot="name" slot-scope="text,record">
        <a href="javascript:;" @click="handleViewDetail(record)">{{text.first}} {{text.last}}</a>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-button
          v-if="record.isRouterExternal !== true"
          type="primary"
          style="margin-right: 10px;"
          icon="edit"
          @click="handleSingleMenuClick('edit', record)"
        >编辑</a-button>
        <!-- <a-dropdown style="margin-right: 10px;">
          <a-menu slot="overlay" @click="handleSingleMenuClick($event.key, record)">
            <a-menu-item
              v-for="item in singleMenuOptions"
              :key="item.id"
            >{{ item.name }}</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">操作
            <a-icon type="down"/>
          </a-button>
        </a-dropdown> -->
      </template>
    </a-table>

    <CreateModal />
    <EditModal />
    <DeleteModal />
  </div>
</template>

<script>
import CreateModal from "./Modal/Create";
import EditModal from "./Modal/Edit";
import DeleteModal from "./Modal/Delete";

import tablePageMixins from "@/mixins/tablePageMixins";

import { getNetworkList as getList } from "@/api/network/network";

import subnet from '@/i18n/zh/subnet';
const statusDicts = subnet.subnet.status

export default {
  mixins: [tablePageMixins],
  components: {
    CreateModal,
    EditModal,
    DeleteModal,
  },

  data() {
    return {
      getList,
      module: "network",
      id: "subnet",
      name: "路由",
      searchValues: {
        type: 'name',
        inputValue: '',
      }
    };
  },
  computed: {},
  methods: {

    __handleTransformToZh (status) {
      return statusDicts[status.toLowerCase()] || status
    },
    handleParseData (data) {
      const temp = data.map(item => {
        return Object.assign({}, item , {
          adminState_zh: this.__handleTransformToZh(item.adminState),
        })
      });

      const list1 = temp.filter(item => item.isRouterExternal !== true);
      const list2 = temp.filter(item => item.isRouterExternal === true);
      return list1.concat(list2);
    },
  }
};
</script>

<style>
</style>
