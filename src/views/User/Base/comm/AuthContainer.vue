<template>
<div>
  <a-tabs :defaultActiveKey="formValues.authType" @change="callback">
    <a-tab-pane tab="个人认证" key="1">
      <Auth1 />
    </a-tab-pane>
    <a-tab-pane v-if="authInfo.authType > 0" tab="企业认证" key="2">
      <Auth2 />
    </a-tab-pane>
  </a-tabs>
</div>
</template>

<script>
import Auth1 from './Auth4Personal'
import Auth2 from './Auth4Company'

import { getAuthInfo } from '@/api/user/user'
export default {
  components: {
    Auth1,
    Auth2,
  },
  data () {
    return {
      formValues: {
        // 认证状态[1：个人认证 2：企业认证]
        authType: '1',
      },

      authInfo: {},
      loading: false,
    }
  },
  created () {
    // this.fetchAuthInfo();
  },
  
  methods: {
    callback (key) {
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