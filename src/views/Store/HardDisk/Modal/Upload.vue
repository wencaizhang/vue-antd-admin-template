
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="上传硬盘到镜像"
      okText="提交"
    >
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="硬盘名称：">
          <a-input
            :disabled="true"
            v-decorator="[
              'hardDiskName',
              {
                initialValue: currRecord.name,
                rules: [{ required: true, message: '请输入硬盘名称' }]
              }
            ]"
            placeholder="请输入硬盘名称"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="镜像名称：">
          <a-input
            placeholder="请输入镜像名称"
            v-decorator="[
              'imageName',
              {
                rules: [
                  { required: true, message: '请输入镜像名称' },
                  rulesObj.name,
                ]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { rulesObj } from '@/utils/util';
import { uploadDisk as fetchAPI  } from "@/api/store/disk";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      rulesObj,
      name: "upload"
    };
  },

  methods: {
    onShow () {
      this.formValues = { hardDiskId: this.currRecord.id }
    },
  }
};
</script>
