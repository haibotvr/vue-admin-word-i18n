<template>
  <div class="chart-container">
    <div :id="id" :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

<script>
import { selectLogByChapter } from '@/api/log'
import echarts from 'echarts'
import resize from '../../../components/Charts/mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      chart: null,
      chapterId: undefined,
      items: [],
      points: [],
      dates: []
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created() {
    this.chapterId = this.$route.params.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      selectLogByChapter(this.chapterId).then(response => {
        this.items = response.data
        for (const i in this.items) {
          this.dates.push(this.items[i].createTime)
          this.points.push(this.items[i].correctness)
          this.initChart()
        }
      })
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          color: ['#47D8BE'],
          data: ['成绩'],
          left: 'center',
          bottom: 'bottom'
        },
        grid: {
          top: 'middle',
          left: '3%',
          right: '4%',
          bottom: '3%',
          height: '80%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.dates, /** 日期 */
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#DDD'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#333'
            }
          },
          nameTextStyle: {
            color: '#999'
          },
          splitArea: {
            show: false
          }
        },
        series: [{
          name: '成绩',
          type: 'line',
          data: this.points,
          color: '#F58080',
          lineStyle: {
            normal: {
              width: 5,
              color: {
                type: 'linear',
                colorStops: [{
                  offset: 0,
                  color: '#FFCAD4' // 0% 处的颜色
                }, {
                  offset: 0.4,
                  color: '#F58080' // 100% 处的颜色
                }, {
                  offset: 1,
                  color: '#F58080' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(245,128,128, 0.5)',
              shadowBlur: 10,
              shadowOffsetY: 7
            }
          },
          itemStyle: {
            normal: {
              color: '#F58080',
              borderWidth: 10,
              /* shadowColor: 'rgba(72,216,191, 0.3)',
              shadowBlur: 100, */
              borderColor: '#F58080'
            }
          },
          smooth: true
        }]
      })
    }
  }
}
</script>
