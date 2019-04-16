
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="解绑IP地址"
      okText="解绑"
      okType="danger"
    >
      <p>您已选择了 {{ list.map(item => item.ipAddress).join(', ') }}，请确认你的操作，解绑后该云主机将无法通过互联网访问。</p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/mixins/modalMixin";
import { unbindIP as fetchAPI } from "@/api/network/ip";
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      fetchAPI,
      loop: true,
      name: "unbind-ip",
    };
  },

  methods: {
    onShow () {
      const { data, selectedRowKeys } = this.$parent;
      this.list = data.filter(item => {
        return selectedRowKeys.includes(item.id);
      });
      this.handleItemCount = this.list.length;
    },
    async handleItemFetch (item) {
      try {
        const payload = { id: item.id, };
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
