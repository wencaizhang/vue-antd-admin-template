
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="删除路由器"
      okText="删除"
      okType="danger"
    >
      <a-alert message="注意：删除路由器后数据不可恢复！" type="warning" showIcon/>
      <p>
        是否删除路由器 {{ list.map(item => item.name).join(', ') }}?
      </p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { deleteRouter as fetchAPI } from "@/api/network/router";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "delete",
      list: [],
      handleItemCount: 0,
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
        const payload = { routerId: item.id }
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
