<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="20" :lg="16">
        <a-form  :form="form">
          <a-form-item v-bind="formItemLayout" label="认证状态">

          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="真实姓名">
            <a-input
              :disabled="disabled"
              v-decorator="[
                'realName',
                {
                  rules:[
                    { required: true, message: 'Please input your name' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="邮箱地址">
            <a-input
              v-decorator="[
                'name',
                {
                  rules:[
                    { required: true, message: 'Please input your name' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="联系电话">
            <a-input
              v-decorator="[
                'phone',
                {
                  rules: [
                    { required: true, message: 'Please input your phone' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="身份证号" :required="false">
            <a-input
              v-decorator="[
                'idCardNum',
                {
                  rules: [
                    { required: true, message: 'Please input your id' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="联系地址">
            <a-input
              v-decorator="[
                'address',
                {
                  rules: [
                    { required: true, message: 'Please input your address' }
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
              v-decorator="['upload', {
                valuePropName: 'file',
                getValueFromEvent: normFile,
                rules: [
                  { required: true, message: 'Please input your address' }
                ]
              }]"
              name="logo"
              listType="picture-card"
              :action="uploadAction"
              :fileList="idCardFront"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="idCardFront.length < 1">
                <a-icon type="plus" />
                <div class="ant-upload-text">上传</div>
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
              v-decorator="['upload', {
                valuePropName: 'file',
                getValueFromEvent: normFile,
                rules: [
                  { required: true, message: 'Please input your address' }
                ]
              }]"
              name="logo"
              listType="picture-card"
              :action="uploadAction"
              :fileList="idCardBack"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="idCardBack.length < 1">
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form-item>

          <a-form-item v-bind="formItemLayout">
            <a-row>
              <a-col :offset="16" >
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
  components: {},
  computed: {
    authType () {
      // 认证状态[0:未认证 1：个人已认证 2：企业已认证]
      return this.$parent.authInfo.authType
    }
  },
  data() {
    return {
      form: null,

      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
      },

      disabled: true,

      previewVisible: false,
      previewImage: '',
      idCardFront: [],
      idCardBack: [],

      uploadAction: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    };
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
    handleChange ({ fileList }) {
      this.fileList = fileList
    },
    normFile  (e) {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },
  }
};
</script>

<style scoped>

</style>
