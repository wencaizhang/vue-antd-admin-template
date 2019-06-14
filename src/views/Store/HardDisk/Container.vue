<template>
  <div>
    <router-view v-if="$route.matched.length === 4"></router-view>
    <page-layout v-else>
      <div slot="header">
        <p>硬盘为主机提供块存储设备，它独立于主机的生命周期而存在，可以被连接到任意运行中的主机上。注意，硬盘附加到主机上后，您还需要登录到您的主机的操作系统中去加载该硬盘。当然，也可以从主机上卸载硬盘、并转至其他主机。注意，请先在您的主机的操作系统中卸载硬盘，然后再在友普云控制台上卸载。</p>
      </div>
      <div class="content">
        <my-content />
      </div>
    </page-layout>
  </div>
</template>

<script>
import PageLayout from "@/components/Layout/PageLayout";
import Content from "./Content";
export default {
  components: {
    PageLayout,
    MyContent: Content,
  },

  data() {
    return {};
  }
};
</script>

<style>
</style>
