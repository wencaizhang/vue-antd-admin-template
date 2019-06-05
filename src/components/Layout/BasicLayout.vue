<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" width="256px" collapsible v-model="collapsed">
      <div class="logo" />
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
import BasicHeader from "@/components/Layout/BasicHeader";
import BasicFooter from "@/components/Layout/BasicFooter";
import SideMenu from "@/components/menu/Sidebar";
import { asyncRouterMap } from "@/router/config";

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
      menuData: []
    };
  },
  mounted() {
    this.menuData = asyncRouterMap.find(item => item.path === "/").children;
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
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.ant-layout-container {
  display: flex;
  flex-direction: column;
}
.ant-layout-content {
  flex-grow: 1;
}
</style>
