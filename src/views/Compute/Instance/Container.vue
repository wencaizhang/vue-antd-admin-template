<template>
  <div>
    <page-layout>
      <div class="content">
        <div class="table-operator" style="margin-bottom: 16px;">
          <a-button type="primary" style="margin-right: 10px;" icon="plus" @click="handleCreate">新建</a-button>
          <a-button type="primary" style="margin-right: 10px;" icon="caret-right">启动</a-button>
          <a-button type="primary" style="margin-right: 10px;" icon="plus" class="shut-down">关机</a-button>
          <a-dropdown @click="handleMenuClick" style="margin-right: 10px;">
            <a-menu slot="overlay">
              <a-menu-item v-for="(item, index) in batchOperations" :key="index">{{ item.text }}</a-menu-item>
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
          :rowKey="record => record.login.uuid"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
          <template slot="operation" slot-scope="text, record">
            <a-dropdown style="margin-right: 10px;">
              <a-menu slot="overlay" @click="handleSingleMenuClick(record, $event)">
                <a-menu-item v-for="(item, index) in singleOperations" :key="index">{{ item.text }}</a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px">操作
                <a-icon type="down"/>
              </a-button>
            </a-dropdown>
          </template>
        </a-table>
      </div>
      <create-snapshoot-modal
        :visible="singleOperations[0].showModal"
        :data="selectedRowData"
        v-on:cancel="singleOperations[0].showModal = false"
        v-on:success="update"
      />
      <bind-IP-modal
        :visible="singleOperations[1].showModal"
        :data="selectedRowData"
        v-on:cancel="singleOperations[1].showModal = false"
        v-on:success="update"
      />
      <rebuild-cloud-host-modal
        :visible="singleOperations[4].showModal"
        :data="selectedRowData"
        v-on:cancel="singleOperations[4].showModal = false"
        v-on:success="update"
      />
      <edit-security-group-modal
        :visible="singleOperations[5].showModal"
        :data="selectedRowData"
        v-on:cancel="singleOperations[5].showModal = false"
        v-on:success="update"
      />
      <overview-modal
        :visible="singleOperations[7].showModal"
        :data="selectedRowData"
        v-on:cancel="singleOperations[7].showModal = false"
        v-on:success="update"
      />
    </page-layout>
  </div>
</template>

<script>
import PageLayout from "@/components/Layout/PageLayout.vue";

import CreateSnapshootModal from "./Modals/CreateSnapshootModal";
import BindIPModal from "./Modals/BindIPModal";
import RebuildCloudHostModal from "./Modals/RebuildCloudHostModal";
import EditSecurityGroupModal from "./Modals/EditSecurityGroupModal";
import OverviewModal from "./Modals/OverviewModal";

const columns = [
  {
    title: "ID",
    dataIndex: "cell"
  },
  {
    title: "名称",
    dataIndex: "name.first"
  },
  {
    title: "状态",
    dataIndex: "phone",
    filters: [
      { text: "等待中", value: "等待中" },
      { text: "运行中", value: "运行中" },
      { text: "已暂停", value: "已暂停" },
      { text: "已关闭", value: "已关闭" },
      { text: "已删除", value: "已删除" },
      { text: "重启中", value: "重启中" }
    ],
    filterMultiple: false
  },
  {
    title: "区域",
    dataIndex: "dob.age",
    filters: [
      { text: "北京一区", value: "北京一区" },
      { text: "北京二区", value: "北京二区" }
    ],
    filterMultiple: false
  },
  {
    title: "映像",
    dataIndex: "id.name"
  },
  {
    title: "规格",
    dataIndex: "id.value"
  },
  {
    title: "网络",
    dataIndex: "login.password"
  },
  {
    title: "公网IP",
    dataIndex: "name.title"
  },
  {
    title: "安全组",
    dataIndex: "gender"
  },
  {
    title: "创建时间",
    dataIndex: "email"
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

export default {
  components: {
    PageLayout,
    CreateSnapshootModal,
    BindIPModal,
    RebuildCloudHostModal,
    EditSecurityGroupModal,
    OverviewModal
  },
  mounted() {
    this.fetch();
  },
  data() {
    return {
      data: [],
      pagination: {
        showSizeChanger: true
      },
      loading: false,
      columns,
      selectedRowKeys: [], // 多行选择
      selectedRowData: null, // 当行操作
      batchOperations: [{ text: "删除" }, { text: "重启" }, { text: "软重启" }],
      singleOperations: [
        { showModal: false, text: "创建快照" },
        { showModal: false, text: "绑定公网IP" },
        { showModal: false, text: "解绑公网IP" },
        { showModal: false, text: "进入控制台" },
        { showModal: false, text: "重建云主机" },
        { showModal: false, text: "编辑安全组" },
        { showModal: false, text: "删除云主机" },
        { showModal: false, text: "查看主机状况" }
      ],
      selectedOperationKey: 0
    };
  },
  computed: {
    message() {
      let len = this.selectedRowKeys.length;
      return `已选择 ${len} 项`;
    }
  },
  methods: {
    update() {
      console.log("update");
      this.singleOperations[this.selectedOperationKey].showModal = false;
      this.openNotification();
    },
    openNotification() {
      this.$notification.open({
        message: "提醒",
        description: "创建成功，数据已更新",
        icon: <a-icon type="check-circle" style="color: #52c41a" />
      });
    },
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },
    fetch(params = {}) {
      this.loading = true;
      let url = "https://randomuser.me/api";
      this.$http
        .get(url, {
          params: {
            results: 10,
            ...params
          }
        })
        .then(data => {
          const pagination = { ...this.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = 200;
          this.loading = false;
          this.data = data.results;
          this.pagination = pagination;
        });
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
      console.log(this.selectedRowKeys);
    },
    onSearch(value) {
      console.log(value);
    },
    handleMenuClick(e) {
      let key = e.key;
      console.log(this.operations[key]);
    },
    handleCreate() {
      this.$router.push({ name: "CreateInstance" });
    },
    handleDeleteCloudHost(record) {
      this.$confirm({
        title: "您已经选择了云主机“VM1”，即将删除此云主机，请确认你的操作。",
        iconType: "warning",
        okText: '删除',
        okType: 'danger',
        // content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log("Oops errors!"));
        },
        onCancel() {}
      });
    },
    handleUnBindIP (record) {
      this.$confirm({
        title: "您已经选择了云主机“VM1”，其绑定的公网IP将被解绑，请确认你的操作。",
        iconType: "warning",
        okText: '解绑',
        okType: 'danger',
        // content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log("Oops errors!"));
        },
        onCancel() {}
      });
    },
    handleSingleMenuClick(record, { key }) {
      // 针对单项数据操作
      console.log("key", key, typeof key);
      console.log("当前行的数据是：", record);
      switch (key) {
        case 2:
          // 解绑IP
          this.handleUnBindIP(record);
          break;
        case 3:
          // 进入控制台

          break;
        case 6:
          // 删除云主机
          this.handleDeleteCloudHost(record);
          break;

        default:
          this.selectedOperationKey = key;
          this.singleOperations[key].showModal = true;
          this.selectedRowData = record;
          break;
      }
    }
  }
};
</script>

<style>
.shut-down i {
  background: #fff;
}
</style>
