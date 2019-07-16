
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :title="`修改${type}`"
      okText="提交"
    >
      <template slot="footer">
        <a-button @click="handleCancel">
          取消
        </a-button>
        <a-button v-if="step == 1" @click="handleNextStep('form1')" :loading="confirmLoading">
          下一步
        </a-button>
        <a-button v-else @click="handleNextStep('form2')" :loading="confirmLoading">
          提交
        </a-button>
      </template>

      <a-form v-if="step == 1" :form="form1">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" :label="`已绑定${type}`">
          {{ userInfo[currItem.key] }}
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="验证码">
          <div style="display: flex;">
            <a-input
              v-decorator="[
                currItem.key === 'phone' ? 'smsCode' : 'emailCode',
                {
                  initialValue: userInfo.name,
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

      <a-form v-else :form="form2">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" :label="`绑定新${type}`">
          <a-input
            v-decorator="[
              currItem.key === 'phone' ? 'phoneNumber' : 'emailAddress',
              {
                initialValue: userInfo.name,
                rules: [
                  { required: true, message: `请输入新${type}` },
                  rulesObj[currItem.key],
                ]
              }
            ]"
            :placeholder="`请输入新${type}`"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="验证码">
          <div style="display: flex;">
            <a-input
              v-decorator="[
                currItem.key === 'phone' ? 'smsCode' : 'emailCode',
                {
                  initialValue: userInfo.name,
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
import CaptchaButton from '@/components/tools/CaptchaButton';
import { modifyPhone, modifyEmail, sendCode, sendEmailCode, } from "@/api/user/user";
export default {
  mixins: [baseModalMixins, formModalMixins],
  components: { CaptchaButton },
  props: {
    currItem: Object,
  },
  data() {
    return {
      fetchAPI: null,
      rulesObj,
      name: "editPhone",

      step: 1,

      form1: null,
      form2: null,

    };
  },
  
  computed: {
    userInfo () {
      return this.$parent.userInfo;
    },
    type () {
      return this.currItem.key === 'phone' ? '手机' : '邮箱';
    },

    fetchCode () {
      return this.currItem.key === 'phone' ? sendCode : sendEmailCode;
    },
  },
  methods: {
    onShow () {
      this.step = 1;
      this.fetchAPI = this.currItem.key === 'phone' ? modifyPhone : modifyEmail,

      this.form1 = this.$form.createForm(this);
      this.form2 = this.$form.createForm(this);
    },
    setFormValues () {
      let k1 = this.currItem.key === 'phone' ? 'phoneNumberType' : 'emailType';
      let k2 = this.currItem.key === 'phone' ? 'phoneNumber' : 'emailAddress';
      let v1 = this.step == 1 ? 'OLD' : 'NEW';
      let v2 = this.userInfo[this.currItem.key];

      this.formValues = Object.assign(this.formValues, { [k1]: v1, [k2]: v2 });
    },
    _validateForm (form) {
      return new Promise((resolve, reject) => {
        form.validateFields((err, values) => {
          err ? reject() : resolve(values);
        });
      })
    },

    async handleNextStep (formName) {
      try {
        const values = await this._validateForm(this[formName]);
        this.setFormValues();
        Object.assign(this.formValues, values);
        this.handleFetch();
      } catch (error) {
        
      }
    },
    handleFetchSuccess (resp) {
      // 请求成功处理函数
      if (this.step === 1) {
        this.step++;
        return;
      }
      this.handleCancel();
      this.openNotification(resp);
      this.handleRefreshParentTable();
    },
    onClickBtn (callback) {
      const value = this.userInfo[this.currItem.key];
      const payload = this.currItem.key === 'phone' 
        ? { phoneNumber: value, smsType: 0 }
        : { email: value, codeType: '1', };
      callback && callback({ payload, api: this.fetchCode });
    },
  }
};
</script>
