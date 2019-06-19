
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
          <a-input
            v-decorator="[
              'email',
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
  }
};
</script>
