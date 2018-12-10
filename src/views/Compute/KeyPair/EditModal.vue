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
        title="修改秘钥属性"
        okText="提交"
        bodyStyle={{ 'max-height': '500px', overflow: 'auto'}}
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
            label="秘钥名称："
          >
            {getFieldDecorator("秘钥名称", {
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
            label="描述："
          >
            {getFieldDecorator("描述", {
              rules: [
                {
                  required: true,
                  message: "Please input the title of collection!"
                }
              ]
            })(<a-textarea placeholder="Basic usage" />)}
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
          icon="plus"
          onClick={this.showModal}
        >
          创建
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