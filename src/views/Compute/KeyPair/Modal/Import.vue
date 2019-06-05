
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="导入密钥对"
      okText="保存"
    >
      <a-form :form="form">
        <a-form-item
          label="密钥对名称："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '请输入密钥对名称!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="公钥："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-textarea
            placeholder="请在此粘贴您的SSH公钥"
            v-decorator="[
              'publicKey',
              {
                rules: [{ required: true, message: '请在此粘贴您的SSH公钥!' }]
              }
            ]"
          />
        </a-form-item>
      </a-form>
      <a-row>
        <a-col :offset="8">
          <a-popover title="说明：">
            <template slot="content">
              <p>密钥对是用来登录您创建的云主机的式。为密钥对取一个方便您自己辨别的名字，然后在下方提供的空间内粘贴您的SSH公钥。</p>

              <p>
                <span>可以使用 ssh-keygen 命令来生成SSH密钥对：</span>
                <pre class="code">ssh-keygen -t rsa -f cloud.key</pre>
              </p>
              <p>
                这将生成一对密钥对：一个私钥
                (cloud.key)和一个公钥(cloud.key.pub)。请妥善保存好您的私钥，并把公钥文件内容粘贴在这里。
              </p>
              <p>创建云主机后，你使用私钥来登录云主机(登陆用户名取决您所用的镜像)：</p>
              <p>
                <pre class="code">ssh -i cloud.key &lt;username&gt;@&lt;instance_ip&gt;</pre>
              </p>
            </template>

            <span class="more">
              了解更多
              <a-icon style="margin-left: 5px;" type="question-circle-o" />
            </span>
          </a-popover>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { importKeyPair as fetchAPI } from '@/api/compute/keypair';
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "import"
    };
  },

  methods: {}
};
</script>

<style scoped>
.more {
  cursor: help;
}
.more:hover {
  color: #40a9ff;
}
</style>
