<template>
  <div>
    <a-form :autoFormCreate="(form)=>{this.form = form }">
      <a-form-item
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 12 }"
        label="可用区"
        fieldDecoratorId="可用区"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择一个可用区!' }]}"
      >
        <a-radio-group buttonStyle="solid">
          <a-radio-button value="large">北京1区</a-radio-button>
          <a-radio-button value="default">北京2区</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 12 }"
        label="CPU"
        fieldDecoratorId="cpu"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择一个CPU!' }]}"
      >
        <a-radio-group buttonStyle="solid">
          <a-radio-button
            v-for="item in optionList.cpu"
            :key="item.value"
            :value="item.value"
          >{{item.text}}</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 12 }"
        label="内存"
        fieldDecoratorId="memory"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择一个内存!' }]}"
      >
        <a-radio-group buttonStyle="solid">
          <a-radio-button
            v-for="item in optionList.memory"
            :key="item.value"
            :value="item.value"
          >{{item.text}}</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 12 }"
        label="系统盘"
        fieldDecoratorId="systemDisk"
        :fieldDecoratorOptions="{rules: [{  type: 'string', message: '请选择一个系统盘!' }]}"
      >
        <a-col :span="4">
          <a-input-number :min="1" :max="20"/>
        </a-col>
      </a-form-item>
      <a-form-item
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 12 }"
        label="硬盘"
        fieldDecoratorId="systemDisk"
        :fieldDecoratorOptions="{rules: [{  type: 'string', message: '请选择一个系统盘!' }]}"
      >
        <a-alert type="info" showIcon style="margin-bottom: 16px; text-align: left;">
          <div slot="message">
            已选择&nbsp;
            <a style="font-weight: 600">{{ selectedDiskRowKeys.length }}</a>&nbsp;&nbsp;项
            <a style="margin-left: 24px" @click="onDiskClearSelected">清空</a>
          </div>
        </a-alert>
        <a-table
          bordered
          :rowSelection="{selectedRowKeys: selectedDiskRowKeys, onChange: onDiskSelectChange}"
          :columns="columns"
          :rowKey="record => record.login.uuid"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
        ></a-table>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
const optionList = {
  memory: [
    { text: "1G", value: "1G" },
    { text: "2G", value: "2G" },
    { text: "4G", value: "4G" },
    { text: "8G", value: "8G" },
    { text: "12G", value: "12G" },
    { text: "16G", value: "16G" },
    { text: "32G", value: "32G" },
    { text: "48G", value: "48G" },
    { text: "64G", value: "64G" }
  ],
  cpu: [
    { text: "1核", value: "1核" },
    { text: "2核", value: "2核" },
    { text: "4核", value: "4核" },
    { text: "8核", value: "8核" },
    { text: "12核", value: "12核" },
    { text: "24核", value: "24核" },
    { text: "32核", value: "32核" }
  ],
  mirror: [
    { text: "Centos6.5_X86_64bit", value: "Centos6.5_X86_64bit" },
    { text: "Centos6.6_X86_64bit", value: "Centos6.6_X86_64bit" },
    { text: "Centos7.1_X86_64bit", value: "Centos7.1_X86_64bit" },
    { text: "Centos7.2_X86_64bit", value: "Centos7.2_X86_64bit" },
    { text: "Centos7.4_X86_64bit", value: "Centos7.4_X86_64bit" },
    { text: "Centos7.5_X86_64bit", value: "Centos7.5_X86_64bit" },
    { text: "Ubuntu14.04_x86_64bit", value: "Ubuntu14.04_x86_64bit" },
    { text: "Ubuntu16.04_X86_64bit", value: "Ubuntu16.04_X86_64bit" },
    {
      text: "Window Server2008 R2 64bit",
      value: "Window Server2008 R2 64bit"
    },
    {
      text: "Window Server2012 R2 64bit",
      value: "Window Server2012 R2 64bit"
    }
  ]
};

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
    title: "子网",
    dataIndex: "login.password"
  },
  {
    title: "类型",
    dataIndex: "id.name"
  }
];
export default {
  mounted() {
    this.fetch();
  },
  data() {
    return {
      data: [],
      columns,
      loading: false,
      systemDisk: 1,
      optionList,
      pagination: {
        showSizeChanger: true
      },
      forms: [],
      selectedDiskRowKeys: []
    };
  },
  methods: {
    submitForm() {
      this.form.validateFields((err, values) => {
        if (!err) {
          // 硬盘需要单独处理
          if (!this.selectedDiskRowKeys.length) {
            this.$message.warn("请至少选择一个硬盘");
            return false;
          }
          this.$emit("next", {
            step2: Object.assign({}, values, {
              selectedDiskRowKeys: this.selectedDiskRowKeys
            })
          });
        }
      });
    },
    handleSliderChange(value) {
      this.systemDisk = value;
    },
    handleInputChange(value) {
      console.log("changed", value);
    },
    onDiskSelectChange(selectedRowKeys) {
      this.selectedDiskRowKeys = selectedRowKeys;
    },
    onDiskClearSelected() {
      this.selectedDiskRowKeys = [];
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
    }
  }
};
</script>
<style>
</style>