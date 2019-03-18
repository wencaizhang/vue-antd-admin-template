
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
      <a-alert message="说明：从指定的公网IP池中分配一个地址" type="info" style="margin-bottom: 10px;" showIcon/>
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="资源池：">
          <a-select
            placeholder="请选择资源池！"
            v-decorator="[
              '资源池',
              {
                initialValue: 'external_net',
                rules: [{ required: true, message: '请选择资源池！' }]
              }
            ]"
          >
            <a-select-option value="external_net">external_net</a-select-option>
            <a-select-option value="external_IPV6">external_IPV6</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="描述：">
          <a-textarea
            placeholder="请填写描述"
            v-decorator="[
              'description',
              {
                rules: [{ message: '请填写描述' }]
              }
            ]"
          />
        </a-form-item>

        <div class="form-item-container">
          <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="带宽(Mbps)：">
            <a-slider
              v-decorator="[
              'bandwidth',
              {
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
            :formatter="value => formatter('Mb', value)"
            :parser="value => parser(value)"
          />
        </div>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/utils/mixins/modalMixin";
import { editImage as fetchAPI } from '@/api/compute/images';
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "allotIP",
      bandwidth: "1"
    };
  },

  methods: {
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
