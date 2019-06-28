
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
        <a-button v-if="step == 1" @click="handleNextStep" :loading="confirmLoading">
          下一步
        </a-button>
        <a-button v-else @click="handleCreate" :loading="confirmLoading">
          提交
        </a-button>
      </template>

      <a-form v-if="step == 1" :form="form1">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" :label="`已绑定${type}`">
          <a-input
            v-decorator="[
              'phone',
              {
                initialValue: currRecord.name,
                rules: [
                  { required: true, message: `请输入已绑定${type}` },
                  rulesObj.editdName,
                ]
              }
            ]"
            :placeholder="`请输入已绑定${type}`"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="验证码">
          <div style="display: flex;">
            <a-input
              v-decorator="[
                'smsCode',
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
              'phone',
              {
                initialValue: currRecord.name,
                rules: [
                  { required: true, message: `请输入新${type}` },
                  rulesObj.editdName,
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
                'smsCode',
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
import { editDisk as fetchAPI  } from "@/api/store/disk";
import CaptchaButton from '@/components/tools/CaptchaButton';
import { sendCode, } from "@/api/user/user";
export default {
  mixins: [baseModalMixins, formModalMixins],
  components: { CaptchaButton },
  data() {
    return {
      fetchAPI,
      rulesObj,
      name: "editPhone",

      step: 1,

      form1: null,
      form2: null,

      type: '邮箱',
    };
  },
  created () {
    this.form1 = this.$form.createForm(this);
    this.form2 = this.$form.createForm(this);
  },
  methods: {
    onShow () {
      this.step = 1;
      this.formValues = { hardDiskId: this.currRecord.id }
    },
    _validateForm (form) {
      return new Promise((resolve, reject) => {
        form.validateFields((err, values) => {
          err ? reject() : resolve(values);
        });
      })
    },

    async handleNextStep () {
      try {
        const values = await this._validateForm(this.form1);
        this.confirmLoading = true;
        const resp = await sendCode();
        this.step++;
        this.confirmLoading = true;
      } catch (error) {
        
      }
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
    async handleValidateField(fields = null) {
      return new Promise((resolve, reject) => {
        this.form.validateFieldsAndScroll(
          Array.isArray(fields) ? fields : [fields],
          (err, values) => err ? reject(err) : resolve(values)
        );
      });
    },
    async onClickBtn (callback) {
      try {
        const resp = await this.handleValidateField('phone')
        callback && callback({
          payload: {
            phoneNumber: data.phone,
            // 验证码类型[0:注册验证码 1:修改密码验证码 2:找回密码验证码 ]
            smsType: 0
          },
          api: sendCode,
        });
      } catch (error) {

      }
    },
  }
};
</script>
