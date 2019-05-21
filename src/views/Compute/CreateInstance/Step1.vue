<template>
  <div>
    <a-form :form="form">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="可用区">
        <a-radio-group
          buttonStyle="solid"
          v-decorator="[
            'regionId',
            {
              initialValue: '1',
              rules: [{ required: true, message: '请选择一个可用区!' }]
            }
          ]"
        >
          <a-radio-button value="1">北京1区</a-radio-button>
          <a-radio-button value="2" disabled>北京2区</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="CPU">
        <a-radio-group
          buttonStyle="solid"
          v-decorator="[
            'cpu',
            {
              initialValue: 1,
              rules: [{ required: true, message: '请选择一个CPU!' }]
            }
          ]"
        >
          <a-radio-button
            v-for="item in optionList.cpu"
            :key="item.value"
            :value="item.value"
          >{{item.text}}</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="内存">
        <a-radio-group
          buttonStyle="solid"
          v-decorator="[
            'memory',
            {
              initialValue: 1,
              rules: [{ required: true, message: '请选择一个内存!' }]
            }
          ]"
        >
          <a-radio-button
            v-for="item in optionList.memory"
            :key="item.value"
            :value="item.value"
          >{{item.text}}</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="系统盘">
        <a-col>
          <a-input-number
            :step="10"
            :min="40"
            :max="200"
            @blur="handleSystemDiskBlur"
            v-decorator="[
            'systemDisk',
            {
              initialValue: 40,
              rules: [{ required: true, message: '请填写系统盘大小!' }]
            }
          ]"
          />
          <span style="margin: 0 5px">G</span>
          <a-tooltip class="tooltip">
            <template slot="title">可选大小40G-200G,步长为10G</template>
            <a-icon type="info-circle"/>
          </a-tooltip>
        </a-col>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>

const optionList = {
  memory: [
    { text: "1G", value: 1 },
    { text: "2G", value: 2 },
    { text: "4G", value: 4 },
    { text: "8G", value: 8 },
    { text: "12G", value: 12 },
    { text: "16G", value: 16 },
    { text: "32G", value: 32 },
    { text: "48G", value: 48 },
    { text: "64G", value: 64 }
  ],
  cpu: [
    { text: "1核", value: 1 },
    { text: "2核", value: 2 },
    { text: "4核", value: 4 },
    { text: "8核", value: 8 },
    { text: "12核", value: 12 },
    { text: "24核", value: 24 },
    { text: "32核", value: 32 }
  ]
};

export default {

  data() {
    return {
      form: this.$form.createForm(this),
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
      loading: false,
      systemDisk: 1,
      optionList
    };
  },
  methods: {
    handleSubmit() {
      return new Promise((resolve, reject) => {
        this.form.validateFieldsAndScroll((err, values) => {
          err
            ? reject(err)
            : resolve(
                Object.assign({}, values, {
                  memory: values.memory * 1024
                  // 接口需要内存单位为 M
                })
              );
        });
      });
    },

    handleSystemDiskBlur(e) {
      // 将系统盘转为 10 的倍数
      let v = e.target.value;
      this.form.setFieldsValue({
        systemDisk: Math.ceil(parseInt(v) / 10) * 10
      });
    }
  }
};
</script>
<style scoped>
.tooltip {
  cursor: pointer;
}
.tooltip:hover {
  color: #1890ff;
}
</style>
