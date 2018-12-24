<template>
  <div>
    <page-layout>
      <div class="content">
        <div class="table-operator" style="margin-bottom: 16px;">
          <a-button type="primary" style="margin-right: 10px;" icon="plus" @click="handleCreate">新建</a-button>
          <a-button type="primary" style="margin-right: 10px;" icon="play-circle" disabled>启动</a-button>
          <a-button
            type="primary"
            style="margin-right: 10px;"
            icon="poweroff"
            class="shut-down"
            disabled
          >关机</a-button>
          <a-dropdown style="margin-right: 10px;">
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item
                v-for="item in menuOptions"
                v-if="item.type === 'batch'"
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
        </div>
        <a-alert type="info" showIcon style="margin-bottom: 16px;">
          <div slot="message">
            已选择&nbsp;
            <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>&nbsp;&nbsp;项
            <a
              v-show="selectedRowKeys.length"
              style="margin-left: 24px"
              @click="selectedRowKeys = []"
            >清空</a>
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
          <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
          <template slot="operation" slot-scope="text, record">
            <a-dropdown style="margin-right: 10px;">
              <a-menu slot="overlay" @click="handleMenuClick($event, record)">
                <a-menu-item
                  v-for="item in menuOptions"
                  v-if="item.type === 'single'"
                  :key="item.id"
                >{{ item.name }}</a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px">操作
                <a-icon type="down"/>
              </a-button>
            </a-dropdown>
          </template>
        </a-table>
      </div>

      <create-snapshoot-modal :module="id"/>
      <bind-IP-modal :module="id" v-on:allotIP="handleAllotIP"/>
      <UnbindIP :module="id"/>
      <Delete :module="id"/>
      <allot-IP-modal :module="id"/>
      <rebuild-cloud-host-modal :module="id"/>
      <edit-security-group-modal :module="id"/>
      <overview-modal :module="id"/>
    </page-layout>
  </div>
</template>

<script>
import PageLayout from "@/components/Layout/PageLayout.vue";

import CreateSnapshootModal from "./Modals/CreateSnapshoot";
import BindIPModal from "./Modals/BindIP";
import UnbindIP from "./Modals/UnbindIP";
import Delete from "./Modals/Delete";
import AllotIPModal from "./Modals/AllotIP";
import RebuildCloudHostModal from "./Modals/RebuildCloudHost";
import EditSecurityGroupModal from "./Modals/EditSafetyGroup";
import OverviewModal from "./Modals/Overview";

import tablePageMixins from "@/utils/mixins/tablePageMixins";

export default {
  mixins: [tablePageMixins],
  components: {
    PageLayout,
    CreateSnapshootModal,
    BindIPModal,
    UnbindIP,
    Delete,
    AllotIPModal,
    RebuildCloudHostModal,
    EditSecurityGroupModal,
    OverviewModal
  },

  data() {
    return {
      module: "compute",
      id: "instance",
      name: "实例",
      selectedRowData: null, // 当行操作
      showAllotIPModal: false,
      selectedOperationKey: 0
    };
  },

  methods: {
    openNotification() {
      this.$notification.open({
        message: "提醒",
        description: "操作成功，数据已更新",
        icon: <a-icon type="check-circle" style="color: #52c41a" />
      });
    },
    handleCreate() {
      this.$router.push({ name: "CreateInstance" });
    },
    handleAllotIP () {
      console.log('allotIP')
      this.$store.commit(`${this.id}/toggleModalVisible`, 'allotIP');
    }
  }
};
</script>

<style>
ul {
  padding-inline-start: 20px;
}
</style>
