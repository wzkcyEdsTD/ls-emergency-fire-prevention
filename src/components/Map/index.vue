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

           <a href="javascript:;" v-show="detailShow" class="pop-info-detail" :style="{'padding-left':'4vh'}" @click="zbfx">周边分析 >></a>
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
import getkey from'@/api/lqfb.js'
import app from '@/store/modules/app'
import axios from 'axios'


export default {
  name: 'MapBox',
  components: {
        getkey,
    LayerSwitch,
    ToolBar,
    PickFirePoint,
    Yzhxdj
  },
  data() {
    return {
      map: null,
      isShowPickFirePoint: false,
      detailShow:false,
      tempData:null,
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
   const that = this;
   await this.initMap()
   this.$bus.$on("fireDetail",(value)=>{
      console.log(111)
     that.$nextTick(()=>{
       that.detailShow = true;
     })
      this.tempData = value;
   })
   this.$bus.$on("noFireDetail",()=>{
     console.log(1211)
     that.$nextTick(()=>{
       that.detailShow = false;
     })

   })
  },
  beforeDestroy(){
    this.$bus.$off('fireDetail')
    this.$bus.$off('noFireDetail')
    this.detailShow = false;
  },
  methods: {
    zbfx(){
      this.$bus.$emit("fireShow",this.tempData);
    },
    getOffsetRight() {
      if (this.zlOffsetRight === 0 || this.zhfxOffsetRight === 0 || this.infoPanelOffsetRight === 0 ||
      this.yadqOffsetRight === 0 || this.yzhxdjOffsetRight === 0 || this.rydwPannelOffsetRight === 0 ||
      this.videoListOffsetRight === 0) {
        return 27
      }
      return 2
    },
    testPost(){

    },
    initMap() {
      this.map = this.$map.createMap('map-container')
      const url = `http://10.53.136.100/map/tile?z={z}&x={x}&y={y}&layer=w331100:Base_20201101`
      

      const request_time =  new Date().getTime();
      /*
      appkey：ece37a6f2fad49fb839f997f984b04c0 (应用kye)
      
      应用认证：b529677eda5447dbb3bb7d32820115fb
      */
    //MD5 (应用KEY+秘钥（应用认证秘钥/刷新秘钥/请求秘钥）+long类型请求时间)
      
      const appkey = "ece37a6f2fad49fb839f997f984b04c0"
      const yyrz = "b529677eda5447dbb3bb7d32820115fb"
      
      const refreshSecret = "452948a7f73a45028fff6c59b56ad6a7"
      // const key = request_time + appkey + yyrz

      const key = appkey + refreshSecret + request_time
      ////请求秘钥 requestSecret d14190de74de41988a7e9ea8b49669db
      //刷新密钥 refreshSecret cf07c54de370408194bcff7bd6d92697

    

      console.log("sign",md5(key))
      console.log("time",request_time)
      

      const wenzhouLayer = this.$map.createTianDiTuLayer(
        "img_w",
      )
        // const wenzhouLayer = new createTileSuperMapRestLayer(url);
        // const wenzhouLayer = new ol.layer.Tile({
        //   source: new ol.source.XYZ({
        //     // crossOrigin: 'anonymous',
        //     url: url,
        //     wrapX: false,
        //     crossOrigin: "Anonymous"
        //   }),
        //   className:"img_w"
        // })


      // const layer = this.$map.createTileSuperMapRestLayer('')
      // const layer = new ol.layer.Tile({
      //     source: new ol.source.XYZ({
      //       // crossOrigin: 'anonymous',
      //       url: `http://10.53.136.100/map/tile?z={z}&x={x}&y={y}&layer=w331100:Base_20201101`,
      //       wrapX: false,
      //       crossOrigin: "Anonymous"
      //     }),
      // })
      // console.log(1111)
      // this.map.addLayer(layer)
      // const mask = this.$map.createMaskByGeoJson(ruianGeoJson)
      // // wenzhouLayer.addFilter(mask)

      this.$store.dispatch('map/changeBaseLayer', wenzhouLayer)

      const zjLayer = this.$map.createTianDiTuLayer(
        "cia_w",
      )

      // // zjLayer.addFilter(mask)
      this.$store.dispatch('map/changeZjLayer', zjLayer)

      // //行政区划
      const baseUrl = `http://10.53.137.59:8090/iserver/services/map-lishui_region/rest/maps/`
      const district = `${baseUrl}district`
      const village = `${baseUrl}village`
      const street = `${baseUrl}street`
      const grid = `${baseUrl}grid`
      const districtLayer = this.$map.createTileSuperMapRestLayer(district,{className:"districtLayer"})
      const villageLayer = this.$map.createTileSuperMapRestLayer(village,{className:"villageLayer"})
      const streetLayer = this.$map.createTileSuperMapRestLayer(street,{className:"streetLayer"})
      const gridLayer = this.$map.createTileSuperMapRestLayer(grid,{className:"gridLayer"})

      // districtLayer.setVisible(false)
      villageLayer.setVisible(false)
      streetLayer.setVisible(false)
      gridLayer.setVisible(false)

      this.map.addLayer(districtLayer);
      this.map.addLayer(villageLayer);
      this.map.addLayer(streetLayer);
      this.map.addLayer(gridLayer);
 
      // getkey();
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
