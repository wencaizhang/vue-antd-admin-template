
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="工单录入"
      okText="创建"
    >
      <a-form :form="form">
        <a-form-item
          label="工单接收者"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input value="sxxx" disabled />
        </a-form-item>
        <a-form-item
          label="工单标题"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-textarea
            placeholder="请填写工单标题"
            v-decorator="[
              'workOrderTitle',
              {
                rules: [
                  { required: true, message: '请输入工单标题!' },
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="工单内容"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-textarea
            placeholder="请填写工单内容"
            v-decorator="[
              'workOrderContent',
              {
                rules: [
                  { required: true, message: '请输入工单标题!' },
                  rulesObj.desc,
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="相关资源ID"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'withResourceId',
              {
                rules: [
                  { required: true, message: '请输入相关资源ID!' },
                ]
              }
            ]"
          />
        </a-form-item>
        <p>如果问题涉及到具体资源，请提供这些资源的 ID，形如 814a5d60，方便快速定位问题。</p>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { createOrder as fetchAPI } from "@/api/user/order";
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

