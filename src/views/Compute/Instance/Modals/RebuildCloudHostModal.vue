
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="重建云主机"
      okText="确定"
    >
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="选择镜像：">
          <a-select
            placeholder="请选择镜像！"
            v-decorator="[
              'mirror',
              {
                rules: [{ required: true, message: '请选择镜像！' }]
              }
            ]"
          >
            <a-select-option value="Centos6.5">Centos6.5</a-select-option>
            <a-select-option value="Centos7.4">Centos7.4</a-select-option>
            <a-select-option value="Centos7.5">Centos7.5</a-select-option>
            <a-select-option value="Ubuntu14.04">Ubuntu14.04</a-select-option>
            <a-select-option value="Ubuntu16.04">Ubuntu16.04</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="磁盘分区：">
          <a-select
            placeholder="请选择一种方式！"
            v-decorator="[
              '磁盘分区',
              {
                rules: [{ required: true, message: '请选择一种方式！！' }]
              }
            ]"
          >
            <a-select-option value="0">自动</a-select-option>
            <a-select-option value="1">手动</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/utils/mixins/modalMixin";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      name: "rebuildCloudHost"
    };
  },

  methods: {}
};
</script>