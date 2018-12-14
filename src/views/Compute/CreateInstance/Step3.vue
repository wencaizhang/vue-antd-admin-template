<template>
  <div>
    <a-form :form="form">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="计费方式：">
        <a-radio-group
          buttonStyle="solid"
          v-decorator="[
            'payType',
            {rules: [{ required: true, message: '请选择计费方式!' }]}
          ]"
        >
          <a-radio value="1">按合约计费</a-radio>
          <a-radio value="2">按需计费</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="主机名称：">
        <a-input
          v-decorator="[
            'hostName',
            {rules: [{ required: true, message: '请填写主机名称!' }]}
          ]"
          style="width: 250px"
          placeholder="请填写主机名称"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="主机数量：">
        <a-input-number
          style="width: 250px"
          :min="1"
          :max="10"
          :formatter="value => value ? `${value} 台` : '' "
          :parser="value => value.replace(' 台', '')"
          v-decorator="[
            'hostNum',
            {rules: [{ required: true, message: '请填写主机数量!' }]}
          ]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户名：">
        <a-select
          v-decorator="[
            'username',
            {rules: [{ required: true, message: '请选择用户名!' }]}
          ]"
          style="width: 250px"
        >
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled">Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="SSH秘钥："
        fieldDecoratorId="SSH"
      >
        <div>
          <span style="margin-right: 3px;">已有请选择上传</span>
          <span style="margin-right: 3px;">，如无请</span>
          <a>新建</a>
        </div>
        <a-upload
          v-decorator="['SSH', {
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
            rules: [{  required: true, message: '请选择SSH秘钥!' }]
          }]"
          action="/"
          :multiple="true"
          :fileList="fileList"
          @change="handleFileChange"
        >
          <a-button>
            <a-icon type="upload"/>上传
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户数据：">
        <a-radio-group
          v-decorator="[
            'userData',
            {rules: [{ required: true, message: '请选择用户数据!' }]}
          ]"
          @change="handleUserDataChange"
        >
          <a-radio :value="1">无</a-radio>
          <a-radio :value="2">文本</a-radio>
          <a-radio :value="3">可执行文件</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-row style="margin-bottom: 24px;">
        <a-col :offset="8" :span="12" style="text-align: left;">
          <a-textarea v-if="userData == 2" placeholder="Basic usage" :rows="4"/>
          <a-upload
            v-if="userData == 3"
            action="/"
            :multiple="true"
            :fileList="fileList"
            @change="handleFileChange"
          >
            <a-button>
              <a-icon type="upload"/>上传
            </a-button>
          </a-upload>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
      fileList: [],
      userData: 0
    };
  },
  mounted() {
    this.form.setFieldsValue({
      payType: "1"
    });
  },
  methods: {
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit("submit", { step4: values });
        }
      });
    },
    handleUserDataChange(e) {
      console.log("radio checked", e.target.value);
      this.userData = e.target.value;
    },
    normFile(e) {
      console.log("Upload event:", e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
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
  }
};
</script>
<style>
</style>