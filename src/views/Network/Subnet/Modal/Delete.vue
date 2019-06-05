
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
      <a-alert message="注意：删除网络后数据不可恢复！" type="warning" showIcon />

      <p style="margin-top: 10px;">
        你已经选择了网络“{{ totalList.map(item => item.name).join(', ') }}”，
        <template v-if="bindInstanList.length">
          其中“{{ bindInstanList.map(item => item.name).join(', ') }}”不满足删除条件,请先删除其关联的资源对象,再执行删除.
        </template>
        <template v-else>
          即将删除该网络,请确认你的操作.
        </template>
      </p>

      <template v-if="bindInstanList.length" slot="footer">
        <a-button @click="handleCancel">取消</a-button>
      </template>
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
      totalList: [],
      bindInstanList: [],
    };
  },

  methods: {
    onShow () {
      const { data, selectedRowKeys } = this.$parent;
      this.totalList = data.filter(item => {
        return selectedRowKeys.includes(item.id);
      });

      this.bindInstanList = this.totalList.filter(item => item.isBindInstance);
      this.list = this.totalList.filter(item => !item.isBindInstance);

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
