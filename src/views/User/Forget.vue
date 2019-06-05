<template>
  <div class="container">
    <h1 style="text-align: center;">找回密码</h1>
    <a-form :form="form" class="main user-layout-login">
      <a-form-item>
        <a-input
          size="large"
          type="text"
          autocomplete="false"
          placeholder="请输入手机号码"
          v-decorator="[
            'phone',
            {
              rules: [
                { required: true, message: '请输入手机号码' },
                rulesObj.phone,
              ]
            }
          ]"
        >
          <a-icon slot="prefix" type="mobile" class="icon" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="16">
            <a-input
              size="large"
              type="text"
              autocomplete="false"
              placeholder="输入验证码"
              v-decorator="[
                'code',
                {rules: [{ required: true, message: '输入验证码' }]}
              ]"
            >
              <a-icon slot="prefix" type="mail" class="icon" />
            </a-input>
          </a-col>
          <a-col class="gutter-row" :span="8">
            <a-button
              class="getCaptcha"
              tabindex="-1"
              :disabled="!!state.loading"
              @click.stop.prevent="getCaptcha"
              v-text="btnText"
            >
              获取验证码
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>

      <a-button
        @click="handleSubmit"
        type="primary"
        block
        style="margin-top: 10px; height: 42px;"
      >
        确定
      </a-button>
      <div
        class="user-login-other"
        style="display: flex; justify-content: space-between; margin-top: 10px;"
      >
        <div>
          <span>其他登陆方式</span>
          <a title="微信登录">
            <a-icon class="item-icon" type="wechat"></a-icon>
          </a>
        </div>
        <router-link class="register" :to="{ name: 'login' }">
          去登录
        </router-link>
      </div>
    </a-form>
  </div>
</template>

<script>
import { sendCode } from "@api/user";
import { rulesObj } from '@/utils/util';
export default {
  data() {
    return {
      rulesObj,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loading: "" // pending resolve reject
      }
    };
  },
  computed: {
    btnText() {
      let { time, loading } = this.state;
      if (loading === "") {
        return "获取验证码";
      }
      if (loading === "pending") {
        return "发送中";
      }
      if (loading === "resolve") {
        return time + "S";
      }
      if (loading === "reject") {
        return "发送失败";
      }
      return "获取验证码";
    }
  },
  methods: {
    handleSubmit() {
      return new Promise((resolve, reject) => {
        this.form.validateFieldsAndScroll((err, values) => {
          err ? reject(err) : resolve(values);
        });
      });
    },

    async handleValidateField(fields = null) {
      return new Promise((resolve, reject) => {
        this.form.validateFieldsAndScroll(fields, (err, values) => {
          err ? reject(err) : resolve(values);
        });
      });
    },

    async getCaptcha() {
      let that = this;
      try {
        const data = await this.handleValidateField(["phone"]);
        this.requestCode(data);
      } catch (error) {}
    },

    async requestCode() {
      this.state.loading = "pending";

      const loadingMsg = this.$message.loading("验证码发送中..", 0);
      // .then(() => this.$message.success("验证码发送成功", 1));
      const loadingMsgTimer = setInterval(loadingMsg);

      try {
        const resp = await sendCode(payload);
        this.state.loading = "resolve";
        this.countDown();
      } catch (error) {
        this.state.loading = "reject";
      } finally {
        clearInterval(loadingMsgTimer);
      }
    },

    // 倒计时
    countDown(during = 60) {
      const that = this;
      let interval = window.setInterval(() => {
        if (that.state.time-- <= 0) {
          that.state = {
            time: 60,
            loading: ""
          };
          window.clearInterval(interval);
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.top {
  text-align: center;
  .header {
    height: 44px;
    line-height: 44px;
    .logo {
      display: inline-block;
      height: 44px;
      vertical-align: top;
      margin-right: 16px;
      border-style: none;
    }
  }
  .desc {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    margin-top: 12px;
    margin-bottom: 40px;
  }
}
.container {
  width: 100%;
  min-height: 100%;
  background: #f0f2f5 url("../../assets/background.svg") no-repeat 50%;
  background-size: 100%;
  padding: 110px 0 144px;
  position: relative;
}
.icon {
  color: rgba(0, 0, 0, 0.25);
}
.main {
  width: 368px;
  margin: 0 auto;
}
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }
  }
}
</style>
