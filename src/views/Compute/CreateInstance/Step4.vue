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
          <a-radio value="1">按需计费</a-radio>
          <a-radio value="2">按合约计费</a-radio>
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
        <a-input placeholder="Basic usage"/>
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
    };
  },
  methods: {
    submitForm() {
      this.form.validateFields((err, values) => {
        if (!err) {
          // 已经是最后一步，进行提交
          this.$emit('submit', { step4: values })
        }
      });
    },
  },
};
</script>
<style>
</style>