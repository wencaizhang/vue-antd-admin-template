
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="分配公网IP"
      okText="确定"
    >
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="资源池">
          <a-spin :spinning="$parent.fetchNetworkListLoading">
            <a-select
              placeholder="请选择资源池！"
              v-decorator="[
                'networkId',
                {
                  rules: [{ required: true, message: '请选择资源池！' }]
                }
              ]"
            >
              <a-select-option
                v-for="item in $parent.networkList"
                :value="item.id"
                :key="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-spin>
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="描述"
        >
          <a-textarea
            placeholder="请填写描述"
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

        <div class="form-item-container">
          <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="带宽(Mbps)">
            <a-slider
              v-decorator="[
                'bandwidth',
                {
                  initialValue: bandwidth,
                  rules: [{ required: true, message: '请填写带宽' }]
                }
              ]"
              :min="1"
              :max="50"
              :tipFormatter="v => `${v}Mb`"
              @change="onSliderChange"
            />
          </a-form-item>

          <a-input-number
            class="input-number"
            @change="onInputChange"
            :min="1"
            :max="50"
            :value="bandwidth"
          />
        </div>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { assignIP as fetchAPI } from "@/api/network/ip";
import rulesObj from '@/utils/rules'
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      rulesObj,
      fetchAPI,
      name: "create",
      bandwidth: 1
    };
  },

  methods: {
    onShow () {
      if (this.$parent.networkList.length <= 0) {
        this.$parent.fetchNetworkList();
      }
      this.bandwidth = 1;
    },
    onInputChange(v) {
      Object.assign(this, { bandwidth: v });
      this.form.setFieldsValue({
        bandwidth: v
      });
    },
    onSliderChange(v) {
      Object.assign(this, { bandwidth: v });
    }
  }
};
</script>

<style>
.form-item-container {
  position: relative;
}
.form-item-container .input-number {
  position: absolute;
  top: 0;
  right: 8.2%;
  width: 90px;
}
.form-item-container .ant-form-item-control-wrapper {
  padding-right: 100px;
}
</style>
