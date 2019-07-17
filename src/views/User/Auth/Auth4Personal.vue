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
            <div v-if="upgradeAble" slot="message">
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
              v-bind="props"
              :defaultFileList="idCardFront"
              @preview="handlePreview"
              @change="handleChange('idCardFront', $event)"
              v-decorator="[
                'idCardFront',
                {
                  getValueFromEvent: normFile,
                  rules: [
                    { required: true, message: '请上传身份证人像面' }
                  ]
                }
              ]"
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
              v-bind="props"
              :defaultFileList="idCardBack"
              @preview="handlePreview"
              @change="handleChange('idCardBack', $event)"
              v-decorator="[
                'idCardBack',
                {
                  getValueFromEvent: normFile,
                  rules: [
                    { required: true, message: '请上传身份证国徽面' }
                  ]
                }
              ]"
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
      return this.status4P.find(item => item.val == this.authStatus) || this.authStatusMap[0];
    },
    upgradeAble () {
      return this.authInfo.authStatus == 2;
    },
    pass () {
      // 认证通过 2，或者 个人认证修改失败 11
      return this.authStatus == 2 || this.authStatus == 11;
    },
  },
  methods: {
    fetchSuccess () {
      const authInfo = this.authInfo;
      const values = {
        realName: authInfo.realName,
        idCardNum: authInfo.idCardNum,
        idCardFront: authInfo.idCardFront,
        idCardBack: authInfo.idCardBack,
      }
      this.form.setFieldsValue(values);

      const arr = [
        'idCardFront',
        'idCardBack',
      ]
      arr.forEach(item => {
        authInfo[item] && this[item].push({
          uid: '-1',
          name: item,
          status: 'done',
          url: authInfo[item],
        })
      });
    },

    async onSubmit (values) {

      this.loading = true;
      try {
        const values = await this._validate();
        // 认证状态[1：个人认证 2：企业认证]
        const resp = await auth(Object.assign(values, { authType: 1 }));
        this.$message.success('提交成功，请等待审核结果');
        this.$emit('refresh');
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
.submit-btn {
  width: 140px;
  margin-left: 16.6666%;
  margin-right: 16px;
}
.tip {
  color: #666;
}
</style>
