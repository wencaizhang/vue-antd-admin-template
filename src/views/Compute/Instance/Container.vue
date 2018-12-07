<template>
  <div>
    <div class="table-operator" style="margin-bottom: 16px;">
      <a-button type="primary" style="margin-right: 10px;" icon="plus">新建</a-button>
      <a-button type="primary" style="margin-right: 10px;" icon="caret-right">启动</a-button>
      <a-button type="primary" style="margin-right: 10px;" icon="plus">关机</a-button>
      <a-dropdown @click="handleMenuClick" style="margin-right: 10px;">
        <a-menu slot="overlay">
          <a-menu-item v-for="(item, index) in operations" :key="index">
            {{ item.text }}
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
      <a-input-search placeholder="input search text" @search="onSearch" style="width: 200px" enterButton/>
    </div>
    <a-alert type="info" showIcon style="margin-bottom: 16px;">
      <div slot="message">
        已选择&nbsp;
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>&nbsp;&nbsp;项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
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
    </a-table>
  </div>
</template>

<script>
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
      { text: "状态", value: "状态" },
      { text: "等待中", value: "等待中" },
      { text: "运行中", value: "运行中" },
      { text: "已暂停", value: "已暂停" },
      { text: "已关闭", value: "已关闭" },
      { text: "已删除", value: "已删除" },
      { text: "重启中", value: "重启中" }
    ]
  },
  {
    title: "区域",
    dataIndex: "dob.age",
    filters: [
      { text: "北京一区", value: "北京一区" },
      { text: "北京二区", value: "北京二区" }
    ]
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
  }
];

export default {
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
      operations: [
        { text: '更多操作' },
        { text: '重启' },
        { text: '修改配置' },
        { text: '创建快照' },
        { text: '编辑安全组' },
        { text: '进入控制台' },
        { text: '绑定公网IP' },
        { text: '解绑公网IP' },
        { text: '查看主机概况' },
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
    onClearSelected() {
      this.selectedRowKeys = [];
    },
    onSearch (value) {
      console.log(value)
    },
    handleMenuClick (e) {
      let key = e.key;
      console.log(this.operations[key])
    },
  }
};
</script>

<style>
</style>
