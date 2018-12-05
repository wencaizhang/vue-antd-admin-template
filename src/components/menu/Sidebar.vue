<template>
  <a-layout-sider
    v-model="collapsed"
    :class="siderClassName"
    :collapsible="collapsible"
    :trigger="null"
    width="256px"
  >
    <!-- <logo/> -->
    <s-menu
      :collapsed="collapsed"
      :menu="menus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"
      style="padding: 16px 0px;"
    ></s-menu>
  </a-layout-sider>
</template>

<script>
import SMenu from "./index";
import { mapState } from "vuex";

export default {
  name: "SideMenu",
  components: { SMenu },
  props: {
    mode: {
      type: String,
      required: false,
      default: "inline"
    },
    theme: {
      type: String,
      required: false,
      default: "dark"
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    },
  },
  created() {},
  computed: {
    ...mapState({
      fixSiderbar: state => state.app.fixSiderbar
    }),
    siderClassName() {
      return {
        sider: true,
        shadow: 'ant-fixed-sidemenu',
      };
    }
  },
  methods: {
    onSelect(obj) {
      this.$emit("menuSelect", obj);
    },
  }
};
</script>