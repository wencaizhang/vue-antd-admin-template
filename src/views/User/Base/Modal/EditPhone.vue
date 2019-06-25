
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="修改手机号"
      okText="提交"
    >
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="新手机">
          <a-input
            v-decorator="[
              'phone',
              {
                initialValue: currRecord.name,
                rules: [
                  { required: true, message: '新手机地址' },
                  rulesObj.editdName,
                ]
              }
            ]"
            placeholder="新手机地址"
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
      name: "editPhone"
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
