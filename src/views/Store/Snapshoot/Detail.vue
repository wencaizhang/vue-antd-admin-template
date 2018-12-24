<template>
  <div>
    <PageLayout>
      <div slot="header">
        <p>硬盘备份可以为云硬盘创建在线备份。针对病毒入侵、人为误删除、软硬件故障等导致数据丢失或者损坏的场景，可通过任意时刻的备份恢复数据，以保证用户数据正确性和安全性，确保您的数据安全。创建硬盘备份的速度和硬盘大小有关系，硬盘越大速度越慢。恢复数据时备份可以用来创建新的云硬盘或者恢复数据到云硬盘，恢复备份的时间和原硬盘大小成正比。</p>
      </div>
      <div class="content">
        <ul class="detail-container">
          <li v-for="item in data" :key="item.key">
            <template v-if="item.key === 'disk'">
              <span class="key">{{item.name}}</span>
              <span class="value">
                <router-link :to="{name: `disk-instance`, params: { id: item.value }}">{{item.value}}</router-link>
              </span>
            </template>
            <template v-else>
              <span class="key">{{item.name}}</span>
              <span class="value">{{item.value}}</span>
            </template>
          </li>
        </ul>
      </div>
    </PageLayout>
  </div>
</template>

<script>
import PageLayout from "@/components/Layout/PageLayout.vue";
export default {
  components: {
    PageLayout,
  },
  data() {
    return {
      data: [
        { name: "名称", key: "名称", value: "db3" },
        { name: "硬盘名称", key: "disk", value: "硬盘名称db3" },
        { name: "状态", key: "状态", value: "使用中" },
        { name: "容量", key: "容量", value: "100 GB" },
        { name: "类型", key: "类型", value: "SSD" },
        { name: "日费用", key: "日费用", value: "￥120" },
        { name: "创建时间", key: "创建时间", value: "2018年1月1日 02:15" },
      ],
      loading: false,
      busy: false,
      tabKey: 1
    };
  },
  beforeMount() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$route.meta.title = this.$route.params.id;
    }
  }
};
</script>

<style scoped>
.detail-container li {
  margin-bottom: 10px;
  list-style: none;
}
.detail-container .key {
  width: 100px;
  text-align: right;
  display: inline-block;
  margin-right: 8px;
  color: rgba(0, 0, 0, 0.85);
}
.detail-container .key::after {
  content: "：";
  display: inline-block;
}
</style>
