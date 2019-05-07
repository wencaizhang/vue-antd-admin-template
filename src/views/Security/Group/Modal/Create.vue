
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="创建安全组"
      okText="创建"
    >
      <a-form :form="form">
        <a-form-item
          label="名称："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'secGroupName',
              {
                rules: [
                  { required: true, message: '请输入名称!' },
                  rulesObj.name,
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="描述："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-textarea
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
import { createGroup as fetchAPI } from '@/api/security/index';
import { rulesObj } from '@/utils/util';
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      rulesObj,
      fetchAPI,
      name: "create"
    };
  },
  methods: {

  },
};
</script>

