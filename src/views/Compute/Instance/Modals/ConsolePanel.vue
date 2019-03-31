
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="进入控制台"
      okText="确定"
    >
      <a-spin :spinning="loading" tip="正在获取控制台信息">
        <div class="spin-content">
          <a :href="resp.consoleUrl" target="_blank" title="控制台">
            点击进入控制台
          </a>
        </div>
      </a-spin>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/mixins/modalMixin";
import {  getConsoleUrl as fetchAPI } from "@/api/compute/instance";
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      fetchAPI,
      name: "console",
      loading: false,
      resp: {},
      isRefreshParentTable: false, 
    };
  },

  methods: {
    onShow() {
      this.fetch();
    },
    async fetch () {
      try {
        this.loading = true;
        const resp = await fetchAPI({ instanceId: this.currRecord.id })
        this.resp = resp;
        console.log(this.resp)
      } catch (error) {
        
      } finally {
        this.loading = false;
      }
    },
    handleCreate () {
      const result = window.open(this.resp.consoleUrl)
      console.log(result);
    },
  }
};
</script>
<style scoped>
.spin-content{
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
</style>
