<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="20" :lg="16">
        <a-form :form="form">
          <a-alert
            style="margin: 0 0 24px; width: 66.7%;"
            :type="authTypeItem.type"
            showIcon
          >
            <div v-if="authInfo.authStatus == 2" slot="message">
              {{ authTypeItem.label }}，
              <a @click="upgrade">升级为企业认证</a>
            </div>
            <div v-else slot="message">
              {{ authTypeItem.label }}
            </div>
            <div v-if="authInfo && authInfo.authResultContent" slot="description">{{ authInfo && authInfo.authResultContent }}</div>
          </a-alert>
          <a-form-item v-bind="formItemLayout" label="真实姓名">
            <a-input
              :disabled="disabled"
              placeholder="请输入真实姓名"
              v-decorator="[
                'realName',
                {
                  rules:[
                    { required: true, message: '请输入真实姓名' },
                    { max: 20, message: '最多允许20个字符' },
                    ruleObj.HanziAndLetter,
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
            <template v-if="disabled">
              <a-image
                v-for="item in idCardFront"
                :src="item.url"
                :key="item.src"
              />
            </template>
            <a-upload
              v-else
              :defaultFileList="idCardFront"
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
              :accept="acceptFileTypes"
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
            <template v-if="disabled">
              <a-image
                v-for="item in idCardBack"
                :src="item.url"
                :key="item.src"
              />
            </template>
            <a-upload
              v-else
              :disabled="disabled"
              :defaultFileList="idCardBack"
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

          <a-form-item v-if="!disabled" v-bind="formItemLayout">
            <a-row>
              <a-col :offset="8" :span="8">
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
  components: { AImage },
  data() {
    return {
      ruleObj,
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 12 },
      },
    };
  },
  computed: {
    authTypeItem () {
      const authType = this.authInfo.authStatus;
      const authMap = [
        { val: 1, editAble: true, label: '未认证', type: 'info', },
        { val: 2, editAble: false, label: '已认证', type: 'success', },
        { val: 4, editAble: false, label: '认证中', type: 'warning', },
        { val: 5, editAble: true, label: '认证未通过', type: 'error', },
      ];
      return authMap.find(item => item.val == authType) || authMap[0];
    },
    disabled () {
      return !this.authTypeItem.editAble;
    },
  },
  methods: {

    fetchSuccess (resp) {
      const values = {
        realName: resp.realName,
        idCardNum: resp.idCardNum,
        idCardFront: resp.idCardFront,
        idCardBack: resp.idCardBack,
      }
      this.form.setFieldsValue(values);
      this.idCardFront.push({
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: resp.idCardFront
      })
      this.idCardBack.push({
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: resp.idCardBack
      })
    },

    async onSubmit (values) {

      this.loading = true;
      try {
        const values = await this._validate();
        // 认证状态[1：个人认证 2：企业认证]
        const resp = await auth(Object.assign(values, { authType: 1 }));
        // 提交之后，默认进入 认证中 状态
        this.$store.commit('app/setAuthInfo', Object.assign(values, { authType: 4 }));
        this.$message.success('提交成功，请等待审核结果');
      } catch (error) {
        
      } finally {
        this.loading = false;
      }
    },

    upgrade () {
      console.log('升级！')
      this.$emit('upgrade')
    }
  }
};
</script>

<style scoped>
.account-settings-info-view {
  padding-left: 20px;
}
</style>
