
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
                  rulesObj.name,
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
        <a-form-item
          label="描述："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-textarea
            placeholder="请填写描述"
            v-decorator="[ 'description', ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
// import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { rulesObj } from '@/utils/util';
export default {
  name: 'create',
  // mixins: [baseModalMixins, formModalMixins],
  props: [ 'visible' ],
  data() {
    return {
      rulesObj,
      name: "create",


      confirmLoading: false,

      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 }
      },
      form: this.$form.createForm(this),
    };
  },
  methods: {
    handleCancel() {
      this.$parent.showCreateKeypairModal = false;
    },
    handleCreate () {
      const self = this;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          self.formValues = Object.assign({}, self.formValues, values);
          self.$parent.createKeypairData = self.formValues;
          self.handleCancel();
          self.$parent.showDownloadKeypairModal = true;
        }
      });
    },
  },
};
</script>

