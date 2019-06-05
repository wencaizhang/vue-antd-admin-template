
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
      <a-alert message="注意：删除路由器后数据不可恢复！" type="warning" showIcon />
      <p>
        你已经选择了路由器“{{ totalList.map(item => item.name).join(', ') }}”，
        <template v-if="internalList.length">
          其中“{{ internalList.map(item => item.name).join(', ') }}”不满足删除条件,请先删除其关联的资源对象,再执行删除.
        </template>
        <template v-else>
          即将删除该路由,请确认你的操作.
        </template>
      </p>

      <template v-if="internalList.length" slot="footer">
        <a-button @click="handleCancel">取消</a-button>
      </template>
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
      loop: true,
      internalList: [],
      totalList: [],
    };
  },

  methods: {
    onShow () {
      const { data, selectedRowKeys } = this.$parent;
      this.totalList = data.filter(item => {
        return selectedRowKeys.includes(item.id);
      });
      this.internalList = this.totalList.filter(item => Array.isArray(item.internal) && item.internal.length);
      this.list = this.totalList.filter(item => !Array.isArray(item.internal) || !item.internal.length);

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
