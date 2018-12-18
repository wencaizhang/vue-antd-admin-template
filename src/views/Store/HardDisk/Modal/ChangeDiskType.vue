<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      title="更改硬盘类型"
      okText="保存"
    >
      <a-form :form="form">
        <a-form-item label="硬盘名称" :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }">
          <a-input
            :disabled="true"
            v-decorator="[
              'name',
              {
                initialValue: 'web1',
                rules: [{ required: true, message: '请输入硬盘名称' }]
              }
            ]"
            placeholder="请输入硬盘名称"
          />
        </a-form-item>
        <a-form-item label="硬盘类型" :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }">
          <a-radio-group
            v-decorator="[
              'type',
              {
                initialValue: 'SSD',
                rules: [{ required: true, message: '请选择硬盘类型' }]}
            ]"
          >
            <a-radio value="SSD">SSD</a-radio>
            <!-- <a-radio :value="普通">普通</a-radio> -->
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "changeDiskType",
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 }
      },
      form: this.$form.createForm(this)
    };
  },
  computed: {
    visible() {
      return this.$store.state.store.modalVisible[this.name];
    }
  },
  methods: {
    handleCancel() {
      this.$store.commit("toggleModalVisible", this.name);
    },
    handleCreate() {
      this.form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        this.form.resetFields();
        this.$store.commit("toggleModalVisible", this.name);
      });
    }
  }
};
</script>