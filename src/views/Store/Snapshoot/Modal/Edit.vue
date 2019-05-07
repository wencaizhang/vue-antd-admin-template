
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="编辑硬盘快照"
      okText="提交"
    >
      <a-form :form="form">
        <a-form-item
          label="名称"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'name',
              {
                initialValue: 'db3-snap-201811020800(100G',
                rules: [{ required: true, message: '请输入名称' }]
              }
            ]"
            placeholder="请输入名称"
          />
        </a-form-item>
        <a-form-item
          label="描述："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-textarea
            placeholder="请输入描述"
            v-decorator="[
              'description',
              {
                rules: [
                  { required: true, message: '请填写描述!' },
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
import { rulesObj } from '@/utils/util';
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      rulesObj,
      name: "edit"
    };
  },

  methods: {}
};
</script>
