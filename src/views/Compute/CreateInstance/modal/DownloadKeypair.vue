
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
// import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { downloadFile } from '@/utils/util';
import { createKeyPair as fetchAPI } from '@/api/compute/keypair';
export default {
  // mixins: [baseModalMixins, formModalMixins],
  props: {
    visible: {
      type: Boolean
    }
  },
  name: 'Download',
  data() {
    return {
      fetchAPI,
      name: "download",
      minute: 5,
      timer: 0,

      confirmLoading: false,

      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 }
      },
      form: this.$form.createForm(this),
    };
  },

  methods: {
    handleCreate() {
      this.formValues = this.$parent.createKeypairData
      this.handleFetch();
    },
    handleCancel() {
      this.$parent.showDownloadKeypairModal = false;
    },
    openNotification(resp) {
      downloadFile(resp.privateKey, resp.secrectKeyName);
      this.$parent.fetchKeyPairList();
    },
    handleFetchFailed (err) {},
    async handleFetch() {
      this.confirmLoading = true;
      try {
        const resp = await this.fetchAPI(this.formValues);
        this.handleCancel();
        this.openNotification(resp);
      }
      catch (err) {
        this.handleFetchFailed (err);
      }
      finally {
        this.confirmLoading = false;
      }
    },
  }
};
</script>
