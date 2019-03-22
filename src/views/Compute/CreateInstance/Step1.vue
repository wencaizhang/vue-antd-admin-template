<template>
  <div>
    <a-form :form="form">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="可用区">
        <a-radio-group
          buttonStyle="solid"
          v-decorator="[
            'regionId',
            {
              initialValue: '1',
              rules: [{ required: true, message: '请选择一个可用区!' }]
            }
          ]"
        >
          <a-radio-button value="1">北京1区</a-radio-button>
          <a-radio-button value="2">北京2区</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="CPU">
        <a-radio-group
          buttonStyle="solid"
          v-decorator="[
            'cpu',
            {
              initialValue: 1,
              rules: [{ required: true, message: '请选择一个CPU!' }]
            }
          ]"
        >
          <a-radio-button
            v-for="item in optionList.cpu"
            :key="item.value"
            :value="item.value"
          >{{item.text}}</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="内存">
        <a-radio-group
          buttonStyle="solid"
          v-decorator="[
            'memory',
            {
              initialValue: 1,
              rules: [{ required: true, message: '请选择一个内存!' }]
            }
          ]"
        >
          <a-radio-button
            v-for="item in optionList.memory"
            :key="item.value"
            :value="item.value"
          >{{item.text}}</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="系统盘">
        <a-col>
          <a-input-number
            v-decorator="[
            'systemDisk',
            {  
              initialValue: 40,
              rules: [{ required: true, message: '请填写系统盘大小!' }]
            }
          ]"
            :min="40"
            :max="200"
            :formatter="value => value ? `${value} G` : '' "
            :parser="value => value.replace(' G', '')"
          />
        </a-col>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="硬盘"
        :fieldDecoratorOptions="{rules: [{  type: 'string', message: '请选择一个硬盘!' }]}"
      >
        <a-alert type="info" showIcon style="margin-bottom: 16px; text-align: left;">
          <div slot="message">
            已选择&nbsp;
            <a style="font-weight: 600">{{ selectedNetworkRowKeys.length }}</a>&nbsp;&nbsp;项
            <a style="margin-left: 24px" @click="selectedNetworkRowKeys = []">清空</a>
          </div>
        </a-alert>
        <a-table
          bordered
          :rowSelection="{selectedRowKeys: selectedNetworkRowKeys, onChange: onDiskSelectChange}"
          :columns="columns"
          :rowKey="record => record.id"
          :dataSource="diskList"
          :pagination="pagination"
          :loading="loading"
        ></a-table>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { getDiskList } from '@/api/store/disk'
const optionList = {
  memory: [
    { text: "1G", value: 1 },
    { text: "2G", value: 2 },
    { text: "4G", value: 4 },
    { text: "8G", value: 8 },
    { text: "12G", value: 12 },
    { text: "16G", value: 16 },
    { text: "32G", value: 32 },
    { text: "48G", value: 48 },
    { text: "64G", value: 64 }
  ],
  cpu: [
    { text: "1核", value: 1 },
    { text: "2核", value: 2 },
    { text: "4核", value: 4 },
    { text: "8核", value: 8 },
    { text: "12核", value: 12 },
    { text: "24核", value: 24 },
    { text: "32核", value: 32 }
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
    dataIndex: "id"
  },
  {
    title: "名称",
    dataIndex: "name"
  },
  {
    title: "大小（G）",
    dataIndex: "capacity"
  },
  {
    title: "类型",
    dataIndex: "type"
  },
  {
    title: "状态",
    dataIndex: "status"
  }
];
export default {
  mounted() {
    this.fetchDiskList();
  },
  data() {
    return {
      form: this.$form.createForm(this),
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
      diskList: [],
      columns,
      loading: false,
      systemDisk: 1,
      optionList,
      pagination: {
        showSizeChanger: true
      },
      selectedNetworkRowKeys: []
    };
  },
  methods: {
    handleSubmit() {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          err ? reject(err) : resolve(Object.assign({}, values, {
              dataDisk: this.selectedNetworkRowKeys,
              memory: values.memory * 1024,
              // 接口需要内存单位为 M
            }));
        });
      })
    },
    handleSliderChange(value) {
      this.systemDisk = value;
    },
    handleInputChange(value) {
      console.log("changed", value);
    },
    onDiskSelectChange(selectedRowKeys) {
      this.selectedNetworkRowKeys = selectedRowKeys;
    },
    async fetchDiskList() {
      this.loading = true;
      try {
        // status: 状态[0:使用中 1:可挂载]
        const resp = await getDiskList({ status: 1 });
        this.diskList = resp.data;
      } catch (error) {
        
      } finally {
        this.loading = false;
      }
    },
  }
};
</script>
<style>
</style>
