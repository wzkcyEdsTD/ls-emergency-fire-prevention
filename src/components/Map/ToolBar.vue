<template>
  <div class="toolbar-wrapper">
    <ul>
      <!-- <li :class="activeType==='累积降雨' ? 'li-active' : ''">
        <el-select v-model="rainValue" clearable placeholder="累积降雨">
          <el-option
            v-for="(item, index) in rainOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </li>
      <li :class="activeType==='预测降雨' ? 'li-active' : ''">
        <el-select v-model="rainPrValue" clearable placeholder="预测降雨">
          <div class="el-select-title">智能网格</div>
          <el-option
            v-for="(item, index) in rainPrOptions['智能网格']"
            :key="index"
            :label="item.label"
            :value="item"
          />
          <div class="split-line" />
          <div class="el-select-title">短时预报</div>
          <el-option
            v-for="item in rainPrOptions['短时预报']"
            :key="item.id"
            :label="item.label"
            :value="item"
          />
        </el-select>
      </li> -->
      <li :class="checkedWind ? 'li-active' : ''" @click="showWind">实时风场</li>
      <!-- <li :class="showFire ? 'li-active' : ''" @click="clickFire">火灾报警点</li> -->
      <!-- <li :class="activeType==='预测风向' ? 'li-active' : ''">
        <el-select v-model="windPrValue" clearable placeholder="预测风向">
          <el-option
            v-for="item in windPrOptions"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </li> -->
      <!-- <li :class="checkedRadar ? 'li-active' : ''" @click="handleRadarClick">实时雷达图</li> -->
      <!-- <li class="hxdj" :class="yzhxdjOffsetRight==0 ? 'hzhzd-active' : '' " @click="changeHxdj">
        一周森林火险等级
      </li> -->
      <!-- <li class="hzhzd" :class="isHzhzd ? 'hzhzd-active' : '' " @click="changeHzhzd">
        <svg-icon v-show="!isHzhzd" icon-class="模拟火灾icon" />
        <svg-icon v-show="isHzhzd" icon-class="模拟火灾icon (1)" />
        绘制火灾点
      </li> -->
    </ul>

    <div v-show="checkedRadar" class="time-play">
      <div class="timeline_main">
        <div class="timeline_control">
          <div class="menu_play">
            <i v-show="!isPlay" class="el-icon-video-play" @click="play" />
            <i v-show="isPlay" class="el-icon-video-pause" @click="stop" />
          </div>
        </div>
        <div class="timeline_axis">
          <div v-for="(v,i) in radarLayerList" :key="i" class="axis_item">
            <div :class="activeId === v.id ? 'axis_item_tick axis_item_tick_active':'axis_item_tick'" @click="handleNodeClick(v.id)" />
            <div v-show="i%4 === 0" class="axis_item_label">{{ v.time }}</div>
            <div v-show="activeId === v.id" class="axis_item_tip">{{ v.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MAP_URL from '@/utils/map/map-url'
import ruianGeoJson from './ruian.json'
import jsonp from 'jsonp'
import moment from 'moment'
import windPr1h from './预测1小时风向.json'
import axios from 'axios'
import { getForRain_3H } from '@/api/lqfb'
import { log } from 'video.js'
export default {
  data() {
    const mask = this.$map.createMaskByGeoJson(ruianGeoJson)
    return {
      isHzhzd: false, // 是否显示绘制火灾点框
      activeType: '',
      checkedRadar: false, // 实时雷达
      checkedWind: false, // 实时风向
      radarLayer: null,
      activeId: '', // 时间轴激活id
      isPlay: false,
      radarInterval: null,
      radarLayerList: [],
      radarTimeList: [], // 雷达图时间轴
      mask: mask,
      windCurLayer: null,
      showFire:false,
      windPrOptions: [
        {
          value: '未来1小时',
          label: '未来1小时'
        },
        {
          value: '未来3小时',
          label: '未来3小时'
        },
        {
          value: '未来6小时',
          label: '未来6小时'
        }
      ],
      rainLayer: null,
      rainPrLayer: null,
      rainOptions: [
        {
          value: MAP_URL.RIAN_1_H.url,
          label: '累积1小时'
        },
        {
          value: MAP_URL.RIAN_3_H.url,
          label: '累积3小时'
        },
        {
          value: MAP_URL.RIAN_6_H.url,
          label: '累积6小时'
        }
      ],
      rainValue: '',
      rainPrOptions: {
        智能网格: [
          {
            id: 0,
            value: MAP_URL.RIAN_1_H_PR.url,
            label: '未来1小时',
            type: '智能网格'
          },
          {
            id: 1,
            value: MAP_URL.RIAN_3_H_PR.url,
            label: '未来3小时',
            type: '智能网格'
          },
          {
            id: 2,
            value: MAP_URL.RIAN_6_H_PR.url,
            label: '未来6小时',
            type: '智能网格'
          }
        ],
        短时预报: [
          {
            id: 3,
            value: MAP_URL.RIAN_SHORT_3_H_PR.url,
            label: '未来3小时',
            type: '短时预报'
          }
        ]
      },
      rainPrValue: '',
      windPrValue: '',
      oe:null,
    }
  },
  computed: {
    clearFlag() {
      return this.$store.getters.clearFlag
    },
    yzhxdjOffsetRight() {
      return this.$store.getters.yzhxdjOffsetRight
    }
  },
  watch: {
    checkedRadar(val) {
      if (val) {
        this.addRadar()
      } else {
        this.removeRader()
      }
    },
    checkedWind(val) {
      if (val) {
        this.addWindCur()
      } else {
        this.removeWindCur()
      }
    },
    clearFlag() {
      this.clearAllLayers()
    },
    rainValue(val) {
      this.handleRainChange(val)
    },
    rainPrValue(val) {
      this.handleRainPrChange(val)
    },
    windPrValue(val) {
      this.handleWindPrChange(val)
    }
  },
  methods: {
    handleRainChange(val) {
      this.$map.removeLayer(this.rainLayer)
      if (!val) return
      this.rainLayer = this.$map.createTileSuperMapRestLayer(val, true)
      // this.rainLayer.addFilter(this.mask)
      this.$map.addLayer(this.rainLayer)
    },

    clickFire(){
      this.showFire=!this.showFire;
      this.$bus.$emit('hzjbd',this.showFire);
    },

    async handleRainPrChange(val) {
      this.$map.removeLayer(this.rainPrLayer)
      if (val.type === '短时预报') {
        const url = await getForRain_3H()
        if (!url) return
        this.rainPrLayer = this.$map.createTileSuperMapRestLayer(url.match(/.*RainFall/)[0], false)
      } else if (val.type === '智能网格') this.rainPrLayer = this.$map.createTileSuperMapRestLayer(val.value, true)
      else return
      // this.rainPrLayer.addFilter(this.mask)
      this.$map.addLayer(this.rainPrLayer)
    },
    
    showWind(){
      const that = this;
      if (!that.checkedWind) {
        that.$map.getMap().getView().setCenter([119.923238,28.467972])
        that.$map.getMap().getView().setZoom(5)
      }
      that.$nextTick(()=>{
        that.checkedWind = !that.checkedWind
      })

    },
      

    handleWindPrChange(val) {
      this.$map.removeWindLayer()
      if (!val) return
      this.$map.getWindLayer(require('@/components/Map/预测1小时风向.json'))
    },

    addRadar() {
      const that = this
      // eslint-disable-next-line
      jsonp('https://api.caiyunapp.com/v1/radar/fine_images?lon=120.63&lat=27.78&level=1&token=Y2FpeXVuIGFuZHJpb2QgYXBp', (err, res) => {
        this.radarLayerList = res.images.map((v, i) => {
          const extent = v[2]
          const time = moment.unix(v[1]).format('HH:mm')
          return {
            id: i,
            time,
            layer: that.$map.createStaticImageLayer(v[0], [extent[1], extent[0], extent[3], extent[2]])
          }
        })
        this.activeId = this.radarLayerList[0].id
        this.radarLayer = this.radarLayerList[0].layer
        this.$map.addLayer(this.radarLayer)
      })
    },

    removeRader() {
      this.$map.removeLayer(this.radarLayer)
      this.radarLayer = null
    },

    addWindCur() {
      const url = `https://datacenter.istrongcloud.com`
      const that = this;
      axios.get(`${url}/data/gfs/fcdata/202101/25/08/132.json?v=1611565356612`).then(res => {
         const temp = res.data["2021013020"]
         console.log(temp)

         that.oe = that.$map.wind(temp);
        console.log(that.oe);

      })

      // this.$map.removeWindLayer()
      // this.$map.getWindLayer(require('@/components/Map/实时风向.json'))
    },
    removeWindCur() {
      const that = this;
      if (that.oe) {
        this.$map.removeWindLayer(that.oe);
      }

      that.oe = null;
    },

    addWindPr(json) {
      this.$map.removeWindLayer()
      this.$map.getWindLayer(require('@/components/Map/预测1小时风向.json'))
    },
    removeWindPr() {
      this.$map.removeWindLayer()
    },

    handleClick(val) {
      if (this.activeType === val) {
        this.activeType = ''
      } else {
        this.activeType = val
      }
    },

    changeHzhzd() {
      this.isHzhzd = !this.isHzhzd
      this.$parent.isShowPickFirePoint = !this.$parent.isShowPickFirePoint
    },

    changeHxdj() {
      this.$store.dispatch('lqfb/changeyzhxdjOffsetRight', this.yzhxdjOffsetRight === -30 ? 0 : -30)
    },

    clearAllLayers() {
      this.$map.removeLayer(this.radarLayer)
      this.$map.removeLayer(this.rainLayer)
      this.$map.removeLayer(this.rainPrLayer)
      this.$map.removeWindLayer()
    },

    handleNodeClick(id) {
      this.activeId = id
      this.radarLayer && this.$map.removeLayer(this.radarLayer)
      this.radarLayer = this.radarLayerList.filter(v => v.id === id)[0].layer
      this.$map.addLayer(this.radarLayer)
    },

    play() {
      this.isPlay = true
      this.radarInterval = setInterval(() => {
        this.activeId++
        if (this.activeId > 19) {
          this.activeId = 0
        }
        this.handleNodeClick(this.activeId)
      }, 1000)
    },

    stop() {
      this.isPlay = false
      clearInterval(this.radarInterval)
    },

    handleRadarClick() {
      this.checkedRadar = !this.checkedRadar
      if (!this.checkedRadar) {
        this.stop()
      }
    }
  },
  mounted(){
    const that = this;
    this.$bus.$on("fireShow",(value)=>{
      that.isHzhzd = true
      that.$parent.isShowPickFirePoint = true
    })
  },
  beforeDestroy(){
    this.$bus.$off("fireShow");
  }
}
</script>

<style lang="scss">
.toolbar-wrapper {
  ul {
    /* height: 40px; */
    list-style: none;
    display: flex;
    align-items: center;
    padding-left: 0;
    li {
      float: left;
      width: 96px;
      height: 32px;
      margin-right: 11px;
      color: rgba(47, 145, 188, 1);
      cursor: pointer;
      text-align: center;
      line-height: 32px;
      background: url(../../assets/images/实时降水底.png) no-repeat;
      background-size: contain;
    }
    .hzhzd,.hxdj{
      background: url(../../assets/images/模拟火灾选中状态.png) no-repeat;
      background-size: 100% 100%;
      font-size: 15px;
      color: #fff;
      width: 115px;
    }
    .hxdj {
      width: 144px;
    }
    .hzhzd-active {
      background: url(../../assets/images/模拟火灾未选中状态.png) no-repeat;
      background-size: 100% 100%;
      color: rgba(15, 23, 30, 1);
      font-size: 15px;
    }
  }
  .active {
    color: #fff;
  }
  .li-active {
    color: #fff;
    background: url(../../assets/images/实时降水底激活.png) no-repeat;
    background-size: contain;
  }

  .time-play{
    position: fixed;
    bottom: 10px;
    height: 56px;
    width: 850px;
    left: calc(50% - 425px);
    z-index: 102;
    padding: 0px 20px;
    background: #000;
    .timeline_main{
      padding: 15px;
      box-sizing: border-box;
      .timeline_control{
        position: absolute;
        left: 20px;
        top: calc(50% - 20px);
        overflow: hidden;
        margin-bottom: 30px;
        .menu_play{
          font-size: 34px;
        }
      }
      .timeline_axis{
        position: absolute;
        display: flex;
        justify-content: space-around;
        width: 700px;
        right: 38px;
        &::before{
          border: 1px solid rgba(68,155,246,.5);
          background: transparent;
          content: "";
          width: 100%;
          height: 10px;
          position: absolute;
          left: 0;
          bottom: 1px;
          display: inline-block;
        }
        .axis_item{
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          .axis_item_tick{
            display: inline-block;
            width: 4px;
            transition: background .3s;
            cursor: pointer;
            height: 10px;
            border-left: 1px solid rgba(68,155,246,.5);
            border-right: 1px solid rgba(68,155,246,.5);
            &.axis_item_tick_active{
              background: #00fffa;
            }
          }
          .axis_item_label{
            position: absolute;
            white-space: nowrap;
            bottom: -20px;
            color: #fff;
          }
          .axis_item_tip{
            position: absolute;
            top: -25px;
            padding: 2px 6px;
            border-radius: 2px;
            background: rgba(0,0,0,.5);
            white-space: nowrap;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
