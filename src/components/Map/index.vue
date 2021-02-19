<template>
  <div class="my-map-canvas">
    <div id="map-container" class="map-container" />
    <div id="mouse-position" />
    <!-- 属性信息弹框 -->
    <div id="popup-info" class="ol-popup" >
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
          <a href="javascript:;" class="pop-info-detail" @click="collapse"
            >信息详情 >></a
          >

          <!-- <a href="javascript:;" v-show="detailShow" class="pop-info-detail" :style="{'padding-left':'4vh'}" @click="zbfx">周边分析 >></a> -->
        </div>
      </div>
    </div>
    <!-- 火灾点属性信息弹框 -->
    <div id="popup-fire" class="fire-popup" >
      <div class="popup-header">
        <div class="popup-title">详情</div>
        <i id="popup-fire-closer" class="el-icon-close" />
      </div>
      <img src="@/common/images/边.png" class="line-img">
      <div id="popup-fire-content" class="popup-content">
        <div class="iconLine">
            <img src="@/common/images/定位icon.png" class="icon" alt="">
            <div id="key-value-fire" class="pop-value" />
        </div>
        <div class="contentLine">
          <div class="pop-item">
            <div class="pop-key" >举报人:</div>
            <div id="key-value-fire-jbr" class="pop-value" />
          </div>

          <div class="pop-item">
            <div class="pop-key" >举报电话:</div>
            <div id="key-value-fire-jbrtel" class="pop-value" />
          </div>
        </div>
        <div class="contentLine">
          <div class="pop-item">
            <div class="pop-key" >火灾强度:</div>
            <div id="key-value-fire-intensity" class="pop-value" />
          </div>

          <div class="pop-item">
            <div class="pop-key" >火灾类型:</div>
            <div id="key-value-fire-type" class="pop-value" />
          </div>
        </div>
        <div class="pop-item">
          <div class="pop-key" >时间:</div>
          <div id="key-value-fire-time" class="pop-value" />
        </div>
        <div class="flexLine">
          <div class="pop-item">
            <div class="pop-key" >内容:</div>
            <div id="key-value-fire-cont" class="pop-value" />
          </div>
        </div>

        <div v-show="isShowDetail" id="pop-fire-deatil" class="pop-item">
          <div
            class="pop-fire-detail"

            @click="zbfx"
            >周边分析</div>
        </div>
      </div>
    </div>
    <layer-switch />
    <div class="toobar" :style="{ right: `${getOffsetRight()}rem` }">
      <tool-bar ref="tool-bar" />
      <pick-fire-point v-show="isShowPickFirePoint" />
    </div>
    <!-- <yzhxdj /> -->
  </div>
</template>

<script>
import MAP_URL from "@/utils/map/map-url";
import ruianGeoJson from "./ruian.json";
import LayerSwitch from "./LayerSwitch";
import ToolBar from "./ToolBar";
import PickFirePoint from "./PickFirePoint";
import Yzhxdj from "./Yzhxdj";
import Util from "@/libs/cimAPI.js";
import app from "@/store/modules/app";
import axios from "axios";

import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import { Point } from 'ol/geom'
import {
  TileSuperMapRest,
  FeatureService,
  SuperMap
} from '@supermap/iclient-ol'

import { Circle as CircleStyle, Fill, Stroke, Style, Icon, Text } from 'ol/style'

