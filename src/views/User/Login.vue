<template>
  <div class="container">
    <div class="top">
      <div class="header">
        <!-- <a href="/" class="logo">友普云自服务</a> -->
      </div>
      <div class="desc">友普云自服务</div>
    </div>
    <div class="main">
      <UsernameForm ref="UsernameForm"/>
      <!-- <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="key => customActiveKey = key"
      >
        <a-tab-pane key="UsernameForm" tab="账号密码登陆">
          <UsernameForm ref="UsernameForm"/>
        </a-tab-pane>
        <a-tab-pane key="PhoneForm" tab="手机号登陆">
          <PhoneForm ref="PhoneForm"/>
        </a-tab-pane>
      </a-tabs> -->

      <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <a-checkbox class="com-unselect" v-model="formLogin.rememberMe">自动登录</a-checkbox>
      </div>
      <a-button
        size="large"
        type="primary"
        htmlType="submit"
        class="login-button"
        style="width: 100%;"
        :loading="loading"
        :disabled="loading"
        @click="handleSubmit"
      >登录</a-button>

      <div class="user-login-other">
        <!-- <div>
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
        </div>-->
        <!-- <router-link :to="{ name: 'recover', params: { user: 'aaa'} }" class="forge-password">忘记密码</router-link>
        <router-link class="register" :to="{ name: 'register' }">注册账户</router-link>-->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import PhoneForm from "./Login/PhoneForm";
import UsernameForm from "./Login/UsernameForm";

import { mapActions } from "vuex";
import { timeFix } from "@/utils/util";

import { login } from "@/api/user";
import { ACCESS_TOKEN, PROJECT_ID } from "@/store/mutation-types";


export default {
  components: {
    UsernameForm,
    PhoneForm
  },
  data() {
    return {
      customActiveKey: "UsernameForm",
      loading: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,

      formLogin: {
        rememberMe: true
      }
    };
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

    async handleSubmit() {

      try {
        const payload = await this.$refs[this.customActiveKey].handleSubmit();
        this.loading = true;
        const resp = await login(payload);
        this.loginSuccess(resp);
      } catch (err) {

      } finally {
        this.loading = false;
      }
      // const loginParams = {
      //   remember_me: that.formLogin.rememberMe
      // };
    },
    loginSuccess(resp) {
      console.log(resp);
      // const expire = 1 * 60 * 60 * 1000;
      Vue.ls.set(ACCESS_TOKEN, resp.tokenId);
      Vue.ls.set(PROJECT_ID, resp.defalutProjectId);
      Vue.ls.set('userInfo', resp);
      // this.$store.commit('user/setUserInfo', resp)

      this.$router.push({ name: "dashboard" });
      this.$message.success(timeFix() + "，欢迎回来", 3);
    },
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
