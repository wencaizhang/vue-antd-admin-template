<template>
  <section
    class="chart-container"
    :style="{
      'border-color': data.color,
      'padding-top': '10px',
      'padding-left': '20px',
      'padding-right': showDetail ? '180px': 0
    }"
  >
    <h3 class="title" :style="{ 'background-color': data.color }">{{ data.title }}</h3>
    <div v-if="showChart" :id="data.id" :style="{width: '100%', height: '400px'}"></div>
    <Detail
      v-if="showDetail"
      :data="data"
      class="chart-detail"
    />
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

import Detail from "./Detail";
export default {
  name: "Chart",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showDetail: false,
      showChart: false,
    };
  },
  components: {
    Detail,
  },
  mounted() {
    if (window.innerWidth >= 1500) {
      this.showDetail = true;
    }
    this.showChart = true;
    this.$nextTick(() => {
      this.drawLine();
    })
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(this.data.id));
      const yData = this.data.children.map(item => item.text);
      const xData = this.data.children.map(item => item.value);

      const color = this.data.color;
      // console.log(yData);

      var dataShadow = [];
      var yMax = 10;
      for (var i = 0; i < yData.length; i++) {
          dataShadow.push(yMax);
      }
      // 绘制图表
      myChart.setOption({
        // title: { text: this.data.title },
        tooltip: {},
        xAxis: {
          data: yData,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            rotate: 45, //刻度旋转45度角
            fontSize: 12,
            margin: 10,
            textStyle: {
              color: "#999",
              fontSize: 12
            },
            rich: {
              test: {
                color: "red",
                lineHeight: 10
              }
            }
          },
        },
        yAxis: {
            show: false,
          // axisLabel: {
          //   formatter(value) {
          //     return `${value}/10`;
          //   }
          // }
        },
        grid: {
          // 控制图的大小，调整下面这些值就可以，
          x: 40,
          x2: 90,
          y2: 90 // y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
        },
        series: [
          {
            // For shadow
            type: 'bar',
            itemStyle: {
              normal: {color: '#f3f3f3'},
              emphasis: {color: '#f3f3f3'},
            },
            barGap:'-100%',
            barWidth: 34, // 柱条（K线蜡烛）宽度
            barCategoryGap:'40%',
            data: dataShadow,
            animation: false,
          },
          {
            name: "已使用",
            data: xData,
            type: "bar",
            z: 100,
            barWidth: 34, // 柱条（K线蜡烛）宽度
            itemStyle: {
              normal: {
                // 定制显示（按顺序）
                color: function(params) {
                  // var color = 'rgba(110,109,243,1)'
                  var arr = [ 0.3, 0.4, 0.5, 0.6, 0.8, 0.9 ];
                  var colorList= arr.map(value => {
                    return color.replace(/(.*)(\d)/, `$1${value}`);
                  })
                  return colorList[params.dataIndex]
                }
              },
              emphasis: {
                color: color,
              }
            },
            label: {
              normal: {
                show: true,
                formatter(params) {
                  // console.log(params);
                  return `${params.data}/10`;
                },
                position: "top",
                // backgroundColor: '#000',
                width: '100px',
                // rich: {
                //   test: {
                //     color: "red",
                //     lineHeight: 10
                //   }
                // }
              }
            },

          }
        ]
      });

      // myChart.on('mouseover', function (params) {
      //     console.log('params: ', params)
      //     params.color = 'red'
      // });
    }
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  padding-bottom: 20px;
  border-bottom: 4px solid #2378f7;
  box-shadow: 9px 9px 90px 9px #ededed;
  margin-bottom: 20px;
}
.chart-detail {
  position: absolute;
  top: 20px;
  right: 20px;
}
.title {
  position: absolute;
  top: 20px;
  left: 0;
  padding: 0 15px 0 20px;
  /* height: 24px;
  line-height: 24px; */
  background-color: #2378f7;
  color: #fff;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
}
</style>

