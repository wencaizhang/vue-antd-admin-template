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
        title="绑定IP"
        okText={confirmLoading ? "绑定中" : "绑定"}
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
            label="IP地址："
          >
            {getFieldDecorator("IP地址", {
              rules: [
                {
                  required: true,
                  message: "请选择IP地址！"
                }
              ]
            })(
                <a-select class="container-----" placeholder="请选择一个IP地址">
                  <a-select-option value="jack">Jack</a-select-option>
                  <a-select-option value="lucy">Lucy</a-select-option>
                  <a-icon
                    slot="suffixIcon"
                    class="addonAfter"
                    title="分配公网IP"
                    type="plus-circle"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.$emit("allotIP");
                      return false;
                    }}
                  />
                </a-select>
            )}
          </a-form-item>
          <a-form-item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label="待绑定的IP接口："
          >
            {getFieldDecorator("待绑定的IP接口", {
              rules: [
                {
                  required: true,
                  message: "请选择一个接口！"
                }
              ]
            })(
              <a-select placeholder="请选择一个接口">
                <a-select-option value="Jack">Jack</a-select-option>
                <a-select-option value="lucyx">Lucy</a-select-option>
              </a-select>
            )}
          </a-form-item>
        </a-form>
      </a-modal>
    );
  }
});

export default {
  props: ["record", "visible"],
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
          onAllotIP={() => {
            this.$emit("allotIP");
          }}
        />
      </div>
    );
  }
};
</script>
<style>
.container----- {
  position: relative;
}
.container----- .addonAfter {
  position: absolute;
  top: 0;
  right: -35px;
  font-size: 16px;
  cursor: pointer;
}
</style>
