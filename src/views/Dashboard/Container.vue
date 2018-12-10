<template>
  <section>
    <h1>资源配额使用明细</h1>
    <div v-for="item in sourceData" :key="item.text">
      <a-card :loading="loading" :title="item.text">
        <v-chart :forceFit="true" :height="height" :data="item.children">
          <v-coord type="rect" direction="LB" />
          <v-tooltip />
          <v-axis data-key="text" :label="label" />
          <v-bar position="text*value" />
        </v-chart>
      </a-card>
    </div>
  </section>
</template>

<script>
const DataSet = require("@antv/data-set");
const sourceData = [
  {
    text: "计算",
    children: [
      { text: "主机(个)", value: "9/10" },
      { text: "CPU(核)", value: "2/10" },
      { text: "内存(GB)", value: "3/10" },
      { text: "系统镜像(个)", value: "4/10" },
      { text: "秘钥对(个)", value: "6/10" },
      { text: "防火墙策略(个)", value: "8/10" }
    ]
  },
  {
    text: "存储",
    children: [
      { text: "性能型硬盘(个)", value: "1/10" },
      { text: "性能型硬盘容量(GB)", value: "2/10" },
      { text: "SSD硬盘(个)", value: "3/10" },
      { text: "SSD硬盘容量(GB)", value: "4/10" },
      { text: "对象存储(个)", value: "6/10" },
      { text: "对象存储容量(GB)", value: "8/10" }
    ]
  },
  {
    text: "网络",
    children: [
      { text: "路由器(个)", value: "1/10" },
      { text: "私有网络(个)", value: "2/10" },
      { text: "子网(个)", value: "3/10" },
      { text: "公网IP(个)", value: "4/10" },
      { text: "负载均衡器(个)", value: "6/10" },
      { text: "带宽(MB)", value: "8/10" }
    ]
  }
];
const dv = new DataSet.View().source(sourceData);
// dv.transform({
//   type: "sort",
//   callback(a, b) {
//     return a.population - b.population > 0;
//   }
// });
const data = dv.rows;
const scale = [
  {
    dataKey: "percent",
    min: 0,
    formatter: "100"
  }
];
const label = { offset: 12 };
export default {
  name: "dashboard",
  components: {
    // vChart: Chart,
    // vTooltip: Tooltip,
    // vEdge: Edge,
    // vView: View,
    // vPolygon: Polygon,
    // vCoord: Coord,
  },
  computed: {},
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 400);
  },
  data() {
    return {
      data,
      scale,
      height: 400,
      label,
      loading: true,
      sourceData
    };
  },
  methods: {}
};
</script>

<style>
</style>