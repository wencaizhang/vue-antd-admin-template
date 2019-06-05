<template>
  <div>
    <PageLayout>
      <div slot="header">
        <p
          style="margin: 0;"
        >镜像（Image） 是基于主流的操作系统的进行定制，用于实例创建的模板。用户也可以基于己有镜像创建主机，也可以将自有主机捕获为新镜像，以备后用。</p>
        <a-tabs
          defaultActiveKey="imageSource"
          @change="handleTabChange"
          style="position:relative; top: 17px;"
        >
          <a-tab-pane tab="系统" key="0"></a-tab-pane>
          <a-tab-pane tab="自有" key="1"></a-tab-pane>
        </a-tabs>
      </div>
      <div class="content">
        <div class="table-operator" style="margin-bottom: 16px;">
          <a-row type="flex" justify="space-between">
            <a-col>
              <p v-show="imageSource == 0">系统：是友普官方基于主流的Linux，Windows提供的镜像模板，并与上游厂商的更新保持及时更新。</p>
              <p v-show="imageSource == 1">自有：是用户自己上传或者将云主机制作为镜像模板，用于日后创建云主机使用。</p>
            </a-col>
            <a-col>
              <a-row type="flex" justify="space-between">
                <a-button icon="sync" :disabled="loading" @click="handleRefresh" style="margin-right: 10px;" title="刷新"></a-button>
                <a-button
                  type="primary"
                  style="margin-right: 10px;"
                  icon="plus"
                  @click="handleSingleMenuClick('create')"
                >创建镜像</a-button>
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
          <template slot="detail" slot-scope="text, record">
            <a title="点击查看镜像属性" @click="handleSingleMenuClick('detail', record)">{{text}}</a>
          </template>

          <template slot="operation" slot-scope="text, record">
            <a-dropdown style="margin-right: 10px;">
              <a-menu slot="overlay" @click="handleSingleMenuClick($event.key, record)">
                <a-menu-item
                  v-for="item in singleMenuOptions"
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
    </PageLayout>
    <CreateModal />
    <EditModal />
    <Delete />
    <DetailModal />
    <Update />
  </div>
</template>

<script>
import CreateModal from "./Modal/Create";
import EditModal from "./Modal/Edit";
import Delete from "./Modal/Delete";
import DetailModal from "./Modal/Detail";
import Update from "./Modal/Update";
import PageLayout from "@/components/Layout/PageLayout.vue";

import tablePageMixins from "@/mixins/tablePageMixins";

import { getImageList as getList } from "@/api/compute/images";

import images from '@/i18n/zh/images';
const statusDicts = images.images.status

export default {
  mixins: [tablePageMixins],
  components: {
    CreateModal,
    EditModal,
    Delete,
    DetailModal,
    Update,
    PageLayout
  },
  data() {
    return {
      getList,
      module: "compute",
      id: "mirror",
      name: "镜像",
      imageSource: 0,
      selectedRowData: {},
      imageFormatList: [
        { label: "原始", value: "raw" },
        { label: "VHD - 虚拟硬盘", value: "vhd" },
        { label: "VMDK - 虚拟机磁盘", value: "vmdk" },
        { label: "VDI - 虚拟磁盘镜像", value: "vdi" },
        { label: "ISO - 光盘镜像", value: "iso" },
        { label: "QCOW2 - QEMU 模拟器", value: "qcow2" },
        { label: "AKI - Amazon 内核镜像", value: "aki" },
        { label: "ARI - Amazon Ramdisk 镜像", value: "ari" },
        { label: "AMI - Amazon 机器镜像", value: "ami" },

        // { label: "OVA - 开放式虚拟设备", value: "ova" },
        // { label: "PLOOP - Virtuozzo/并行环回磁盘", value: "ploop" },
        // { label: "Docker", value: "docker" },
      ],
    };
  },
  computed: {
    columns() {
      const data = this.$store.state[this.module][this.id].columns;
      // 系统镜像，没有操作列
      return this.imageSource == 0 ? data.slice(0, -1) : data;
    },
  },
  methods: {
    handleTabChange(v) {
      // 镜像类型[0:系统镜像 1:自有镜像 2:共享镜像]
      this.imageSource = v;
      this.data = [];
      this.fetch();
    },
    __handleTransformToZh (status) {
      return statusDicts[status.toLowerCase()] || status
    },
    transform (limit) {
      // 小于0.1 KB，则转化成 B
      // 小于0.1 MB，则转化成 KB
      // 小于0.1 GB，则转化成 MB
      // 其他转化成 GB
      const map = [
        { suffix: 'B',  value: 1,                      maxValue: 0.1 * 1024,                },
        { suffix: 'KB', value: 1 * 1024,               maxValue: 0.1 * 1024 * 1024,         },
        { suffix: 'MB', value: 1 * 1024 * 1024,        maxValue: 0.1 * 1024 * 1024 * 1024,  },
        { suffix: 'GB', value: 1 * 1024 * 1024 * 1024, maxValue: Infinity,                  },
      ];
      const item = map.find(item => item.maxValue > limit);
      const ret = (limit / item.value).toFixed(2) + item.suffix;

      return ret;

    },
    handleParseData (data) {
      const ret = data.filter(item => {
        return this.imageSource == 0 && item.isPublic === 'public'
          || this.imageSource == 1 && item.isPublic !== 'public';
      })
      const { imageFormatList } = this;
      ret.forEach(item => {
        const imageFormat_zh = (imageFormatList.find(aaa => aaa.value === item.imageFormat) || {}).label;
        const status_zh = this.__handleTransformToZh(item.status)
        const imageType_zh = item.imageType === 'snapshoot' ? '快照' : '镜像';
        const capacity_zh = this.transform(item.capacity == '无' ? 0 : item.capacity)
        Object.assign(item, {
          imageFormat_zh,
          status_zh,
          imageType_zh,
          capacity_zh,
        })
      })
      return ret;
    },
  }
};
</script>

<style scoped>
.ant-tabs-bar {
  margin: 0;
}
</style>
