<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="20" :lg="16">
        <a-form  :form="form">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="认证类型">
            <a-select style="width: 120px">
              <a-select-option value="0">个人认证</a-select-option>
              <a-select-option value="1">企业认证</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="认证状态">
            <a-radio-group >
              <a-radio :value="1">已认证</a-radio>
              <a-radio :value="2">未认证</a-radio>
              <a-radio :value="3">认证中</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="真实姓名">
            <a-input
              v-decorator="[
                'name',
                {
                  rules:[
                    { required: true, message: 'Please input your name' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="邮箱地址">
            <a-input
              v-decorator="[
                'name',
                {
                  rules:[
                    { required: true, message: 'Please input your name' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系电话">
            <a-input
              v-decorator="[
                'phone',
                {
                  rules: [
                    { required: true, message: 'Please input your phone' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="身份证号" :required="false">
            <a-input
              v-decorator="[
                'id',
                {
                  rules: [
                    { required: true, message: 'Please input your id' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系地址">
            <a-input
              v-decorator="[
                'address',
                {
                  rules: [
                    { required: true, message: 'Please input your address' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-row>
              <a-col :offset="16" >
                <a-button type="primary" @click="onSubmit">提交</a-button>
              </a-col>
            </a-row>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  created () {
    this.form = this.$form.createForm(this)
  },
  components: {},
  data() {
    return {
      form: null,

      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
    };
  },
  methods: {

    onSubmit() {
      const self = this;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(values)
        }
      });
    },
  }
};
</script>

<style scoped>

</style>
