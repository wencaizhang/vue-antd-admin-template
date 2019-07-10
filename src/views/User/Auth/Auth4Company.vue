<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="20" :lg="16">
        <a-form :form="form">
          <a-alert
            style="margin: 0 0 24px; width: 75%;"
            :message="authTypeItem.label"
            :description="authInfo && authInfo.authResultContent"
            :type="authTypeItem.type"
            showIcon
          />

          <a-form-item v-bind="formItemLayout" label="企业名称">
            <a-textarea
              placeholder="请输入企业名称"
              :autosize="{ minRows: 2, maxRows: 6 }"
              v-decorator="[
                'enterpriseName',
                {
                  rules:[
                    { required: true, message: '请输入企业名称' },
                    { max: 100, message: '最多允许100个字符' },
                    ruleObj.HanziAndLetter,
                  ]
                }
              ]"
            />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="统一社会信用代码">
            <a-input
              placeholder="请输入信用代码"
              v-decorator="[
                'creditCode',
                {
                  rules:[
                    { required: true, message: '请输入 18 位信用代码' },
                    { len: 18, message: '请输入 18 位信用代码' },
                    ruleObj.enterpriseName,
                  ]
                }
              ]"
            />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="注册地址">
            <a-textarea
              placeholder="请输入注册地址"
              :autosize="{ minRows: 2, maxRows: 6 }"
              v-decorator="[
                'registerAddress',
                {
                  rules: [
                    { required: true, message: '请输入注册地址' },
                    { max: 100, message: '最多允许100个字符' },
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
                'businessLicense',
                {
                  getValueFromEvent: normFile,
                  rules: [
                    { required: true, message: '请上传营业执照' }
                  ]
                }
              ]"
              :defaultFileList="businessLicense"
              name="file"
              :accept="acceptFileTypes"
              listType="picture-card"
              :action="uploadAction"
              @preview="handlePreview"
              @change="handleChange('businessLicense', $event)"
            >
              <div v-if="businessLicense.length < 1">
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
                    { required: true, message: '请输入企业法人名称' },
                    { max: 20, message: '最多允许20个字符' },
                    ruleObj.HanziAndLetter,
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="法人身份证号">
            <a-input
              placeholder="请输入法人身份证号"
              v-decorator="[
                'legalPersonIDCardNum',
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
              :defaultFileList="legalPersonIDCardFront"
              name="file"
              :accept="acceptFileTypes"
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
              :defaultFileList="legalPersonIDCardBack"
              name="file"
              :accept="acceptFileTypes"
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
              placeholder="请输入联系人姓名"
              v-decorator="[
                'realName',
                {
                  rules:[
                    { required: true, message: '请输入联系人姓名' },
                    { max: 20, message: '最多允许20个字符' },
                    ruleObj.HanziAndLetter,
                  ]
                }
              ]"
            />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="联系人身份证号">
            <a-input
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
              :accept="acceptFileTypes"
              :defaultFileList="idCardFront"
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
              v-decorator="[
                'idCardBack',
                {
                  getValueFromEvent: normFile,
                  rules: [
                    { required: true, message: '请上传联系人身份证国徽面' }
                  ]
                }
              ]"
              :defaultFileList="idCardBack"
              name="file"
              :accept="acceptFileTypes"
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
import ruleObj from '@/utils/rules';
import comm from './comm';
import { auth } from '@/api/user/user';
import AImage from '@/components/tools/AImage'
export default {
  mixins: [comm],
  data() {
    return {
      ruleObj,
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
      },

      previewVisible: false,
      previewImage: '',
      businessLicense: [],
      legalPersonIDCardFront: [],
      legalPersonIDCardBack: [],

      idCardFront: [],
      idCardBack: [],

    };
  },

  computed: {
    authTypeItem () {
      const authType = this.$store.state.app.authStatus;
      const authMap = [
        // 2 是个人已认证，对于公司来讲，是未认证
        { val: 2, label: '未认证', type: 'info', },
        { val: 3, label: '已认证', type: 'success', },
        { val: 6, label: '认证中', type: 'warning', },
        { val: 7, label: '认证未通过', type: 'error', },
      ];
      return authMap.find(item => item.val == authType) || authMap[0];
    },
  },

  methods: {
    fetchSuccess (resp) {
      const values = {
        enterpriseName:    resp.enterpriseName,
        creditCode:        resp.creditCode,
        registerAddress: resp.registerAddress,
        businessLicense:   resp.businessLicense,
        legalPersonName:   resp.legalPersonName,
        legalPersonIDCardNum:   resp.legalPersonIDCardNum,
        legalPersonIDCardFront: resp.legalPersonIDCardFront,
        legalPersonIDCardBack:  resp.legalPersonIDCardBack,

        realName:    resp.realName,
        idCardNum:   resp.idCardNum,
        idCardFront: resp.idCardFront,
        idCardBack:  resp.idCardBack,
      }

      this.form.setFieldsValue(values);

      const arr = [
        'businessLicense',
        'legalPersonIDCardFront',
        'legalPersonIDCardBack',
        'idCardFront',
        'idCardBack',
      ]
      arr.forEach(item => {
        resp[item] && this[item].push({
          uid: '-1',
          name: item,
          status: 'done',
          url: resp[item],
        })
      })
    },
    async onSubmit (values) {
      try {
        const values = await this._validate();
        this.loading = true;
        // 认证状态[1：个人认证 2：企业认证]
        const resp = await auth(Object.assign(values, { authType: 2 }));
        // 提交之后，默认进入 企业认证中 状态 6
        this.$store.commit('app/setAuthInfo', Object.assign(values, { authType: 6 }));
        this.$message.success('提交成功，请等待审核结果');
      } catch (error) {
        
      } finally {
        this.loading = false;
      }
    },

  }
};
</script>

<style scoped>
.account-settings-info-view {
  padding-left: 20px;
}
</style>
