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
        title="创建密钥对"
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
            label="名称："
          >
            {getFieldDecorator("名称", {
              rules: [
                {
                  required: true,
                  message: "请输入名称!"
                }
              ]
            })(<a-input />)}
          </a-form-item>
          <a-form-item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label="加密方式："
          >
            {getFieldDecorator("加密方式", {
              rules: [
                {
                  required: true,
                  message: "请选择加密方式!"
                }
              ]
            })(
              <a-select >
                <a-select-option value="ssh-rsa">ssh-rsa</a-select-option>
                <a-select-option value="ssh-dss">ssh-dss</a-select-option>
              </a-select>
            )}
          </a-form-item>
        </a-form>
      </a-modal>
    );
  }
});


/*
* 创建完成之后立即显示下载弹框，避免用户不知情
*/
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
        this.$emit('showDownload')
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