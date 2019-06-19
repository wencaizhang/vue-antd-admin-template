
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
      <a-form :form="form" class="create-modal-form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="规则">
          <a-select
            :getPopupContainer="getPopupContainer"
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
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <template v-if="createFormVisible[ruleType]['direction']">
          <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="方向">
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


        <a-form-item
          v-if="createFormVisible[ruleType]['ipName']"
          label="IP协议"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <div class="item-wrap">
            <a-input
              v-decorator="[
                'ipName',
                {
                  rules: [
                    { required: true, message: '请输入IP协议!' },
                  ]
                }
              ]"
            />
            &nbsp;
            <a-tooltip placement="top">
              <template slot="title">
                <span>请输入一个介于-1和255之间的整数（-1表示使用通配符）。</span>
              </template>
              <a-icon type="info-circle" />
            </a-tooltip>
          </div>
        </a-form-item>

        <template v-if="createFormVisible[ruleType]['port']">
          <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="端口类型">
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
            label="端口号"
            :labelCol="formItemLayout.labelCol"
            :wrapperCol="formItemLayout.wrapperCol"
          >
            <a-input-number
              :min="1"
              :max="65535"
              v-decorator="[
                'portNumber',
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
            label="起始端口号"
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
            label="终止端口号"
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

        <a-form-item
          v-if="createFormVisible[ruleType]['type']"
          label="类型"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <div class="item-wrap">
            <a-input-number
              :min="-1"
              :max="255"
              v-decorator="[
                'portRangeMin',
                {
                  rules: [
                    { required: true, message: '请输入类型!' },
                  ]
                }
              ]"
            />
            &nbsp;
            <a-tooltip placement="top">
              <template slot="title">
                <span>请输入ICMP类型值范围 (-1: 255)</span>
              </template>
              <a-icon type="info-circle" />
            </a-tooltip>
          </div>
        </a-form-item>
        <a-form-item
          v-if="createFormVisible[ruleType]['encoding']"
          label="编码"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <div class="item-wrap">
            <a-input-number
              :min="-1"
              :max="255"
              v-decorator="[
                'portRangeMax',
                {
                  rules: [
                    { required: true, message: '请输入编码!' },
                  ]
                }
              ]"
            />
            &nbsp;
            <a-tooltip placement="top">
              <template slot="title">
                <span>请输入ICMP代码范围 (-1: 255)</span>
              </template>
              <a-icon type="info-circle" />
            </a-tooltip>
          </div>
        </a-form-item>

        <a-form-item
          :labelCol="{ span: 8 }"
          :wrapperCol="{ span: 14 }"
          label="远程"
        >
          <div class="item-wrap">
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
            &nbsp;
            <a-tooltip placement="top">
              <template slot="title">
                <span>选择"CIDR"以指定允许来访的IP地址范围。如欲允许来自另一安全组所有成员的访问，请选择"安全组"。</span>
              </template>
              <a-icon type="info-circle" />
            </a-tooltip>
          </div>
        </a-form-item>
        <a-form-item
          v-if="remote === 'group'"
          :labelCol="{ span: 8 }"
          :wrapperCol="{ span: 14 }"
          label="安全组"
        >
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
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-spin>
        </a-form-item>
        <a-form-item
          v-if="remote === 'group'"
          :labelCol="{ span: 8 }"
          :wrapperCol="{ span: 14 }"
          label="IP类型"
        >
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
          label="CIDR"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          class="a-form-item"
        >
          <div class="item-wrap">
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
            &nbsp;
            <a-tooltip placement="top">
              <template slot="title">
                <span>无类别域间路由标记(CIDR, 例如 192.168.0.0/24，或者2001:db8::/128)</span>
              </template>
              <a-icon type="info-circle" />
            </a-tooltip>
          </div>
        </a-form-item>

        <h4 style="font-weight: bold; font-size: 18px;">描述：</h4>
        <p>
          实例可以关联安全组，组中的规则定义了允许哪些访问到达被关联的实例。安全组由以下三个主要组件组成：
        </p>
        <p>
          <strong>规则：</strong> 您可以指定期望的规则模板或者使用定制规则，选项有定制TCP规则、定制UDP规则或定制ICMP规则。
        </p>
        <p>
          <strong>打开端口/端口范围：</strong> 您选择的TCP和UDP规则可能会打开一个或一组端口.选择"端口范围"，您需要提供开始和结束端口的范围.对于ICMP规则您需要指定ICMP类型和代码.
        </p>
        <p>
          <strong>远程：</strong> 您必须指定允许通过该规则的流量来源。可以通过以下两种方式实现：IP地址块(CIDR)或者来源地址组(安全组)。如果选择一个安全组作为来访源地址，则该安全组中的任何实例都被允许使用该规则访问任一其它实例。
        </p>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { addRule as fetchAPI, getGroupList } from '@/api/security/index';
import { rulesObj } from '@/utils/util';

import createFormVisible from "./createVisible.js";

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
        { value: 3, label : '其他协议' },
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
        { value: 17, label : 'RDP' },
        { value: 20, label : 'SSH' },
        { value: 10, label : 'IMAP' },
        { value: 11, label : 'IMAPS' },
      ],

      remote: 'cidr',
      portType: 1,
      groupList: [],
      isFetchGroupList: false,

      createFormVisible,
      ruleType: 'custom',
    };
  },
  methods: {
    onShow () {
      this.fetchGroupList();
      Object.assign(this, {
        ruleType: 'custom',
        remote: 'cidr',
        portType: 1,
      });
    },
    handleChangeRuleType (value) {
      if (value == 3) {
        // 其他协议
        this.ruleType = 'other';
      } else if (value == 2) {
        // ICMP
        this.ruleType = 'icmp';
      } else {
        const arr = [
          { reg: /定制/, type: 'custom' },
          { reg: /ALL/, type: 'all' },
          { reg: /./, type: 'assign' },
        ]
        const label = this.procotol.find(item => item.value === value).label;
        this.ruleType = arr.find(item => item.reg.test(label))['type'];
      }
    },
    handleChangeRemoteType (value) {
      this.remote = value;
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
      if (this.createFormVisible[this.ruleType].port && this.portType === 1) {
        // 没有端口类型字段，端口范围对应的就是端口的最大最小值
        // 指定端口号的话把最大值最小值填写成一样的就行
        this.formValues.portRangeMax = this.formValues.portRangeMin = this.formValues.portNumber;
        delete this.formValues.portNumber;
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
    getPopupContainer() {
      return document.querySelector('.create-modal-form')
    }
  },
};
</script>

<style scoped>
p {
  margin-bottom: 5px;
}

.item-wrap {
  display: flex;
  align-items: center;
}

/* .a-form-item .ant-form-item-control-wrapper {
  padding-right: 16px;
} */
</style>
