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
              <a-menu slot="overlay" @click="handleSingleMenuClick(record.key)">
                <a-menu-item v-for="(item, index) in singleOperations" :key="index">{{ item.text }}</a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px">操作
                <a-icon type="down"/>
              </a-button>
            </a-dropdown>
          </template>
        </a-table>
      </div>
    </page-layout>
    <router-view></router-view>
  </div>
</template>

<script>
import PageLayout from "@/components/Layout/PageLayout.vue";
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
    PageLayout
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
      selectedRowKeys: [],
      batchOperations: [
        { text: "删除" },
        { text: "重启" },
        { text: "软重启" }
      ],
      singleOperations: [
        { text: "创建快照" },
        { text: "绑定公网IP" },
        { text: "解绑公网IP" },
        { text: "进入控制台" },
        { text: "重建云主机" },
        { text: "编辑安全组" },
        { text: "删除云主机" }
      ]
    };
  },
  computed: {
    message() {
      let len = this.selectedRowKeys.length;
      return `已选择 ${len} 项`;
    }
  },
  methods: {
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
    handleSingleMenuClick(key) {
      console.log("key", key);
    }
  }
};
</script>

<style>
.shut-down i {
  background: #fff;
}
</style>
