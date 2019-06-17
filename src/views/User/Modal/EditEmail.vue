
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
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="验证码：">
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
      name: "editEmail"
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
