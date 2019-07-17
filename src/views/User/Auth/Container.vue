<template>
  <page-layout class="auth-container">
    <a-spin size="large" :spinning="spinning">
      <a-tabs
        v-if="!spinning"
        :defaultActiveKey="authType"
        @change="handleTabChange"
      >
        <a-tab-pane v-if="authType == 1" tab="个人认证" key="1">
          <Auth1 @upgrade="onUpgrade" :authInfo.sync="authInfo" @refresh="fetchAuthInfo" />
        </a-tab-pane>
        <a-tab-pane v-else tab="企业认证" key="2">
          <Auth2  :authInfo.sync="authInfo" />
        </a-tab-pane>
      </a-tabs>
    </a-spin>
  </page-layout>
</template>

<script>
import PageLayout from "@/components/Layout/PageLayout";
import Auth1 from "./Auth4Personal";
import Auth2 from "./Auth4Company";

import { getAuthInfo } from "@/api/user/user";
export default {
  components: {
    PageLayout,
    Auth1,
    Auth2
  },
  data() {
    return {
      formValues: {
        authType: "1"
      },
      // 认证状态
      authStatusMap: [
        { val: 1,  editAble: true,  type: 'info',    label: '未认证' },
        { val: 2,  editAble: true,  type: 'success', label: '个人认证完成' },
        { val: 3,  editAble: true,  type: 'success', label: '企业认证完成' },
        { val: 4,  editAble: false, type: 'warning', label: '个人认证中' },
        { val: 5,  editAble: true,  type: 'error',   label: '个人认证未通过' },
        { val: 6,  editAble: false, type: 'warning', label: '企业认证中' },
        { val: 7,  editAble: true,  type: 'error',   label: '企业认证未通过' },
        { val: 8,  editAble: false, type: 'warning', label: '个人认证修改中' },
        { val: 9,  editAble: false, type: 'warning', label: '企业认证修改中' },
        { val: 10, editAble: true,  type: 'error',   label: '企业认证修改失败' },
        { val: 11, editAble: true,  type: 'error',   label: '个人认证修改失败' },
        { val: 12, editAble: false, type: 'info',    label: '企业未认证' },
      ],

      authInfo: {},
      loading: false,
      spinning: false,

      upgrade: false,
    };
  },
  created () {
    this.fetchAuthInfo()
  },
  computed: {
    authType () {
      const item = this.authStatusMap.find(item => item.val == this.authInfo.authStatus);
      if (!item) {
        return '1';
      }
      if (item.label.includes('个人')) {
        return '1';
      }
      return '2';
    }
  },
  methods: {
    async fetchAuthInfo() {
      this.spinning = true;
      try {
        const resp = await getAuthInfo();
        this.authInfo = Object.assign({}, this.authInfo, resp);
        this.$store.commit('app/setAuthType', resp.authStatus);
      } catch (error) {
        if (error.response.status === 404) {
          Object.assign(this.authInfo, { authStatus: '1' });
          this.$store.commit('app/setAuthType', '1');
        }
      } finally {
        this.spinning = false;
      }
    },

    handleTabChange(key) {
      console.log(key);
    },
    
    onUpgrade () {
      this.fetchAuthInfo()
    }
  }
};
</script>

<style>
.auth-container .ant-form-item-label label {
  display: inline-block;
  text-align: left;
  width: 100%;
  padding-left: 5px;
}
</style>
