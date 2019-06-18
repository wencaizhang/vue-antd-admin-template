
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="修改邮箱"
      okText="提交"
    >
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="新邮箱：">
          <a-input
            v-decorator="[
              'email',
              {
                initialValue: currRecord.name,
                rules: [
                  { required: true, message: '新邮箱地址' },
                  rulesObj.editdName,
                ]
              }
            ]"
            placeholder="新邮箱地址"
          />
        </a-form-item>
        <verify-code
          v-model="smsCode"
          label="验证码"
          @clickBtn="onClickBtn"
        />
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { rulesObj } from '@/utils/util';
import { editDisk as fetchAPI  } from "@/api/store/disk";
import VerifyCode from "../../VerifyCode";
export default {
  mixins: [baseModalMixins, formModalMixins],
  components: {
    VerifyCode,
  },
  data() {
    return {
      fetchAPI,
      rulesObj,
      name: "editEmail",
      smsCode: '',
    };
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
        const resp = await this.handleValidateField('email')
        callback && callback(resp);
      } catch (error) {

      }
    }
  }
};
</script>
