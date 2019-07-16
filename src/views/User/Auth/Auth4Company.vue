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
              :disabled="disabled"
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
              :disabled="disabled"
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
              :disabled="disabled"
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
            <template v-if="disabled">
              <a-image
                v-for="item in businessLicense"
                :src="item.url"
                :key="item.src"
              />
            </template>
            <a-upload
              v-else
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
              :disabled="disabled"
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
              :disabled="disabled"
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
            <template v-if="disabled">
              <a-image
                v-for="item in legalPersonIDCardFront"
                :src="item.url"
                :key="item.src"
              />
            </template>
            <a-upload
              v-else
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
            <template v-if="disabled">
              <a-image
                v-for="item in legalPersonIDCardBack"
                :src="item.url"
                :key="item.src"
              />
            </template>
            <a-upload
              v-else
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
              :disabled="disabled"
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
            <template v-if="disabled">
              <a-image
                v-for="item in idCardFront"
                :src="item.url"
                :key="item.src"
              />
            </template>
            <a-upload
              v-else
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
            <template v-if="disabled">
              <a-image
                v-for="item in idCardBack"
                :src="item.url"
                :key="item.src"
              />
            </template>
            <a-upload
              v-else
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

          <a-form-item v-if="!disabled">
            <a-button
              class="submit-btn"
              :loading="loading"
              :disabled="loading"
              type="primary"
              @click="onSubmit"
            >
              {{ pass ? '修改' : '提交' }}
            </a-button>
            <span v-if="pass" class="tip">(每年只能修改 3 次认证信息)</span>
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
      return this.status4C.find(item => item.val == this.authType) || this.authStatus[0];
    },
    pass () {
      return this.authType == 3;
    }
  },

  methods: {
    fetchSuccess (resp) {
      const values = {
        enterpriseName:    resp.enterpriseName,
        creditCode:        resp.creditCode,
        registerAddress:   resp.registerAddress,
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
.submit-btn {
  width: 140px;
  margin-left: 25%;
  margin-right: 16px;
}
.tip {
  color: #666;
}
</style>
