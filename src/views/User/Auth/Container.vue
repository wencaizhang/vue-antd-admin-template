<template>
  <page-layout class="auth-container">
    <a-tabs
      :defaultActiveKey="formValues.authType"
      @change="handleTabChange"
    >
      <a-tab-pane tab="个人认证" key="1">
        <Auth1 />
      </a-tab-pane>
      <a-tab-pane
        v-if="showTab2"
        :disabled="false"
        key="2"
        tab="企业认证"
      >
        <Auth2 />
      </a-tab-pane>
    </a-tabs>
    <!-- </div> -->
  </page-layout>
</template>

<script>
import PageLayout from "@/components/Layout/PageLayout";
import Auth1 from './Auth4Personal'
import Auth2 from './Auth4Company'

import { getAuthInfo } from '@/api/user/user'
export default {
  components: {
    PageLayout,
    Auth1,
    Auth2,
  },
  data () {
    return {
      formValues: {
        authType: '1',
      },

      authInfo: {},
      loading: false,
    }
  },
  created () {
    // this.fetchAuthInfo();
  },
  computed: {
    showTab2 () {
      return true;
      const authMap = {
        // 1: '未认证用户',
        2: '已认证个人用户',
        3: '已认证企业用户',
        // 4: '个人认证中',
        // 5: '个人认证未通过',
        6: '企业认证中',
        7: '企业认证未通过',
      }
      return ['2', '3', '6', '7'].includes( this.authType )
      
    },
    authType () {
      // 认证状态[1：个人认证 2：企业认证]
      return this.$store.getters['app/getAuthType'];
    }
  },
  methods: {
    handleTabChange (key) {
      console.log(key)
    },

    async fetchAuthInfo () {
      try {
        this.loading = true;
        const resp = await getAuthInfo();
        this.authInfo = resp.data;
      } catch (error) {
        
      } finally {
        this.loading = false;
      }
    }
  },
}
</script>

<style>
.auth-container .ant-form-item-label label {
  display: inline-block;
  text-align: left;
  width: 100%;
  padding-left: 5px;
}
</style>
