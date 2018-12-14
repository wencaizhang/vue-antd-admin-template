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
        title="新建路由器"
        okText="创建"
        bodyStyle={{ 'max-height': '400px', overflow: 'auto'}}
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
            label="路由器名称："
          >
            {getFieldDecorator("路由器名称", {
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
            label="外部网络："
          >
            {getFieldDecorator("外部网络", {
              rules: [
                {
                  required: true,
                  message: "Please input the title of collection!"
                }
              ]
            })(
                <a-radio-group name="radioGroup">
                  <a-radio value="1">external</a-radio>
                  <a-radio value="2">使用已有秘钥</a-radio>
                </a-radio-group>
            )}
          </a-form-item>
          <a-form-item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label="启用管理员状态："
          >
            {getFieldDecorator("管理员状态", {
              rules: [
                {
                  required: true,
                  message: "Please input the title of collection!"
                }
              ]
            })(
              <a-checkbox >启用</a-checkbox>
            )}
          </a-form-item>
          <a-form-item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label="启动SNAT："
          >
            {getFieldDecorator("启动SNAT", {
              rules: [
                {
                  required: true,
                  message: "Please input the title of collection!"
                }
              ]
            })(
              <a-checkbox >启动</a-checkbox>
            )}
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