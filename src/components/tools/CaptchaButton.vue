<template>
  <a-button
    class="btn"
    tabindex="-1"
    v-bind="$attrs"
    :loading="state.status === 'sending'"
    :disabled="state.disabled"
    @click.stop.prevent="onBtnClick"
    v-text="btnText"
  ></a-button>
</template>

<script>
export default {
  name: "CaptchaButton",
  data() {
    return {
      state: {
        time: 60,
        status: "",
        disabled: false,
      },

      status: {
        sending: "sending",
        resolve: "resolve",
        reject: "reject",
      }
    };
  },
  computed: {
    btnText() {
      let { time, status } = this.state;
      let text;

      switch (status) {
        case "sending":
          this.state.disabled = true;
          text = "发送中";
          break;
        case "resolve":
          this.state.disabled = true;
          text = time + "秒后重新获取";
          break;
        case "reject":
          this.state.disabled = false;
          text = "发送失败，重新发送";
          break;

        default:
          this.state.disabled = false;
          text = "获取验证码";
          break;
      }
      return text;
    }
  },
  methods: {
    onBtnClick() {
      this.$emit('clickBtn', this.sendSimCode);
    },
    async sendSimCode ({payload, api}) {
      this.state.status = this.status.sending;
      try {
        const resp = await api(payload);
        this.state.status = this.status.resolve;
        this.countDown();
      } catch (error) {
        this.state.status = this.status.reject;
      }
    },
    countDown(during = 60) {
      // 倒计时
      const that = this;
      let interval = window.setInterval(() => {
        if (that.state.time-- <= 0) {
          that.state = {
            time: 60,
            status: ""
          };
          window.clearInterval(interval);
        }
      }, 1000);
    }
  }
};
</script>

<style <style scoped>
.btn {
  margin-left: 8px;
}
</style>
