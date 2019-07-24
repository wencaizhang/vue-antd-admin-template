
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="删除人员"
    >
      删除后该账户将无法使用管理系统,请确认你的操作  
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
      name: "delete"
    };
  },
  methods: {

  },
};
</script>

