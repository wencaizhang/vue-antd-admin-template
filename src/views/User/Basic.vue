<template>
  <page-layout>
    <div class="account-settings-info-view">
      <a-row :gutter="16">
        <a-col :md="16" :lg="12">
          <a-form :form="form">

            <a-form-item v-bind="formItemLayout" label="账户类型">
              个人
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="账号名称">
              {{ userInfo.userName }}
            </a-form-item>

            <a-form-item v-bind="formItemLayout" label="真实姓名">
              {{ userInfo.realName || '无' }}
            </a-form-item>

            <a-form-item v-bind="formItemLayout" label="联系地址">
              <a-textarea
                placeholder="请输入联系地址"
                v-decorator="[
                  'address',
                  {
                    initialValue: userInfo.address,
                    rules:[
                      { required: true, message: '请输入联系地址' }
                    ]
                  }
                ]"
              />
            </a-form-item>

            <a-form-item v-bind="formItemLayout" label="联系电话">
              <a-input
                placeholder="请输入联系电话"
                v-decorator="[
                  'phone',
                  {
                    initialValue: userInfo.phone,
                    rules:[
                      { required: true, message: '请输入联系电话' }
                    ]
                  }
                ]"
              />
            </a-form-item>
            
            <a-form-item v-bind="formItemLayout">
              <a-row>
                <a-col :offset="8" :span="8">
                  <a-button
                    block
                    :loading="loading"
                    :disabled="loading"
                    type="primary"
                    @click="onSubmit"
                  >
                    保存
                  </a-button>
                </a-col>
              </a-row>
            </a-form-item>

          </a-form>
        </a-col>
      </a-row>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from "@/components/Layout/PageLayout";
export default {
  components: {
    PageLayout,
  },
  created () {
    this.form = this.$form.createForm(this)
  },

  data() {
    return {
      userInfo: {},
      snap: null,
      submitAble: true,

      form: null,
      loading: false,
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 12 },
      },
    };
  },
  mounted () {
    this.createSnap();
    this.fetch();
  },
  methods: {
    async fetch () {
      try {
        const resp = await this.$store.dispatch('app/fetchUserInfo')
        this.$store.commit('app/setUserInfo', resp);
        this.userInfo = resp;
      } catch (error) {
        
      }
    },
    createSnap () {
      this.snap = JSON.parse(JSON.stringify(this.userInfo));
    },
    onChange () {
      this.submitAble = JSON.stringify(this.snap) === JSON.stringify(this.userInfo);
    },
    onSubmit() {
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(values)
        }
      });
    },
  }
};
</script>

<style scoped>
.account-settings-info-view {
  padding-left: 20px;
}
</style>