export default {
  name: "MapBox",
  components: {
    Util,
    LayerSwitch,
    ToolBar,
    PickFirePoint,
    Yzhxdj,
  },
  data() {
    return {
      map: null,
      isShowPickFirePoint: false,
      detailShow: false,
      tempData: null,
      key: null,
      timer:undefined,
    };
  },
  computed: {
    isShowDetail() {
      return this.$store.state.map.isShowDeatil;
    },

    zlOffsetRight() {
      return this.$store.getters.zlOffsetRight;
    },
    zhfxOffsetRight() {
      return this.$store.getters.zhfxOffsetRight;
    },
    infoPanelOffsetRight() {
      return this.$store.getters.infoPanelOffsetRight;
    },
    yadqOffsetRight() {
      return this.$store.getters.yadqOffsetRight;
    },
    yzhxdjOffsetRight() {
      return this.$store.getters.yzhxdjOffsetRight;
    },
    rydwPannelOffsetRight() {
      return this.$store.getters.rydwPannelOffsetRight;
    },
    videoListOffsetRight() {
      return this.$store.getters.videoListOffsetRight;
    },
  },
  async mounted() {
    const that = this;
    await this.initMap();
    this.getData();
    // this.$bus.$on("refreshIcon",()=>{
    //   that.getData();
    // })
  },
  // beforeDestroy() {
  //   // if (that.timer) {
  //   //   clearTimeout(that.timer)
  //   // }
  //   this.$bus.$off("refreshIcon");
  // },
  methods: {
    zbfx() {
      this.$bus.$emit("fireShow", this.tempData);
      console.log(this.detailShow)
    },
    getOffsetRight() {
      if (
        this.zlOffsetRight === 0 ||
        this.zhfxOffsetRight === 0 ||
        this.infoPanelOffsetRight === 0 ||
        this.yadqOffsetRight === 0 ||
        this.yzhxdjOffsetRight === 0 ||
        this.rydwPannelOffsetRight === 0 ||
        this.videoListOffsetRight === 0
      ) {
        return 27;
      }
      return 2;
    },
    getTime(times){
      const now = new Date().getTime();
            // debugger
      const year = new Date().getFullYear()
      // console.log(year)
      const time = `${year}-${times}`
      const d = new Date(time).getTime();
      const temp = (now - d)/1000/60
      // debugger
      if (temp<120) {
        // console.log("小于半小时")
        return true
      }else{
        // console.log("大于半小时");
        return false
      }
    },

    getData() {
      const that = this;
      Util.testAxios().then(res=>{
        console.log(res.result.records)
        const list = res.result.records
        // list.forEach(element => {
        //   // debugger
        //   if (element.systemcode.indexOf('tyswxt')!= -1) {
        //     // debugger
        //     if(that.getTime(element.time)){
        //       // console.log(element.address)
        //       const add = element.address
        //       const street = `${add.split('县')[1].split('镇')[0]}镇`
        //       console.log(street)
        //       that.searchStreet(street)
        //     }
        //   }

        // });
        that.$bus.$emit('fireList',res);
        // that.timer = setTimeout(()=>{
        //   that.getData();
        // },60000)
        //一分钟获取后台数据
      })

    },

    initMap() {
      this.map = this.$map.createMap("map-container");
      
      const wenzhouLayer = this.$map.crtLayerWMTS('img_c')
      this.$store.dispatch("map/changeBaseLayer", wenzhouLayer);

      // const zjLayer = this.$map.createTianDiTuLayer("cia_w");
      const zjLayer = this.$map.crtLayerWMTS("cia_c");

      // // zjLayer.addFilter(mask)
      this.$store.dispatch("map/changeZjLayer", zjLayer);

      //行政区划
      const baseUrl = `http://10.53.137.59:8090/iserver/services/map-lishui_region/rest/maps/`;
      const district = `${baseUrl}district`;
      const village = `${baseUrl}village`;
      const street = `${baseUrl}street`;
      const grid = `${baseUrl}grid`;
      const districtLayer = this.$map.createTileSuperMapRestLayer(district, {
        className: "districtLayer",
      });
      const villageLayer = this.$map.createTileSuperMapRestLayer(village, {
        className: "villageLayer",
      });
      const streetLayer = this.$map.createTileSuperMapRestLayer(street, {
        className: "streetLayer",
      });
      const gridLayer = this.$map.createTileSuperMapRestLayer(grid, {
        className: "gridLayer",
      });

      // districtLayer.setVisible(false)
      villageLayer.setVisible(false);
      streetLayer.setVisible(false);
      gridLayer.setVisible(false);

      this.map.addLayer(districtLayer);
      this.map.addLayer(villageLayer);
      this.map.addLayer(streetLayer);
      this.map.addLayer(gridLayer);

      // getkey();
      // window.map = this.map;
    },

    searchStreet(SZZ){
      let attributeFilter;
      if (SZZ) {
        attributeFilter = `SZZ='${SZZ}'`
      }else{
        attributeFilter = ''
      }
      // debugger
      var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
        toIndex: 999999,
        queryParameter: {
          // name: layerName,
          attributeFilter: attributeFilter,
          // attributeFilter: " ",
          maxFeatures: 99999999
        },
        datasetNames: [`lishui_forestfire:d_region_street`]
      })
      const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire/rest/data";

      new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
        const testList = serviceResult.result.features;
        const features = new GeoJSON().readFeatures(testList)
        features.map(f => {
          f.setStyle(new Style({
            // stroke: new Stroke({
            //   color: 'rgba(249,219,49, 0.8)',
            //   // lineDash: [4],
            //   width: 1
            // }),
            fill: new Fill({
              color: 'rgba(255,255,0, 0.8)'
            }),
            text: new Text({
              textAlign: 'center', // 位置
              textBaseline: 'middle', // 基准线
              offsetY: 20,
              font: 'normal 16px bold 微软雅黑', // 文字样式
              text: f.get('SZZ') + '', // 文本内容
              fill: new Fill({ // 文本填充样式（即文字颜色)
                color: '#FC9309'
              }),
              stroke: new Stroke({
                color: '#101518',
                width: 2
              })
            })
          }))
        })
        var vectorSource = new VectorSource({
          features,
          wrapX: false
        });
        const testLayer = new VectorLayer({
          source: vectorSource,
          // style:  new Style({
          //         fill: new Fill({
          //           color: 'rgba(249,219,49, 0.7)'
          //         }),

          // })
        })
        this.map.getLayers().insertAt(4, testLayer)
      })

    },

    collapse() {
      this.$store.dispatch(
        "lqfb/changeInfoPanelOffsetRight",
        this.infoPanelOffsetRight === 0 ? -25 : 0
      );
    },
  },
};
</script>

