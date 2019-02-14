<template>
  <a-layout-header class="layout-header">
    <div class="header">
      <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="collapseHandle"
      />
      <header-user-menu/>
    </div>
  </a-layout-header>
</template>

<script>
import HeaderUserMenu from "../tools/HeaderUserMenu";
export default {
  name: "basic-header",
  components: {
    HeaderUserMenu
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
</style>
