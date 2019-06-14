<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="16" :lg="12">
        <a-form layout="vertical" :form="form" />
          <a-form-item label="真实姓名">
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
          <a-form-item label="联系电话">
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
          <a-form-item label="身份证号" :required="false">
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
          <a-form-item label="联系地址">
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
          <a-form-item>
            <a-button type="primary" @click="onSubmit">提交</a-button>
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
