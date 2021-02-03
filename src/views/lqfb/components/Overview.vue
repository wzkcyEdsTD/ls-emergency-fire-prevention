<template>
  <div class="overview-wrapper" :style="`right: ${zlOffsetRight}rem`">
    <div class="close" @click="close" />
    <!-- 基础要素总览 start -->
    <!-- <div v-show="lqfbActiveMenu === '基础要素' || lqfbActiveMenu === '林区'" class="yjzyzl-wrapper"> -->
    <div v-show="false" class="yjzyzl-wrapper">
      <div class="title">
        林区资源总览
      </div>
      <img style="width: 100%;" src="@/common/images/边.png" alt="">
      <div class="swiper">
        <div class="tabs">
          <div class="tab-1" :class="activeTab==='乡镇区域' ? 'active' : ''" @click="activeTab='乡镇区域'">乡镇区域</div>
          <div class="tab-2" :class="activeTab==='林区数量' ? 'active' : ''" @click="activeTab='林区数量'">林区数量</div>
        </div>
        <div v-show="activeTab==='乡镇区域'" class="swiper-slide">
          <div class="charts">
            <ul>
              <li v-for="(item,index) in chartsData['林区']" :key="index">
                <div class="town-name">{{ item[0] }}</div>
                <div class="town-list">
                  <div class="item">
                    <div class="progress">
                      <div class="progress-bar sl-bgc" :style="{width: `${(item[1]/chartsData['林区'][0][4]).toFixed(2)*100}%`}" />
                    </div>
                    <div class="num">{{ item[1] }}</div>
                  </div>
                  <div class="item">
                    <div class="progress">
                      <div class="progress-bar lc-bgc" :style="{width: `${(item[2]/chartsData['林区'][0][4]).toFixed(2)*100}%`}" />
                    </div>
                    <div class="num">{{ item[2] }}</div>
                  </div>
                  <div class="item">
                    <div class="progress">
                      <div class="progress-bar sd-bgc" :style="{width: `${(item[3]/chartsData['林区'][0][4]).toFixed(2)*100}%`}" />
                    </div>
                    <div class="num">{{ item[3] }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 图例 strat -->
          <div class="legend">
            <div class="legend-sl">
              <div class="legend-img sl-bgc" />
              森林公园
            </div>
            <div class="legend-lc">
              <div class="legend-img lc-bgc" />
              国有林场</div>
            <div class="legend-sd">
              <div class="legend-img sd-bgc" />
              湿地
            </div>
          </div>
          <!-- 图例 end -->
        </div>
        <div v-show="activeTab==='林区数量'" class="swiper-slide">
          <div id="my-echarts" class="my-echarts" />
        </div>
        <div class="pagenation">
          <img src="../../../assets/images/联合 11.png" class="btn-pre" :class="activeTab==='乡镇区域' ? 'btn-active' : ''" @click="activeTab='乡镇区域'">
          <div class="page">
            <div class="page-customs" :class="activeTab==='乡镇区域' ? 'active' : ''" @click="activeTab='乡镇区域'">1</div>
            <div class="page-customs" :class="activeTab==='林区数量' ? 'active' : ''" @click="activeTab='林区数量'">2</div>
          </div>
          <img src="../../../assets/images/联合 10.png" class="btn-next" :class="activeTab==='林区数量' ? 'btn-active' : ''" @click="activeTab='林区数量'">
        </div>
      </div>
    </div>
    <!-- 基础要素总览 end -->
    <!-- 应急资源总览 start -->
    <!-- <div v-show="lqfbActiveMenu === '应急资源'" class="yjzyzl-wrapper"> -->
    <div v-show="false" class="yjzyzl-wrapper">
      <div class="title">应急资源总览</div>
      <img src="../../../assets/images/边.png" alt="">
      <div class="swiper">
        <div class="tabs">
          <div class="tab-1" :class="activeTab==='区域统计' ? 'active' : ''" @click="activeTab='区域统计'">区域统计</div>
          <div class="tab-2" :class="activeTab==='类别统计' ? 'active' : ''" @click="activeTab='类别统计'">类别统计</div>
        </div>
        <div v-show="activeTab==='区域统计'" class="swiper-slide">
          <div class="charts" style="height: 300px">
            <ul>
              <li v-for="(item, index) in chartsData['应急资源']" :key="index" class="yj-li">
                <div class="town-name">{{ item[0] }}</div>
                <div class="town-list">
                  <div class="item">
                    <div class="progress">
                      <div class="progress-bar sl-bgc" :style="{width: `${(item[1]/chartsData['应急资源'][0][1]).toFixed(2)*100}%`}" />
                    </div>
                    <div class="num">{{ item[1] }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-show="activeTab==='类别统计'" class="swiper-slide">
          <div id="my-echarts1" class="my-echarts" />
        </div>
        <div class="pagenation">
          <img src="../../../assets/images/联合 11.png" class="btn-pre" :class="activeTab==='区域统计' ? 'btn-active' : ''" @click="activeTab='区域统计'">
          <div class="page">
            <div class="page-customs" :class="activeTab==='区域统计' ? 'active' : ''" @click="activeTab='区域统计'">1</div>
            <div class="page-customs" :class="activeTab==='类别统计' ? 'active' : ''" @click="activeTab='类别统计'">2</div>
          </div>
          <img src="../../../assets/images/联合 10.png" class="btn-next" :class="activeTab==='类别统计' ? 'btn-active' : ''" @click="activeTab='类别统计'">
        </div>
      </div>
    </div>
    <!-- 应急资源总览 end -->
    <!-- 安全风险源总览 start -->
    <!-- <div v-show="lqfbActiveMenu === '安全风险源'" class="yjzyzl-wrapper"> -->
    <div v-show="false" class="yjzyzl-wrapper">
      <div class="title">
        安全风险源总览
      </div>
      <img src="../../../assets/images/边.png" alt="">
      <div class="swiper">
        <div class="tabs">
          <div class="tab-1" :class="activeTab==='区域统计' ? 'active' : ''" @click="activeTab='区域统计'">区域统计</div>
          <div class="tab-2" :class="activeTab==='类别统计' ? 'active' : ''" @click="activeTab='类别统计'">类别统计</div>
        </div>
        <div v-show="activeTab==='区域统计'" class="swiper-slide">
          <div class="charts" style="height: 300px">
            <ul>
              <li v-for="(item, index) in chartsData['安全风险源']" :key="index" class="yj-li">
                <div class="town-name">{{ item[0] }}</div>
                <div class="town-list">
                  <div class="item">
                    <div class="progress">
                      <div class="progress-bar sl-bgc" :style="{width: `${(item[1]/chartsData['安全风险源'][0][1]).toFixed(2)*100}%`}" />
                    </div>
                    <div class="num">{{ item[1] }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-show="activeTab==='类别统计'" class="swiper-slide">
          <div id="my-echarts2" class="my-echarts" />
        </div>
        <div class="pagenation">
          <img src="../../../assets/images/联合 11.png" class="btn-pre" :class="activeTab==='区域统计' ? 'btn-active' : ''" @click="activeTab='区域统计'">
          <div class="page">
            <div class="page-customs" :class="activeTab==='区域统计' ? 'active' : ''" @click="activeTab='区域统计'">1</div>
            <div class="page-customs" :class="activeTab==='类别统计' ? 'active' : ''" @click="activeTab='类别统计'">2</div>
          </div>
          <img src="../../../assets/images/联合 10.png" class="btn-next" :class="activeTab==='类别统计' ? 'btn-active' : ''" @click="activeTab='类别统计'">
        </div>
      </div>
    </div>
    <!-- 安全风险源总览 end -->
    <!-- <div class="lb-wrapper">
      <div class="title">
        总览资源列表
        <el-input
          v-model="zlzyInput"
          class="search"
          placeholder="资源检索"
          suffix-icon="el-icon-search"
          @keyup.enter.native="handleSearch"
          @click.native="handleSearch"
        />
      </div>
      <img style="width: 100%;" src="@/common/images/边.png" alt="">
      <div class="ul-head">
        <div class="item item-1">序号</div>
        <div class="item item-1">区域</div>
        <div class="item item-3">名称</div>
      </div>
      <ul>
        <li v-for="(item, index) in allListData" :key="index" class="list-item" @click="handleListClick(item)">
          <div class="item number">{{ index+1 }}</div>
          <div class="item item-1">{{ item.street }}</div>
          <div class="item item-3">{{ item.name }}</div>
        </li>
      </ul>
    </div> -->
    
    <div class="lb-wrapper" style="padding-top:4vh">
      <div class="title">
        指挥车0/7台
      </div>
      <img style="width: 100%;" src="@/common/images/边.png" alt="">
      <div class="imgLine">
        <img class="location" v-show="zhclocation==1" src="@/common/images/定位选中.png" alt="" @click="zhclocation = 0">
        <img class="location" v-show="zhclocation==0" src="@/common/images/定位未选中.png" alt="" @click="zhclocation = 1">
        <img class="detail" v-show="zhcdetail==0" src="@/common/images/详情未选中.png" alt=""@click="zhcdetail = 1">
        <img class="detail" v-show="zhcdetail==1" src="@/common/images/详情选中.png" alt=""@click="zhcdetail = 0">
      </div>
      <div class="ul-head">
        <div class="item item-1">名称</div>
        <div class="item item-3">区域</div>
        <div class="item item-1">是否在线</div>
      </div>
      <ul style="height:25vh">
        <li v-for="(item, index) in zhcList.RECORDS" 
        :key="index" 
        class="list-item" 
        :class="{active : zhc == index}"
        @click="zhc =index">
          <div class="item item-3">{{ item.name }}</div>
          <div class="item item-1">{{ item.street }}</div>

          <div class="item item-1">否</div>
        </li>
      </ul>
    </div>
    <div class="lb-wrapper">
      <div class="title">
        单兵设备0/8台
      </div>
      <img style="width: 100%;" src="@/common/images/边.png" alt="">
      <div class="imgLine">
        <img class="location" v-show="dbsblocation==1" src="@/common/images/定位选中.png" alt="" @click="dbsblocation = 0">
        <img class="location" v-show="dbsblocation==0" src="@/common/images/定位未选中.png" alt="" @click="dbsblocation = 1">
        <img class="detail" v-show="dbsbdetail==0" src="@/common/images/详情未选中.png" alt=""@click="dbsbdetail = 1">
        <img class="detail" v-show="dbsbdetail==1" src="@/common/images/详情选中.png" alt=""@click="dbsbdetail = 0">
      </div>
      <div class="ul-head">
        <div class="item item-1">名称</div>
        <div class="item item-3">区域</div>
        <div class="item item-1">是否在线</div>
      </div>
      <ul style="height:25vh">
        <li v-for="(item, index) in dbsbList.RECORDS" 
        :key="index" 
        class="list-item" 
        :class="{active : temp == index}"
        @click="temp = index">
          <div class="item item-3">{{ item.name }}</div>
          <div class="item item-1">{{ item.street }}</div>
          <div class="item item-1">否</div>
        </li>
      </ul>
    </div>


  </div>
</template>
<script>
import axios from 'axios'
import MAP_URL from '@/utils/map/map-url'
import { getResources } from '@/api/lqfb'
import dbsbList from './d_dbsb_jbxx.json'
import zhcList from './d_zhc_jbxx.json'

export default {
  data() {
    return {
      activeTab: '乡镇区域',
      townList: ['芳庄乡', '北麂乡', '塘下镇', '陶山镇', '桐浦镇', '湖岭镇', '林川镇', '高楼镇', '马屿镇', '曹村镇', '平阳坑镇',
        '安阳街道', '玉海街道', '锦湖街道', '潘岱街道', '东山街道', '上望街道', '莘塍街道', '汀田街道', '飞云街道', '云周街道', '仙降街道', '南滨街道'],
      listData: {},
      chartsData: { 林区: [], 应急资源: [], 安全风险源: [] },
      allListData: [],
      dbsbList,
      zhcList,
      zlzyInput: '',
      temp:null,
      zhc:null,
      dbsblocation:1,
      dbsbdetail:1,
      zhclocation:1,
      zhcdetail:1,
      fireShow:false,
      fire:null
    }
  },
  computed: {
    zlOffsetRight() {
      return this.$store.getters.zlOffsetRight
    },
    lqfbActiveMenu() {
      return this.$store.getters.lqfbActiveMenu
    },
    checkedLeafNodes() {
      return this.$store.getters.checkedLeafNodes
    },
    zlActiveTab() {
      return this.$store.getters.zlActiveTab
    }
  },
  watch: {
    lqfbActiveMenu(val) {
      this.activeTab = (this.lqfbActiveMenu === '基础要素' || this.lqfbActiveMenu === '林区')
        ? '乡镇区域'
        : '区域统计'
    },
    checkedLeafNodes(val) {
      this.handleLeafChange(val)
    },
    zlActiveTab(val) {
      if (val === null) {
        this.handleLeafChange(this.checkedLeafNodes)
        return
      }
      // getResources({ resources: val, searchStr: this.zlzyInput }).then(res => {
      //   this.allListData = res.data
      // })
    }
  },
  mounted() {
    const that = this;
    this.getAllFeatures()
    this.initZLLB() // 初始化总览列表
    this.activeTab = this.lqfbActiveMenu === '基础要素' ? '乡镇区域' : '区域统计'
    // console.log(this.dbsbList.RECORDS);


 },
  methods: {
    select_li(index){
      this.temp = index;
    },
    close() {
      this.$store.dispatch('lqfb/changezlOffsetRight', this.zlOffsetRight === 0 ? -25 : 0)
    },
    getAllFeatures() {
      // 林区数据
      // getResources({ resources: `森林公园` }).then(res => {
      //   if (res.code === 20000) this.listData['森林公园'] = res.data
      //   return getResources({ resources: `国有林场` })
      // }).then(res => {
      //   if (res.code === 20000) this.listData['国有林场'] = res.data
      //   return getResources({ resources: `湿地` })
      // }).then(res => {
      //   if (res.code === 20000) this.listData['湿地'] = res.data

      //   this.initLQCharts()
      //   const resources = `危化类,机械类,矿山类,防汛类,综合类,减灾救灾类,地震地质类,综合救援队伍,骨干救援队伍,专业救援队伍,志愿者救援队伍,应急避难场所,市县物资储备库,部门物资储备点,供应网点,运输企业,冲锋舟,橡皮艇,挖掘机,推土机,发电机组,水泵,吊车,抛绳器,大型照明设备,无人机,切割机,运输车,救护场所,救护车辆,医疗救护设备,血站,疾控中心,急救指挥中心,卫生监督机构,消防站`
      //   return getResources({ resources })
      // }).then(res => {
      //   // 应急资源数据
      //   if (res.code === 20000) this.listData['应急资源'] = res.data
      //   this.initYJZYCharts()
      //   const resources = `水库,山塘,海塘,堤防,泵站,水闸,农村饮用水,水电站,桥梁,隧道,涵洞,港口码头,水路运输单位,市域轨道站点,火车站,两客一危企业,道路隐患点,生产企业,使用企业,仓储经营,带仓储经营,加油站,旅游景点,农家乐,民宿,重点餐饮,烟花爆竹经营单位,消防安全单位,民爆物品企业,易制毒化学品企业`
      //   return getResources({ resources })
      // }).then(res => {
      //   // 安全风险源数据
      //   if (res.code === 20000) this.listData['安全风险源'] = res.data
      //   this.initAQFXYCharts()
      // })
    },
    initLQCharts() {
      this.townList.forEach(item => {
        let num1 = 0; let num2 = 0; let num3 = 0
        this.listData['国有林场'].forEach(data => {
          if (item === data.street) num1++
        })
        this.listData['森林公园'].forEach(data => {
          if (item === data.street) num2++
        })
        this.listData['湿地'].forEach(data => {
          if (item === data.street) num3++
        })
        const arr = [item, num1, num2, num3, num1 + num2 + num3]
        this.chartsData['林区'].push(arr)
      })
      this.chartsData['林区'] = this.chartsData['林区'].sort((a, b) => b[4] - a[4])
      const pieData = { townNames: [], seriesData: [] }
      this.chartsData['林区'].filter(v => v[4] > 0).forEach(item => {
        pieData.townNames.push(item[0])
        pieData.seriesData.push({ name: item[0], value: item[4] })
      })
      const chart = this.$echarts.init(document.getElementById('my-echarts'))
      const option = {
        color: ['rgb(47, 219, 59)', 'rgb(62, 171, 255)', 'rgb(177, 71, 246)', 'rgb(0, 238, 190)',
          'rgb(63, 99, 255)', 'rgb(254, 43, 27)', 'rgb(32, 209, 251)', 'rgb(250, 140, 243)',
          'rgb(253, 192, 3)', 'rgb(195, 251, 119)', 'rgb(115, 62, 249)', 'rgb(253, 95, 35)'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          bottom: 10,
          icon: 'circle',
          left: 'center',
          data: pieData.townNames,
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
            name: '林区数量',
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
            data: pieData.seriesData
          }
        ]
      }
      chart.setOption(option)
    },
    initYJZYCharts() {
      this.townList.forEach(item => {
        let num1 = 0
        this.listData['应急资源'].forEach(data => {
          if (item === data.street) num1++
        })
        const arr = [item, num1]
        this.chartsData['应急资源'].push(arr)
      })
      this.chartsData['应急资源'] = this.chartsData['应急资源'].sort((a, b) => b[1] - a[1])

      const pieData = { townNames: [], seriesData: [] }
      let num = 0
      this.chartsData['应急资源'].filter(v => v[1] > 0).forEach(item => {
        if (num < 12) {
          pieData.townNames.push(item[0])
          pieData.seriesData.push({ name: item[0], value: item[1] })
          num++
        }
      })
      // 渲染饼图
      const chart1 = this.$echarts.init(document.getElementById('my-echarts1'))
      const option1 = {
        color: ['rgb(47, 219, 59)', 'rgb(62, 171, 255)', 'rgb(177, 71, 246)', 'rgb(0, 238, 190)',
          'rgb(63, 99, 255)', 'rgb(254, 43, 27)', 'rgb(32, 209, 251)', 'rgb(250, 140, 243)',
          'rgb(253, 192, 3)', 'rgb(195, 251, 119)', 'rgb(115, 62, 249)', 'rgb(253, 95, 35)'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          icon: 'circle',
          bottom: 10,
          left: 'center',
          data: pieData.townNames,
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
            name: '应急资源数量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '35%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'outside'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '14',
                fontWeight: 'bold'
              },
              labelLine: {

              }
            },
            data: pieData.seriesData
          }
        ]
      }
      chart1.setOption(option1)
    },
    initAQFXYCharts() {
      this.townList.forEach(item => {
        let num1 = 0
        this.listData['安全风险源'].forEach(data => {
          if (item === data.street) num1++
        })
        const arr = [item, num1]
        this.chartsData['安全风险源'].push(arr)
      })
      this.chartsData['安全风险源'] = this.chartsData['安全风险源'].sort((a, b) => b[1] - a[1])

      let num = 0
      const pieData = { townNames: [], seriesData: [] }
      this.chartsData['安全风险源'].filter(v => v[1] > 0).forEach(item => {
        if (num < 12) {
          pieData.townNames.push(item[0])
          pieData.seriesData.push({ name: item[0], value: item[1] })
          num++
        }
      })
      //   // 渲染饼图
      const chart2 = this.$echarts.init(document.getElementById('my-echarts2'))
      const option2 = {
        color: ['rgb(47, 219, 59)', 'rgb(62, 171, 255)', 'rgb(177, 71, 246)', 'rgb(0, 238, 190)',
          'rgb(63, 99, 255)', 'rgb(254, 43, 27)', 'rgb(32, 209, 251)', 'rgb(250, 140, 243)',
          'rgb(253, 192, 3)', 'rgb(195, 251, 119)', 'rgb(115, 62, 249)', 'rgb(253, 95, 35)'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          icon: 'circle',
          bottom: 10,
          left: 'center',
          data: pieData.townNames,
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
            name: '安全风险源数量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '35%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'outside'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '14',
                fontWeight: 'bold'
              }
            },
            data: pieData.seriesData
          }
        ]
      }
      chart2.setOption(option2)
    },
    handleSearch() {
      let parmars = ``
      this.checkedLeafNodes.forEach(item => {
        if (item.isZLZY) {
          parmars += `,${item.label}`
        }
      })
      // if (this.zlActiveTab === null) {
      //   getResources({ resources: parmars.substring(1), searchStr: this.zlzyInput }).then(res => {
      //     this.allListData = res.data
      //   })
      // } else {
      //   getResources({ resources: this.zlActiveTab, searchStr: this.zlzyInput }).then(res => {
      //     this.allListData = res.data
      //   })
      // }
    },
    handleListClick(item) {
      const smid = item.id.slice(0, item.id.indexOf('_'))
      const layerName = item.id.slice(item.id.indexOf('_') + 1)
      this.$map.getAllFeaturesBySQL({
        url: MAP_URL.dataUrl,
        dataSourceName: MAP_URL.dataSourceName,
        layerName,
        attributeFilter: `SMID = '${smid}'`
      }).then(res => {
        if (res.length === 0) {
          this.$message.info('暂无信息！')
          return
        }
        this.$map.zoomToFeature(res[0], 18)
      })
    },
    initZLLB() {
      // getResources({ resources: `森林公园,湿地,国有林场` }).then(res => {
      //   this.allListData = res.data
      // })
    },
    handleLeafChange(val) {
      this.allListData = []
      let parmars = ``
      val.forEach(item => {
        if (item.isZLZY === true) {
          parmars += `,${item.value.label}`
        }
      })
      // getResources({ resources: parmars.substring(1), searchStr: this.zlzyInput }).then(res => {
      //   this.allListData = res.data
      // })
    }
  },
}
</script>
<style lang="scss">
  .overview-wrapper {
    position: absolute;
    z-index: 999;
    top: 0;
    right: 0;
    padding: 10px;
    width: 400px;
    height: calc(100vh - 60px);
    background-color: rgba(16, 21, 24, 1);
    // background-image: url("~@/common/images/右侧框.png");
    background-size: 100% 100%;
    transition: right 0.9s;
    overflow-y: scroll;



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
    .yjzyzl-wrapper {
      width: 100%;
      height: 49%;
      position: relative;
      top: 3vh;
      .title {
    width: 100%;
    height: 2rem;
    font-family: youshebiaotihei;
    font-size: 1.8vh;
      }
      .swiper {
        width: 100%;
        height: 90%;
        .tabs {
          margin-top: 12px;
          width: 100%;
          height: 28px;
          .tab-1,.tab-2 {
            width: 50%;
            text-align: center;
            line-height: 28px;
            float: left;
            background-color: rgb(9, 46, 79);
            color: rgba(9, 140, 168, 1);
            cursor: pointer;
          }
          .active {
            background: url(../../../assets/images/蓝色选中框.png) no-repeat;
            background-size: contain;
            color:rgba(10, 204, 233, 1);
          }
        }
        .swiper-slide {
          height: 300px;
          width: 100%;
          .charts {
            width: 100%;
            height: 250px;
            overflow-y: scroll;
            ul {
              list-style: none;
              padding-left: 0;
              li {
                height: 100px;
                width: 100%;
                display: flex;
                align-items: center;
                .town-name {
                  width: 80px;
                  height: 100%;
                  line-height: 100px;
                  text-align: center;
                  flex: 3;
                }
                .town-list {
                  flex: 7;
                  height: 100%;
                  .item {
                    width: 100%;
                    height: 28px;
                    margin-top: 3.3px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .progress {
                      flex: 7;
                      .progress-bar {
                        width: 0%;
                        height: 12px;
                        border-radius: 7px;
                      }
                    }
                    .num {
                      flex: 3;
                      height: 20px;
                      text-align: center;
                      line-height: 20px;
                      margin-right: 40px;
                    }
                  }
                }
              }
              .yj-li {
                height: 30px;
                width: 100%;
                display: flex;
                align-items: center;
                .town-name {
                  width: 80px;
                  height: 30px;
                  line-height: 30px;
                  text-align: center;
                  flex: 3;
                }
                .town-list {
                  flex: 7;
                  height: 30px;
                  display: flex;
                  align-items: center;
                  .item {
                    margin-bottom: 3px;
                    width: 100%;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .progress {
                      height: 30px;
                      margin-top: 15px;
                      flex: 7;
                      .progress-bar {
                        width: 0%;
                        height: 12px;
                        border-radius: 7px;
                      }
                    }
                    .num {
                      flex: 3;
                      height: 20px;
                      text-align: center;
                      line-height: 20px;
                      margin-right: 40px;
                    }
                  }
                }
              }
            }
          }
          .my-echarts {
            width: 380px;
            height: 300px;
          }
          /*滚动条样式*/
          .charts::-webkit-scrollbar {
              width: 4px;
              height: 4px;
          }
          .charts::-webkit-scrollbar-thumb {
              border-radius: 10px;
              background: rgba(255,255,255,0.8);
              width: 4px;
              height: 30px;
          }
          .charts::-webkit-scrollbar-track {
              border-radius: 0;
              background: rgba(255,255,255,0.2);
          }
          .legend {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            .legend-sl,.legend-lc,.legend-sd {
              display: flex;
              height: 50px;
              align-items: center;
            }
            .legend-img {
              width: 40px;
              height: 20px;
              margin-right: 10px;
            }
          }
          .sl-bgc { background-image: linear-gradient(to right, rgba(27, 105, 158, 1) , rgba(9, 217, 236, 1), rgba(6, 232, 247, 1));}
          .lc-bgc { background-image: linear-gradient(to right, rgba(210, 119, 16, 1) , rgba(245, 215, 19, 1), rgba(242, 232, 92, 1));}
          .sd-bgc { background-image: linear-gradient(to right, rgba(52, 158, 27, 1) , rgba(65, 251, 21, 1), rgba(80, 246, 180, 1));}
        }
        .pagenation {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .btn-pre,.btn-next {
            opacity: 1;
            cursor: pointer;
          }
          .btn-active {
            opacity: 0.6;
          }
          .page {
            height: 40px;
            width: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
            .page-customs {
              width: 23px;
              height: 23px;
              border-radius: 11.5px;
              background-color: rgba(201, 231, 228, 1);
              text-align: center;
              line-height: 23px;
              color: rgba(24, 47, 69, 1);
              margin-right: 10px;
              cursor: pointer;
            }
            .active {
              background-color: rgba(10, 204, 233, 1);
              color: #fff;
            }
          }
        }
      }
    }
    .lb-wrapper {
      width: 100%;
      height: 49%;
      // padding-bottom: 2vh;
      .titleLine{
        display: flex;
        padding-right: 1vh;
          .title {
          width: 100%;
          height: 2rem;
          font-family: youshebiaotihei;
          font-size: 1.8vh;
          // padding-top: 4vh;
          // padding-bottom: 4vh;
              .search {
                width: 180px;
                height: 22px;
                position: relative;
                .el-input__inner {
                  height: 22px;
                  border-radius: 20px;
                  outline: none;
                  padding-left: 15px;
                  background: url(../../../assets/images/搜索底框.png) no-repeat;
                  background-size: 100%;
                  border: 0;
                  color: hsla(196, 79%, 43%, 1);
                }
                .el-input__inner::-webkit-input-placeholder {color: hsla(196, 79%, 43%, 1);}
                .el-input__icon::before {
                  content: ' ';
                  width: 25px;
                  height: 22px;
                  position: absolute;
                  top: 0;
                  right: -4px;
                  margin-left: 2px;
                  cursor: pointer;
                  background: url(../../../assets/images/搜索.png) no-repeat;
                  background-size: 100%;
                }
              }
            }
          .titleInput{
            background-color: rgba(82, 254, 179, .5);
            color: #fff;
            border-radius: 5px;
          }
      }
      .imgLine{
        display: flex;
        justify-content: flex-end;
        padding-top:0.5vh;
        padding-bottom: 0.5vh;
        .detail{
          padding-right: 1vh;
          padding-left: 1.5vh;
          
        }
        .location{

        }
      }
      .list-item{
        &:hover{
          cursor: pointer;
        }
      }
      .title {
    width: 100%;
    height: 2rem;
    font-family: youshebiaotihei;
    font-size: 1.8vh;
    // padding-top: 4vh;
    // padding-bottom: 4vh;
        .search {
          width: 180px;
          height: 22px;
          position: relative;
          .el-input__inner {
            height: 22px;
            border-radius: 20px;
            outline: none;
            padding-left: 15px;
            background: url(../../../assets/images/搜索底框.png) no-repeat;
            background-size: 100%;
            border: 0;
            color: hsla(196, 79%, 43%, 1);
          }
          .el-input__inner::-webkit-input-placeholder {color: hsla(196, 79%, 43%, 1);}
          .el-input__icon::before {
            content: ' ';
            width: 25px;
            height: 22px;
            position: absolute;
            top: 0;
            right: -4px;
            margin-left: 2px;
            cursor: pointer;
            background: url(../../../assets/images/搜索.png) no-repeat;
            background-size: 100%;
          }
        }
      }
      .ul-head {
        height: 26px;
        width: 380px;
        // background-color: rgb(10, 40, 68);
        margin-top: 10px;
        display: flex;
      }
      /*滚动条样式*/
      ul::-webkit-scrollbar {
          width: 4px;
          height: 4px;
      }
      ul::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background:#118251;
          width: 8px;
          height: 30px;
      }
      ul::-webkit-scrollbar-track {
          border-radius: 0;
          background:#103E29;
      }
      ul {
        list-style: none;
        padding-left: 0;
        height: 340px;
        overflow-x: hidden; overflow-y: auto;
        li {
          display: flex;
          align-items: center;
          position: relative;
          width: 380px;
          height: 30px;
          margin-bottom: 12px;
          font-family: PingFang SC;
          font-size: 16px;
          // background: url(../../../assets/images/框.png) no-repeat;
          background-size: 100% 100%;
          &.active {
            background: #103E29;
            border: 1px solid #0F7247;
            color: #52FEB3;
          }
          .number {
            width: 30px;
            margin-left: 8px;
            height: 30px;
            border-radius: 15px;
            text-align: center;
            line-height: 30px;
            color: rgba(0, 240, 242, 1);
            font-weight: bolder;
            font-size: 18px;
            margin-right: 40px;
          }
        }
      }
      .item {
        text-align: center;
        line-height: 26px;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-1 {
        flex: 1;
      }
      .item-3 {
        flex: 1
      }
    }



  }
/*滚动条样式*/
.overview-wrapper::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}
.overview-wrapper::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #103E29;
    width: 4px;
    height: 30px;
}
.overview-wrapper::-webkit-scrollbar-track {
    border-radius: 0;
    background: #000;
}
</style>
