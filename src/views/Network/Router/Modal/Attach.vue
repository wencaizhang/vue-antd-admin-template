
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="关联子网到路由"
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
    };
  },

  methods: {
    onShow () {
      this.formValues = { routerId: this.currRecord.id,  };
      this.fetchSubNetList();
    },
    async fetchSubNetList () {
      this.fetchSubnetLoading = true;
      try {
        const resp = await getSubNetList();
        this.fetchSubnetLoading = false;
        this.subnetList = resp.data.filter(item => !item.isBindRouter);
      } catch (error) {
        
      }
    }
  },
};
</script>
