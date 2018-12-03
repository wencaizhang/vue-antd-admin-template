<template>
  <div class="container">
    <div class="top">
      <div class="header">
        <a href="/" class="logo">VUE Admin</a>
      </div>
      <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div>
    </div>
    <div class="main">
      <a-form
        class="user-layout-login"
        ref="formLogin"
        :autoFormCreate="(form)=>{this.form = form}"
        id="formLogin"
      >
        <a-tabs
          :activeKey="customActiveKey"
          :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
          @change="handleTabClick"
        >
          <a-tab-pane key="tab1" tab="账号密码登陆">
            <a-form-item fieldDecoratorId="username" :fieldDecoratorOptions="validate4Username">
              <a-input size="large" type="text" autocomplete="false" placeholder="帐户名或邮箱地址 / admin">
                <a-icon slot="prefix" type="user" class="icon"/>
              </a-input>
            </a-form-item>

            <a-form-item fieldDecoratorId="password" :fieldDecoratorOptions="validate4Password">
              <a-input size="large" type="password" autocomplete="false" placeholder="密码 / admin">
                <a-icon slot="prefix" type="lock" class="icon"/>
              </a-input>
            </a-form-item>
          </a-tab-pane>

          <a-tab-pane key="tab2" tab="手机号登陆">
            <a-form-item fieldDecoratorId="mobile" :fieldDecoratorOptions="validate4Mobile">
              <a-input size="large" type="text" placeholder="手机号">
                <a-icon slot="prefix" type="mobile" class="icon"/>
              </a-input>
            </a-form-item>

            <a-row :gutter="16">
              <a-col class="gutter-row" :span="16">
                <a-form-item fieldDecoratorId="captcha" :fieldDecoratorOptions="validate4Captcha">
                  <a-input size="large" type="text" placeholder="验证码">
                    <a-icon slot="prefix" type="mail" class="icon"/>
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
          </a-tab-pane>
        </a-tabs>

        <div style="display: flex; justify-content: space-between; ">
          <a-checkbox class="com-unselect" v-model="formLogin.rememberMe">自动登陆</a-checkbox>
          <router-link :to="{ name: 'recover', params: { user: 'aaa'} }" class="forge-password">忘记密码</router-link>
        </div>

        <a-form-item style="margin-top:24px">
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="loginBtn"
            :disabled="loginBtn"
            @click.stop.prevent="handleSubmit"
          >确定</a-button>
        </a-form-item>

        <div class="user-login-other">
          <div>
            <span>其他登陆方式</span>
            <a>
              <a-icon class="item-icon" type="alipay-circle"></a-icon>
            </a>
            <a>
              <a-icon class="item-icon" type="taobao-circle"></a-icon>
            </a>
            <a>
              <a-icon class="item-icon" type="weibo-circle"></a-icon>
            </a>
          </div>

          <router-link class="register" :to="{ name: 'register' }">注册账户</router-link>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { mapActions } from "vuex";
import { timeFix } from "@/utils/util";

export default {
  components: {},
  data() {
    return {
      customActiveKey: "tab1",
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      form: null,
      state: {
        time: 60,
        smsSendBtn: false
      },
      formLogin: {
        username: "",
        password: "",
        captcha: "",
        mobile: "",
        rememberMe: true
      }
    };
  },
  created() {
    Vue.ls.set('test', 'I am a test string')
  },
  computed: {
    validate4Username() {
      console.log("this", this);
      return {
        rules: [
          { required: true, message: "请输入帐户名或邮箱地址" },
          { validator: this.handleUsernameOrEmail }
        ],
        validateTrigger: "change"
      };
    },
    validate4Password() {
      return {
        rules: [{ required: true, message: "请输入密码" }],
        validateTrigger: "blur"
      };
    },
    validate4Mobile() {
      return {
        rules: [
          {
            required: true,
            pattern: /^1[34578]\d{9}$/,
            message: "请输入正确的手机号"
          }
        ],
        validateTrigger: "change"
      };
    },
    validate4Captcha() {
      return {
        rules: [{ required: true, message: "请输入验证码" }],
        validateTrigger: "blur"
      };
    }
  },
  methods: {
    // ...mapActions(["Login", "Logout"]),
    // handler
    handleUsernameOrEmail(rule, value, callback) {
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if (regex.test(value)) {
        this.loginType = 0;
      } else {
        this.loginType = 1;
      }
      callback();
    },
    handleTabClick(key) {
      this.customActiveKey = key;
      // this.form.resetFields();  // 重置表单
    },
    handleSubmit() {
      let that = this;
      let flag = false;

      const loginParams = {
        remember_me: that.formLogin.rememberMe
      };

      // 使用账户密码登陆
      if (that.customActiveKey === "tab1") {
        that.form.validateFields(
          ["username", "password"],
          { force: true },
          (err, values) => {
            if (!err) {
              return false;
            }
            flag = true;
            let type = !that.loginType ? "email" : "username";
            loginParams[type] = values.username;
            loginParams.password = values.password;
          }
        );
        // 使用手机号登陆
      } else {
        that.form.validateFields(
          ["mobile", "captcha"],
          { force: true },
          (err, values) => {
            if (!err) {
              return false;
            }
            flag = true;
            Object.assign(loginParams, values);
          }
        );
      }

      if (!flag) return;

      that.loginBtn = true;
      that.doLogin(loginParams);
    },
    async doLogin(payload) {
      try {
        const resp = await this.Login(payload);
        this.loginSuccess();
      } catch (err) {
        this.requestFailed(err);
      }
    },
    async getCaptcha(e) {
      let that = this;

      this.form.validateFields(["mobile"], { force: true }, async err => {
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
            console.log(err)
            setTimeout(message, 1);
            clearInterval(interval);
            that.state.time = 60;
            that.state.smsSendBtn = false;
            this.requestFailed(err);
          }
        }
      });
    },
    loginSuccess() {
      this.loginBtn = false;
      this.$router.push({ name: "dashboard" });
      this.$message.success(timeFix() + "，欢迎回来", 3);
    },
    requestFailed(err) {
      this.$notification["error"]({
        message: "错误",
        description:
          ((err.response || {}).data || {}).message ||
          "请求出现错误，请稍后再试",
        duration: 4
      });
      this.loginBtn = false;
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