<template>
  <div class="container register-container">
    <a-form
      class="main user-layout-login"
      :form="form"
      :class="{ change: name !== 'register' }"
    >
      <h1 class="title">
        {{ title }}
      </h1>
      <a-form-item v-if="name === 'register'">
        <a-input
          size="small"
          type="text"
          autocomplete="new-password"
          placeholder="设置登录名称"
          v-decorator="[
            'userName',
            {rules: [{ required: true, message: '请设置登录名称' }]}
          ]"
        >
          <!-- <a-icon slot="prefix" type="user" class="icon" /> -->
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-popover
          :okText="false"
          cancelText=""
          placement="rightTop"
          :visible="visiblepopover"
        >
          <template slot="content">
            <div :style="{ width: '240px' }" >
              <div :class="['user-register', passwordLevelClass]">强度：<span>{{ passwordLevelName }}</span></div>
              <a-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor " />
              <div style="margin-top: 10px;">
                <p>请至少输入 8 个字符，且至少包含大小字母、数字、特殊字符(_,!,@,#)中的两项。</p>
              </div>
            </div>
          </template>

          <a-input
            size="small"
            :type="passwordType"
            placeholder="设置登录密码"
            @blur="visiblepopover = false"
            @focus="visiblepopover = true"
            autocomplete="new-password"
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: '请设置登录密码' },
                  { validator: this.handlePasswordLevel }
                ]
              }
            ]"
          >
            <!-- <a-icon slot="prefix" type="lock" class="icon" /> -->
            <a-icon slot="suffix" class="suffix-eye"
              :type="passwordType | eyeIcon"
              @click="toggleType('passwordType')"
            />
          </a-input>
        </a-popover>
      </a-form-item>
      <a-form-item v-if="name === 'register'">
        <a-input
          size="small"
          :type="password2Type"
          autocomplete="false"
          placeholder="再次确认密码"
          v-decorator="[
            'password2',
            {rules: [{ required: true, message: '请再次确认密码' }]}
          ]"
        >
          <!-- <a-icon slot="prefix" type="lock" class="icon" /> -->
          <a-icon slot="suffix" class="suffix-eye"
            :type="password2Type | eyeIcon"
            @click="toggleType('password2Type')"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          size="small"
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
          <!-- <a-icon slot="prefix" type="mobile" class="icon" /> -->
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="16">
            <a-input
              size="small"
              type="text"
              autocomplete="false"
              placeholder="输入验证码"
              v-decorator="[
                'smsCode',
                {rules: [{ required: true, message: '请输入验证码' }]}
              ]"
            >
              <!-- <a-icon slot="prefix" type="mail" class="icon" /> -->
            </a-input>
          </a-col>
          <a-col class="gutter-row" :span="8">
            <a-button
              size="small"
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
        style="margin-top: 10px; height: 36px;"
      >
        {{ submitText }}
      </a-button>
      <div
        class="user-login-other"
        style="display: flex; flex-direction: row-reverse; justify-content: space-between; margin-top: 10px;"
      >
        <router-link class="register" :to="{ name: 'login' }">
          去登录
        </router-link>
      </div>
    </a-form>
    <Canvas />
  </div>
</template>

<script>
import { sendCode, createUser } from "@/api/user/user";
import { rulesObj } from '@/utils/util';
import Canvas from "./Canvas.vue";

const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}

