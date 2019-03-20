
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="创建密钥对"
      okText="创建"
    >
      <a-form :form="form">
        <a-form-item
          label="名称："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '请输入名称!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="加密方式："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-select
            v-decorator="[
              'encryption',
              {
                initialValue: 'ssh-rsa',
                rules: [{ required: true, message: '请选择加密方式!' }]
              }
            ]"
          >
            <a-select-option value="ssh-rsa">ssh-rsa</a-select-option>
            <a-select-option value="ssh-dss">ssh-dss</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/utils/mixins/modalMixin";
import { createKeyPair as fetchAPI, downloadKeyPair } from '@/api/compute/keypair';
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "create"
    };
  },

  methods: {
    openNotification(resp) {
      const { download } = this;
      this.$message.success(
        <span>密钥对创建成功，请立即<a href="javascript:;" onClick={()=>{download(resp)}}>下载</a></span>,
        3
      )
    },
    async download (resp) {
      console.log('resp', resp)


      this.funDownload('fsadfafasfsfasfasfaf', 'test')
      return;
      const payload = {
        "secretKeyId": "string",
        "secretKeyName": "string"
      }
      try {
        const data = await downloadKeyPair(payload);
        console.log(data);
      }
      catch (err) {

      }
    },
    funDownload (content, filename) {
        // 创建隐藏的可下载链接
        var eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        // 字符内容转变成blob地址
        var blob = new Blob([content]);
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    },
    handleFetchFailed (err) {
      // 请求失败处理函数
      debugger;
    },
  }
};
</script>

