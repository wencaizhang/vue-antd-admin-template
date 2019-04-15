
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="删除网络"
      okText="删除"
      okType="danger"
    >
      <a-alert message="注意：删除网络后数据不可恢复！" type="warning" showIcon/>
      <p style="margin-top: 10px; text-align: center;">是否删除网络{{ list.map(item => item.name).join(', ') }}?</p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/mixins/modalMixin";
import { deleteNetwork as fetchAPI } from '@/api/network/network';
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      fetchAPI,
      name: "delete",
      loop: true,
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
        const payload = { networkId: item.id };
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
