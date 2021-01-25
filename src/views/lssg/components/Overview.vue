<template>
  <div class="lssgzl-wrapper">
    <!-- <div class="close" @click="close" /> -->
    <div class="lssgzl-container">
      <div class="title">
        历史事故总览
      </div>
      <img src="../../../assets/images/边.png" alt="">
      <div id="my-charts1" class="my-charts" />
      <div class="select-year" @click="dropLineDown">
        <input type="text" class="select" readonly :value="currentLineYear">
        <div class="select-arrow" />
        <div class="drop-down" :style="`display: ${isLineDropdown === true ? 'block' : 'none'}`">
          <ul>
            <li v-for="(item, index) in yearList" :key="index" @click="choseLineYear(item)">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="pie-container">
      <div class="title">
        受灾面积
      </div>
      <img src="../../../assets/images/边.png" alt="">
      <div id="my-charts2" class="my-charts" />
      <div class="select-year" @click="dropPieDown">
        <input type="text" class="select" readonly :value="currentPieYear">
        <div class="select-arrow" />
        <div class="drop-down" :style="`display: ${isPieDropdown === true ? 'block' : 'none'}`">
          <ul>
            <li v-for="(item, index) in yearList1" :key="index" @click="chosePieYear(item)">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="tree-container">
      <div class="title">
        受灾树种
      </div>
      <img src="../../../assets/images/边.png" alt="">
      <div id="my-charts3" class="my-charts" />
    </div>
  </div>
</template>
<script>

