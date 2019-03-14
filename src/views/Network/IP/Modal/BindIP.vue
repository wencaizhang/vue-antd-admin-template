
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="绑定公网IP"
      okText="确定"
    >
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="选择一个IP地址：">
          <a-select
            placeholder="选择一个IP地址！"
            v-decorator="[
              '资源池',
              {
                initialValue: 'external_net',
                rules: [{ required: true, message: '选择一个IP地址！' }]
              }
            ]"
          >
            <a-select-option value="external_net">external_net</a-select-option>
            <a-select-option value="external_IPV6">external_IPV6</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="选择待绑定端口：">
          <a-select
            placeholder="请选择待绑定端口！"
            v-decorator="[
              '选择待绑定端口',
              {
                initialValue: 'external_net',
                rules: [{ required: true, message: '请选择待绑定端口！' }]
              }
            ]"
          >
            <a-select-option value="external_net">external_net</a-select-option>
            <a-select-option value="external_IPV6">external_IPV6</a-select-option>
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
      name: "bind-ip",
    };
  },

  methods: {

  }
};
</script>
