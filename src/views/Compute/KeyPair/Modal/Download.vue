
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="SSH密钥对已创建"
      okText="下载"
    >
      <p>
        <a-icon type="warning" style="color: #faad14;" />
        我们不会保管您的私钥信息，请您在10分钟内点击"<strong>下载</strong>"按钮获取私钥</p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/mixins/modalMixin";
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      name: "download",
    };
  },

  methods: {
    handleCreate () {
      const data = this.$store.state[this.$parent.module][this.$parent.id]['lastCreatedKeyPair'];
      this.fileDownload (data.privateKey, data.secrectKeyName);
      this.handleCancel();
    },
    fileDownload (content, filename) {
      // 创建隐藏的可下载链接
      const eleLink = document.createElement('a');
      eleLink.download = filename;
      eleLink.style.display = 'none';
      // 字符内容转变成blob地址
      const blob = new Blob([content], {type: "application/octet-stream"});
      // MIME类型参考手册 http://www.w3school.com.cn/media/media_mimeref.asp
      eleLink.href = URL.createObjectURL(blob);
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    }
  }
};
</script>
