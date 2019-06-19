
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="修改密码"
      okText="提交"
    >
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="新密码">
          <a-input
            v-decorator="[
              'password',
              {
                initialValue: currRecord.name,
                rules: [
                  { required: true, message: '设置新密码' },
                  rulesObj.editdName,
                ]
              }
            ]"
            placeholder="设置新密码"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="再次确认新密码">
          <a-input
            v-decorator="[
              'password2',
              {
                initialValue: currRecord.name,
                rules: [
                  { required: true, message: '再次确认新密码' },
                  rulesObj.editdName,
                ]
              }
            ]"
            placeholder="再次确认新密码"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="手机号">
          <a-input
            v-decorator="[
              'phone',
              {
                initialValue: currRecord.name,
                rules: [
                  { required: true, message: '请输入注册时手机号' },
                  rulesObj.editdName,
                ]
              }
            ]"
            placeholder="请输入注册时手机号"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="验证码">
          <a-input
            v-decorator="[
              'code',
              {
                initialValue: currRecord.name,
                rules: [
                  { required: true, message: '请输入验证码' },
                  rulesObj.editdName,
                ]
              }
            ]"
            placeholder="请输入验证码"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { rulesObj } from '@/utils/util';
import { editDisk as fetchAPI  } from "@/api/store/disk";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      rulesObj,
      name: "editPwd"
    };
  },

  methods: {
    onShow () {
      this.formValues = { hardDiskId: this.currRecord.id }
    },
    handleCreate() {
      const self = this;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          Object.assign(self.formValues, values);
          self.handleFetch();
        }
      });
    },
  }
};
</script>
