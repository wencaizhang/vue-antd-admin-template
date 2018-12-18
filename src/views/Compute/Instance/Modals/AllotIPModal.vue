<script>
import { Form } from "ant-design-vue";
const CollectionCreateForm = Form.create()({
  props: ["visible", "minBandwidth", "confirmLoading"],
  render() {
    console.log("render");
    const { visible, form, minBandwidth, confirmLoading } = this;
    const { getFieldDecorator } = form;

    const onInputChange = v => {
      console.log(v);
      this.$emit("updateMinBandwidth", v);
      form.setFieldsValue({ minBandwidth: v });
      console.log("minBandwidth", minBandwidth);
    };
    const onSliderChange = v => {
      console.log(v);
      this.$emit("updateMinBandwidth", v);
      console.log("minBandwidth", minBandwidth);
    };

    return (
      <a-modal
        visible={visible}
        title="分配公网IP"
        okText={confirmLoading ? "分配中" : "分配"}
        bodyStyle={{ "max-height": "500px", overflow: "auto" }}
        confirmLoading={confirmLoading}
        onCancel={() => {
          this.$emit("cancel");
        }}
        onOk={() => {
          this.$emit("create");
        }}
      >
        <a-alert
          message="说明：从指定的公网IP池中分配一个地址"
          type="info"
          style="margin-bottom: 10px;"
          showIcon
        />
        <a-form>
          <a-form-item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label="资源池："
          >
            {getFieldDecorator("资源池", {
              rules: [
                {
                  required: true,
                  message: "请选择资源池！"
                }
              ],
              initialValue: "external_net"
            })(
              <a-select placeholder="请选择资源池">
                <a-select-option value="external_net">
                  external_net
                </a-select-option>
                <a-select-option value="external_IPV6">
                  external_IPV6
                </a-select-option>
              </a-select>
            )}
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
                  message: "请填写描述!"
                }
              ]
            })(<a-textarea placeholder="描述" />)}
          </a-form-item>
          <div class="form-item-container">
            <a-form-item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
              label="带宽(Mbps)："
            >
              {getFieldDecorator("minBandwidth", {
                rules: [
                  {
                    required: true,
                    message: "请填写带宽!"
                  }
                ]
              })(
                <a-slider
                  min={1}
                  max={50}
                  tipFormatter={v => `${v}Mb`}
                  onChange={onSliderChange}
                />
              )}
            </a-form-item>

            <a-input-number
              class="input-number"
              min={1}
              max={50}
              onChange={onInputChange}
              value={minBandwidth}
              formatter={value => (value ? `${value} Mb` : "")}
              parser={value => value.replace(" Mb", "")}
            />
          </div>
        </a-form>
      </a-modal>
    );
  }
});

export default {
  props: ["record", "visible"],
  data() {
    return {
      confirmLoading: false,
      minBandwidth: 1,
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
          minBandwidth={this.minBandwidth}
          confirmLoading={this.confirmLoading}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          onUpdateMinBandwidth={v => (this.minBandwidth = v)}
        />
      </div>
    );
  }
};
</script>

<style>
.form-item-container {
  position: relative;
}
.form-item-container .input-number {
  position: absolute;
  top: 0;
  right: 8.2%;
  width: 90px;
}
.form-item-container .ant-form-item-control-wrapper {
  padding-right: 100px;
}
</style>
