
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="释放IP地址"
      okText="释放"
      okType="danger"
    >
      <p>您已选择了 {{ list.map(item => item.ip).join(', ') }}，请确认你的操作，释放后该IP地址被回收到公网IP池，需要时重新申请。</p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { freeIP as fetchAPI } from "@/api/network/ip";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      loop: true,
      name: "free-ip",
    };
  },

  methods: {
    onShow () {
      const { data, selectedRowKeys } = this.$parent;
      this.list = data.filter(item => {
        return selectedRowKeys.includes(item.ip);
      });
      this.handleItemCount = this.list.length;
    },
    async handleItemFetch (item) {
      try {
        const payload = { ipAddress: item.ip, id: "string" };
        const resp = await this.fetchAPI(payload);
      }
      catch (err) {

      }
      finally {
        this.handleItemCount = this.handleItemCount - 1;
        if (this.handleItemCount === 0) {
          this.handleLoopFetchEnd();
        }
      }
    },
  }
};
</script>

<style scoped>
p {
  margin-top: 10px; text-align: center;
}
</style>
