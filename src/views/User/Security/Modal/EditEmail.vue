
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :title="userInfo.email ? '修改邮箱' : '绑定邮箱'"
      okText="提交"
    >
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" 
          :label="userInfo.email ? '邮箱地址' : '绑定邮箱'"
        >
          <a-input
            v-decorator="[
              'emailAddress',
              {
                initialValue: currRecord.name,
                rules: [
                  { required: true, message: '新邮箱地址' },
                ]
              }
            ]"
            placeholder="新邮箱地址"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="验证码">
          <div style="display: flex;">
            <a-input
              v-decorator="[
                'emailCode',
                {
                  initialValue: currRecord.name,
                  rules: [
                    { required: true, message: '请输入 6 位数字验证码' },
                    { len: 6, message: '请输入 6 位数字验证码' },
                    rulesObj.number,
                  ]
                }
              ]"
              placeholder="请输入验证码"
            />
            <captcha-button
              @clickBtn="onClickBtn"
            />
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import rulesObj from '@/utils/rules'
import { modifyEmail as fetchAPI, sendEmailCode } from "@/api/user/user";
import CaptchaButton from '@/components/tools/CaptchaButton'
export default {
  mixins: [baseModalMixins, formModalMixins],
  components: {
    CaptchaButton,
  },
  data() {
    return {
      fetchAPI,
      rulesObj,
      name: "editEmail",

      formValues: {
        emailType: 'NEW',
      }
    };
  },
  computed: {
    userInfo () {
      return this.$parent.userInfo;
    }
  },
  methods: {
    onShow () {
      this.formValues = { hardDiskId: this.currRecord.id }
    },
    async handleValidateField(fields = null) {
      return new Promise((resolve, reject) => {
        this.form.validateFieldsAndScroll(
          Array.isArray(fields) ? fields : [fields],
          (err, values) => err ? reject(err) : resolve(values)
        );
      });
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
    async onClickBtn (callback) {
      try {
        const data = await this.handleValidateField('email')
        callback && callback({
          payload: {
            email: data.emailAddress,
            codeType: '1',
          },
          api: sendEmailCode,
        });
      } catch (error) {

      }
    }
  }
};
</script>
