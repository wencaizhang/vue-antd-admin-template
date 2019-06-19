
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
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="外部网络">
          <a-select
            placeholder="请选择外部网络"
            v-decorator="[
              'externalId',
              {
                initialValue: externalId,
                rules: [{ required: true, message: '请选择外部网络' }]
              }
            ]"
          >
            <a-select-option
              v-for="item in $parent.networkList"
              :key="item.id" 
              :value="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="路由名称">
          <a-input
            :value="currRecord.name"
            disabled
            placeholder="请输入名称"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { setGateway as fetchAPI } from "@/api/network/router";

export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "gateway",
      externalId: '',
    };
  },

  methods: {
    onShow () {
      // 操作类型[0:设置 1:清除]
      this.formValues = { routerId: this.currRecord.id, type: 0 };

      const extrannet = this.$parent.networkList.find(item => item.name === this.currRecord.extrannet);
      this.externalId = extrannet && extrannet.id;
    },
  },
};
</script>
