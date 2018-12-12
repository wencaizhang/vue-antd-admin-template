<template>
  <section>
    <div :id="data.id" :style="{width: '100%', height: '300px'}"></div>
  </section>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "hello",
  props: ["data"],
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(this.data.id));
      const yData = this.data.children.map(item => item.text);
      const xData = this.data.children.map(item => item.value);

      console.log(yData);

      // 绘制图表
      myChart.setOption({
        title: { text: this.data.title },
        tooltip: {},
        yAxis: {
          data: yData,
          formatter: function(value) {
            return "{test|" + value + "}";
          },
          axisLabel: {
            rich: {
              test: {
                color: "red",
                lineHeight: 10
              }
            }
          }
        },
        xAxis: {
          axisLabel: {
            formatter(value) {
              return `${value}/10`;
            }
          }
        },
        series: [
          {
            name: "已使用",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#1890ff"
              }
            },
            label: {
              normal: {
                show: true,
                formatter(params) {
                  // console.log(params);
                  return `${params.data}/10`;
                },
                position: "inside"
              }
            },
            data: xData
          }
        ]
      });
    }
  }
};
</script>

<style>
</style>