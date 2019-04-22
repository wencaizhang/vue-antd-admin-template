
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="关联网络接口"
      okText="确定"
    >
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="选择子网：">
          <a-spin :spinning="fetchSubnetLoading">
            <a-select
              placeholder="请选择子网"
              v-decorator="[
                'subnetId',
                {
                  initialValue: subnetInitValue,
                  rules: [{ required: true, message: '请选择子网' }]
                }
              ]"
            >
              <a-select-option
                v-for="item in subnetList"
                :key="item.id" 
                :value="item.id"
              >
              {{item.name}}
              </a-select-option>
            </a-select>
          </a-spin>
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="路由名称：">
          <a-input :value="currRecord.name" disabled  placeholder="请输入名称"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { attach as fetchAPI } from "@/api/network/router";
import { getSubNetList } from "@/api/network/network";

export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "attach",
      subnetList: [],
      fetchSubnetLoading: false,

      subnetInitValue: '',
    };
  },

  methods: {
    onShow () {
      this.formValues = { routerId: this.currRecord.id,  };
      this.fetchSubNetList();
    },
    async fetchSubNetList () {
      this.fetchSubnetLoading = true;
      this.subnetInitValue = '';
      try {
        const { internal } = this.currRecord;
        const resp = await getSubNetList();
        this.fetchSubnetLoading = false;
        this.subnetList = resp.data.filter(item => !item.isBindRouter).concat(internal);

        this.subnetInitValue = Array.isArray(internal) && internal.length && internal[0].id;
      } catch (error) {
        
      }
    },
    handleCreate() {
      const self = this;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const { internal } = self.currRecord
          if (Array.isArray(internal) && internal.find(item => item.id === values['subnetId'])) {
            self.handleCancel();
            self.$message.info('该网络接口已关联！');
          } else {
            self.formValues = Object.assign({}, self.formValues, values);
            self.handleFetch();
          }
        }
      });
    },
  },
};
</script>
