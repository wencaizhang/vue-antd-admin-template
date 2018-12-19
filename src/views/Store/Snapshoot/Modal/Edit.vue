
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="编辑硬盘快照"
      okText="提交"
    >
      <a-form :form="form">
        <a-form-item
          label="名称"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'name',
              {
                initialValue: 'db3-snap-201811020800(100GB',
                rules: [{ required: true, message: '请输入名称' }]
              }
            ]"
            placeholder="请输入名称"
          />
        </a-form-item>
        <a-form-item
          label="描述："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-textarea
            placeholder="请输入描述"
            v-decorator="[
              'desc',
              {
                rules: [{ required: true, message: '请输入描述' }]}
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { formModalMixins } from "./modalMixin";
export default {
  mixins: [formModalMixins],
  data() {
    return {
      name: "edit"
    };
  },

  methods: {}
};
</script>