<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" width="256px" collapsible v-model="collapsed">
      <div class="logo">
        <img :src="collapsed ? logo2 : logo" alt="logo">
      </div>
      <side-menu
        theme="dark"
        mode="inline"
        :menus="menuData"
        :collapsed="collapsed"
        :collapsible="true"
      ></side-menu>
    </a-layout-sider>

    <a-layout class="ant-layout-container">
      <basic-header @collapseHandle="collapseHandle" />

      <div class="ant-layout-content">
        <router-view></router-view>
      </div>

      <a-layout-footer style="padding: 0px">
        <basic-footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import Vue from 'vue';
import BasicHeader from "@/components/Layout/BasicHeader";
import BasicFooter from "@/components/Layout/BasicFooter";
import SideMenu from "@/components/menu/Sidebar";
import asyncRouterMap from "@/router/config";

import logo from '@/assets/images/logo/2.png';
import logo2 from '@/assets/images/logo/4.png';

export default {
  // name: "basic-layout",
  name: "BasicLayout",
  components: {
    BasicHeader,
    BasicFooter,
    SideMenu,
  },
  data() {
    return {
      collapsed: false,
      menuData: [],
      logo,
      logo2,
    };
  },
  mounted() {
    const routeMap = asyncRouterMap;
    this.menuData = routeMap.find(item => item.path === "/").children;
  },
  methods: {
    collapseHandle() {
      this.collapsed = !this.collapsed;
    }
  }
};
</script>
<style>
#components-layout-demo-custom-trigger {
  min-height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 64px;
  box-sizing: border-box;
  background: #002140;
  padding: 16px;
  text-align: center;
}
#components-layout-demo-custom-trigger .logo img {
  max-width: 100%;
  max-height: 100%;
}

.ant-layout-container {
  display: flex;
  flex-direction: column;
}
.ant-layout-content {
  flex-grow: 1;
}
</style>
