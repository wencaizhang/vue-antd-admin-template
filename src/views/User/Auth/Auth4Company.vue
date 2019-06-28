<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="20" :lg="16">
        <a-form :form="form">

          <a-alert
            style="margin: 0 0 24px; width: 75%;"
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

          <a-form-item v-bind="formItemLayout" label="统一社会信用代码">
            <a-input
              placeholder="请输入信用代码"
              v-decorator="[
                'enterpriseName',
                {
                  rules:[
                    { required: true, message: '请输入 18 位信用代码' },
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

            <a-row>
              <a-col :span="18">
                <p style="color: #5184f6;font-weight: 500; margin-bottom: 10px; margin-left: 5px;">认证联系人信息</p>
                <div style="border-top: 1px solid #d9d9d9; margin-bottom: 24px;"></div>
              </a-col>
            </a-row>
          
          <a-form-item v-bind="formItemLayout" label="联系人姓名">
            <a-input
              :disabled="disabled"
              placeholder="请输入联系人姓名"
              v-decorator="[
                'realName',
                {
                  rules:[
                    { required: true, message: '请输入联系人姓名' }
                  ]
                }
              ]"
            />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="联系人身份证号">
            <a-input
              :disabled="disabled"
              placeholder="请输入联系人身份证号"
              v-decorator="[
                'idCardNum',
                {
                  rules: [
                    { required: true, message: '请输入联系人身份证号' }
                  ]
                }
              ]"
            />
          </a-form-item>

          <a-form-item
            v-bind="formItemLayout"
            label="联系人身份证人像面"
          >
            <a-upload
              :disabled="disabled"
              v-decorator="[
                'idCardFront',
                {
                  getValueFromEvent: normFile,
                  rules: [
                    { required: true, message: '请上传联系人身份证人像面' }
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
            label="联系人身份证国徽面"
          >
            <a-upload
              :disabled="disabled"
              v-decorator="[
                'idCardBack',
                {
                  getValueFromEvent: normFile,
                  rules: [
                    { required: true, message: '请上传联系人身份证国徽面' }
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

          <a-form-item v-bind="formItemLayout">
            <a-row>
              <a-col :offset="12" :span="8">
                <a-button
                  block
                  :loading="loading"
                  :disabled="loading"
                  type="primary"
                  @click="onSubmit"
                >
                  提交
                </a-button>
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
      loading: false,
      disabled: false,

      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
      },

      previewVisible: false,
      previewImage: '',
      legalPersonIDCardFront: [],
      legalPersonIDCardBack: [],

      idCardFront: [],
      idCardBack: [],

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
      ];
      return authMap.find(item => item.val == authType) || authMap[0];
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
.account-settings-info-view {
  padding-left: 20px;
}
</style>