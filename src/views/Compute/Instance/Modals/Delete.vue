
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
      >您已经选择了云主机“<strong>{{ currRecord.name }}</strong>”，将被删除，请确认你的操作。</p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/mixins/modalMixin";
import { deleteInstance as fetchAPI } from '@/api/compute/instance';
import mixins from './mixins'
export default {
  mixins: [baseModalMixins, mixins],
  data() {
    return {
      fetchAPI,
      name: "deleteCloudHost"
    };
  },

  methods: {}
};
</script>
