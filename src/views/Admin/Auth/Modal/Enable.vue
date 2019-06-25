
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="启用账户"
    >
        该账户将恢复正常使用.      
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
      name: "enable"
    };
  },
  methods: {

  },
};
</script>

