<template>
  <div>
    <PageLayout>
      <div slot="header">
        <p>硬盘备份可以为云硬盘创建在线备份。针对病毒入侵、人为误删除、软硬件故障等导致数据丢失或者损坏的场景，可通过任意时刻的备份恢复数据，以保证用户数据正确性和安全性，确保您的数据安全。创建硬盘备份的速度和硬盘大小有关系，硬盘越大速度越慢。恢复数据时备份可以用来创建新的云硬盘或者恢复数据到云硬盘，恢复备份的时间和原硬盘大小成正比。</p>
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