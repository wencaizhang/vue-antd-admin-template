
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="删除硬盘"
      okText="删除"
      okType="danger"
    >
      <a-alert message="注意：删除硬盘后数据不可恢复！" type="warning" showIcon/>
      <p style="margin-top: 10px; text-align: center;">是否删除硬盘web1?</p>
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
    handleCreate() {
      this.handleCancel();
    }
  }
};
</script>
