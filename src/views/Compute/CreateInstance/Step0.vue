<template>
  <div>
    <a-form :autoFormCreate="(form)=>{this.form = form }">
      <a-form-item
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 12 }"
        label="映像提供方："
        fieldDecoratorId="supporter"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择一个映像提供方!' }]}"
      >
        <a-radio-group buttonStyle="solid">
          <a-radio-button value="large">系统</a-radio-button>
          <a-radio-button value="default">自有</a-radio-button>
          <a-radio-button value="small">共享</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 12 }"
        label="选择操作系统："
        fieldDecoratorId="mirror"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择一个操作系统!' }]}"
      >
        <a-select placeholder="请选择">
          <a-select-option
            v-for="item in optionList.mirror"
            :key="item.value"
            :value="item.value"
          >{{item.text}}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
const optionList = {
  memory: [
    { text: "1G", value: "1G" },
    { text: "2G", value: "2G" },
    { text: "4G", value: "4G" },
    { text: "8G", value: "8G" },
    { text: "12G", value: "12G" },
    { text: "16G", value: "16G" },
    { text: "32G", value: "32G" },
    { text: "48G", value: "48G" },
    { text: "64G", value: "64G" }
  ],
  cpu: [
    { text: "1核", value: "1核" },
    { text: "2核", value: "2核" },
    { text: "4核", value: "4核" },
    { text: "8核", value: "8核" },
    { text: "12核", value: "12核" },
    { text: "24核", value: "24核" },
    { text: "32核", value: "32核" }
  ],
  mirror: [
    { text: "Centos6.5_X86_64bit", value: "Centos6.5_X86_64bit" },
    { text: "Centos6.6_X86_64bit", value: "Centos6.6_X86_64bit" },
    { text: "Centos7.1_X86_64bit", value: "Centos7.1_X86_64bit" },
    { text: "Centos7.2_X86_64bit", value: "Centos7.2_X86_64bit" },
    { text: "Centos7.4_X86_64bit", value: "Centos7.4_X86_64bit" },
    { text: "Centos7.5_X86_64bit", value: "Centos7.5_X86_64bit" },
    { text: "Ubuntu14.04_x86_64bit", value: "Ubuntu14.04_x86_64bit" },
    { text: "Ubuntu16.04_X86_64bit", value: "Ubuntu16.04_X86_64bit" },
    {
      text: "Window Server2008 R2 64bit",
      value: "Window Server2008 R2 64bit"
    },
    {
      text: "Window Server2012 R2 64bit",
      value: "Window Server2012 R2 64bit"
    }
  ]
};

export default {
  data() {
    return {
      optionList,
    };
  },
  methods: {
    submitForm() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('next', { step1: values })
        }
      });
    }
  }
};
</script>
<style>
</style>