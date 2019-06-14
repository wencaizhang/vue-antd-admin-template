<template>
  <div>
    <div class="table-operator" style="margin-bottom: 16px;">
      <a-row type="flex" justify="space-between">
        <a-col>
          <a-button icon="sync" :disabled="loading" @click="handleRefresh" style="margin-right: 10px;" title="刷新"></a-button>
          <a-button
            type="danger"
            :disabled="!selectedRowKeys.length"
            @click="handleMultiMenuClick('multiDelete')"
            style="margin-right: 10px;"
          >
            删除
          </a-button>
        </a-col>
        <a-col>
          <div style="display: inline-block; vertical-align: top;">
            <a-input-group compact class="compact-search-input">
              <a-select @change="v => searchValues.type = v" v-model="searchValues.type" style="width: 90px!important;">
                <a-select-option
                  v-for="(value, key) in types"
                  :value="key"
                  :key="key"
                >
                  {{ value }}
                </a-select-option>
              </a-select>
              <a-input
                style="width: 200px"
                @pressEnter="handleDATA"
                v-model="searchValues.inputValue"
                :placeholder="`请输入${types[searchValues.type]}信息`"
              >
                <a-icon v-if="searchValues.inputValue" slot="suffix" type="close-circle" @click="searchValues.inputValue = ''" />
              </a-input>
            </a-input-group>
          </div>
          <a-select @change="v => searchValues.status = v" v-model="searchValues.status" style="margin-left: 8px;">
            <a-select-option key="all" value="all">全部</a-select-option>
            <a-select-option key="available" value="available">可用</a-select-option>
            <a-select-option key="in-use" value="in-use">使用中</a-select-option>
          </a-select>
          <a-button type="primary" @click="handleDATA" style="margin-left: 8px">
            搜索
            <a-icon type="search" />
          </a-button>
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
      <template slot="name" slot-scope="name, record">
        <a title="点击查看详情" @click="handleSingleMenuClick('detail', record)">
          {{ name }}
        </a>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-dropdown style="margin-right: 10px;">
          <a-menu slot="overlay" @click="handleSingleMenuClick($event.key, record)">
            <a-menu-item
              v-for="item in singleMenuOptions"
              :key="item.id"
            >
              {{ item.name }}
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </template>
    </a-table>

    <create-modal />
    <edit-modal />
    <delete-modal />
    <multi-delete />
    <detail />
  </div>
</template>

<script>
import CreateModal from "./Modal/Create";
import EditModal from "./Modal/Edit";
import DeleteModal from "./Modal/Delete";
import MultiDelete from "./Modal/MultiDelete";
import Detail from "./Modal/Detail";

import tablePageMixins from "@/mixins/tablePageMixins";

import { getSnapshootList as getList, } from "@/api/store/disk";
import snap from '@/i18n/zh/snap'
const statusDicts = snap.snap.status;

export default {
  mixins: [tablePageMixins],
  components: {
    CreateModal,
    EditModal,
    DeleteModal,
    MultiDelete,
    Detail
  },

  data() {
    return {
      getList,
      module: "store",
      id: "snapshoot",
      name: "快照",
      searchValues: {
        type: 'name',
        inputValue: '',
        status: 'all',
      },
      types: {
        name: '名称',
      },
    };
  },
  computed: {},
  methods: {
    __handleTransformToZh (status) {
      return statusDicts[status] || status
    },
    handleParseData (data) {
      const temp =  data.filter(item => item.status !== 'deleting');

      temp.forEach(item => {
        let status_zh = this.__handleTransformToZh(item.status)

        Object.assign(item, {
          status_zh,
        })
      })

      return temp;
    }
  }
};
</script>

<style>
.ant-tabs-bar {
  margin: 0;
}
</style>
