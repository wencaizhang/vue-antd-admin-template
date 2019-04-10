<template>
  <div>
    <page-layout>
      <div class="content">
        <div class="table-operator clearfix" style="margin-bottom: 16px;">
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

          <span style="float: right;">
            <a-input-group compact class="compact-search-input">
              <a-select @change="v => searchValues.type = v" v-model="searchValues.type" style="width: 90px!important;">
                <a-select-option value="name">名称</a-select-option>
                <a-select-option value="network">网络</a-select-option>
                <a-select-option value="ipAddress">公网IP</a-select-option>
              </a-select>
              <a-input
                style="width: 200px"
                @pressEnter="handleDATA" 
                v-model="searchValues.inputValue"
              />
            </a-input-group>
            
            <a-select @change="v => searchValues.status = v" v-model="searchValues.status" style="margin-left: 8px; width: 90px;">
              <a-select-option key="all" value="all">全部</a-select-option>
              <a-select-option key="build" value="build">等待中</a-select-option>
              <a-select-option key="active" value="active">运行中</a-select-option>
              <a-select-option key="paused" value="paused">已暂停</a-select-option>
              <a-select-option key="shutoff" value="shutoff">已关机</a-select-option>
              <a-select-option key="reboot" value="reboot">重启中</a-select-option>
            </a-select>
            <a-button type="primary" @click="handleDATA" style="margin-left: 8px">搜索
              <a-icon type="search" />
            </a-button>
          </span>
          
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
            <a @click="handleSingleMenuClick('hostDetail', record)" title="查看云主机概况">{{ id.substring(0, 8) }}</a>
          </template>
          <template slot="network" slot-scope="network">
            <p v-for="item in network" :key="item">{{ item }}</p>
          </template>
          <template slot="status" slot-scope="text, record">
            <p>
              <span :class="{ 'status-disabled': record.taskState }">{{ record.status_zh }}</span>
              <a-spin v-if="record.taskState">
                <a-icon slot="indicator" type="loading-3-quarters" style="font-size: 12px" spin />
              </a-spin>
            </p>
          </template>
          <template slot="operation" slot-scope="options, record">
            <a-dropdown style="margin-right: 10px;">
              <a-menu slot="overlay" @click="handleBeforeSingleMenuClick($event.key, record)">
                <a-menu-item
                  v-for="item in record.singleMenuOptions"
                  :key="item.id"
                  :disabled="item.disabled"
                >{{ item.name }}</a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px" :disabled="!Boolean(record.singleMenuOptions.length)">操作
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

import { transToTimestamp } from "@/utils/util";

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

      searchType: 'name',

      searchValues: {
        type: 'name',
        inputValue: '',
        status: 'all',
      }
    };
  },
  mounted () {
    this.$store.commit[`${this.$parent.id}/clearModal`]; 
  },
  methods: {
    handleRefresh() {
      this.searchValues = {
        type: 'name',
        inputValue: '',
        status: 'all',
      }
      this.pagination = Object.assign({}, this.pagination, this.initPagination);
      this.fetch();
    },
    __handleFilterOptions (status) {
      // 等待和重启中禁止任何操作
      if( ['build', 'reboot'].includes(status) ) {
        return [];
      }
      // 操作菜单权限过滤
      const options = JSON.parse(JSON.stringify(this.singleMenuOptions))

      // 只有当实例处于 availableStatus 中的状态时，对应的操作才可用
      const result = options.filter(({ id, availableStatus=[]}, index) => {
        if (availableStatus.length === 0) {
          return true;
        }
        return availableStatus.includes(status);
      })
      return result;
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
        let memory = item.memory >= 1024 ? `${item.memory / 1024}G` : `${item.memory}MB`;
        let vcpu = item.vcpu + '核';
        let disk = item.disk + 'G';
        let spec = vcpu + memory;
        let status = item.status.toLowerCase();

        // 转换成中文
        let status_zh = this.__handleTransformToZh(item.status);

        const securityGroupList = Array.isArray(item.securityGroups) ? item.securityGroups : [];
        const secuGroupNameList = securityGroupList.map(item => item.securityGroupName);
        const secuGroupString = secuGroupNameList.length ? secuGroupNameList.join(' ') : '-';

        Object.assign(item, {
          memory, vcpu, spec, disk, secuGroupString, status_zh,
          singleMenuOptions: [ ...this.__handleFilterOptions(item.status) ],
          taskState: '',
        })
        return item;
      });
      return newData;
    },
    handleFetchSuccess () {
      const processingStatus = [ 'build', 'rebuild' ]
      const list = this.data.filter(item => processingStatus.includes(item.status));
      list.forEach(item => {
        this.handleTraceStatus(item.id);
      })
    },
    __handleUpdateStatus({ id, status, taskState }) {
      // 更新表格中的状态
      const currItem = this.data.find(item => item.id === id);
      const currStatus = (status || currItem.status).toLowerCase();
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

        if (resp.status.toLowerCase() === 'deleted') {
          this.__handleDeleteInstance(id);
          return;
        }
        if (resp.taskState) {
          this.__queryListStatus(id);
        }
        this.__handleUpdateStatus(resp);
      } catch (error) {
        if (error.response.status == 404) {
          this.__handleDeleteInstance(id);
        }
      }
    },
    __handleDeleteInstance (id) {
      // 更新实例数据
      const currItem = this.data.find(item => item.id === id);
      Object.assign(currItem, {
        status: 'deleted',
        taskState: false,
        status_zh: '已删除',
        singleMenuOptions: [],
      });

      // 删除并更新页面
      const currIndexInAll = this.allData.indexOf(currItem);
      this.allData.splice(currIndexInAll, 1);
      this.handleDATA();
      this.pagination.total = this.allData.length;

      // 更新选择项
      const index = this.selectedRowKeys.indexOf(id);
      this.selectedRowKeys.splice(index, 1);

      this.$nextTick();
    },
    handleBeforeSingleMenuClick (key, record) {
      if (key === 'console') {
        window.open(`/console.html?instanceId=${record.id}`);
      } else {
        this.handleSingleMenuClick(key, record)
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
.compact-search-input {
  display: inline-block;
  width: auto;
  /* FIXME 对齐问题 */
  vertical-align: middle;
  margin-top: -2px;
}
</style>
