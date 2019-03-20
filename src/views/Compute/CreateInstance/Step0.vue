<template>
  <div>
    <a-form :form="form">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="映像提供方：">
        <a-radio-group
          @change="handleChange"
          buttonStyle="solid"
          v-decorator="[
            'imageProvider',
            {
              rules: [{ required: true, message: '请选择一个映像提供方!' }],
              initialValue: 'o'
            }
          ]"
        >
          <a-radio-button value="o">系统</a-radio-button>
          <a-radio-button value="1">自有</a-radio-button>
          <a-radio-button value="2">共享</a-radio-button>
        </a-radio-group>
        <!-- 映像提供方[0:系统 1:自有 2:共享] -->
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="选择操作系统：">
        <a-select
          v-decorator="[
            'os',
            {rules: [{ required: true, message: '请选择一个操作系统!' }]}
          ]"
          placeholder="请选择"
        >
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
import { getImageList } from "@/api/compute/images";

const optionList = {
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
// 映像提供方[0:系统 1:自有 2:共享]
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
      imageProvider: '0',
      optionList
    };
  },
  mounted () {
    this.fetchImageList();
  },
  methods: {
    async fetchImageList () {
      try {
        const resp = await getImageList({
          imageSource: this.imageProvider
        })
        console.log()
      } catch (err) {

      }
    },
    handleChange (e) {
      this.imageProvider = e.target.value;
      this.fetchImageList();
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$emit("next", { step1: values });
        }
      });
    }
  }
};
</script>
<style>
</style>
