<template>
  <div class="my-map-canvas">
    <div id="map-container" class="map-container" />
    <div id="mouse-position" />
    <!-- 属性信息弹框 -->
    <div id="popup-info" class="ol-popup">
      <div class="popup-header">
        <div class="popup-title">详情</div>
        <i id="popup-info-closer" class="el-icon-close" />
      </div>
      <div id="popup-info-content" class="popup-content">
        <div class="pop-item">
          <div id="key-name" class="pop-key" />
          <div id="key-value" class="pop-value" />
        </div>
        <div v-show="isShowDetail" id="pop-info-deatil" class="pop-item">
          <a href="javascript:;" class="pop-info-detail" @click="collapse">信息详情 >></a>
        </div>
      </div>
    </div>
    <layer-switch />
    <div class="toobar" :style="{right: `${getOffsetRight()}rem`}">
      <tool-bar ref="tool-bar" />
      <pick-fire-point v-show="isShowPickFirePoint" />
    </div>
    <!-- <yzhxdj /> -->
  </div>
</template>

<script>
import MAP_URL from '@/utils/map/map-url'
import ruianGeoJson from './ruian.json'
import LayerSwitch from './LayerSwitch'
import ToolBar from './ToolBar'
import PickFirePoint from './PickFirePoint'
import Yzhxdj from './Yzhxdj'

export default {
  name: 'MapBox',
  components: {
    LayerSwitch,
    ToolBar,
    PickFirePoint,
    Yzhxdj
  },
  data() {
    return {
      map: null,
      isShowPickFirePoint: false
    }
  },
  computed: {
    isShowDetail() {
      return this.$store.state.map.isShowDeatil
    },

    zlOffsetRight() {
      return this.$store.getters.zlOffsetRight
    },
    zhfxOffsetRight() {
      return this.$store.getters.zhfxOffsetRight
    },
    infoPanelOffsetRight() {
      return this.$store.getters.infoPanelOffsetRight
    },
    yadqOffsetRight() {
      return this.$store.getters.yadqOffsetRight
    },
    yzhxdjOffsetRight() {
      return this.$store.getters.yzhxdjOffsetRight
    },
    rydwPannelOffsetRight() {
      return this.$store.getters.rydwPannelOffsetRight
    },
    videoListOffsetRight() {
      return this.$store.getters.videoListOffsetRight
    }
  },
 async mounted() {
   await this.initMap()
  },
  methods: {
    getOffsetRight() {
      if (this.zlOffsetRight === 0 || this.zhfxOffsetRight === 0 || this.infoPanelOffsetRight === 0 ||
      this.yadqOffsetRight === 0 || this.yzhxdjOffsetRight === 0 || this.rydwPannelOffsetRight === 0 ||
      this.videoListOffsetRight === 0) {
        return 27
      }
      return 2
    },

    initMap() {
      this.map = this.$map.createMap('map-container')

      
      const token = "2e6919cbe2122200fa172aaea99742e0";

      const wenzhouLayer = this.$map.createTianDiTuLayer(
        "img_w",
      )

      const mask = this.$map.createMaskByGeoJson(ruianGeoJson)
      // wenzhouLayer.addFilter(mask)
      this.$store.dispatch('map/changeBaseLayer', wenzhouLayer)

      const zjLayer = this.$map.createTianDiTuLayer(
        "cia_w",
      )

      // zjLayer.addFilter(mask)
      this.$store.dispatch('map/changeZjLayer', zjLayer)
      // window.map = this.map;
    },
    collapse() {
      this.$store.dispatch('lqfb/changeInfoPanelOffsetRight', this.infoPanelOffsetRight === 0 ? -25 : 0)
    }
  }
}
</script>

<style lang="scss">
.map-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}

#popup-info{
  display: none;
}

#mouse-position {
  position: absolute;
  bottom: 70px;
  left: 340px;
  font-size: 16px;
  line-height: 28px;
  background: rgba(0,0,0,.4);
  color: #fff;
  padding: 0px 10px;
}

.ol-popup {
  width: 280px;
  /* height: 150px; */
  background-color: rgba(1, 51, 78, 0.8);
  position: absolute;
  left: -140px;
  bottom: 22px;
  .popup-header {
    width: 100%;
    height: 41px;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .popup-title {
      color: rgba(41, 181, 232, 1);
      font-size: 20px;
      margin-left: 10px;
      position: relative;
    }
    .el-icon-close {
      width: 17px;
      height: 17px;
      margin-right: 11px;
      cursor: pointer;
    }
  }
  .popup-content {
    padding: 5px 20px 6px 20px;
    .pop-item {
      margin-top: 18px;
      margin-bottom: 18px;
      font-size: 16px;
      .pop-key,
      .pop-value {
        display: inline-block;
      }
    }
  }
  .popup-lssg-footer {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: right;
    margin-top: -10px;
    padding-right: 50px;
    padding-bottom: 50px;
    .pop-info-detail {
      cursor: pointer;
    }
  }
}
.ol-popup::before {
  position: absolute;
  top: 100%;
  left: calc(50% -10px);
  border-top: 20px solid transparent;
  content: " ";
  width: 0px;
  height: 0px;
  border-right: 10px solid transparent;
  border-top: 10px solid rgba(1, 51, 78, 0.8);
  border-left: 10px solid transparent;
}

.toobar {
  position: absolute;
  // right: 430px;
  /* height: 80px; */
  top: 4vh;
  z-index: 999;
  transition: right 0.9s;
}

.ol-scale-bar {
  position: fixed!important;
  bottom: 20px!important;
  left: 340px!important;
}
</style>