export default {
  components: { Canvas, },
  data() {
    return {
      rulesObj,
      name: '',
      title: '',
      submitText: '',

      form: this.$form.createForm(this),

      passwordType: 'text',
      password2Type: 'text',
      visiblepopover: false,
      state: {
        time: 60,
        loading: "", // pending resolve reject
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
    };
  },
  mounted () {
    // register or forget
    // 根据路由来决定显示的文字和表单项目
    const name = this.$route.name;
    Object.assign(this, {
      name,
      title: name === 'register' ? '欢迎注册友普云服务' : '找回密码',
      submitText: name === 'register' ? '注册' : '确定',
    })
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
    },
    passwordLevelClass () {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName () {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor () {
      return levelColor[this.state.passwordLevel]
    },
  },
  filters: {
    eyeIcon (type) {
      return type === 'password' ? 'eye-invisible' : 'eye';
    },
  },
  watch: {
    'state.passwordLevel' (level) {
      if (level === 0) {
        this.state.percent = 10
      } else {
        this.state.percent = level * 25
      }
    },
  },
  methods: {
    handlePasswordLevel (rule, value, callback) {
      let level = 0;

      const msg = '密码长度不低于8位,必须包含大小字母,数字,特殊字符(!,@,#)其中的两项';
      const minLen = /.{8,}/;
      const maxLen = /.{12,}/;
      const regs = [ /[a-zA-Z]/, /[0-9]/, /[_!@#]/ ];

      const result = regs.filter(reg => reg.test(value));
      level += result ? result.length : 0;

      if (!minLen.test(value)) {
        this.state.passwordLevel = level;
        return callback('密码长度不低于8位');
      }

      console.log('level', level);
      this.state.passwordLevel = level;

      this.state.passwordLevel >= 3 ? callback() :  callback(msg);
    },
    toggleType(typeName) {
      let type = this[typeName];
      this[typeName] = type === 'password' ? 'text' : 'password';
    },
    handleSubmit() {
      return new Promise((resolve, reject) => {
        this.form.validateFieldsAndScroll((err, values) => {
          err ? reject(err) : resolve(values);
        });
      });
    },
    async handleValidatePwd () {
      const keys = ['password', 'password2'];
      const data = await this.handleValidateField(keys);
      if (data.password !== data.password2) {
        this.form.setFields({
          password2: {
            value: data.password2,
            errors: [
              {
                "message": "两次密码输入不一致!",
              }
            ]
          }
        })
      }
    },
    async handleValidateField(fields = null) {
      return new Promise((resolve, reject) => {
        this.form.validateFieldsAndScroll(fields, (err, values) => {
          err ? reject(err) : resolve(values);
        });
      });
    },

    async getCaptcha() {
      // this.handleValidatePwd();
      let that = this;
      try {
        const data = await this.handleValidateField(["phone"]);
        this.requestCode(data);
      } catch (error) {}
    },

    async requestCode(data) {
      this.state.loading = "pending";

      const loadingMsg = this.$message.loading("验证码发送中..", 0);
      // .then(() => this.$message.success("验证码发送成功", 1));
      const loadingMsgTimer = setInterval(loadingMsg);

      const payload = {
        phoneNumber: data.phone,
        // 验证码类型[0:注册验证码 1:修改密码验证码 2:找回密码验证码 ]
        smsType: 0
      }

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
.suffix-eye {
  cursor: pointer;
}
.user-register {
  &.error {
    color: #ff0000;
  }
  &.warning {
    color: #ff7e05;
  }
  &.success {
    color: #52c41a;
  }
}

.container {
  width: 100%;
  min-height: 100%;
  background: #f0f2f5 url("../../../assets/images/background.svg") no-repeat 50%;
  background-size: 100%;
  padding: 110px 0 144px;
  position: relative;
}
.icon {
  color: rgba(0, 0, 0, 0.25);
}
.main {
  position: absolute;
  z-index: 11;
  top: 110px;
  left: 50%;
  transform: translateX(-50%);
  box-sizing: content-box;
  border-radius: 5px;
  width: 340px;
  margin: 0 auto;
  padding: 30px 620px 30px 30px;
  background: #fff url("../../../assets/images/register.png") no-repeat right;
  background-size: contain;
  box-shadow: 4px 2px 10px 10px #e3e7f3;
}
.main.change {
  background: #fff url("../../../assets/images/change.png") no-repeat right;
}
.title {
  text-align: left;
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
}
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    // height: 40px;
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
