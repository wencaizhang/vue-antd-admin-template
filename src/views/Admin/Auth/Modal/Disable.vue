
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="停用账户"
    >
        停用后该账户将无法登录管理系统,请确认你的操作   
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/mixins/modalMixin";
import { createOrder as fetchAPI } from "@/api/user/order";
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      fetchAPI,
      name: "disable"
    };
  },
  methods: {

  },
};
</script>

