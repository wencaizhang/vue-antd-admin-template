
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
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      name: "delete"
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
    handleCreate() {
      this.handleCancel();
    }
  }
};
</script>
