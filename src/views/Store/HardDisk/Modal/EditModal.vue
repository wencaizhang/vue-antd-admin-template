
<template>
  <div>
    <a-modal @cancel="handleCancel" @ok="handleCreate" :visible="visible" title="编辑硬盘" okText="提交">
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
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="描述：">
          <a-textarea
            placeholder="请输入描述"
            v-decorator="[
              'desc',
              {
                rules: [{ required: true, message: '请输入描述' }]}
            ]"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox v-decorator="[
          'on',
          ]">可启动
            <a-tooltip>
              <template slot="title">“可启动”标记标明此硬盘可以被用来创建主机。</template>
              <a-icon type="info-circle"/>
            </a-tooltip>
          </a-checkbox>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "edit",
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