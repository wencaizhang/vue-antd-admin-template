
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      title="上传硬盘到镜像"
      okText="提交"
    >
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="硬盘名称：">
          <a-input
            :disabled="true"
            v-decorator="[
              'name',
              {
                initialValue: 'web1',
                rules: [{ required: true, message: '请输入硬盘名称' }]
              }
            ]"
            placeholder="请输入硬盘名称"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="镜像名称：">
          <a-textarea
            placeholder="请输入镜像名称"
            v-decorator="[
              'desc',
              {
                rules: [{ required: true, message: '请输入镜像名称' }]}
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
      name: "upload",
    };
  },

  methods: {

  }
};
</script>