import { getTreeCount, countByYear, countByMonth, countByArea } from '@/api/lssg'
export default {
  data() {
    return {
      isPieDropdown: false,
      currentPieYear: '全部',
      yearList: ['全部', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
      yearList1: ['全部', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
      isLineDropdown: false,
      currentLineYear: '全部',
      szcsData: {},
      pieData: {
        townName: [],
        data: []
      },
      treeDamageData: {
        count: [],
        tree: []
      }
    }
  },
  computed: {
    zlOffsetRight() {
      return this.$store.getters.zlOffsetRight
    },
    lssgList() {
      return this.$store.getters.lssgList
    }
  },
  mounted() {
    // this.initYearList()
    this.$store.dispatch('lqfb/changezlOffsetRight', 0)
    this.initChart()
    getTreeCount().then(res => {
      if (res.code === 20000) {
        const arr = res.data.filter(v => v.tree != ' ' && v.tree != '').sort((a, b) => b.count - a.count).splice(0, 6).sort((a, b) => Math.random() > 0.5 ? -1 : 1)
        arr.forEach(item => {
          this.treeDamageData.count.push(item.count)
          this.treeDamageData.tree.push(item.tree)
        })
      }
      this.initCharts3()
    })
  },
  methods: {
    dropPieDown() {
      this.isPieDropdown = !this.isPieDropdown
    },
    dropLineDown() {
      this.isLineDropdown = !this.isLineDropdown
    },
    close() {
      this.$store.dispatch('lqfb/changezlOffsetRight', this.zlOffsetRight === 0 ? -25 : 0)
    },
    chosePieYear(year) {
      this.currentPieYear = year
      this.initChart()
    },
    choseLineYear(year) {
      this.currentLineYear = year
      this.initChart()
    },
    initChart() {
      // 受灾次数图标
      if (this.currentLineYear === '全部') {
        this.szcsData = { x: [], data: [] }
        countByYear().then(res => {
          res = res.data.filter(v => v.year > 1900).sort((a, b) => a.year - b.year)
          for (let i = 1999; i <= new Date().getFullYear(); i++) {
            this.szcsData.x.push(i)
            let flag = false
            res.forEach(item => {
              if (item.year === i) {
                this.szcsData.data.push(item.count)
                flag = true
              }
            })
            flag || this.szcsData.data.push(0)
          }
          this.initCharts1()
        })
      } else {
        this.szcsData = { x: [], data: [] }
        countByMonth(this.currentLineYear).then(res => {
          if (res.code === 20000) {
            for (let i = 1; i <= 12; i++) {
              this.szcsData.x.push(i)
              let flag = false
              res.data.forEach(item => {
                if (item.month === i) {
                  this.szcsData.data.push(item.total)
                  flag = true
                }
              })
              flag || this.szcsData.data.push(0)
            }
            this.initCharts1()
          }
        })
      }

      // 受灾面积图表
      this.pieData = {
        townName: [],
        data: []
      }
      if (this.currentPieYear === '全部') {
        const SZMJ_URLS = []
        for (let year = 2000; year <= new Date().getFullYear(); year++) {
          SZMJ_URLS.push(countByArea(year))
        }
        Promise.all(SZMJ_URLS).then(res => {
          res.forEach(r => {
            if (r.data && r.data.length > 0) {
              const data = r.data.filter(v => v.total > 0 && v.town)
              data.forEach(item => {
                this.pieData.townName.push(item.town)
                this.pieData.data.push({
                  value: item.total,
                  name: item.town
                })
              })
            }
          })
          this.initCharts2()
        })
      } else {
        countByArea(this.currentPieYear).then(res => {
          if (res.code === 20000) {
            res.data.forEach(item => {
              if (item.total > 0 && item.town) {
                this.pieData.townName.push(item.town)
                this.pieData.data.push({
                  value: item.total,
                  name: item.town
                })
              }
            })
          }
          this.initCharts2()
        })
      }
    },
    initCharts1() {
      const chart = this.$echarts.init(document.getElementById('my-charts1'))
      const option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          name: this.szcsData.x.length === 12 ? '月份' : '年份',
          nameTextStyle: { color: '#fff' },
          splitLine: { show: false },
          nameLocation: 'end',
          nameGap: 15,
          data: this.szcsData.x,
          axisLabel: {
            show: true,
            textStyle: {
              color: 'rgba(0, 240, 242, 1)',
              fontSize: 14
            }
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: this.szcsData.x.length === 12 ? 25 : 50,
          name: '次数',
          nameTextStyle: { color: '#fff' },
          splitLine: { show: false },
          axisLabel: {
            show: true,
            textStyle: {
              color: 'rgba(0, 240, 242, 1)',
              fontSize: 14
            }
          }
        },
        series: [{
          data: this.szcsData.data,
          type: 'line',
          areaStyle: {},
          smooth: true,
          itemStyle: {
            // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [{
                offset: 0, color: 'hsla(159, 100%, 46%, 1)' // 0% 处的颜色
              }, {
                offset: 0.5, color: 'hsla(199, 90%, 49%, 1)' // 100% 处的颜色
              }, {
                offset: 1, color: 'hsla(241, 80%, 71%, 1)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }],
        tooltip: {
          trigger: 'axis',
          formatter: '数值: {c}',
          axisPointer: {
            type: 'cross'
          }
        }
      }
      chart.setOption(option)
    },
    initCharts2() {
      // 渲染饼图
      const chart = this.$echarts.init(document.getElementById('my-charts2'))
      const option = {
        color: ['rgb(47, 219, 59)', 'rgb(62, 171, 255)', 'rgb(177, 71, 246)', 'rgb(0, 238, 190)',
          'rgb(63, 99, 255)', 'rgb(254, 43, 27)', 'rgb(32, 209, 251)', 'rgb(250, 140, 243)',
          'rgb(253, 192, 3)', 'rgb(195, 251, 119)', 'rgb(115, 62, 249)', 'rgb(253, 95, 35)'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}㎡ ({d}%)'
        },
        legend: {
          icon: 'circle',
          bottom: 10,
          left: 'center',
          data: this.pieData.townName,
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        series: [
          {
            name: '受灾面积',
            type: 'pie',
            radius: ['45%', '60%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            data: this.pieData.data
          }
        ]
      }
      chart.setOption(option)
    },
    initCharts3() {
      const chart = this.$echarts.init(document.getElementById('my-charts3'))
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.treeDamageData.tree,
            name: '树种',
            nameLocation: 'end',
            nameGap: -10,
            nameTextStyle: { color: '#fff' },
            axisTick: {
              alignWithLabel: true
            },
            splitLine: { show: false },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgba(0, 240, 242, 1)',
                fontSize: 12
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: { show: false },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgba(0, 240, 242, 1)',
                fontSize: 14
              }
            },
            min: 0,
            max: 100,
            name: '数量',
            nameTextStyle: { color: '#fff' }
          }
        ],
        series: [
          {
            roundCap: true,
            name: '数值',
            type: 'bar',
            barWidth: '40%',
            itemStyle: {
              barBorderRadius: [25, 25, 0, 0],
              color: {
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [{
                  offset: 0, color: 'rgb(12, 135, 201)' // 0% 处的颜色
                }, {
                  offset: 0.5, color: 'rgb(6, 187, 226)' // 100% 处的颜色
                }, {
                  offset: 1, color: 'rgb(0, 242, 253)' // 100% 处的颜色
                }]
              }
            },
            data: this.treeDamageData.count
          }
        ]
      }
      chart.setOption(option)
    },
    initYearList() {
      this.yearList.push('全部')
      this.yearList1.push('全部')
      for (let i = 1999; i <= new Date().getFullYear(); i++) {
        this.yearList.push(i)
        this.yearList.push(i)
      }
    }
  }
}
</script>
<style lang="scss">
  .lssgzl-wrapper {
    height: 100%;
    width: 100%;
    padding: 10px;
    .close {
      position: absolute;
      left: -34px;
      top: 80px;
      width: 34px;
      height: 104px;
      background: url(../../../assets/images/收回底.png) no-repeat;
      background-size: contain;
      cursor: pointer;
    }
    .lssgzl-container,.pie-container,.tree-container {
      width: 100%;
      height: 33%;
      padding-top: 10px;
      position: relative;
      .select-year {
        position: absolute;
        right: 10px;
        top: 60px;
        width: 96px;
        height: 26px;
        cursor: pointer;
        display: flex;
        .select {
          width: 60px;
          height: 26px;
          margin-top: 2px;
          background-color: rgb(9, 46, 79);
          outline: none;
          border: 0;
          color: hsla(196, 79%, 43%, 1);
          padding-left: 10px;
          cursor: pointer;
        }
        .select::-webkit-input-placeholder{
          color:hsla(196, 79%, 43%, 1);
        }
        .select-arrow {
          width: 26px;
          height: 26px;
          background: url(../../../assets/images/箭头.png) no-repeat top;
          background-size: 100%;
        }
        .drop-down {
          position: absolute;
          top: 30px;
          right: 12px;
          width: 80px;height: 110px;
          background: url(../../../assets/images/弹出框.png) no-repeat;
          background-size: contain;
          padding: 5px;
          ul {
            list-style: none;
            margin-top: 5px;
            height: 92px;
            padding-left: 0;
            overflow-y: scroll;
            li {
              text-align: center;
              font-size: 16px;
              height: 20px;
              line-height: 20px;
              margin-top: 4px;
            }
            li:hover {
              color: hsla(153, 98%, 53%, 1)
            }
          }
          ul::-webkit-scrollbar {
              width: 4px;
              height: 4px;
          }
          ul::-webkit-scrollbar-thumb {
              border-radius: 10px;
              background: rgba(255,255,255,0.8);
              width: 4px;
              height: 30px;
          }
          ul::-webkit-scrollbar-track {
              border-radius: 0;
              background: rgba(255,255,255,0.2);
          }
        }
      }
    }
    .my-charts {
        width: 380px;
        height: 250px;
      }
    .title {
      margin-bottom: 6px;
      font-size:16px;
      height: 22px;
      font-weight:bold;
      line-height:22px;
    }
  }
</style>
