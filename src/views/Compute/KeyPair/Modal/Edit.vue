
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="修改秘钥属性"
      okText="提交"
    >
      <a-form :form="form">
        <a-form-item
          label="秘钥名称："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'name',
              {
                initialValue: currRecord.name,
                rules: [{ required: true, message: '请输入秘钥名称!' }]
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
            v-decorator="[
              'description',
              {
                initialValue: currRecord.description,
                rules: [{ message: '请输入描述!' }]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/utils/mixins/modalMixin";
import mixins from './mixins'
import { editKeyPair as fetchAPI } from '@/api/compute/keypair';
export default {
  mixins: [baseModalMixins, formModalMixins, mixins],
  data() {
    return {
      fetchAPI,
      name: "edit"
    };
  },

  methods: {}
};
</script>
