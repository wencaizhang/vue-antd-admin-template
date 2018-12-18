
<template>
  <div>
    <a-modal @cancel="handleCancel" @ok="handleCreate" :visible="visible" title="扩容硬盘" okText="提交">
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="名称：">
          <a-input
            v-decorator="[
              'name',
              {
                initialValue: 'web1',
                rules: [{ required: true, message: '请输入名称' }]
              }
            ]"
            placeholder="请输入名称"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="当前容量：">
          <a-input-number
            v-decorator="[
              'curr',
              {
                rules: [{ required: true, message: '请输入当前容量' }]}
            ]"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="新容量：">
          <a-input-number
            :min="20"
            v-decorator="[
              'new',
              {
                rules: [{ required: true, message: '请输入新容量' }]}
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "dilatation",
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