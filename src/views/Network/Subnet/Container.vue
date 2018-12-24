<template>
  <div>
    <router-view v-if="$route.matched.length === 4"></router-view>
    <PageLayout v-else>
      <div slot="header">
        <p>子网即租户的私有网络（Vxnet）用于主机之间互联，它类似物理世界中使用交换机（L2Switch）组成的局域网。不同用户的私有网络之间是100%隔离的。私有网络可以作为子网加入到 路由器的端口上进而与互联网打通。</p>
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