<template>
  <div>
    <page-layout>
      <div class="content">
        <div class="table-operator" style="margin-bottom: 16px;">
          <a-button icon="sync" :disabled="loading" @click="handleRefresh" style="margin-right: 10px;" title="刷新"></a-button>
          <a-button @click="$router.push({name: 'CreateInstance'})" type="primary" style="margin-right: 10px;" icon="plus">
            新建
          </a-button>
          <a-button
            type="primary"
            style="margin-right: 10px;"
            icon="play-circle"
            @click="handleMultiMenuClick('launch')"
          >启动</a-button>
          <a-button
            type="primary"
            style="margin-right: 10px;"
            icon="poweroff"
            class="shut-down"
            @click="handleMultiMenuClick('shutdown')"
          >关机</a-button>
          <a-dropdown style="margin-right: 10px;">
            <a-menu slot="overlay" @click="handleMultiMenuClick($event.key)">
              <a-menu-item
                v-for="item in multiMenuOptions"
                :key="item.id"
              >{{item.name}}</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">批量操作
              <a-icon type="down" />
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
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onTableSelectChange}"
          :columns="columns"
          :rowKey="record => record.id"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <template slot="id" slot-scope="id, record">
            <a @click="handleSingleMenuClick('hostDetail', record)">{{ id.substr(0, 8) }}</a>
          </template>
          <template slot="network" slot-scope="network">
            <p v-for="item in network" :key="item">{{ item }}</p>
          </template>
          <template slot="status" slot-scope="text, record">
            <p>
              <span :class="{ 'status-disabled': record.taskState }">{{ text }}</span>
              <a-spin v-if="record.taskState">
                <a-icon slot="indicator" type="loading-3-quarters" style="font-size: 12px" spin />
              </a-spin>
            </p>
            <!-- <p>(重启中)</p> -->
          </template>
          <template slot="operation" slot-scope="text, record">
            <a-dropdown style="margin-right: 10px;">
              <a-menu slot="overlay" @click="handleSingleMenuClick($event.key, record)">
                <a-menu-item
                  v-for="item in record.singleMenuOptions"
                  :key="item.id"
                  :disabled="item.disabled"
                >{{ item.name }}</a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px">操作
                <a-icon type="down" />
              </a-button>
            </a-dropdown>
          </template>
        </a-table>
      </div>
    </page-layout>

    <MultiLaunch />
    <MultiShutdown />
    <MultiDelete />
    <MultiRestart />
    <MultiSoftRestart />

    <CreateSnapshootModal />
    <BindIPModal />
    <UnbindIP />
    <Delete />
    <!-- <allot-IP-modal /> -->
    <RebuildCloudHostModal />
    <EditSecurityGroupModal />
    <OverviewModal />
    <ConsolePanel />
  </div>
</template>

<script>
import PageLayout from "@/components/Layout/PageLayout.vue";

import MultiLaunch from "./Modals/MultiLaunch";
import MultiShutdown from "./Modals/MultiShutdown";
import MultiRestart from "./Modals/MultiRestart";
import MultiDelete from "./Modals/MultiDelete";
import MultiSoftRestart from "./Modals/MultiSoftRestart";

import CreateSnapshootModal from "./Modals/CreateSnapshoot";
import BindIPModal from "./Modals/BindIP";
import UnbindIP from "./Modals/UnbindIP";
import Delete from "./Modals/Delete";
// import AllotIPModal from "./Modals/AllotIP";
import RebuildCloudHostModal from "./Modals/RebuildCloudHost";
import EditSecurityGroupModal from "./Modals/EditSafetyGroup";
import OverviewModal from "./Modals/Overview";
import ConsolePanel from './Modals/ConsolePanel'

import tablePageMixins from "@/mixins/tablePageMixins";

import { getinstanceList as getList, getInstanceStatus } from "@/api/compute/instance";

import instance from '@/i18n/zh/instance'

const statusDicts = instance.instance.status;

export default {
  mixins: [tablePageMixins],
  components: {
    PageLayout,
    MultiLaunch,
    MultiShutdown,
    MultiRestart,
    MultiDelete,
    MultiSoftRestart,

    CreateSnapshootModal,
    BindIPModal,
    UnbindIP,
    Delete,
    // AllotIPModal,
    RebuildCloudHostModal,
    EditSecurityGroupModal,
    OverviewModal,
    ConsolePanel,
  },
  data() {
    return {
      getList,
      module: "compute",
      id: "instance",
      name: "实例",
      selectedRowData: null, // 当行操作
      showAllotIPModal: false,
      selectedOperationKey: 0,

    };
  },
  methods: {
    __handleFilterOptions (status) {
      // 操作菜单权限过滤
      const options = JSON.parse(JSON.stringify(this.singleMenuOptions))
      if (!['ACTIVE', 'SHUTOFF'].includes(status)) {
        // 创建快照只在运行中和关机两种状态下可用
        options.forEach(item => {
          if (item.id === 'createSnapshoot') {
            item.disabled = true;
          }
        })
      }
      return options;
    },
    __handleTransformToZh (status) {
      return statusDicts[status] || status
    },
    handleParseData (data) {
      // 处理从后台接收的数据格式
      const newData = data.map(item => {
        Object.keys(item).forEach(key => {
          item[key] = item[key] || '-';
        })
        let memory = item.memory >= 1024 ? `${item.memory / 1024}G` : `${item.memory}M`;
        let vcpu = item.vcpu + '核';
        let spec = vcpu + memory;

        // 转换成中文
        let status_zh = this.__handleTransformToZh(item.status);

        const securityGroupList = Array.isArray(item.securityGroups) ? item.securityGroups : [];
        const secuGroupNameList = securityGroupList.map(item => item.securityGroupName);
        const secuGroupString = secuGroupNameList.length ? secuGroupNameList.join(' ') : '-';

        Object.assign(item, {
          memory,
          vcpu,
          spec,
          secuGroupString,
          status_zh,
          singleMenuOptions: { ...this.__handleFilterOptions(item.status) },
          taskState: '',
        })
        return item;
      });
      return newData;
    },
    handleFetchSuccess () {
      const processingStatus = [ 'BUILD', ]
      const list = this.data.filter(item => processingStatus.includes(item.status));
      list.forEach(item => {
        this.handleTraceStatus(item.id);
      })
    },
    __handleUpdateStatus({ id, status, taskState}) {
      // 更新表格中的状态
      const currItem = this.data.find(item => item.id === id);
      const currStatus = (status || currItem.status).toUpperCase();
      const options = this.__handleFilterOptions(currStatus);
      Object.assign(currItem, {
        status: currStatus,
        taskState: taskState,
        status_zh: this.__handleTransformToZh(currStatus),
        singleMenuOptions: options,
      })
      this.$nextTick();
    },
    handleTraceStatus (id) {
      this.__handleUpdateStatus({ id, taskState: 'Start' });
      this.__queryListStatus(id)
    },
    async __queryListStatus (id) {
      const resp = {};
      try {
        const data = await getInstanceStatus(id);
        Object.assign(resp, data);
        if (resp.taskState) {
          this.__queryListStatus(id);
        }
      } catch (error) {

      } finally {
        this.__handleUpdateStatus(resp);
      }
    },

  }
};
</script>

<style scoped>
.status-disabled {
  user-select: none;
  color: #BBB;
}
</style>
