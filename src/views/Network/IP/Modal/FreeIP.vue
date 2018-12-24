
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
      <p
        style="margin-top: 10px; text-align: center;"
      >您已选择了 “101.36.136.xxx”，请确认你的操作，释放后该IP地址被回收到公网IP池，需要时重新申请。</p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/utils/mixins/modalMixin";
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      name: "free-ip"
    };
  },

  methods: {
    handleCreate() {
      this.handleCancel();
    }
  }
};
</script>