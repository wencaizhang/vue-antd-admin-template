
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="新建网络"
      okText="确定"
    >
      <a-form :form="form">
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="网络名称："
        >
          <a-input
            v-decorator="[
            'hostName',
            {rules: [{ required: true, message: '请填写网络名称!' }]}
          ]"
            style="width: 250px"
            placeholder="网络名称"
          />
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox v-decorator="[
              'admin',
            ]">启用管理员状态</a-checkbox>
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox v-decorator="[
              'share',
            ]">是否共享</a-checkbox>
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox v-decorator="[
              'subnet',
            ]">创建子网</a-checkbox>
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
      name: "create",
      type: "0"
    };
  },

  methods: {
    onChange(e) {
      this.type = e.target.value;
    }
  }
};
</script>