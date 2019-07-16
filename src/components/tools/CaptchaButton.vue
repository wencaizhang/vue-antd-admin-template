<template>
  <a-button
    class="btn"
    tabindex="-1"
    v-bind="$attrs"
    :loading="state.status === 'sending'"
    :disabled="state.disabled"
    @click.stop.prevent="onBtnClick"
  >{{ btnText }}</a-button>
</template>

<script>
let seed = 0;

function getUuid() {
  return 'sms_' + (seed++);
}
export default {
  name: "CaptchaButton",
  data() {
    return {
      lsKey: getUuid(),
      state: {
        seconds: 60,
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
      let { seconds, status } = this.state;
      let text;

      switch (status) {
        case "sending":
          this.state.disabled = true;
          text = "发送中";
          break;
        case "resolve":
          this.state.disabled = true;
          text = `重新获取(${seconds} 秒)`;
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
  mounted () {
    this.init()
  },
  methods: {
    onBtnClick() {
      this.$emit('clickBtn', this.sendSimCode);
    },
    async sendSimCode ({payload, api}) {
      this.state.status = this.status.sending;
      try {
        const resp = await api(payload);
        this.$message.success(resp.desc);
        this.state.status = this.status.resolve;
        this.countDown();
        this.setRecord();
      } catch (error) {
        this.state.status = this.status.reject;
      }
    },
    init () {
      const timestamp = this.$ls.get(this.lsKey);
      if (!timestamp) return;

      const currTimestamp = this.getTimestamp();
      const diff = this.state.seconds - (currTimestamp - timestamp) / 1000;
      if (diff > 0) {
        Object.assign(this.state, {
          status: 'resolve',
          seconds: diff,
        });
        this.countDown(diff)
      }
    },
    getTimestamp () {
      return Date.parse(new Date());
    },
    setRecord () {
      let timestamp = this.getTimestamp();
      this.$ls.set(this.lsKey, timestamp);
    },
    countDown(during = 60) {
      // 倒计时
      
      const that = this;
      let interval = window.setInterval(() => {
        if (that.state.seconds-- <= 0) {
          that.state = {
            seconds: 60,
            status: ""
          };
          this.$ls.remove(this.lsKey)
          window.clearInterval(interval);
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
.btn {
  margin-left: 8px;
}
</style>
