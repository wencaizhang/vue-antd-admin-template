
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
      <a-form :form="form" v-if="currRecord.mappedStaticIp === '无'">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="IP地址：">
          <a-input :value="currRecord.ipAddress" disabled />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="选择待绑定端口：">
          <a-spin :spinning="isFetchInstanceList">
            <a-select
              placeholder="请选择待绑定端口！"
              v-decorator="[
                'portIp',
                {
                  initialValue: '',
                  rules: [{ required: true, message: '请选择待绑定端口！' }]
                }
              ]"
            >
              <a-select-option
                v-for="item in selectList"
                :key="item.network"
                :value="item.network"
              >
                {{ item.name }} {{item.network}}
              </a-select-option>
            </a-select>
          </a-spin>
        </a-form-item>
      </a-form>

      <template v-else>
        <p style="margin-top: 10px;">每个 IP 只能绑定一个端口，如需绑定其他端口，请先解绑此 IP</p>

        <template slot="footer">
          <a-button @click="handleCancel">取消</a-button>
        </template>
      </template>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { bindIP as fetchAPI } from "@/api/network/ip";
import { getinstanceList, getInstanceNetwork } from "@/api/compute/instance";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "bind-ip",
      selectList: [],
      isFetchInstanceList: false,

      count: 0,
      len: 0,
    };
  },
  methods: {
    onShow () {
      this.fetchIntanceList();
      this.formValues = { id: this.currRecord.id }
    },
    async fetchNetwork (item) {
      try {
        const resp = await getInstanceNetwork(item.id);
        resp.network.forEach(net => {
          this.selectList.push({
            network: net,
            name: item.name,
          });
        });
      } catch (error) {

      } finally {
        this.count++
        if (this.count === this.len) {
          this.isFetchInstanceList = false;
        }
      }
    },
    async fetchIntanceList () {
      this.isFetchInstanceList = true;
      try {
        const resp = await getinstanceList();

        const avaiableInstance = resp.data.filter(item => !item.ipAddress);
        this.len = avaiableInstance.length;
        this.count = 0;
        if (this.len !== 0) {
          avaiableInstance.forEach(item => {
            // 每个端口只能绑定一个 IP
            // 需要过滤出可以使用的端口（未绑定过的端口）
            this.fetchNetwork(item);
          });
        }
      } catch (error) {

      } finally {

      }
    },
  }
};
</script>
