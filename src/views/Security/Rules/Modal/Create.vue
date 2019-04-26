
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

        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="规则：">
          <a-select
            placeholder="请选择规则！"
            v-decorator="[
              'portIp',
              {
                initialValue: '',
                rules: [{ required: true, message: '请选择规则！' }]
              }
            ]"
          >
            <a-select-option value="定制TCP规则">定制TCP规则</a-select-option>
            <a-select-option value="定制UDP规则">定制UDP规则</a-select-option>
            <a-select-option value="定制ICMP规则">定制ICMP规则</a-select-option>
            <a-select-option value="ALL TCP">ALL TCP</a-select-option>
            <a-select-option value="ALL UDP">ALL UDP</a-select-option>
            <a-select-option value="ALL ICMP">ALL ICMP</a-select-option>
            <a-select-option value="HTTPS">HTTPS</a-select-option>
            <a-select-option value="HTTP">HTTP</a-select-option>
            <a-select-option value="DNS">DNS</a-select-option>
            <a-select-option value="SMTP">SMTP</a-select-option>
            <a-select-option value="SMTPS">SMTPS</a-select-option>
            <a-select-option value="POP3">POP3</a-select-option>
            <a-select-option value="POP3S">POP3S</a-select-option>
            <a-select-option value="LDAP">LDAP</a-select-option>
            <a-select-option value="MYSQL">MYSQL</a-select-option>
            <a-select-option value="MS SQL">MS SQL</a-select-option>
            <a-select-option value="IMAP">IMAP</a-select-option>
            <a-select-option value="IMAPS">IMAPS</a-select-option>

          </a-select>
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="方向：">
          <a-select
            placeholder="请选择方向！"
            v-decorator="[
              'portIp',
              {
                initialValue: '',
                rules: [{ required: true, message: '请选择方向！' }]
              }
            ]"
          >
            <a-select-option value="ingress">入口</a-select-option>
            <a-select-option value="egress">出口</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="端口类型：">
          <a-select
            placeholder="请选择端口类型！"
            v-decorator="[
              'portIp',
              {
                initialValue: '',
                rules: [{ required: true, message: '请选择端口类型！' }]
              }
            ]"
          >
            <a-select-option value="ingress">端口</a-select-option>
            <a-select-option value="egress">端口范围</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="端口号："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input-number
            :min="1"
            v-decorator="[
              'port',
              {
                rules: [
                  { required: true, message: '请输入端口号!' },
                  rulesObj.name,
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="起始端口号："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input-number
            :min="1"
            v-decorator="[
              'portRangeMin',
              {
                rules: [
                  { required: true, message: '请输入起始端口号!' },
                  rulesObj.name,
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="终止端口号："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input-number
            :min="1"
            v-decorator="[
              'portRangeMax',
              {
                rules: [
                  { required: true, message: '请输入终止端口号!' },
                  rulesObj.name,
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="远程：">
          <a-select
            placeholder="请选择远程！"
            v-decorator="[
              'remote',
              {
                initialValue: '',
                rules: [{ required: true, message: '请选择远程！' }]
              }
            ]"
          >
            <a-select-option value="CIDR">CIDR</a-select-option>
            <a-select-option value="group">安全组</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="CIDR："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'cidr',
              {
                rules: [
                  { required: true, message: '请输入CIDR!' },
                  rulesObj.name,
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
import { create as fetchAPI } from '@/api/security/index';
import { rulesObj } from '@/utils/util';
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      rulesObj,
      fetchAPI,
      name: "create"
    };
  },
  methods: {

  },
};
</script>

