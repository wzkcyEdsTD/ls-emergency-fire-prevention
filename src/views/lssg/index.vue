<template>
  <div class="lssg-container">
    <sider-bar />
    <sghz-mode-bar v-show="reportType === '事故绘制'" :style="`right: ${zlOffsetRight + 30}rem`" />
    <div class="right-pannel" :style="`right: ${zlOffsetRight}rem`">
      <div class="close" @click="close" />
      <!-- 历史事故总览 start -->
      <overview v-show="lssgActiveType === '历史事故总览'" />
      <!-- 历史事故总览 end -->
      <!-- 历史事故查询start -->
      <lssgcx v-show="lssgActiveType === '历史事故查询'" ref="lssgcx" />
      <!-- 历史事故查询end -->
    </div>
    <!-- 事故绘制start -->
    <!-- <sghz-mode-bar /> -->
    <!-- 事故绘制end -->
    <!-- 信息录入start -->
    <div class="xxlr">
      <xxlr-box />
    </div>
    <!-- 信息录入end -->
    <!-- 事故记录start -->
    <div v-show="reportType === '报告录入' || reportType === '报告修改'" class="sgjl-panel">
      <report-entry-view ref="report" :list="reportList" :geo-json="geo_json" @close="onReportClose" />
    </div>
    <!-- 事故记录end -->
    <!-- 属性信息弹框 -->
    <div id="popup-lssg" class="ol-popup">
      <div class="popup-header">
        <div class="popup-title">详情</div>
        <i id="popup-lssg-closer" class="el-icon-close" />
      </div>
      <div id="popup-lssg-content" class="popup-content" />
      <!-- <div class="popup-lssg-footer">
        <div class="pop-info-detail" @click="detail"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import SiderBar from './components/SiderBar'
import Overview from './components/Overview'
import Lssgcx from './components/Lssgcx'
import xxlrBox from './components/Xxlr'
import ReportEntryView from './components/bglr/ReportEntryView'
import sghzModeBar from './components/SghzModeBar'
import Overlay from 'ol/Overlay'
import attrData from '@/views/lqfb/components/attrDictionary'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Lssg',
  components: {
    SiderBar,
    xxlrBox,
    Overview,
    Lssgcx,
    ReportEntryView,
    sghzModeBar
  },
  data() {
    return {
      mode: 'map-mode',
      fwmLayer: null,
      infoPopup: null,
      reportList: [],
      lssgDetailItem: {}
    }
  },
  computed: {
    ...mapGetters({
      geo_json: 'drawGeojson'
    }),
    lssgActiveType() {
      return this.$store.getters.lssgActiveType
    },
    zlOffsetRight() {
      return this.$store.getters.zlOffsetRight
    },
    reportType() {
      return this.$store.getters.reportType
    }
  },
  beforeDestroy() {
    this.$map.getMap().un('click', this.showPopup)
    this.infoPopup.setPosition(undefined)
    this.$store.dispatch('lssg/removeLssgLayer')
  },
  mounted() {
    this.$map.goHome()
    this.$store.dispatch('siderbar/changeCheckedLeafNodes', [])
    this.$store.dispatch('lqfb/changezlOffsetRight', 0)
    this.$map.getMap().on('click', this.showPopup)
    this.initPopup()
    this.getLssgData()
  },
  methods: {
    ...mapActions({
      switchView: 'lssg/changeReportType'
    }),
    getLssgData() {
      this.$store.dispatch('lssg/getLssgLayer')
    },

    initPopup() {
      document.getElementById('popup-lssg').style.display = 'block'
      this.infoPopup = new Overlay({
        element: document.getElementById('popup-lssg'),
        stopEvent: true
      })
      this.rydwPopyp = new Overlay({
        element: document.getElementById('popup-lssg'),
        stopEvent: false
      })
      this.$map.getMap().addOverlay(this.infoPopup)

      const infoCloser = document.getElementById(`popup-lssg-closer`)
      // 显示value
      // 点击要素关闭popup
      infoCloser.onclick = () => {
        this.infoPopup.setPosition(undefined)
        infoCloser.blur()
        return false
      }
    },

    showPopup(evt) {
      this.infoPopup.setPosition(undefined)
      const feature = this.$map
        .getMap()
        .forEachFeatureAtPixel(evt.pixel, function(feature) {
          return feature
        })
      const coordinate = evt.coordinate
      if (!feature) return
      if (!feature.values_['tree']) return

      // 显示属性框
      const value = feature.values_
      this.lssgDetailItem = value
      this.detail(value)

      const content = document.getElementById('popup-lssg-content')
      let infoTmpl = ``
      for (const key in attrData['LSSG']) {
        infoTmpl += `
        <div class="pop-item">
          <div id="key-name" class="pop-key">${attrData['LSSG'][key]}：</div>
          <div id="key-value" class="pop-value">${value[key] || ''}</div>
        </div>
        `
      }
      content.innerHTML = infoTmpl
      this.infoPopup.setPosition(coordinate)
    },

    onReportClose() {
      this.switchView('')
    },

    detail(value) {
      this.$store.dispatch('lssg/changeLssgDetailItem', null)
      this.$store.dispatch('lssg/changeLssgDetailItem', value)
      this.$store.dispatch('lqfb/changezlOffsetRight', 0)
      this.$store.dispatch('lssg/changeLssgType', '历史事故查询')
    },

    close() {
      this.$store.dispatch('lqfb/changezlOffsetRight', this.zlOffsetRight === 0 ? -25 : 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.lssg {
  #popup-lssg{
    display: none;
  }
}
.lssg-container {
  .right-pannel {
    width: 400px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1003;
    background-color: rgb(16, 21, 24);
    transition: right 0.9s;
    .close {
      position: absolute;
      left: -34px;
      top: 80px;
      width: 34px;
      height: 104px;
      background: url(../../assets/images/收回底.png) no-repeat;
      background-size: contain;
      cursor: pointer;
    }
  }
  .sgjl-panel {
    position: absolute;
    width: 78vw;
    height: 76vh;
    top: 56%;
    left: 57%;
    z-index: 1004;
    transform: translate(-50%, -50%);
  }
}
</style>
