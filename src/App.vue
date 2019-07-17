
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

import { getAuthInfo } from "@/api/user/user";
export default {
  data() {
    return {
      locale: zhCN,
      AppLoading: false,
    };
  },
  created () {
    this.fetchAuthInfo();
  },
  methods: {
    async fetchAuthInfo() {
      this.AppLoading = true;
      try {
        const resp = await getAuthInfo();
        this.$store.commit('app/setAuthType', resp.authStatus);
      } catch (error) {
        
      } finally {
        this.AppLoading = false;
      }
    },
  },
  computed: {
    title () {
      return `${this.$route.meta.title} - 云管平台`
    },
  },
  render (h) {
    return (
      <a-locale-provider locale={this.locale}>
        <div id="app">
          { this.AppLoading
            ? <div id="loading-mask">
                <div class="loading-wrapper">
                  <span class="loading-dot loading-dot-spin">
                    <i></i><i></i><i></i><i></i>
                  </span>
                </div>
              </div>
            : <router-view v-wechat-title={this.title} />
          }
        </div>
      </a-locale-provider>
    )
  }
};
</script>

<style>
html, #app {
  min-height: 100vh;
  min-width: 100vw;
}
.spin-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-100%);
}
</style>
