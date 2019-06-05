<template>
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
              type="danger"
              :disabled="!selectedRowKeys.length"
              @click="handleMultiMenuClick('multiDelete')"
              style="margin-right: 10px;"
            >
              删除
            </a-button>
          </a-row>
        </a-col>
        <a-col>
          <div style="display: inline-block; vertical-align: top;">
            <a-input-group compact class="compact-search-input">
              <a-select @change="v => searchValues.type = v" v-model="searchValues.type" style="width: 90px!important;">
                <a-select-option value="name">名称</a-select-option>
              </a-select>
              <a-input
                style="width: 200px"
                @pressEnter="handleDATA"
                v-model="searchValues.inputValue"
              />
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
              v-for="item in record.singleMenuOptions"
              :key="item.id"
            >
              {{ item.name }}
            </a-menu-item>
          </a-menu>
          <a-button :disabled="!record.singleMenuOptions.length" style="margin-left: 8px">
            操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </template>
    </a-table>

    <create-modal />
    <edit-modal />
    <uninstall />
    <dilatation />
    <mount />
    <create-snapshoot />
    <create-backups />
    <clone-modal />
    <upload />
    <delete />
    <multi-delete />
    <change-disk-type />
    <detail />
  </div>
</template>

<script>
import CreateModal from "./Modal/Create";
import EditModal from "./Modal/Edit";
import Uninstall from "./Modal/Uninstall";
import Dilatation from "./Modal/Dilatation";
import Mount from "./Modal/Mount";
import CreateSnapshoot from "./Modal/CreateSnapshoot";
import CreateBackups from "./Modal/CreateBackups";
import Delete from "./Modal/Delete";
import MultiDelete from "./Modal/MultiDelete";
import CloneModal from "./Modal/Clone";
import Upload from "./Modal/Upload";
import ChangeDiskType from "./Modal/ChangeDiskType";
import Detail from "./Modal/Detail";

import tablePageMixins from "@/mixins/tablePageMixins";

import { getDiskList as getList, getDiskDetail } from "@/api/store/disk";
import disk from '@/i18n/zh/disk'
const statusDicts = disk.disk.status;

export default {
  mixins: [tablePageMixins],
  components: {
    CreateModal,
    EditModal,
    Uninstall,
    Dilatation,
    Mount,
    CreateSnapshoot,
    CreateBackups,
    Delete,
    MultiDelete,
    CloneModal,
    Upload,
    ChangeDiskType,
    Detail
  },
  mounted() {
    if (this.$route.matched.length === 4) {
      this.$route.meta.title = "硬盘实例";
    }
  },
  data() {
    return {
      getList,
      module: "store",
      id: "disk",
      name: "硬盘",
      searchValues: {
        type: 'name',
        inputValue: '',
        status: 'all',
      },
      traceList: [],

      // 短时间内不会发生变化的状态，无须轮询的状态
      staticStatus: [ 'available', 'error-restoring', 'in-use', 'error_restoring'],

      diskTypes: {
        ssd: 'SSD',
        hdd: '普通'
      }
    };
  },
  computed: {},
  methods: {
    __handleTransformToZh (status) {
      return statusDicts[status] || '等待中'
    },
    __handleFilterOptions ({ status }) {
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
    handleParseData (data) {
      const temp =  data;

      // 全部状态
      // available, attaching, backing_up, creating, deleting,
      // downloading, uploading, error, error_deleting, error_restoring,
      // in_use, restoring_backup, detaching, unrecognized;

      const traceList = data.filter(item => !this.staticStatus.includes(item.status));

      traceList.forEach(item => {
        this.traceDiskStatus(item);
      })

      temp.forEach(item => {
        let status_zh = this.__handleTransformToZh(item.status)
        let type_zh = this.diskTypes[ item.type ] || '无';
        Object.assign(item, {
          status_zh,
          type_zh,
          bootable_zh: item.bootable ? '是' : '否',
          singleMenuOptions: [ ...this.__handleFilterOptions(item) ],
        })
      });

      return temp;
    },
    async traceDiskStatus (currItem) {
      try {
        const resp = await getDiskDetail(currItem.id);
        const currStatus = resp.hardDisk.status;
        if (!this.staticStatus.includes(currStatus)) {
          this.traceDiskStatus(currItem);
        } else {
          const item = this.data.find(item2 => currItem.id === item2.id);
          Object.assign(item, resp.hardDisk, {
            status: currStatus,
            status_zh: this.__handleTransformToZh(currStatus),
            singleMenuOptions: [ ...this.__handleFilterOptions({ status: currStatus}) ],
          });
          Object.keys(item).forEach(key => {
            item[key] = item[key] || '无';
          })
          console.log(item)
        }
      } catch (error) {
        if (error.response.status === 404) {
          // this.$message.success(error.response.data.desc || '删除成功');
          const index = this.data.findIndex(item2 => currItem.id === item2.id);
          this.data.splice(index, 1);
        }
      }
    }

  }
};
</script>

<style>
.ant-tabs-bar {
  margin: 0;
}
</style>
