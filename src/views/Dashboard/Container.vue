<template>
  <section>
    <h1>资源配额使用明细</h1>

    <div v-for="item in list" :key="item.text">
      <div class="sub-title">{{item.text}}</div>
      <ul>
        <li v-for="i in item.children" :key="i.text">
          {{ i.text }}
          {{ i.value }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "0/10",
  components: {},
  computed: {},
  data() {
    return {
      list: [
        {
          text: "计算",
          children: [
            { text: "主机(个)", value: "0/10" },
            { text: "CPU(核)", value: "0/10" },
            { text: "内存(GB)", value: "0/10" },
            { text: "系统镜像(个)", value: "0/10" },
            { text: "秘钥对(个)", value: "0/10" },
            { text: "防火墙策略(个)", value: "0/10" }
          ]
        },
        {
          text: "存储",
          children: [
            { text: "性能型硬盘(个)", value: "0/10" },
            { text: "性能型硬盘容量(GB)", value: "0/10" },
            { text: "SSD硬盘(个)", value: "0/10" },
            { text: "SSD硬盘容量(GB)", value: "0/10" },
            { text: "对象存储(个)", value: "0/10" },
            { text: "对象存储容量(GB)", value: "0/10" }
          ]
        },
        {
          text: "网络",
          children: [
            { text: "路由器(个)", value: "0/10" },
            { text: "私有网络(个)", value: "0/10" },
            { text: "子网(个)", value: "0/10" },
            { text: "公网IP(个)", value: "0/10" },
            { text: "负载均衡器(个)", value: "0/10" },
            { text: "带宽(MB)", value: "0/10" }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>

<style>
</style>