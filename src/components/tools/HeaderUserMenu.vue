<template>
  <div class="user-wrapper">
    <!-- <span class="action">
      <a-icon type="question-circle-o"></a-icon>
    </span> -->
    <a-dropdown>
      <span class="action ant-dropdown-link user-dropdown-menu">
        <a-avatar class="avatar" size="small" :src="avatar" />
        <span style="margin-left: 10px;">{{ userInfo.name }}</span>
      </span>
      <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
        <a-menu-item key="0">
          <router-link :to="{ name: 'basic' }">
            <a-icon type="user" />
            <span>个人中心</span>
          </router-link>
        </a-menu-item>
        <!-- <a-menu-item key="1">
          <router-link :to="{ name: 'settings' }">
            <a-icon type="setting" />
            <span>账户设置</span>
          </router-link>
        </a-menu-item> -->
        <a-menu-divider/>
        <a-menu-item key="3">
          <a href="javascript:;" @click="handleLogout">
            <a-icon type="logout" />
            <span>退出登录</span>
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>

import { clearToken } from '@/utils/util'
import { ACCESS_TOKEN, PROJECT_ID } from "@/store/mutation-types";
import avatar from '@/assets/images/avatar.png'
export default {
  name: "",
  components: {},
  mounted () {
    this.userInfo = this.$ls.get('userInfo') || {};
  },
  data() {
    return {
      userInfo: {},
      avatar,
    };
  },
  methods: {
    handleLogout() {
      clearToken();
      this.$router.push({ name: 'login' })
    }
  }
};
</script>

<style>
.user-wrapper {
  padding: 0 24px;
}
.action {
  cursor: pointer;
  padding: 0 12px;
  display: inline-block;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  height: 100%;
}
/* .avatar {
  margin: 20px 8px 20px 0;
  color: #1890ff;
  background: rgba(255, 255, 255, 0.85);
  vertical-align: middle;
} */
.user-dropdown-menu-wrapper span {
  margin-left: 2px;
}
</style>
