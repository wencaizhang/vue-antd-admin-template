<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="20" :lg="16">
        <a-form  :form="form">
          <a-alert
            style="margin: 0 auto 24px; width: 67%;"
            :message="authTypeItem.label"
            :description="authInfo.authResultContent"
            :type="authTypeItem.type"
            showIcon
          />
          <a-form-item v-bind="formItemLayout" label="真实姓名">
            <a-input
              :disabled="disabled"
              placeholder="请输入真实姓名"
              v-decorator="[
                'realName',
                {
                  rules:[
                    { required: true, message: '请输入真实姓名' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="身份证号">
            <a-input
              :disabled="disabled"
              placeholder="请输入身份证号"
              v-decorator="[
                'idCardNum',
                {
                  rules: [
                    { required: true, message: '请输入身份证号' }
                  ]
                }
              ]"
            />
          </a-form-item>

          <a-form-item
            v-bind="formItemLayout"
            label="身份证人像面"
          >
            <a-upload
              :disabled="disabled"
              v-decorator="[
                'idCardFront',
                {
                  getValueFromEvent: normFile,
                  rules: [
                    { required: true, message: '请上传身份证人像面' }
                  ]
                }
              ]"
              name="file"
              listType="picture-card"
              :action="uploadAction"
              @preview="handlePreview"
              @change="handleChange('idCardFront', $event)"
            >
              <div v-if="idCardFront.length < 1">
                <a-icon type="plus" />
                <div class="ant-upload-text">点击上传</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form-item>

          <a-form-item
            v-bind="formItemLayout"
            label="身份证国徽面"
          >
            <a-upload
              :disabled="disabled"
              v-decorator="[
                'idCardBack',
                {
                  getValueFromEvent: normFile,
                  rules: [
                    { required: true, message: '请上传身份证国徽面' }
                  ]
                }
              ]"
              name="file"
              listType="picture-card"
              :action="uploadAction"
              @preview="handlePreview"
              @change="handleChange('idCardBack', $event)"
            >
              <div v-if="idCardBack.length < 1">
                <a-icon type="plus" />
                <div class="ant-upload-text">点击上传</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form-item>

          <a-form-item v-if="!disabled" v-bind="formItemLayout">
            <a-row>
              <a-col :offset="16">
                <a-button type="primary" @click="onSubmit">提交</a-button>
              </a-col>
            </a-row>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ruleObj from '@/utils/rules';
import { auth } from '@/api/user/user';
export default {
  created () {
    this.form = this.$form.createForm(this);
  },
  mounted () {
    const authInfo = this.$store.state.app.authInfo;
    // console.log(authInfo)
    // this.form.setFieldsValue(authInfo);
  },
  data() {
    return {
      ruleObj,
      form: null,

      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
      },

      previewVisible: false,
      previewImage: '',
      idCardFront: [],
      idCardBack: [],

      uploadAction: '/cmp/v1/upload/batch/Certificates',
    };
  },
  computed: {
    authTypeItem () {
      const authType = this.$store.getters['app/getAuthType'];
      const authMap = [
        { val: 1, editAble: true, label: '未认证', type: 'info', },
        { val: 2, editAble: false, label: '已认证', type: 'success', },
        { val: 4, editAble: false, label: '认证中', type: 'warning', },
        { val: 5, editAble: true, label: '认证未通过', type: 'error', },
        { val: 0, editAble: true, label: `未知状态：${authType}`, type: 'error', },
      ];
      return authMap.find(item => item.val == authType) || authMap.slice(-1)[0];
    },
    disabled () {
      return !this.authTypeItem.editAble;
    },
    authInfo () {
      return this.$store.state.app.authInfo;
    },
  },
  methods: {
    async submit (values) {
      try {
        const resp = await auth(values);
        console.log(resp);
        this.$store.commit('app/setAuthInfo', Object.assign(values, { authType: 4 }));
        this.$message.success(resp.desc);
      } catch (error) {
        
      }
    },
    onSubmit() {
      const self = this;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(values)
          // 认证状态[1：个人认证 2：企业认证]
          this.submit(Object.assign(values, { authType: 1 }));
        }
      });
    },

    handleCancel () {
      this.previewVisible = false
    },

    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },

    handleChange (type, { fileList }) {
      this[type] = fileList
    },

    normFile (e) {
      if (Array.isArray(e)) {
        return e;
      }
      return e.file.status === 'done' && e.file.response.filePath[0].url;
    },

  }
};
</script>

<style scoped>

</style>
