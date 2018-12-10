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
        <a-form >
          <a-form-item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label="秘钥对名称："
          >
            {getFieldDecorator("秘钥对名称", {
              rules: [
                {
                  required: true,
                  message: "Please input the title of collection!"
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
                  message: "Please input the title of collection!"
                }
              ]
            })(<a-textarea placeholder="请在此粘贴您的SSH公钥" />)}
          </a-form-item>
        </a-form>
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
  props: ['obj'],
  mounted() {
    const form = this.formRef.form;
    form.setFieldsValue(
      this.obj || {}
    );
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