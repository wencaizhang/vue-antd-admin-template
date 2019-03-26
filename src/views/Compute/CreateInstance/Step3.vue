<template>
  <div>
    <a-form :form="form">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="计费方式：">
        <a-radio-group
          buttonStyle="solid"
          v-decorator="[
            'billingRule',
            {
              initialValue: 1,
              rules: [{ required: true, message: '请选择计费方式!' }]
            }
          ]"
        >
          <!-- 计费方式[0:预付费 1:按量付费] -->
          <a-radio :value="1">预付费</a-radio>
          <a-radio :value="2">按量付费</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="主机名称：">
        <a-input
          v-decorator="[
            'hostName',
            {
              rules: [
                { required: true, message: '请填写主机名称!' },
                rulesObj.name
              ]
            }
          ]"
          style="width: 250px"
          placeholder="请填写主机名称"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="主机数量：">
        <a-input-number
          style="width: 250px"
          :min="1"
          :max="10"
          v-decorator="[
            'hostNumber',
            {
              initialValue: 1,
              rules: [{ required: true, message: '请填写主机数量!' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="登录方式：">
        <a-radio-group
          buttonStyle="solid"
          @change="handleChangeLoginType"
          v-decorator="[
            'loginWay',
            {
              initialValue: loginWay,
              rules: [{ required: true, message: '请选择登录方式!' }]
            }
          ]"
        >
          <a-radio :value="0">SSH密钥</a-radio>
          <a-radio :value="1">密码</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户名：">
        <a-select
          mode="tags"
          @change="handleSelectUserName"
          v-decorator="[
            'userName',
            {
              rules: [
                { required: true, message: '请选择用户名!' },
                rulesObj.name
              ]
            }
          ]"
          style="width: 250px"
        >
          <a-select-option v-for="name in userNameList" :key="name" :value="name">{{ name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        v-if="loginWay == 1"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="密码："
      >
        <a-input
          type="password"
          autocomplete="nope"
          aria-autocomplete="nope"
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: '请填写密码!' },
                rulesObj.password,
              ]
            }
          ]"
          style="width: 250px"
          placeholder="请填写密码"
        />
      </a-form-item>
      <a-form-item
        v-if="loginWay == 1"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="确认密码："
      >
        <a-input
          type="password"
          v-decorator="[
            'password2',
            {
              rules: [
                { required: true, message: '请确认密码!', },
                { validator: confirmPassword,}
              ]
            }
          ]"
          style="width: 250px"
          placeholder="请确认密码"
        />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        v-if="loginWay == 0"
        label="SSH密钥："
      >
        <div>
          <span style="margin-right: 3px;">选择已有密钥，或</span>
          <a @click="createKeypair">新建</a>
        </div>
        <a-spin
          :spinning="loading"
          tip="正在加载密钥数据..."
          class="a-spin-text-align-left"
        >
          <a-radio-group
            v-decorator="[
              'secretKey',
              {rules: [{ required: true, message: '请选择密钥!' }]}
            ]"
          >
            <a-radio
              v-for="item in keypairList"
              :key="item.name"
              :value="item.name"
              style="display: block;"
            >{{ item.name }}</a-radio>
          </a-radio-group>
        </a-spin>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户数据：" style="margin-bottom: 5px;">
        <a-radio-group
          @change="e => userData = e.target.value"
          v-decorator="[
            'userDataType',
            {
              initialValue: 0,
              rules: [{ required: true, message: '请选择用户数据!' }]
            }
          ]"
        >
          <!-- 用户数据类型[0:无 1:文本 2:可执行文件] -->
          <a-radio :value="0">无</a-radio>
          <a-radio :value="1">文本</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-row style="margin-bottom: 24px;">
        <a-col :offset="8" :span="12" style="text-align: left;">
          <a-form-item
            v-show="userData == 1"
          >
            <a-upload
              :multiple="true"
              accept=".txt,.sh"
              :remove="handleRemoveFile"
              :beforeUpload="beforeUpload"
              @change="handleFileChange"
            >
              <a-button>
                <a-icon type="upload" />上传
              </a-button>
            </a-upload>
            <a-textarea
              v-decorator="[ 'userDataText', ]"
              placeholder="请填写可执行脚本，或者直接上传后缀为 sh 的文本文件，如果出现乱码，请将文件编码格式修改为 UTF-8."
              :rows="6"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <!-- <CreateModal /> -->
  </div>
</template>
<script>
import { getKeyPairList } from "@/api/compute/keypair";
import { rulesObj } from '@/utils/util';

// import CreateModal from "@/views/Compute/KeyPair/Modal/Create";
export default {
  // components: [CreateModal],
  props: ['defaultUserName'],
  data() {
    return {
      rulesObj,
      form: this.$form.createForm(this),
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },

      userData: 0,
      fileList: [],

      keypairList: [],
      loading: false,

      loginWay: 0,
    };
  },
  mounted() {
    this.fetchKeyPairList();
  },
  computed: {
    userNameList () {
      console.log('this.defaultUserName', this.defaultUserName)
      return this.defaultUserName ? [ this.defaultUserName ] : [];
    }
  },
  methods: {
    async fetchKeyPairList () {
      this.loading = true;
      try {
        const resp = await getKeyPairList();
        this.keypairList = resp.data;
      } catch (err) {

      } finally {
        this.loading = false;
      }
    },
    createKeypair () {

    },
    handleSelectUserName (value) {
      // 只允许选择一个名字
      if (value.length > 1) {
        value.splice(0, value.length - 1);
      }
    },
    handleChangeLoginType(e) {
      this.loginWay = e.target.value;
    },
    handleSubmit() {
      return new Promise((resolve, reject) => {
        this.form.validateFieldsAndScroll((err, values) => {
          err ? reject(err) : resolve(Object.assign({}, values, {
            userName: values.userName[0]
          }));
        });
      })
    },
    handleRemoveFile () {
      this.form.setFieldsValue({
        userDataText: ''
      })
    },
    beforeUpload(file) {
      var reader = new FileReader();
      reader.onload = (event) =>{
        this.form.setFieldsValue({
          userDataText: event.target.result
        })
      };
      reader.onerror = (err) => {
        console.log(err);
      }
      reader.readAsText(file, "UTF-8");
      return false;
    },

    handleFileChange(info) {
      info.fileList.splice(0, info.fileList.length - 1);
    },
    confirmPassword (rule, value, callback) {
      const { getFieldValue } = this.form
      if (value && value !== getFieldValue('password')) {
          callback('两次密码输入不一致！')
      }
      // callback 必须调用，
      // 不带参数调用说明校验通过，如果带有参数说明校验失败，参数为校验文案
      callback()
    }
  }
};
</script>

<style>

/* a-spin 加载动画靠左显示 */
.a-spin-text-align-left .ant-spin-dot {
  left: 0 !important;
  margin-left: 40px !important;
}

.a-spin-text-align-left .ant-spin-text {
  width: auto !important;
}
</style>
