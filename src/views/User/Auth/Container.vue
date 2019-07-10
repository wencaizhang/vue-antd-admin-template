<template>
  <page-layout class="auth-container">
    <a-spin size="large" :spinning="spinning">
      <a-tabs
        v-if="!spinning"
        :defaultActiveKey="upgrade ? '2' : authType"
        @change="handleTabChange"
      >
        <a-tab-pane v-if="!upgrade && authType == 1" tab="个人认证" key="1">
          <Auth1 @upgrade="onUpgrade"/>
        </a-tab-pane>
        <a-tab-pane v-else tab="企业认证" key="2">
          <Auth2 />
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

      authInfo: {},
      loading: false,
      spinning: false,

      upgrade: false,
    };
  },
  created() {
    this.fetchAuthInfo();
  },
  computed: {
    authType () {
      return '1';
      // 展示个人认账 1 / 展示企业认证 2
      const authMap = {
        // 1: '未认证用户',
        2: "已认证个人用户",
        3: "已认证企业用户",
        // 4: '个人认证中',
        // 5: '个人认证未通过',
        6: "企业认证中",
        7: "企业认证未通过"
      };
      return ["3", "6", "7"].includes(this.authInfo.authStatus) ? '2' : '1';
    }
  },
  methods: {
    fetchAuthInfo() {
      this.spinning = true;
      this.form = this.$form.createForm(this);

      this.$store
        .dispatch("app/fetchAuthInfo")
        .then(resp => {
          this.$store.commit("app/setAuthInfo", resp);
          this.$store.commit("app/setAuthType", resp.authStatus);
          this.authInfo = resp;
          this.spinning = false;
        })
        .catch(err => {
          this.spinning = false;
        });
    },

    handleTabChange(key) {
      console.log(key);
    },
    onUpgrade () {
      console.log('onUpgrade')
      this.upgrade = true;
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
