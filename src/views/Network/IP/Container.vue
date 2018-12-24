<template>
  <div>
    <router-view v-if="$route.matched.length === 4"></router-view>
    <PageLayout v-else>
      <div slot="header">
        <p>公网 IP （Elastic IP） 是在互联网上合法的静态 IP 地址。在 YPCloud 系统中，您可以将申请到的公网 IP 地址与任意云主机（包括子网内的主机）/负载均衡器绑定，并随时可以解绑、再分配到其他资源上。</p>
      </div>
      <div class="content">
        <Content/>
      </div>
    </PageLayout>
  </div>
</template>

<script>
import Content from "./Content";
import PageLayout from "@/components/Layout/PageLayout.vue";

export default {
  components: {
    Content,
    PageLayout
  }
};
</script>

<style>
</style>