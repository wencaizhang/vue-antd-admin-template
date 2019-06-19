
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="编辑路由器"
      okText="提交"
    >
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="名称">
          <a-input
            v-decorator="[
              'name',
              {
                initialValue: currRecord.name,
                rules: [{ required: true, message: '请输入名称' }]
              }
            ]"
            placeholder="请输入名称"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="管理状态">
          <a-select
            v-decorator="[
              'bootable',
              {
                initialValue: currRecord.status && currRecord.status.toUpperCase(),
                rules: [{ required: true, message: '请输入名称' }]
              }
            ]"
          >
            <!-- 可启动[0:否 1:是] -->
            <a-select-option value="UP">启用</a-select-option>
            <a-select-option value="DOWN">关停</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { editRouter as fetchAPI } from "@/api/network/router";

export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "edit"
    };
  },

  methods: {
    onShow () {
      this.formValues = Object.assign({}, this.formValues, { routerId: this.currRecord.id });
    },
  }
};
</script>
