<template>
  <a-form :form="form" class="user-layout-login">
    <a-form-item>
      <a-input
        size="large"
        type="text"
        autocomplete="new-password"
        placeholder="帐户名或邮箱地址"
        v-decorator="[
          'userName',
          {rules: [{ required: true, message: '请输入帐户名!' }]}
        ]"
      >
        <a-icon slot="prefix" type="user" class="icon" />
      </a-input>
    </a-form-item>

    <a-form-item>
      <a-input
        size="large"
        type="password"
        autocomplete="new-password"
        placeholder="密码"
        @keyup.enter="$parent.handleSubmit"
        v-decorator="[
          'password',
          {rules: [{ required: true, message: '请输入密码!' }]}
        ]"
      >
        <a-icon slot="prefix" type="lock" class="icon" />
      </a-input>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },
  methods: {
    handleSubmit() {
      return new Promise((resolve, reject) => {
        this.form.validateFieldsAndScroll((err, values) => {
          err ? reject(err) : resolve(values);
        });
      })
    }
  }
};
</script>
