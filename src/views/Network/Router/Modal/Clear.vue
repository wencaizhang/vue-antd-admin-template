
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="清除网关"
      okText="清除"
      okType="danger"
    >
      <p style="margin-top: 10px; text-align: center;">你已选择 "test-router1" 。清除网关后将无法联通公网. 请确认您的选择。你可以通过使用网关配置动作稍后重置网关，但网关IP可能改变。</p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/utils/mixins/modalMixin";
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      name: "clearGateway"
    };
  },

  methods: {
    handleCreate() {
      this.handleCancel();
    }
  }
};
</script>
