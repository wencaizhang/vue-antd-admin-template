
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="删除密钥对"
      okText="删除"
      okType="danger"
    >
      <p
        style="margin-top: 10px; text-align: center;"
      >您已经选择了密钥对“${record.name}”，其绑定的公网IP将被解绑，请确认你的操作。</p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/utils/mixins/modalMixin";
import { deleteKeyPair as fetchAPI } from '@/api/compute/keypair';
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      fetchAPI,
      name: "batchDeleta"
    };
  },

  methods: {}
};
</script>
