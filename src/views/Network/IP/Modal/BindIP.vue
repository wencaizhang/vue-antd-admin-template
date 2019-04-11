
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="绑定公网IP"
      okText="确定"
    >
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="IP地址：">
          <a-input :value="currRecord.ip" disabled />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="选择待绑定端口：">
          <a-select
            placeholder="请选择待绑定端口！"
            v-decorator="[
              '选择待绑定端口',
              {
                initialValue: '',
                rules: [{ required: true, message: '请选择待绑定端口！' }]
              }
            ]"
          >
            <a-select-option
              v-for="item in instanceList"
              :key="item.network"
              :value="item.network"
            >
              {{ item.name }} {{item.network}}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { getinstanceList } from '@/api/compute/instance';
import { bindIP as fetchAPI } from "@/api/network/ip";

export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "bind-ip",
      instanceList: [],
    };
  },
  mounted () {
    this.fetchIntanceList();
  },
  methods: {
    async fetchIntanceList () {
      try {
        const resp = await getinstanceList();
        this.instanceList = resp.data;

        const list = [];
        resp.data.forEach(item => {
          item.network.forEach(net => {
            list.push({
              network: net,
              name: item.name,
            });
          });
        })
        this.instanceList = list;
      } catch (error) {
        
      }
    },
  }
};
</script>
