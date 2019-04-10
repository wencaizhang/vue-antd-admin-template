
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="新建路由器"
      okText="确定"
    >
      <a-form :form="form">
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="路由器名称："
        >
          <a-input
            v-decorator="[
            'routerName',
            {rules: [{ required: true, message: '请填写路由器名称!' }]}
          ]"
            placeholder="路由器名称"
          />
        </a-form-item>
        <a-form-item
          label="外部网络："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-select
            placeholder="请选择外部网络"
            v-decorator="[
              'externalId',
            ]"
          >
            <a-select-option
              v-for="item in $parent.networkList"
              :key="item.id" 
              :value="item.id"
            >
            {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { createRouter as fetchAPI } from "@/api/network/router";

export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "create",
      type: "0",
    };
  },

  methods: {
    handleCreate() {
      const self = this;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(values)
          const { externalId } = values;
          self.formValues = Object.assign({}, self.formValues, values, {
            external: externalId ? 1 : 0,
          });
          self.handleFetch();
        }
      });
    },
  }
};
</script>
