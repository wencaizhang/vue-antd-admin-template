<template>
  <a-layout-header class="layout-header">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="collapseHandle"
    />
    <header-user-menu />
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
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 0;
}
</style>