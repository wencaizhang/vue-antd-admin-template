
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="设置网关"
      okText="确定"
    >
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="名称：">
          <a-input
            v-decorator="[
              'name',
              {
                initialValue: 'web1',
                rules: [{ required: true, message: '请输入名称' }]
              }
            ]"
            placeholder="请输入名称"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="描述：">
          <a-textarea
            placeholder="请输入描述"
            v-decorator="[
              'desc',
              {
                rules: [{ required: true, message: '请输入描述' }]}
            ]"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox v-decorator="[
          'on',
          ]">可启动
            <a-tooltip>
              <template slot="title">“可启动”标记标明此硬盘可以被用来创建主机。</template>
              <a-icon type="info-circle"/>
            </a-tooltip>
          </a-checkbox>
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
      name: "gateway"
    };
  },

  methods: {}
};
</script>