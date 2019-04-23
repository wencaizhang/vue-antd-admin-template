
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="编辑密钥属性"
      okText="提交"
    >
      <a-form :form="form">
        <a-form-item
          label="密钥名称："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'newSecretKeyName',
              {
                initialValue: currRecord.name,
                rules: [
                  { required: true, message: '请输入名称!' },
                  rulesObj.name,
                ]
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
            v-decorator="[ 'description', ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import mixins from './mixins'
import { editKeyPair as fetchAPI } from '@/api/compute/keypair';
import { rulesObj } from '@/utils/util';
export default {
  mixins: [baseModalMixins, formModalMixins, mixins],
  data() {
    return {
      rulesObj,
      fetchAPI,
      name: "editRule"
    };
  },

  methods: {
    onShow () {
      const name = this.$parent.selectedRowKeys[0];
      this.currRecord = this.$parent.data.find(item => item.name === name);
      this.formValues = Object.assign({}, this.formValues, {
        oldSecretKeyName: this.currRecord.name
      });
    }
  }
};
</script>
