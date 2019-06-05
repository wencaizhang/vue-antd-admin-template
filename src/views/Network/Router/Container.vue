<template>
  <div>
    <router-view v-if="$route.matched.length === 4"></router-view>
    <page-layout v-else>
      <div slot="header">
        <p>路由器是租户专用设备，可高速连通租户下的私有网络, 子网与互联网的联通也是需要路由器连接的。</p>
      </div>
      <div class="content">
        <my-content />
      </div>
    </page-layout>
  </div>
</template>

<script>
import Content from "./Content";
import PageLayout from "@/components/Layout/PageLayout.vue";

export default {
  components: {
    MyContent: Content,
    PageLayout
  }
};
</script>

<style>
</style>
