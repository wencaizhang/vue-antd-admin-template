<template>
  <div>
    <PageLayout>
      <div slot="header">
        <p>硬盘为主机提供块存储设备，它独立于主机的生命周期而存在，可以被连接到任意运行中的主机上。注意，硬盘附加到主机上后，您还需要登录到您的主机的操作系统中去加载该硬盘。当然，也可以从主机上卸载硬盘、并转至其他主机。注意，请先在您的主机的操作系统中卸载硬盘，然后再在友普云控制台上卸载。</p>
        <a-tabs
          defaultActiveKey="1"
          @change="handleTabChange"
          style="position:relative; top: 17px;"
        >
          <a-tab-pane tab="概览" key="1"></a-tab-pane>
          <a-tab-pane tab="快照" key="2"></a-tab-pane>
        </a-tabs>
      </div>
      <div class="content">
        <ul v-if="tabKey == 1" class="detail-container">
          <li v-for="item in data" :key="item.key">
            <span class="key">{{item.name}}</span>
            <span class="value">{{item.value}}</span>
          </li>
        </ul>
        <template v-else>
          <Snapshoot />
        </template>
      </div>
    </PageLayout>
  </div>
</template>

<script>
import PageLayout from "@/components/Layout/PageLayout.vue";
import Snapshoot from "../Snapshoot/Content";
export default {
  components: {
    PageLayout,
    Snapshoot
  },
  data() {
    return {
      data: [
        { name: "名称", key: "名称", value: "db3" },
        { name: "状态", key: "状态", value: "使用中" },
        { name: "容量", key: "容量", value: "100 GB" },
        { name: "类型", key: "类型", value: "SSD" },
        { name: "月费用", key: "月费用", value: "￥120" },
        { name: "可启动", key: "可启动", value: "否" },
        { name: "创建时间", key: "创建时间", value: "2018年1月1日 02:15" },
        { name: "挂载的主机", key: "挂载的主机", value: "host-db3 /dev/vdb" }
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
    handleTabChange(v) {
      this.tabKey = v;
    },
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
