<template>
  <a-layout-header class="layout-header">
    <div class="header">
      <div style="display: flex;">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="collapseHandle"
        />
        <breadcrumb />
      </div>
      <header-user-menu />
    </div>
  </a-layout-header>
</template>

<script>
import HeaderUserMenu from "../tools/HeaderUserMenu";
import Breadcrumb from "@/components/tools/Breadcrumb";
export default {
  name: "BasicHeader",
  components: {
    HeaderUserMenu,Breadcrumb
  },
  computed: {},
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    collapseHandle() {
      this.collapsed = !this.collapsed;
      this.$emit("collapseHandle");
    }
  }
};
</script>

<style>
.layout-header {
  padding: 0;
}
.layout-header .header {
  display: flex;
  justify-content: space-between;
  height: 64px;
  padding: 0 12px 0 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid #f2f2f2;
}


/*  */
.breadcrumb {
  margin-bottom: 0px;
  line-height: 60px;
}
</style>
