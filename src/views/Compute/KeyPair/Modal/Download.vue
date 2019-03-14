
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="下载密钥对"
      okText="下载"
      okType="danger"
    >
      <p>通过点击“下载”按钮，可以获取私钥，此下载链接将保留5分钟。</p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/utils/mixins/modalMixin";
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      name: "download"
    };
  },

  methods: {
    // handleCreate() {
    //   this.handleCancel();
    // }
  }
};
</script>
