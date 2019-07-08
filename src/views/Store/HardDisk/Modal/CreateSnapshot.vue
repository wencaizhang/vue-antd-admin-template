
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="创建快照"
      okText="提交"
    >
      <a-alert
        message="说明：快照是保存了运行中云主机的磁盘状态的镜像。"
        type="info"
        style="margin-bottom: 10px;"
        showIcon
      />
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="快照名称">
          <a-input
            v-decorator="[
              'snapshotName',
              {
                rules: [
                  { required: true, message: '请输入快照名称' },
                  rulesObj.name,
                ]
              }
            ]"
            placeholder="请输入快照名称"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="描述">
          <a-textarea
            placeholder="请输入描述"
            v-decorator="[
              'description',
              {
                rules: [
                  rulesObj.desc,
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
import { createSnapshot as fetchAPI  } from "@/api/store/disk";
import rulesObj from '@/utils/rules'
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      rulesObj,
      name: "createSnapshot"
    };
  },

  methods: {
    onShow () {
      this.formValues = { hardDiskId: this.currRecord.id }
    },
  }
};
</script>
