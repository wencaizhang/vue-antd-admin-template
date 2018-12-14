<script>
import { Form } from "ant-design-vue";
const CollectionCreateForm = Form.create()({
  props: ["visible", "sourceType", "validateUrlPass", "validateFilePass"],
  render() {
    const { form, visible, sourceType,  validateUrlPass, validateFilePass, handleFileChange, fileList } = this;
    const { getFieldDecorator } = form;
    return (
      <a-modal
        visible={visible}
        title="创建镜像"
        okText="创建"
        bodyStyle={{ "max-height": "400px", overflow: "auto" }}
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
            label="名称："
          >
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "请输入镜像名称!"
                }
              ]
            })(<a-input />)}
          </a-form-item>
          <a-form-item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label="描述："
          >
            {getFieldDecorator("desc", {
              rules: [
                {
                  required: true,
                  message: "请输入描述内容!"
                }
              ]
            })(<a-input />)}
          </a-form-item>
          <a-form-item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label="镜像源："
          >
            {getFieldDecorator("source", {
              initialValue: "0",
              rules: [
                {
                  required: true,
                  message: "请选择镜像源!"
                }
              ]
            })(
              <a-select
                onChange={value => {
                  this.$emit("selectSource", value);
                }}
                placeholder="请选择镜像源"
              >
                <a-select-option value="0">镜像文件</a-select-option>
                <a-select-option value="1">镜像地址</a-select-option>
              </a-select>
            )}
          </a-form-item>
          <a-form-item
            v-show={sourceType == 0}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label="镜像文件："
            help={!validateFilePass ? "请上传镜像地址!" : ""}
            validateStatus={!validateFilePass ? "error" : ""}
          >
            {getFieldDecorator("file", {})(
              <a-upload
                action="/"
                multiple={true}
                fileList={fileList}
                onChange={handleFileChange}
              >
                <a-button>
                  <a-icon type="upload" />
                  上传
                </a-button>
              </a-upload>
            )}
          </a-form-item>
          <a-form-item
            v-show={sourceType == 1}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label="镜像地址："
            help={!validateUrlPass ? "请输入镜像地址!" : ""}
            validateStatus={!validateUrlPass ? "error" : ""}
          >
            {getFieldDecorator("url", {})(
              <a-input placeholder="请输入镜像地址" />
            )}
          </a-form-item>
          <a-form-item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label="镜像格式："
          >
            {getFieldDecorator("type", {
              rules: [
                {
                  required: true,
                  message: "请选择镜像格式!"
                }
              ]
            })(
              <a-select placeholder="选择镜像格式">
                <a-select-option value="QCOW2-QEMU">QCOW2-QEMU</a-select-option>
                <a-select-option value="Docker">Docker</a-select-option>
                <a-select-option value="ISO-光盘镜像">
                  ISO-光盘镜像
                </a-select-option>
                <a-select-option value="Raw">Raw</a-select-option>
                <a-select-option value="VMDK-Vmware虚拟磁盘">
                  VMDK-Vmware虚拟磁盘
                </a-select-option>
                <a-select-option value="VHD-Vmware虚拟硬盘">
                  VHD-Vmware虚拟硬盘
                </a-select-option>
              </a-select>
            )}
          </a-form-item>
          <a-form-item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label="架构："
          >
            {getFieldDecorator("framework", {
              rules: [
                {
                  required: true,
                  message: "请填写架构!"
                }
              ]
            })(<a-input />)}
          </a-form-item>
          <a-form-item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label="最小磁盘(GB)："
          >
            {getFieldDecorator("minDisk", {
              rules: [
                {
                  required: true,
                  message: "请填写最小磁盘!"
                }
              ]
            })(
              <a-input-number
                min={40}
                max={200}
                formatter={value => (value ? `${value} G` : "")}
                parser={value => value.replace(" G", "")}
              />
            )}
          </a-form-item>
          <a-form-item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label="最低内存(GB)："
          >
            {getFieldDecorator("minMomery", {
              rules: [
                {
                  required: true,
                  message: "请填写最低内存!"
                }
              ]
            })(
              <a-input-number
                min={2}
                max={100}
                formatter={value => (value ? `${value} G` : "")}
                parser={value => value.replace(" G", "")}
              />
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
      visible: false,
      fileList: [],
      sourceType: 0,
      validateUrlPass: true,
      validateFilePass: true,
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

        const {source, url, file} = values;
        if (source == 0 && !file) {
          this.validateFilePass = false
        }
        if (source == 1 && !url) {
          this.validateUrlPass = false
        }
        
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
    },
    handleSelectSource(value) {
      if (value == 0) {
        this.validateUrlPass = true
      } else {
        this.validateFilePass = true
      }
      this.sourceType = value;
    },
    handleFileChange(info) {
      let fileList = info.fileList;

      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-2);

      // 2. read from response and show file link
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });

      // 3. filter successfully uploaded files according to response from server
      fileList = fileList.filter(file => {
        if (file.response) {
          return file.response.status === "success";
        }
        return true;
      });

      this.fileList = fileList;
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
          创建镜像
        </a-button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.visible}
          validateFilePass={this.validateFilePass}
          validateUrlPass={this.validateUrlPass}
          sourceType={this.sourceType}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          onSelectSource={this.handleSelectSource}
        />
      </div>
    );
  }
};
</script>