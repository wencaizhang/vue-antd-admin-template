
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="解绑IP"
      okText="解绑"
      okType="danger"
    >
      <p style="margin-top: 10px; text-align: center;">您已经选择了云主机“{{ `${currRecord.id}(${currRecord.name})` }}”，其绑定的公网IP将被解绑，请确认你的操作。</p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/mixins/modalMixin";
import { unbindIP as fetchAPI } from "@/api/network/ip";
import mixins from './mixins'
export default {
  mixins: [baseModalMixins, mixins],
  data() {
    return {
      fetchAPI,
      name: "unbindIP",
    };
  },

  methods: {
    onShow () {
      const temp = this.$parent.ipList.find(item => item.ipAddress === this.currRecord.ipAddress);
      this.formValues = { id: temp && temp.id }
    },
  }
};
</script>
