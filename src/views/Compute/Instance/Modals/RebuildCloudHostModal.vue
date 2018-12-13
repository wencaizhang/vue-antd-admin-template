<script>
import { Form } from "ant-design-vue";
const CollectionCreateForm = Form.create()({
  props: ["visible", "confirmLoading"],
  render() {
    const { visible, form, confirmLoading } = this;
    const { getFieldDecorator } = form;
    return (
      <a-modal
        visible={visible}
        title="重建云主机"
        okText={confirmLoading ? "重建中" : "重建"}
        bodyStyle={{ "max-height": "500px", overflow: "auto" }}
        confirmLoading={confirmLoading}
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
            label="选择镜像："
          >
            {getFieldDecorator("镜像", {
              rules: [
                {
                  required: true,
                  message: "请选择镜像！"
                }
              ]
            })(
              <a-select placeholder="请选择一个镜像">
                <a-select-option value="Centos6.5">Centos6.5</a-select-option>
                <a-select-option value="Centos7.4">Centos7.4</a-select-option>
                <a-select-option value="Centos7.5">Centos7.5</a-select-option>
                <a-select-option value="Ubuntu14.04">Ubuntu14.04</a-select-option>
                <a-select-option value="Ubuntu16.04">Ubuntu16.04</a-select-option>
              </a-select>
            )}
          </a-form-item>
          <a-form-item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label="磁盘分区："
          >
            {getFieldDecorator("磁盘分区", {
              rules: [
                {
                  required: true,
                  message: "请选择一种方式！"
                }
              ]
            })(
              <a-select placeholder="请选择一种方式">
                <a-select-option value="0">自动</a-select-option>
                <a-select-option value="1">手动</a-select-option>
              </a-select>
            )}
          </a-form-item>
        </a-form>
      </a-modal>
    );
  }
});

export default {
  props: ["data", "visible"],
  data() {
    return {
      confirmLoading: false
    };
  },
  methods: {
    handleCancel() {
      this.$emit("cancel");
    },
    handleCreate() {
      const form = this.formRef.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }

        console.log("Received values of form: ", values);
        this.submit(values);
      });
    },
    submit(values) {
      const form = this.formRef.form;
      this.confirmLoading = true;
      setTimeout(() => {
        // 提交数据成功之后
        this.confirmLoading = false;
        form.resetFields();
        this.$emit("success");
      }, 2000);
    },
    saveFormRef(formRef) {
      this.formRef = formRef;
    }
  },

  render() {
    return (
      <div>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.visible}
          confirmLoading={this.confirmLoading}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
};
</script>