<template>
  <a-form :form="form" class="user-layout-login">
    <a-form-item>
      <a-input
        size="large"
        type="text"
        placeholder="手机号"
        v-decorator="[
          'mobile',
          {rules: [{ required: true, message: '请输入手机号!' }]}
        ]"
      >
        <a-icon slot="prefix" type="mobile" class="icon" />
      </a-input>
    </a-form-item>

    <a-row :gutter="16">
      <a-col class="gutter-row" :span="16">
        <a-form-item>
          <a-input
            size="large"
            type="text"
            placeholder="验证码"
            v-decorator="[
              'captcha',
              {rules: [{ required: true, message: '请输入手机号!' }]}
            ]"
          >
            <a-icon slot="prefix" type="mail" class="icon" />
          </a-input>
        </a-form-item>
      </a-col>
      <a-col class="gutter-row" :span="8">
        <a-button
          class="getCaptcha"
          tabindex="-1"
          :disabled="state.smsSendBtn"
          @click.stop.prevent="getCaptcha"
          v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"
        ></a-button>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      state: {
        time: 60,
        smsSendBtn: false
      }
    };
  },
  methods: {

    handleSubmit() {
      return new Promise((resolve, reject) => {
        this.form.validateFieldsAndScroll((err, values) => {
          err ? reject(err) : resolve(values);
        });
      })
    },

    async getCaptcha(e) {
      let that = this;

      this.form.validateFieldsAndScroll(["mobile"], { force: true }, async err => {
        if (!err) {
          this.state.smsSendBtn = true;

          let interval = window.setInterval(() => {
            if (that.state.time-- <= 0) {
              that.state.time = 60;
              that.state.smsSendBtn = false;
              window.clearInterval(interval);
            }
          }, 1000);

          const message = this.$message.loading("验证码发送中..", 0);
          try {
            const resp = await this.$http.post(api.SendSms, {
              mobile: that.formLogin.mobile
            });
            setTimeout(message, 2500);
            this.$notification["success"]({
              message: "提示",
              description:
                "验证码获取成功，您的验证码为：" + resp.result.captcha,
              duration: 8
            });
          } catch (err) {
            console.log(err);
            setTimeout(message, 1);
            clearInterval(interval);
            that.state.time = 60;
            that.state.smsSendBtn = false;
            this.requestFailed(err);
          }
        }
      });
    }
  }
};
</script>
