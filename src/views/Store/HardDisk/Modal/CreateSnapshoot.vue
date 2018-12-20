
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
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="快照名称：">
          <a-input
            v-decorator="[
              'name',
              {
                initialValue: 'web1',
                rules: [{ required: true, message: '请输入快照名称' }]
              }
            ]"
            placeholder="请输入快照名称"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { formModalMixins } from "@/utils/mixins/modalMixin";
export default {
  mixins: [formModalMixins],
  data() {
    return {
      name: "createSnapshoot"
    };
  },

  methods: {}
};
</script>