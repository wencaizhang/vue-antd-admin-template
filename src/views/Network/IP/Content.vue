<template>
  <div>
    <div class="table-operator" style="margin-bottom: 16px;">
      <a-row type="flex" justify="space-between">
        <a-col>
          <a-row type="flex" justify="space-between">
            <a-button icon="sync" @click="handleRefresh" style="margin-right: 10px;" title="刷新"></a-button>
            <a-button
              type="primary"
              style="margin-right: 10px;"
              icon="plus"
              @click="handleMenuClick('create')"
            >申请IP</a-button>
            <a-dropdown style="margin-right: 10px;">
              <a-menu slot="overlay" @click="handleMenuClick($event.key)">
                <a-menu-item
                  v-for="item in menuOptions"
                  v-show="item.type === 'batch'"
                  :key="item.id"
                >{{item.name}}</a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px">批量操作
                <a-icon type="down"/>
              </a-button>
            </a-dropdown>
            <a-input-search
              placeholder="input search text"
              @search="onSearch"
              style="width: 200px"
              enterButton
            />
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
      <template slot="name" slot-scope="text, record">
        <a href="javascript:;" @click="handleViewDetail(record)">{{text.first}} {{text.last}}</a>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-button
          type="primary"
          style="margin-right: 10px;"
          icon="edit"
          @click="handleMenuClick('bind-ip')"
        >绑定IP</a-button>
        <!-- <a-dropdown style="margin-right: 10px;">
          <a-menu slot="overlay" @click="handleMenuClick($event.key, record)">
            <a-menu-item
              v-for="item in menuOptions"
              :key="item.id"
              v-show="item.type === 'single'"
            >{{ item.name }}</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">操作
            <a-icon type="down"/>
          </a-button>
        </a-dropdown> -->
      </template>
    </a-table>

    <CreateModal />
    <BindIP />
    <FreeIP />
    <UnbindIP />
  </div>
</template>

<script>
import CreateModal from "./Modal/Create";
import BindIP from "./Modal/BindIP";
import FreeIP from "./Modal/FreeIP";
import UnbindIP from "./Modal/UnbindIP";

import tablePageMixins from "@/utils/mixins/tablePageMixins";

export default {
  mixins: [tablePageMixins],
  components: {
    CreateModal,
    BindIP,
    FreeIP,
    UnbindIP
  },

  data() {
    return {
      module: "network",
      id: "ip",
      name: "路由",
      confirmLoading: false
    };
  },
  computed: {},
  methods: {}
};
</script>

<style>
</style>
