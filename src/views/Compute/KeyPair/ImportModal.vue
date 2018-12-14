<script>
import { Form } from "ant-design-vue";
const CollectionCreateForm = Form.create()({
  props: ["visible"],
  render() {
    const { visible, form } = this;
    const { getFieldDecorator } = form;
    return (
      <a-modal
        visible={visible}
        title="导入密钥对"
        okText="保存"
        onCancel={() => {
          this.$emit("cancel");
        }}
        onOk={() => {
          this.$emit("create");
        }}
      >
        <a-form>
          <a-form-item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label="密钥对名称："
          >
            {getFieldDecorator("密钥对名称", {
              rules: [
                {
                  required: true,
                  message: "请输入密钥对名称!"
                }
              ]
            })(<a-input />)}
          </a-form-item>
          <a-form-item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label="公钥："
          >
            {getFieldDecorator("公钥", {
              rules: [
                {
                  required: true,
                  message: "请在此粘贴您的SSH公钥!"
                }
              ]
            })(<a-textarea placeholder="请在此粘贴您的SSH公钥" />)}
          </a-form-item>
        </a-form>
        <a-row>
          <a-col span={8} />
          <a-col span={14}>
            <a-popover title="说明：">
              <template slot="content">
                <p>
                  密钥对是用来登录您创建的云主机的式。为密钥对取一个方便您自己辨别的名字，然后在下方提供的空间内粘贴您的SSH公钥。
                </p>
                <p>
                  可以使用 ssh-keygen 命令来生成SSH密钥对：
                  <pre class="code">ssh-keygen -t rsa -f cloud.key</pre>
                </p>
                <p>
                  这将生成一对密钥对：一个私钥
                  (cloud.key)和一个公钥(cloud.key.pub)。请妥善保存好您的私钥，并把公钥文件内容粘贴在这里。
                </p>
                <p>
                  创建云主机后，你使用私钥来登录云主机(登陆用户名取决您所用的镜像)：
                </p>
                <p>
                  <pre class="code">
                    ssh -i cloud.key &lt;username&gt;@&lt;instance_ip&gt;
                  </pre>
                </p>
              </template>
              <span>
                了解更多
                <a-icon style="margin-left: 5px;" type="question-circle-o" />
              </span>
            </a-popover>
          </a-col>
        </a-row>
      </a-modal>
    );
  }
});

export default {
  data() {
    return {
      visible: false
    };
  },
  mounted() {
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleCreate() {
      const form = this.formRef.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }

        console.log("Received values of form: ", values);
        form.resetFields();
        this.visible = false;
      });
    },
    saveFormRef(formRef) {
      this.formRef = formRef;
    }
  },

  render() {
    return (
      <div>
        <a-button
          type="primary"
          style="margin-right: 10px;"
          icon="upload"
          onClick={this.showModal}
        >
          导入密钥对
        </a-button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
};
</script>

<style>
pre.code {
  display: inline-block;
  padding: 0 3px;
  margin-bottom: 0;
  background-color: #f8f8f8;
  vertical-align: bottom;
}
</style>
