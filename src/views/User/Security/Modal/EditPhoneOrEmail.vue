
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :title="`修改${dynamicsData.name}`"
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

      <template v-if="renderForm">
        <a-form v-if="step == 1" :form="form1">
          <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" :label="`已绑定${dynamicsData.name}`">
            {{ userInfo[currItem.key] }}
          </a-form-item>
          <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="验证码">
            <div style="display: flex;">
              <a-input
                v-decorator="[
                  dynamicsData.formKeys.code,
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
                key="old"
                @clickBtn="onClickBtn"
              />
            </div>
          </a-form-item>
        </a-form>

        <a-form v-else :form="form2">
          <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" :label="`绑定新${dynamicsData.name}`">
            <a-input
              v-decorator="[
                dynamicsData.formKeys.type,
                {
                  initialValue: userInfo.name,
                  rules: [
                    { required: true, message: `请输入新${dynamicsData.name}` },
                    rulesObj[currItem.key],
                  ]
                }
              ]"
              :placeholder="`请输入新${dynamicsData.name}`"
            />
          </a-form-item>
          <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="验证码">
            <div style="display: flex;">
              <a-input
                v-decorator="[
                  dynamicsData.formKeys.code,
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
                key="new"
                @clickBtn="onClickBtn"
              />
            </div>
          </a-form-item>
        </a-form>

      </template>
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

      dynamicsData: {},
      renderForm: false,

    };
  },
  
  computed: {
    isPhone () {
      return this.currItem.key === 'phone';
    },
    userInfo () {
      return this.$parent.userInfo;
    },
    currForm () {
      return this['form' + this.step]
    },
  },
  methods: {
    onShow () {
      this.step = 1;
      this.setDynamicsData();
      this.renderForm = true;
      this.form1 = this.$form.createForm(this);
      this.form2 = this.$form.createForm(this);
    },
    
    setDynamicsData () {
      let isPhone = this.isPhone;
      this.fetchAPI = isPhone ? modifyPhone : modifyEmail;

      this.dynamicsData = {
        // 表单字段
        formKeys: {
          type: isPhone ? 'phoneNumber' : 'emailAddress',
          code: isPhone ? 'smsCode' : 'emailCode',
        },
        name: isPhone ? '手机' : '邮箱',
        fetchCodeApi: isPhone ? sendCode : sendEmailCode,

        codeType: isPhone ? 'smsType' : 'codeType',  // 验证码类型

      }
    },

    setFormValues (values) {
      let isPhone = this.isPhone;
      const data = {
        [isPhone ? 'phoneNumberType' : 'emailType']: this.step == 1 ? 'OLD' : 'NEW',
        [isPhone ? 'phoneNumber' : 'emailAddress']: this.userInfo[this.currItem.key]
      }
      this.formValues = Object.assign({}, this.formValues, data, values);
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
        this.setFormValues(values);
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
    async onClickBtn (callback) {
      let type = this.dynamicsData.formKeys.type;
      // 给邮箱发送验证码，字段是 email，而提交表单是 emailAddress...
      let smsType = this.isPhone ? 'phoneNumber' : 'email'
      let payload;
      const codeValues = {
        // 3:新手机号验证码 4:旧手机号验证码
        smsType: this.step == 1 ? 4 : 3,
        codeType: '1'
      }
      if (this.step == 1) {
        payload = {
          [smsType]: this.userInfo[this.currItem.key],
          [this.dynamicsData.codeType]: codeValues[this.dynamicsData.codeType]
        }
      } else {
        const v = this.currForm.getFieldValue(type)
        // values[type]
        payload = {
          [smsType]: v,
          [this.dynamicsData.codeType]: codeValues[this.dynamicsData.codeType]
        }
      }
      callback && callback({ payload, api: this.dynamicsData.fetchCodeApi });
    },
  }
};
</script>
