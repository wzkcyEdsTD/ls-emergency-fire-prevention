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
      <img src="@/common/images/边.png" class="line-img">
      <div id="popup-info-content" class="popup-content">
        <div class="pop-item">
          <div id="key-name" class="pop-key" />
          <div id="key-value" class="pop-value" />
        </div>
        <div class="pop-item">
          <div id="key-name-1" class="pop-key" />
          <div id="key-value-1" class="pop-value" />
        </div>
          <!-- <div class="button" @click="collapse"
            >信息详情 >></div
          > -->
      </div>
      <div class="popup-lssg-footer">
        <a href="javascript:;" class="pop-info-detail"  @click="collapse">信息详情 >></a>
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
        <div
          class="pop-fire-detail"

          @click="zbfx"
          >周边分析</div>

      </div>
    </div>
    <!-- 点击高亮 -->
    <div id="marks" class="marks" @click="clickGIF"></div>
    <layer-switch />
    <div class="toobar" :style="{ right: `${rightMenu}rem` }">
      <tool-bar ref="tool-bar" />
      <pick-fire-point v-show="isShowPickFirePoint" />
    </div>
    <!-- <yzhxdj /> -->
    <div id="test"></div>
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
import { Image as ImageLayer, Tile as TileLayer } from 'ol/layer'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import { Point } from 'ol/geom'
import {
  ImageSuperMapRest,
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
      version:undefined,
      map: null,
      isShowPickFirePoint: false,
      detailShow: false,
      tempData: null,
      key: null,
      timer:undefined,
      hasID:false,
      size:1000,
      rightMenu:30,
      temp:false,
      hightStreatList:[],
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
    const fireEvent = this.$route.query
    // console.log(this.fireId);
    if (fireEvent["id"]) {
      console.log(fireEvent["id"])
      that.hasID = true;
      Util.detailAxios(fireEvent["id"]).then((res)=>{
        const value = res.result;
        // that.showPopup(value);
        that.$bus.$emit("fireAndId",value);
        if (value.systemcode.indexOf("ilishui")!=-1) {
          that.searchStreet(new Point([value.x,value.y]),that)
        }
        // that.searchGrid(new Point([value.x,value.y]))
        // debugger
        
      })
    }else{
      that.hasID = false;
    }
    await this.initMap();
    this.getData();

    this.$bus.$on('hzjbd',temp=>{
      if (that.hightStreatList && that.hightStreatList.length>0) {
        that.hightStreatList.map(v=>{
          v.setVisible(temp)
        })
      }
    });
    this.$bus.$on('changeMenuLocaltion',temp =>{
      that.$nextTick(()=>{
        that.getOffsetRight(temp);
      })
    })
  },
  beforeDestroy() {
    this.$bus.$off("hzjbd");
    this.$bus.$off("changeMenuLocaltion");
  },
  methods: {
    clickGIF(){
      this.$bus.$emit("clickGIF",true);
    },
    searchGrid(point){
      const that = this;
      let geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
        toIndex: 999999,
        attributeFilter:'',
        geometry: point,
        spatialQueryMode: 'INTERSECT', // 相交空间查询模式
        datasetNames: [`lishui_forestfire_v2:d_region_grid`]
      })
      const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data";
      new FeatureService(url).getFeaturesByGeometry(geometryParam, serviceResult => {

        const list = serviceResult.result.features.features;
        let code;
        list.forEach(element => {
          code = element.properties.ADCODE;
        });

        const sqlParam = new SuperMap.GetFeaturesBySQLParameters({
          toIndex: 999999,
          queryParameter: {
            // name: layerName,
            attributeFilter: `ADCODE='${code}'`,
            maxFeatures: 99999999
          },
          datasetNames: [`lishui_forestfire_v2:d_region_grid_member`]
        })

        new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
          const gridInfo = serviceResult.result.features;
          // debugger
          that.$bus.$emit("gridInfo",gridInfo)
        })

      })
    },
    streetDetail(point){
      const that = this;
      let geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
        toIndex: 999999,
        attributeFilter:'',
        geometry: point,
        spatialQueryMode: 'INTERSECT', // 相交空间查询模式
        datasetNames: [`lishui_forestfire_v2:d_region_street`]
      })
      // debugger
      const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data";
      new FeatureService(url).getFeaturesByGeometry(geometryParam, serviceResult => {
        // debugger
        // console.log("街道信息查询",serviceResult)
        const list = serviceResult.result.features.features;
        let sql;
        list.forEach(element => {
          sql = element.properties.SZZ
        });
        // debugger
        const sqlParam = new SuperMap.GetFeaturesBySQLParameters({
          toIndex: 999999,
          queryParameter: {
            // name: layerName,
            attributeFilter: `SZQX='${sql}'`,
            maxFeatures: 99999999
          },
          datasetNames: [`lishui_forestfire_v2:d_region_street_member`]
        })

        new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
          const gridInfo = serviceResult.result.features;
          that.$bus.$emit("streetInfo",gridInfo)
        })

      })
    },
    async showPopup(fireValue) {
      const that = this;
      // this.clearPopup()

      const keyValueFire = document.getElementById('key-value-fire')
      const jbr = document.getElementById("key-value-fire-jbr")
      const jbrtel = document.getElementById('key-value-fire-jbrtel')
      const firetype = document.getElementById("key-value-fire-type")
      const fireIntensity = document.getElementById('key-value-fire-intensity')
      const contents = document.getElementById('key-value-fire-cont')
      const time = document.getElementById('key-value-fire-time')

      const value = fireValue

      if ((value['systemcode'])) {
        this.$bus.$emit("fire",value);

      }else{
      }
      // debugger
      if (!value['systemcode']) {
        if ((!value['NAME'] && !value['label'])) return
      }

      // 显示属性框
      if (!(value['systemcode'])) {
        switch (value.type) {
          case '人员定位':
            this.rydwPopyp.setPosition(coordinate)
            break
          default:
            this.infoPopup.setPosition(coordinate)
            break
        }
      }

      this.$store.dispatch('map/changeIsShowDetail', true)
      let table; let infoTmpl = ``
      // debugger
      this.$store.dispatch('lqfb/changeIsXFDW', '')
      table = document.getElementById('table-box')
      
      if ((value['systemcode'])) {
        this.firePopyp.setPosition([value.x,value.y])
      }

      table.innerHTML = infoTmpl
      if ((value['systemcode'])) {
        // keyNameFire.innerHTML = '地点：'
        if ("null".indexOf(`${value['jubaoren']}`) != -1) {
          jbr.innerHTML = ``
        }else{
          jbr.innerHTML = `${value['jubaoren']}`
        }
        if ("null".indexOf(`${value['jubaoren']}`) != -1) {
          jbrtel.innerHTML = ``
        }else{
          jbrtel.innerHTML = `${value['jubaorentel']}`
        }
      keyValueFire.innerHTML = `${value['address']}`

      const text = `${value['infocontent']}`
      // debugger
      if (text.indexOf(",")>-1) {
        const arr =text.split(',')
        // console.log(arr)

        contents.innerHTML = arr[0]
        
        fireIntensity.innerHTML = that.fireStrong[arr[1].split(":")[1]]
        firetype.innerHTML = arr[2].split(":")[1]
        // debugger
      }else{
        contents.innerHTML = `${value['infocontent']}`
      }

      time.innerHTML = `${value['time']}`

      }
    },

    zbfx() {
      this.$bus.$emit("fireShow", this.tempData);
      // console.log(this.detailShow)
    },
    getOffsetRight(val) {
      const that = this;
      that.$nextTick(()=>{
        that.rightMenu = val
      })
      // if (
      //   this.zlOffsetRight === 0 ||
      //   this.zhfxOffsetRight === 0 ||
      //   this.infoPanelOffsetRight === 0 ||
      //   this.yadqOffsetRight === 0 ||
      //   this.yzhxdjOffsetRight === 0 ||
      //   this.rydwPannelOffsetRight === 0 ||
      //   this.videoListOffsetRight === 0
      // ) {
      //   return 27;
      // }
      // return 2;
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
      Util.listAxios(that.size).then(res=>{
        if(res.message.indexOf('成功')!=-1){
          // debugger
          if (that.size < Number(res.result.total)) {
            that.size = (res.result.total + 100);
            console.log(that.size);
            window.size = that.size;
            Util.listAxios(that.size).then(r=>{
              that.$bus.$emit('fireList',r);
            })
          }else{
            window.size = that.size;
            that.$bus.$emit('fireList',res);
          }
        }
        
        // const value = res.result;
        // that.searchGrid(new Point([value.x,value.y]))
        // that.timer = setTimeout(()=>{
        //   that.getData();
        // },60000)
        //一分钟获取后台数据
      })

    },

    initMap() {
      this.map = this.$map.createMap("map-container");

      const that = this;
      const imgUrl = 'http://10.53.137.59:8090/iserver/services/map-agscache-Layers/rest/maps/Layers'
      let wenzhouLayer = ''
      let zjLayer = ''
      const zjurl = "http://10.53.137.59:8090/iserver/services/map-agscachev2-lishuiyxzj2020cgcs2000/rest/maps/lishui_yxzj_2020_cgcs2000"

      wenzhouLayer = this.$map.createTileSuperMapRestLayer(imgUrl, {
        className: "img_c",
      });
      zjLayer = this.$map.createTileSuperMapRestLayer(zjurl, {
        className: "zj_c",
      });
      this.$store.dispatch("map/changeBaseLayer", wenzhouLayer);
      this.$store.dispatch('map/changeZjLayer', zjLayer)

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
    },

    searchStreet(point,self){
      const that = this;
      var geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
        toIndex: 999999,
        attributeFilter:'',
        geometry: point,
        spatialQueryMode: 'INTERSECT', // 相交空间查询模式
        datasetNames: [`lishui_forestfire_v2:d_region_street`]
      })
      const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data";
      new FeatureService(url).getFeaturesByGeometry(geometryParam, serviceResult => {
        // debugger
        const testList = serviceResult.result.features;
        const features = new GeoJSON().readFeatures(testList)
        features.map(f => {
          f.setStyle(new Style({
            stroke: new Stroke({
              color: 'rgba(255, 0, 0, 0.8)',
              lineDash:[1,15,1],
              width: 3
            }),
            fill: new Fill({
              color: 'rgba(205, 128, 56, 0.2)'
            }),
            // text: new Text({
            //   textAlign: 'center', // 位置
            //   textBaseline: 'middle', // 基准线
            //   offsetY: 20,
            //   font: 'normal 16px bold 微软雅黑', // 文字样式
            //   text: f.get('SZZ') + '', // 文本内容
            //   fill: new Fill({ // 文本填充样式（即文字颜色)
            //     color: '#FC9309'
            //   }),
            //   stroke: new Stroke({
            //     color: '#101518',
            //     width: 2
            //   })
            // })
          }))
        })
        var vectorSource = new VectorSource({
          features,
          wrapX: false
        });
        const testLayer = new VectorLayer({
          source: vectorSource,
        })
        console.log("list123",self.hightStreatList);
        // debugger
        that.hightStreatList.push(testLayer)
        this.map.getLayers().insertAt(4, testLayer)

      })
    },

    collapse() {
      this.$store.dispatch(
        "lqfb/changeInfoPanelOffsetRight",
        this.infoPanelOffsetRight === 0 ? -30 : 0
      );
      const temp =this.$store.getters.detailOrAround
      if (temp) {
        const nodes = {name:"详情列表"}
        this.$store.dispatch('map/appendDetailOrAround', null)
        this.$store.dispatch('map/appendDetailOrAround', nodes)
      }

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
  width: 260px;
  /* height: 150px; */
  // background-color: rgba(1, 51, 78, 0.8);
  background-image: url("~@/common/images/详情框.png");
  background-size: 100% 100%;
  position: absolute;
  left: -130px;
  bottom: 33px;
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
    padding: 0 20px 6px 20px;
    .pop-item {
      margin-top: 10px;
      margin-bottom: 9px;
      font-size: 16px;
      .pop-key,
      .pop-value {
        display: inline-block;
      }


    }
    .button{
      width: 100px;
      height: 30px;
      line-height: 30px;
      // position: relative;
      text-align: center;
      background-image: url("~@/common/images/按钮.png");
      background-size: 100% 100%;
      color: #0C110B;
      font-family: PingFang SC;
      font-size: 15px;
      cursor: pointer;
      border-radius: 5px;
      // font-weight:bold
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
    margin-bottom: 0.5vh;
    // font-family: pingfang;
    font-size: 15px;
    color: rgba(0, 255, 235, 1);
    .pop-info-detail {
      text-decoration:underline;
      cursor: pointer;
    }
  }
}
// .ol-popup::before {
//   position: absolute;
//   top: 100%;
//   left: calc(50% -10px);
//   border-top: 20px solid transparent;
//   content: " ";
//   width: 0px;
//   height: 0px;
//   border-right: 10px solid transparent;
//   border-top: 10px solid rgba(1, 51, 78, 0.8);
//   border-left: 10px solid transparent;
// }

.fire-popup {
  width: 350px;
  max-height: 25vh; 
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
      bottom: 3.5vh;
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
// .fire-popup::before {
//   position: absolute;
//   top: 100%;
//   left: calc(50% -10px);
//   border-top: 20px solid transparent;
//   content: " ";
//   width: 0px;
//   height: 0px;
//   border-right: 10px solid transparent;
//   border-top: 10px solid rgba(1, 51, 78, 0.8);
//   border-left: 10px solid transparent;
// }

.marks{
  width: 3.3vh;
  height: 3.3vh;
  background: url("~@/assets/images/icon/视频高亮.gif");
  background-size: 100% 100%;
  position: absolute;
  left: -1.8vh;
  bottom: -0.6vh;
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
