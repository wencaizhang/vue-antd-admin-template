
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="创建密钥对"
      okText="创建"
    >
      <a-form :form="form">
        <a-form-item
          label="名称："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: '请输入名称!' },
                  { pattern: /^(\w|_)*$/, message: '请使用英文字母、数字和下划线的组合，且不超过 12 个字符!' },
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="加密方式："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-select
            v-decorator="[
              'encryption',
              {
                initialValue: 'ssh-rsa',
                rules: [{ required: true, message: '请选择加密方式!' }]
              }
            ]"
          >
            <a-select-option value="ssh-rsa">ssh-rsa</a-select-option>
            <!-- <a-select-option value="ssh-dss">ssh-dss</a-select-option> -->
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { createKeyPair as fetchAPI, downloadKeyPair } from '@/api/compute/keypair';
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "create"
    };
  },
  methods: {
    openNotification(resp) {
      const { download } = this;
      this.$message.success(
        <span>密钥对创建成功，请立即下载</span>,
        3
      );
      this.$store.commit(`${this.$parent.id}/setLastCreatedKeyPair`, resp);
      this.$parent.handleSingleMenuClick('download');
    },
  }
};
</script>

