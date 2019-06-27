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

          <a-form-item v-bind="formItemLayout" label="企业名称">
            <a-input
              placeholder="请输入企业名称"
              v-decorator="[
                'enterpriseName',
                {
                  rules:[
                    { required: true, message: '请输入企业名称' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="统一社会信用代码(18位）">
            <a-input
              placeholder="请输入信用代码"
              v-decorator="[
                'enterpriseName',
                {
                  rules:[
                    { required: true, message: '请输入信用代码' },
                    { len: 18, message: '请输入 18 位信用代码' },
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="注册地址">
            <a-textarea
              placeholder="请输入注册地址"
              v-decorator="[
                'registeredAddress',
                {
                  rules: [
                    { required: true, message: '请输入注册地址' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="企业法人">
            <a-input
              placeholder="请输入企业法人名称"
              v-decorator="[
                'legalPersonName',
                {
                  rules:[
                    { required: true, message: '请输入企业法人名称' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="法人身份证号">
            <a-input
              placeholder="请输入法人身份证号"
              v-decorator="[
                'legalPersonIDCardNum	',
                {
                  rules: [
                    { required: true, message: '请输入法人身份证号' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label="营业执照"
          >
            <a-upload
              v-decorator="[
                'legalPersonIDCardFront',
                {
                  getValueFromEvent: normFile,
                  rules: [
                    { required: true, message: '请上传营业执照' }
                  ]
                }
              ]"
              name="legalPersonIDCardFront"
              listType="picture-card"
              :action="uploadAction"
              @preview="handlePreview"
              @change="handleChange('legalPersonIDCardFront', $event)"
            >
              <div v-if="legalPersonIDCardFront.length < 1">
                <a-icon type="plus" />
                <div class="ant-upload-text">点击上传</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form-item>
          <!-- <a-form-item v-bind="formItemLayout" label="手机号码">
            <a-input
              placeholder="请输入手机号码"
              v-decorator="[
                'phone',
                {
                  rules: [{ required: true, message: '请输入手机号码' }],
                }
              ]"
              style="width: 100%"
            >
            </a-input>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="固定电话">
            <a-input-group>
              <a-col :span="8">
                <a-input
                  placeholder="区号"
                />
              </a-col>
              <a-col :span="16">
                <a-input
                  placeholder="电话号码"
                />
              </a-col>
            </a-input-group>
          </a-form-item> -->
          <a-form-item
            v-bind="formItemLayout"
            label="法人身份证人像面"
          >
            <a-upload
              v-decorator="[
                'legalPersonIDCardFront',
                {
                  getValueFromEvent: normFile,
                  rules: [
                    { required: true, message: '请上传法人身份证人像面' }
                  ]
                }
              ]"
              name="legalPersonIDCardFront"
              listType="picture-card"
              :action="uploadAction"
              @preview="handlePreview"
              @change="handleChange('legalPersonIDCardFront', $event)"
            >
              <div v-if="legalPersonIDCardFront.length < 1">
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
            label="法人身份证国徽面"
          >
            <a-upload
              v-decorator="[
                'legalPersonIDCardBack',
                {
                  getValueFromEvent: normFile,
                  rules: [
                    { required: true, message: '请输入上传法人身份证国徽面' }
                  ]
                }
              ]"
              name="legalPersonIDCardBack"
              listType="picture-card"
              :action="uploadAction"
              @preview="handlePreview"
              @change="handleChange('legalPersonIDCardBack', $event)"
            >
              <div v-if="legalPersonIDCardBack.length < 1">
                <a-icon type="plus" />
                <div class="ant-upload-text">点击上传</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form-item>

          <a-form-item v-bind="formItemLayout">
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
export default {
  created () {
    this.form = this.$form.createForm(this)
  },

  data() {
    return {
      form: null,

      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
      },

      previewVisible: false,
      previewImage: '',
      legalPersonIDCardFront: [],
      legalPersonIDCardBack: [],

      uploadAction: '/cmp/v1/upload/batch/Certificates',
    };
  },

  computed: {
    authTypeItem () {
      const authType = this.$store.getters['app/getAuthType'];
      const authMap = [
        // 2 是个人已认证，对于公司来讲，是未认证
        { val: 2, label: '未认证', type: 'info', },
        { val: 3, label: '已认证', type: 'success', },
        { val: 6, label: '认证中', type: 'warning', },
        { val: 7, label: '认证未通过', type: 'error', },
        { val: null, label: `未知状态：${authType}`, type: 'error', },
      ];
      return authMap.find(item => item.val == authType) || authMap.slice(-1)[0];
    },
    authInfo () {
      return this.$store.state.app.authInfo;
    },
  },

  methods: {

    onSubmit() {
      const self = this;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(values)
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

    normFile  (e) {
      if (Array.isArray(e)) {
        return e;
      }
      return e.file.status === 'done' && e.file.response.url
    },
  }
};
</script>

<style scoped>

</style>
