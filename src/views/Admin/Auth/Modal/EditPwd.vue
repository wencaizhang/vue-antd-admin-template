
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
          label="设置新密码"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            placeholder=""
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: '请设置新密码!' },
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="再次确认新密码"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            placeholder=""
            v-decorator="[
              'password2',
              {
                rules: [
                  { required: true, message: '再次确认新密码!' },
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
      name: "editPwd"
    };
  },
  methods: {

  },
};
</script>

