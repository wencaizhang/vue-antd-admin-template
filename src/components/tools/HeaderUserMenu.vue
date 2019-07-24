<template>
  <div class="user-wrapper">
    <a-dropdown>
      <span class="action ant-dropdown-link user-dropdown-menu">
        <a-avatar class="avatar" size="small" :src="avatar" />
        <span>{{ userInfo.name }}</span>
      </span>
      <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
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
import { clearToken, redirectToLogin } from '@/utils/role';
import { ACCESS_TOKEN, PROJECT_ID } from "@/store/mutation-types";
import avatar from '@/assets/images/avatar.png';

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
      redirectToLogin();
    },
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
.avatar {
  margin: 20px 12px 20px 0;
  color: #1890ff;
  background: rgba(255, 255, 255, 0.85);
  vertical-align: middle;
}
.user-dropdown-menu-wrapper span {
  margin-left: 2px;
}
</style>
