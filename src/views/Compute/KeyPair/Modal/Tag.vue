
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="密钥标签"
      okText="确定"
    >
      <a-form :form="form">
        <a-form-item
          label="标签名："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'labelName',
              {
                rules: [{ required: true, message: '请输入标签名!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="描述："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-textarea
            placeholder="请填写描述"
            v-decorator="[
              'description',
              {
                rules: [
                  rulesObj.desc,
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
import { bindLabel as fetchAPI } from '@/api/compute/keypair';
import { rulesObj } from '@/utils/util';
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      rulesObj,
      fetchAPI,
      name: "bindTags"
    };
  },

  methods: {}
};
</script>
