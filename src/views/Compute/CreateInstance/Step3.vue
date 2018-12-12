<template>
  <div>
    <a-form :autoFormCreate="(form)=>{this.form = form }">
      <a-form-item
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 12 }"
        label="计费方式："
        fieldDecoratorId="payType"
        :fieldDecoratorOptions="{rules: [{  required: true, message: '请选择计费方式!' }]}"
      >
        <a-radio-group>
          <a-radio value="2">按合约计费</a-radio>
          <a-radio value="1">按需计费</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 12 }"
        label="主机名称："
        fieldDecoratorId="hostName"
        :fieldDecoratorOptions="{rules: [{  required: true, message: '请选择主机名称!' }]}"
      >
        <a-input placeholder="Basic usage"/>
      </a-form-item>
      <a-form-item
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 12 }"
        label="主机数量："
        fieldDecoratorId="hostNum"
        :fieldDecoratorOptions="{rules: [{  required: true, message: '请选择主机数量!' }]}"
      >
        <a-input placeholder="Basic usage"/>
      </a-form-item>
      <a-form-item
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 12 }"
        label="用户名："
        fieldDecoratorId="username"
        :fieldDecoratorOptions="{rules: [{  required: true, message: '请选择用户名!' }]}"
      >
        <a-select style="width: 120px">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 12 }"
        label="SSH秘钥："
        fieldDecoratorId="SSH"
        :fieldDecoratorOptions="{rules: [{  required: true, message: '请选择SSH秘钥!' }]}"
      >
        <div>
          <span style="margin-right: 3px;">已有请选择上传</span>
          <span style="margin-right: 3px;">，如无请</span>
          <a>新建</a>
        </div>
        <a-upload
          action="//jsonplaceholder.typicode.com/posts/"
          :multiple="true"
          :fileList="fileList"
          @change="handleFileChange"
        >
          <a-button>
            <a-icon type="upload"/>上传
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 12 }"
        label="用户数据："
        fieldDecoratorId="userData"
        :fieldDecoratorOptions="{rules: [{  required: true, message: '请选择用户数据!' }]}"
      >
        <a-radio-group>
          <a-radio :value="1">无</a-radio>
          <a-radio :value="2">文本</a-radio>
          <a-radio :value="3">可执行文件</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    submitForm() {
      this.form.validateFields((err, values) => {
        if (!err) {
          // 已经是最后一步，进行提交
          this.$emit("submit", { step4: values });
        }
      });
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