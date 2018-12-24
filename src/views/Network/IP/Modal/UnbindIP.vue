
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
      <p
        style="margin-top: 10px; text-align: center;"
      >您已选择了 “101.36.136.xxx”，请确认你的操作，解绑后该云主机将无法通过互联网访问。</p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/utils/mixins/modalMixin";
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      name: "unbind-ip"
    };
  },

  methods: {
    handleCreate() {
      this.handleCancel();
    }
  }
};
</script>