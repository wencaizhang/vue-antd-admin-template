<template>
  <section>
    <a-form :form="form">
      <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" :label="label">
        <div class="form-item-container">
          <a-input
            type="text"
            autocomplete="false"
            placeholder="输入验证码"
            v-decorator="[
              'smsCode',
              { rules: [{ required: true, message: '请输入验证码' }] }
            ]"
          />
          <a-button
            class="btn"
            tabindex="-1"
            :loading="state.status === 'sending'"
            :disabled="state.disabled"
            @click.stop.prevent="onClick"
            v-text="btnText"
          ></a-button>
        </div>
      </a-form-item>
    </a-form>
  </section>
</template>

<script>
import { sendCode } from "@/api/user/user";
export default {
  name: "",
  props: {
    label: {
      type: String,
      default: '验证码'
    },
    value: {
      type: String,
    }
  },
  components: {},
  computed: {},
  data() {
    return {
      form: null,

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
  created() {
    this.form = this.$form.createForm(this, {
      onValuesChange: this.handleUpdate
    });
  },
  mounted () {
    this.form.setFieldsValue({
      smsCode: this.value,
    })
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
    handleUpdate (props, values) {
      this.$emit('input', values.smsCode)
    },
    onClick() {
      this.$emit('clickBtn', this.sendSimCode);
    },
    handleCreate() {
      const self = this;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          self.formValues = Object.assign({}, self.formValues, values);
          self.handleFetch();
        }
      });
    },
    async sendSimCode (payload) {
      try {
        this.state.status = this.status.sending;
        const resp = await sendCode(payload);
        this.state.status = this.status.resolve;
        this.countDown();
      } catch (error) {
        this.state.status = this.status.reject;
      } finally {

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

<style>
.form-item-container {
  display: flex;
}
.btn {
  margin-left: 8px;
}
</style>
