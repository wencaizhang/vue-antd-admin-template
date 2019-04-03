
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="下载密钥对"
      okText="下载"
    >
      <!-- <p>
        <a-icon type="warning" style="color: #faad14;" />
        我们不会保管您的私钥信息，请您在{{ minute }}分钟内点击"<strong>下载</strong>"按钮获取私钥</p> -->

      <p>通过点击“下载”按钮，获取密钥，若未下载密钥将无法创建密钥。</p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { downloadFile } from '@/utils/util';
import { createKeyPair as fetchAPI } from '@/api/compute/keypair';
import { constants } from 'crypto';
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "download",
      minute: 5,
      timer: 0,
    };
  },

  methods: {
    // onShow () {
    //   this.timer = setTimeout(() => {
    //     this.handleCancel();
    //   }, this.minute * 60 * 1000);
    // },
    // onHidden () {
    //   clearTimeout(this.timer);
    // },
    onShow () {
      this.formValues = this.$store.state[this.$parent.module][this.$parent.id]['lastCreatedKeyPair'];
    },
    openNotification(resp) {
      downloadFile(resp.privateKey, resp.secrectKeyName);
    },
  }
};
</script>
