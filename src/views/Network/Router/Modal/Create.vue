
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
            'hostName',
            {rules: [{ required: true, message: '请填写路由器名称!' }]}
          ]"
            style="width: 250px"
            placeholder="路由器名称"
          />
        </a-form-item>
        <a-form-item
          label="外部网络："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-radio-group
            @change="onChange"
            v-decorator="[
              'type',
              {
                rules: [{ required: true, message: '请选择外部网络' }],
                initialValue: '0'
              }
            ]"
          >
            <a-radio value="0">external</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox v-decorator="[
              'admin',
              {
                valuePropName: 'checked',
                initialValue: true,
              }
            ]">启用管理员状态</a-checkbox>
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox v-decorator="[
              'snat',
              {
                valuePropName: 'checked',
                initialValue: true,
              }
            ]">启动SNAT</a-checkbox>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/utils/mixins/modalMixin";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      name: "create",
      type: "0"
    };
  },

  methods: {
    onChange(e) {
      this.type = e.target.value;
    }
  }
};
</script>