<style lang="scss">
.map-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}

#popup-info {
  display: none;
}

#popup-fire {
  display: none;
}

#mouse-position {
  position: absolute;
  bottom: 70px;
  left: 340px;
  font-size: 16px;
  line-height: 28px;
  background: rgba(0, 0, 0, 0.4);
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

.fire-popup {
  width: 350px;
  height: 22vh; 
  // background-color: rgba(1, 51, 78, 0.8);
  background-image: url("~@/common/images/详情框.png");
  background-size: 100% 100%;
  position: absolute;
  left: -175px;
  bottom: 22px;
  .popup-header {
    width: 100%;
    height: 31px;
    // background: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .popup-title {
      // color: rgba(41, 181, 232, 1);
      font-family: youshebiaotihei;
      color: #fff;
      font-size: 18px;
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
  .line-img{
    width: 100%;
    position: relative;
    padding-left: 1vh;
    top:-0.5vh
  }
  .popup-content {
    padding: 5px 20px 6px 20px;
    .iconLine{
      display: flex;
      padding-bottom: 1vh;
      .icon{
        width: 1.2vh;
        height: 1.5vh;
      }
      .pop-value {
        flex: 1;
        position: relative;
        right: -1vh;
        font-family: PingFang SC;
        font-size: 14px;
        color: #F5F5F5;
      }
    }
    .flexLine{
      display: flex;
      .pop-item {
        margin-top: 9px;
        // margin-bottom: 9px;
        font-size: 16px;
        // width: 50%;
        display: flex;
        .pop-key{
          color: #00FFEB;
          font-family: PingFang SC Regular;
          font-size: 14px;
          padding-right: 0.5vh;
        }
        .pop-value {
          // display: inline-block;
          // height: 4vh;
          // flex: 1;
          font-family: PingFang SC Regular;
          color: #F5F5F5;
          font-size: 14px;
          // display: block;
          width: 13vh;
          // height: 5vh;
          word-wrap: break-word;
        }
      }
    }
    .contentLine{
      display: flex;
      .pop-item {
        margin-top: 9px;
        // margin-bottom: 9px;
        font-size: 16px;
        // width: 50%;
        display: flex;
        flex: 1;
        .pop-key{
          color: #00FFEB;
          font-family: PingFang SC Regular;
          font-size: 14px;
          padding-right: 0.5vh;
        }
        .pop-value {
          // display: inline-block;
          // height: 4vh;
          // flex: 1;
          font-family: PingFang SC Regular;
          color: #F5F5F5;
          font-size: 14px;
          // display: block;
          // width: 13vh;
          // height: 5vh;
          // word-wrap: break-word;
        }
      }
    }
    .pop-item {
        margin-top: 9px;
        // margin-bottom: 9px;
        font-size: 16px;
        // width: 50%;
        display: flex;
        .pop-key{
          color: #00FFEB;
          font-family: PingFang SC Regular;
          font-size: 14px;
                    padding-right: 0.5vh;
        }
        .pop-value {
          // display: inline-block;
          flex: 1;
          font-family: PingFang SC Regular;
          color: #F5F5F5;
          font-size: 14px;
        }
      }

    .pop-fire-detail{
      width: 80px;
      height: 28px;
      line-height: 28px;
      position: relative;
      text-align: center;
      bottom: 4vh;
      right: -19vh;
      background-image: url("~@/common/images/按钮.png");
      background-size: 100% 100%;
      color: #0C110B;
      font-family: PingFang SC;
      font-size: 1.8px;
      cursor: pointer;
      border-radius: 5px;
      font-weight:bold
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
.fire-popup::before {
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
  position: fixed !important;
  bottom: 20px !important;
  left: 340px !important;
}
</style>
