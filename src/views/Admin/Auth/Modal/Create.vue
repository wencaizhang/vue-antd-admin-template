
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="添加人员"
      okText="添加"
    >
      <a-form :form="form">
        <a-form-item
          label="登 录 名"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            placeholder=""
            v-decorator="[
              'username',
              {
                rules: [
                  { required: true, message: '请输入真实姓名!' },
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="真实姓名"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            placeholder=""
            v-decorator="[
              'realName',
              {
                rules: [
                  { required: true, message: '请输入真实姓名!' },
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="设置密码"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            placeholder="请设置密码"
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: '请设置密码!' },
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="职位"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'withResourceId',
              {
                rules: [
                  
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="联系电话"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'phone',
              {
                rules: [
                  
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="邮箱"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'phone',
              {
                rules: [
                  { required: true, message: '请输入邮箱!' },
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
import { createOrder as fetchAPI } from "@/api/user/order";
import rulesObj from '@/utils/rules'
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

