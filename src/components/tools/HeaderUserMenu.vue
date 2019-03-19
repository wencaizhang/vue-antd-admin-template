<template>
  <div class="user-wrapper">
    <!-- <span class="action">
      <a-icon type="question-circle-o"></a-icon>
    </span> -->
    <a-dropdown>
      <span class="action ant-dropdown-link user-dropdown-menu">
        <a-avatar class="avatar" size="small" :src="avatar"/>
        <span>{{ nickname }}</span>
      </span>
      <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
        <!-- <a-menu-item key="0">
          <router-link :to="{ name: 'center' }">
            <a-icon type="user"/>
            <span>个人中心</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="1">
          <router-link :to="{ name: 'settings' }">
            <a-icon type="setting"/>
            <span>账户设置</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2" disabled>
          <a-icon type="setting"/>
          <span>测试</span>
        </a-menu-item> -->
        <!-- <a-menu-divider/> -->
        <a-menu-item key="3">
          <a href="javascript:;" @click="handleLogout">
            <a-icon type="logout"/>
            <span>退出登录</span>
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>

import Vue from "vue";
import { ACCESS_TOKEN, PROJECT_ID } from "@/store/mutation-types";

export default {
  name: "",
  components: {},
  computed: {},
  data() {
    return {
      nickname: "用户名",
      avatar: "https://avatars1.githubusercontent.com/u/34718241?s=460&v=4"
    };
  },
  methods: {
    handleLogout() {
      // Vue.ls.remove(ACCESS_TOKEN)
      // Vue.ls.remove(PROJECT_ID)

      // or 
      this.$ls.clear();
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
.avatar {
  margin: 20px 8px 20px 0;
  color: #1890ff;
  background: rgba(255, 255, 255, 0.85);
  vertical-align: middle;
}
.user-dropdown-menu-wrapper span {
  margin-left: 2px;
}
</style>