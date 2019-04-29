
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="添加规则"
      okText="添加"
    >
      <a-form :form="form">

        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="规则：" :onValuesChange="onValuesChange">
          <a-select
            @change="handleChangeRuleType"
            placeholder="请选择规则！"
            v-decorator="[
              'protocol',
              {
                initialValue: 0,
                rules: [{ required: true, message: '请选择规则！' }]
              }
            ]"
          >

            <a-select-option
              v-for="item of procotol"
              :key="item.value"
              :value="item.value"
            >{{ item.label }}</a-select-option>

          </a-select>
        </a-form-item>

        <template v-if="directionVisible">
          <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="方向：">
            <a-select
              placeholder="请选择方向！"
              v-decorator="[
                'direction',
                {
                  initialValue: 'ingress',
                  rules: [{ required: true, message: '请选择方向！' }]
                }
              ]"
            >
              <a-select-option value="ingress">入口</a-select-option>
              <a-select-option value="egress">出口</a-select-option>
            </a-select>
          </a-form-item>
        </template>

        <template v-if="portVisible">
          <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="端口类型：">
            <a-select
              @change="v => portType = v"
              placeholder="请选择端口类型！"
              v-decorator="[
                'portType',
                {
                  initialValue: portType,
                  rules: [{ required: true, message: '请选择端口类型！' }]
                }
              ]"
            >
              <a-select-option :value="1">端口</a-select-option>
              <a-select-option :value="2">端口范围</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            v-if="portType === 1"
            label="端口号："
            :labelCol="formItemLayout.labelCol"
            :wrapperCol="formItemLayout.wrapperCol"
          >
            <a-input-number
              :min="1"
              :max="65535"
              v-decorator="[
                'portRangeMin',
                {
                  rules: [
                    { required: true, message: '请输入端口号!' },
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item
            v-if="portType === 2"
            label="起始端口号："
            :labelCol="formItemLayout.labelCol"
            :wrapperCol="formItemLayout.wrapperCol"
          >
            <a-input-number
              :min="1"
              :max="65535"
              v-decorator="[
                'portRangeMin',
                {
                  rules: [
                    { required: true, message: '请输入起始端口号!' },
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item
            v-if="portType === 2"
            label="终止端口号："
            :labelCol="formItemLayout.labelCol"
            :wrapperCol="formItemLayout.wrapperCol"
          >
            <a-input-number
              :min="1"
              :max="65535"
              v-decorator="[
                'portRangeMax',
                {
                  rules: [
                    { required: true, message: '请输入终止端口号!' },
                  ]
                }
              ]"
            />
          </a-form-item>
        </template>

        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="远程：">
          <a-select
            @change="handleChangeRemoteType"
            placeholder="请选择远程！"
            v-decorator="[
              'remote',
              {
                initialValue: remote,
                rules: [{ required: true, message: '请选择远程！' }]
              }
            ]"
          >
            <a-select-option value="cidr">CIDR</a-select-option>
            <a-select-option value="group">安全组</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          v-if="remote === 'group'"
          :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="安全组：">

          <a-spin :spinning="isFetchGroupList">
            <a-select
              placeholder="请选择安全组！"
              v-decorator="[
                'remoteGroupId',
                {
                  rules: [{ required: true, message: '请选择安全组！' }]
                }
              ]"
            >
              <a-select-option
                v-for="item in groupList"
                :value="item.id"
                :key="item.id"
              >{{ item.name }}</a-select-option>
            </a-select>
          </a-spin>
        </a-form-item>
        <a-form-item
          v-if="remote === 'group'"
          :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="IP类型：">
          <a-select
            placeholder="请选择IP类型！"
            v-decorator="[
              'etherType',
              {
                initialValue: 'IPv4',
                rules: [{ required: true, message: '请选择IP类型！' }]
              }
            ]"
          >
            <a-select-option value="IPv4">IPv4</a-select-option>
            <a-select-option value="IPv6">IPv6</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          v-if="remote === 'cidr'"
          label="CIDR："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'remoteIpPrefix',
              {
                rules: [
                  { required: true, message: '请输入CIDR!' },
                ]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { addRule as fetchAPI, getGroupList } from '@/api/security/index';
import { rulesObj } from '@/utils/util';
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      rulesObj,
      fetchAPI,
      name: "create",
      procotol: [
        { value: 0, label : '定制TCP规则' },
        { value: 1, label : '定制UDP规则' },
        { value: 2, label : '定制ICMP规则' },
        // { value: 3, label : '其他协议' },
        { value: 5, label : 'ALL TCP' },
        { value: 6, label : 'ALL UDP' },
        { value: 4, label : 'ALL ICMP' },
        { value: 9, label : 'HTTPS' },
        { value: 8, label : 'HTTP' },
        { value: 7, label : 'DNS' },
        { value: 18, label : 'SMTP' },
        { value: 19, label : 'SMTPS' },
        { value: 15, label : 'POP3' },
        { value: 16, label : 'POP3S' },
        { value: 12, label : 'LDAP' },
        { value: 14, label : 'MYSQL' },
        { value: 13, label : 'MS SQL' },
        // { value: 17, label : 'RDP' },
        // { value: 20, label : 'SSH' },
        { value: 10, label : 'IMAP' },
        { value: 11, label : 'IMAPS' },
      ],
      portVisible: true,
      directionVisible: true,
      remote: 'cidr',
      portType: 1,
      groupList: [],
      isFetchGroupList: false,
    };
  },
  methods: {
    handleChangeRuleType (value) {
      const arr = [
        { reg: /定制/, type: 'custom' },
        { reg: /ALL/, type: 'all' },
        { reg: /./, type: 'assign' },
      ]
      const label = this.procotol.find(item => item.value === value).label;
      const item = arr.find(item => item.reg.test(label));
      this.directionVisible = ['custom', 'all'].includes(item.type);
      this.portVisible = ['custom'].includes(item.type);
      return item.type;
    },
    handleChangeRemoteType (value) {
      this.remote = value;
    },
    onShow () {
      this.fetchGroupList();
    },

    async fetchGroupList () {
      this.isFetchGroupList = true;
      try {
        const resp = await getGroupList();
        this.groupList = resp.data;
        this.isFetchGroupList = false;
      } catch (error) {
        this.$message.error('请求失败')
      }
    },
    handleFormValues () {
      if (this.portType === 1) {
        // 没有端口类型字段，端口范围对应的就是端口的最大最小值
        // 指定端口号的话把最大值最小值填写成一样的就行
        this.formValues.portRangeMax = this.formValues.portRangeMin;
      }
      delete this.formValues.remote;
      delete this.formValues.portType;

      this.formValues.securityGroupId = this.$parent.payload.secGroupId;
    },
    handleCreate() {
      const self = this;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          self.formValues = Object.assign({}, self.formValues, values);
          self.handleFormValues();
          self.handleFetch();
        }
      });
    },
  },
};
</script>

