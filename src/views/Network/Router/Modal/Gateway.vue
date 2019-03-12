
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="设置网关"
      okText="确定"
    >
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="外部网络：">
          <a-select
            v-decorator="[
              'net',
              {
                initialValue: 'ext_ipv4',
                rules: [{ required: true, message: '请输入名称' }]
              }
            ]"
          >
            <a-select-option value="ext_ipv4">ext_ipv4</a-select-option>
            <a-select-option value="ext_ipv6">ext_ipv6</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="路由名称：">
          <a-input
            v-decorator="[
              'name',
              {
                initialValue: 'web1',
                rules: [{ required: true, message: '请输入名称' }]
              }
            ]"
            placeholder="请输入名称"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="路由ID：">
          <a-input
            v-decorator="[
              'id',
              {
                initialValue: 'wexxxb1',
                rules: [{ required: true, message: '请输入ID' }]
              }
            ]"
            placeholder="请输入ID"
          />
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
      name: "gateway"
    };
  },

  methods: {}
};
</script>
