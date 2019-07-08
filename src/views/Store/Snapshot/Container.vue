<template>
  <div>
    <router-view v-if="$route.matched.length === 4"></router-view>
    <page-layout v-else>
      <div slot="header">
        <p>硬盘快照指的是云硬盘数据在某个时刻的完整拷贝或镜像，是一种重要的数据容灾手段，当数据丢失时，可通过快照将数据完整的恢复到快照时间点。创建硬盘快照速度很快可以在几秒钟内完成，恢复数据时可快速通过快照创建新的云硬盘，这样硬盘在初始状态就具有快照中的数据。</p>
      </div>
      <div class="content">
        <my-content />
      </div>
    </page-layout>
  </div>
</template>

<script>
import Content from "./Content";
import PageLayout from "@/components/Layout/PageLayout";

export default {
  components: {
    MyContent: Content,
    PageLayout
  }
};
</script>

<style>
</style>
