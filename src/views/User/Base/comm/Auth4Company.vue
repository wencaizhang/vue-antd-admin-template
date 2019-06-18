<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="20" :lg="16">
        <a-form  :form="form">
          <a-form-item v-bind="formItemLayout" label="认证状态">
            未认证
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="企业名称">
            <a-input
              v-decorator="[
                'enterpriseName',
                {
                  rules:[
                    { required: true, message: 'Please input your name' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="企业法人">
            <a-input
              v-decorator="[
                'legalPersonName',
                {
                  rules:[
                    { required: true, message: 'Please input your name' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="法人身份证号" :required="false">
            <a-input
              v-decorator="[
                'legalPersonIDCardNum	',
                {
                  rules: [
                    { required: true, message: 'Please input your id' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="注册地址">
            <a-input
              v-decorator="[
                'registeredAddress',
                {
                  rules: [
                    { required: true, message: 'Please input your address' }
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
                  rules: [{ required: true, message: 'Please input your phone number!' }],
                }
              ]"
              style="width: 100%"
            >
              <a-select
                slot="addonBefore"
                v-decorator="[
                  'prefix',
                  { initialValue: '86' }
                ]"
                style="width: 70px"
              >
                <a-select-option value="86">
                  手机
                </a-select-option>
                <a-select-option value="87">
                  固话
                </a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label="营业执照"
          >
            <a-upload
              v-decorator="['upload', {
                valuePropName: 'businessLicense',
                getValueFromEvent: normFile,
                rules: [
                  { required: true, message: 'Please input your address' }
                ]
              }]"
              name="logo"
              listType="picture-card"
              :action="uploadAction"
              :fileList="legalPersonIDCardFront"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="legalPersonIDCardFront.length < 1">
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label="法人身份证人像面"
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
              :fileList="legalPersonIDCardFront"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="legalPersonIDCardFront.length < 1">
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
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
              :fileList="legalPersonIDCardBack"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="legalPersonIDCardBack.length < 1">
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
