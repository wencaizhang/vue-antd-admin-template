<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="更改硬盘类型"
      okText="保存"
    >
      <a-form :form="form">
        <a-form-item label="硬盘名称" :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }">
          <a-input
            :disabled="true"
            :value="currRecord.name"
          />
        </a-form-item>
        <a-form-item label="硬盘类型" :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }">
          <a-radio-group
            v-decorator="[
              'hardDiskType',
              {
                initialValue: currRecord.type == 'ssd' ? 'hdd' : 'ssd',
                rules: [{ required: true, message: '请选择硬盘类型' }]}
            ]"
          >
            <a-radio v-if="currRecord.type !== 'ssd'" value="ssd">SSD</a-radio>
            <a-radio v-if="currRecord.type !== 'hdd'" value="hdd">普通</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { changeDiskType as fetchAPI } from "@/api/store/disk";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "changeDiskType"
    };
  },

  methods: {
    onShow () {
      this.formValues = { hardDiskId: this.currRecord.id }
    },
  }
};
</script>
