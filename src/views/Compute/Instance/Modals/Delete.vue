
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="删除云主机"
      okText="删除"
      okType="danger"
    >
      <p
        style="margin-top: 10px; text-align: center;"
      >您已经选择了云主机“${record.name.first}”，其绑定的公网IP将被解绑，请确认你的操作。</p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/utils/mixins/modalMixin";
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      name: "deleteCloudHost"
    };
  },

  methods: {}
};
</script>
