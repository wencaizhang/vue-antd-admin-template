
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="卸载硬盘"
      okText="卸载"
      okType="danger"
    >
      <a-alert message="注意：卸载硬盘请确保硬盘挂载到的主机已在操作系统卸载挂载。" type="warning" showIcon/>
      <p style="margin-top: 10px; text-align: center;">是否确定要卸载主机host-db3挂载的硬盘db3?</p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/utils/mixins/modalMixin";
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      name: "uninstall"
    };
  },

  methods: {
    handleCreate() {
      this.handleCancel();
    }
  }
};
</script>
