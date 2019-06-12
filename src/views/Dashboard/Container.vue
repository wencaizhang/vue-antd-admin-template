<template>
  <section class="dashboard-container">
    <page-layout>
      <h1>资源配额使用明细</h1>
      <div class="container">
        <div class="card" v-for="item in sourceData" :key="item.text">
          <a-card :loading="loading" :title="item.text" :bordered="false">
            <chart :data="item" />
          </a-card>
        </div>
        <div class="card card-img">
          <div class="img"></div>
        </div>
      </div>
    </page-layout>
  </section>
</template>

<script>
import PageLayout from "@/components/Layout/PageLayout";
import Chart from './Chart'

const sourceData = [
  {
    title: "计算",
    id: 'compute',
    color: 'rgba(110,109,243,1)',
    children: [
      { text: "云主机(个)", value: 10, },
      { text: "CPU(核)", value: 1, },
      { text: "内存(G)", value: 3, },
      { text: "系统镜像(个)", value: 4, },
      { text: "密钥对(个)", value: 6, },
      { text: "防火墙策略(个)", value: 8, }
    ]
  },
  {
    title: "存储",
    id: 'store',
    color: 'rgba(245,153,152,1)',
    children: [
      { text: "性能型硬盘(个)", value: 1 },
      { text: "性能型硬盘容量(G)", value: 2 },
      { text: "SSD硬盘(个)", value: 3 },
      { text: "SSD硬盘容量(G)", value: 4 },
      { text: "对象存储(个)", value: 6 },
      { text: "对象存储容量(G)", value: 8 }
    ]
  },
  {
    title: "网络",
    id: 'network',
    color: 'rgba(81,132,246,1)',
    children: [
      { text: "路由器(个)", value: 1 },
      { text: "私有网络(个)", value: 2 },
      { text: "子网(个)", value: 3 },
      { text: "公网IP(个)", value: 4 },
      { text: "负载均衡器(个)", value: 6 },
      { text: "带宽(MB)", value: 8 }
    ]
  }
];
export default {
  name: "Dashboard",
  components: {
    PageLayout,
    Chart,
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 400);
  },
  data() {
    return {
      loading: true,
      sourceData,
    };
  },
  methods: {}
};
</script>

<style >
.dashboard-container .container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.card {
  width: 49%;
  /* padding: 1%; */
}
.dashboard-container .ant-card-body {
  padding: 0;
}
.card-img {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
.img {
  width: 80%;
  height: 80%;
  margin: auto;
  background: url('../../assets/chart-support.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
