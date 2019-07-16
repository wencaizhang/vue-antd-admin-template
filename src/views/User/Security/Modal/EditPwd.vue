
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
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="旧密码">
          <a-input
            type="password"
            v-decorator="[
              'oldPwd',
              {
                initialValue: currRecord.name,
                rules: [
                  { required: true, message: '旧密码' },
                ]
              }
            ]"
            placeholder="设置旧密码"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="新密码">
          <a-input
            type="password"
            v-decorator="[
              'newPwd',
              {
                initialValue: currRecord.name,
                rules: [
                  { required: true, message: '请设置登录密码' },
                  { min: 6, message: '最少 6 个字符' },
                  { max: 32, message: '最多 32 个字符' },
                  { validator: validatePwd },
                ]
              }
            ]"
            placeholder="设置新密码"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="再次确认新密码">
          <a-input
            type="password"
            v-decorator="[
              'password2',
              {
                initialValue: currRecord.name,
                rules: [
                  { required: true, message: '再次确认新密码' },
                ]
              }
            ]"
            placeholder="再次确认新密码"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import rulesObj from '@/utils/rules'
import { modifyPwd as fetchAPI  } from "@/api/user/user";
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
    validatePwd (rule, value, callback) {
      const regsGroup = [/[a-zA-Z]/, /[0-9]/, /[_\-!@#]/];
      const ret = regsGroup.filter(reg => reg.test(value));
      ret.length < 2 ? callback('数字、大小写字母及特殊符号(! - _ # @)中至少包含2种组合') : callback();
    },
    onShow () {
      this.formValues = { hardDiskId: this.currRecord.id }
    },
    handleCreate() {
      const self = this;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          if (values.password2 === values.newPwd) {
            Object.assign(self.formValues, values);
            self.handleFetch();
          } else {
            this.form.setFields({
              password2: {
                value: values.password2,
                errors: [
                  {
                    message: "两次密码输入不一致!"
                  }
                ]
              }
            });
          }
        }
      });
    },
  }
};
</script>
