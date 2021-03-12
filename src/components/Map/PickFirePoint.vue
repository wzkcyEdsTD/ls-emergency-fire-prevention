<template>
  <!-- 选择火灾点位置 -->
  <div class="pick-wrapper">
    <div class="title">
      请输入分析半径
      <i class="el-icon-close" @click="closePicFirePoint" />
    </div>
    <div class="content">
      <div class="input-container">
        <!-- <div class="draw-wrapper">
          <div class="item">
            <span>经度：</span>
            <input
              v-model="inputLon"
              placeholder=""
              @keyup="inputLon = inputLon.replace(/[^\d.]/g, '')"
            >
          </div>
          <div class="item">
            <span>纬度：</span>
            <input
              v-model="inputLat"
              placeholder=""
              @keyup="inputLat = inputLat.replace(/[^\d.]/g, '')"
            >
          </div>
          <div class="input-btn" @click="handlePickClick" />
        </div> -->
        <div class="input-radius">
          <input
            v-model="inputSearchRadius"
            placeholder="输入分析半径"
            @keyup="
              inputSearchRadius = inputSearchRadius.replace(/[^\d.]/g, '')
            "
          />
        </div>
      </div>
      <div class="footer">
        <div class="btn" @click="handleClearClick">重选</div>
        <div class="btn" @click="handleComfirmClick">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as turf from '@turf/turf'
import GeoJSON from 'ol/format/GeoJSON'
// import MAP_URL from '@/utils/map/map-url'
import hzdfxNodes from './hzdfx'
import { Point } from 'ol/geom'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import {
  TileSuperMapRest,
  FeatureService,
  SuperMap
} from '@supermap/iclient-ol'
import util from "@/libs/qxinfoAPI"
import { Circle as CircleStyle, Fill, Stroke, Style, Icon, Text } from 'ol/style'
export default {
  data() {
    return {
      inputSearchRadius: 1000,
      inputLon: null,
      inputLat: null,
      code:"",
      systemcode:"",
      pointList:[],
      qxczLayer:null,
    }
  },
  computed: {
    firePtLayer() {
      return this.$store.getters.firePtLayer
    },
    features() {
      return this.$store.getters.features
    },
    clearFlag() {
      return this.$store.getters.clearFlag
    },
    lqzyLayer() {
      return this.$store.getters.lqzyLayer
    },
  },
  watch: {
    features(val) {
      this.initData()
    },
    clearFlag() {
      this.clearFire()
    },
  },
  methods: {

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
        list.forEach(element => {
          that.code = element.properties.ADCODE;
        });
        const sqlParam = new SuperMap.GetFeaturesBySQLParameters({
          toIndex: 999999,
          queryParameter: {
            // name: layerName,
            attributeFilter: `ADCODE='${that.code}'`,
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
        console.log("街道信息查询",serviceResult)
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

    handlePickClick() {
      if (this.inputSearchRadius === 0 || !this.inputSearchRadius) {
        this.$message.info('请设置分析范围！')
        return
      }
      if (this.firePtLayer) {
        this.$message.info('请清除已有火灾点！')
        return
      }
      // 没有输入经纬度则用鼠标选择
      if (this.inputLat || this.inputLon) {
        if (!this.inputLon) {
          this.$message.info('请请输入经度！')
          return
        }
        if (!this.inputLat) {
          this.$message.info('请请输入纬度！')
          return
        }
        const fireFeat = this.$map.createFeature([this.inputLon, this.inputLat])
        this.showFireFeature(fireFeat)
      } else {
        this.$map.doInteractionDraw('Point', (geojson, fireFeature) => {
          this.showFireFeature(fireFeature)
        })
      }
    },

    showFireFeature(fireFeature) {
      // this.$map.zoomToFeature(fireFeature, 15)
      const that = this;
              // debugger
      if (that.systemcode.indexOf("tyswxt")!=-1) {

        const style = new Style({
          image: new Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            // scale:0.3,
            src: require(`@/assets/images/icon/${'火灾点.png'}`)
          }),
          stroke: new Stroke({ color: 'red', width: 2 })
        })
        fireFeature.setStyle(style)
      }else{
        const style = new Style({
          image: new Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            // scale:0.3,
            src: require(`@/assets/images/icon/${'举报人icon.png'}`)
          }),
          stroke: new Stroke({ color: 'red', width: 2 })
        })
        fireFeature.setStyle(style)
      }


      this.$store.dispatch('jjya/changeFirePt', fireFeature)
      const layer = this.$map.createVectorLayer([fireFeature])
      this.$map.addLayer(layer)
      const fireCoor = fireFeature.getGeometry().getCoordinates()
      this.inputLon = fireCoor[0]
      this.inputLat = fireCoor[1]
      console.log(fireCoor)
      const r = this.inputSearchRadius / 1000;
      const buffered = turf.buffer(
        turf.point(fireCoor),
        r,
        {
          units: 'kilometers'
        }
      )
      var format = new GeoJSON()
      var f = format.readFeature(buffered)
      // console.log('1111111111',f)
      f.setStyle(this.$map.getPolygonStyle())
      layer.getSource().addFeature(f)
      this.$store.dispatch('jjya/changeBuffer', f)
      this.$store.dispatch('jjya/changeFirePtLayer', layer)
    },

    clearFire() {
      this.$store.dispatch('map/changeIsAddFeatures', false)
      // this.inputLon = null
      // this.inputLat = null
      this.firePtLayer && this.$map.removeLayer(this.firePtLayer)
      // this.$store.dispatch('map/changeLqzyLayer', false)
      this.$store.dispatch('jjya/changeFirePtLayer', null)
      this.$store.dispatch('jjya/changeBuffer', null)
      this.$store.dispatch('jjya/changeFirePt', null)
      // this.$store.dispatch('siderbar/changeCheckedLeafNodesWithBuffer', [])
    },

    handleClearClick() {
      this.clearFire()
      this.$store.dispatch('map/changeClearFlag', null)

      this.$map.removeLayer(this.qxczLayer);
      this.$bus.$emit("hasQxcz",false);

      // this.handlePickClick()
    },
    initData() {
      if (this.features.length === 81) {
        const attrDic = {
          ZBZY: {
             // 周边资源
            netWork:{
              name:"办事网点"
            },
            // qiXiang:{
            //   name:"气象测站"
            // },
            d_emergency_team: {
              name: '应急队伍'
            },
            JZJZNL_YJZJ: {
              name: '应急专家'
            },
            JZJZNL_BZAZCS: {
              name: '应急避难场所'
            },
            JZJZNL_WZCBK: {
              name: '应急物资储备库'
            },
            JZJZNL_WZCBQY: {
              name: '物质企业储备库'
            },
            JZJZNL_YJGJSB: {
              name: '应急关键设备'
            },
            JZJZNL_YLJH: {
              name: '医疗救护'
            },
            JZJZNL_XFJYNL: {
              name: '消防救援能力'
            },
          },
          AQFXY: { // 安全风险源
            SLGC: {
              name: '水利工程',
              children: ['reservoir', 'pool', 'seawall', 'dyke', 'pump', 'water_gate', 'AQFXY_SL_HZ', 'AQFXY_SL_FLQKK', 'rural_drinking_water', 'AQFXY_SL_SDZ']
            },
            DLYS: {
              name: '道路运输',
              children: ['bridge', 'tunnel', 'AQFXY_JT_HD', 'port_wharf', 'waterway_transport_unit', 'D_HAZARDS_TRACKSHP_P', 'D_HAZARDS_TRAIN_STATION', 'dangerous_car_enterprise']
            },
            D_HAZARDS_CHEMICALSHP: {
              name: '化工及危险品企业'
            },
            RYMJ: {
              name: '人员密集场所',
              children: ['tourist_spot', 'agritainment', 'homestay', 'AQFXY_RM_ZDCY']
            },
            D_HARAZDS_FIREWORKS: {
              name: '烟花爆竹经营单位'
            },
            ire_safety_protect_unit: {
              name: '消防安全单位'
            },
            QT: {
              name: '其它',
              children: ['Civil_explosives_Enterprises', 'AQFXY_QT_YZDHX']
            }
          },
          riverNum: 0,
          wayNum: 0,
          dbfgNum: 0
        }
        // 去除空数组
        // debugger
        const fe = this.features.filter(v => v.length > 0)

        fe.forEach(item => {
          if (item[0].values_['BUFFERRADIUSRIGHT']) {
            // 道路数量
            attrDic.wayNum += item.length
          } else if (item[0].values_['BUFFERRADIUSLEFT']) {
            // 水系数量
            attrDic.riverNum += item.length
          } else if (item[0].values_['TABLE_NAME']) {
            item.forEach(i => {
              for (const listKey in attrDic) {
                for (const key in attrDic[listKey]) {
                  if (item[0].values_['TABLE_NAME'].indexOf(key) !== -1 || (attrDic[listKey][key].children && attrDic[listKey][key].children.indexOf(item[0].values_['TABLE_NAME']) !== -1)) {
                    attrDic[listKey][key].arr
                      ? attrDic[listKey][key].arr.push({
                        name: i.values_['NAME'],
                        feature: i
                      })
                      : attrDic[listKey][key].arr = [{
                        name: i.values_['NAME'],
                        feature: i
                      }]
                  }
                }
              }
            })

          } else {
            // 地表覆盖数量
            attrDic.dbfgNum += item.length
          }
        })
        
        this.$store.dispatch('map/changeFeaturesData', attrDic)
        // console.log("FeaturesData",attrDic);
      }
    },
    closePicFirePoint() {
      this.$parent.isShowPickFirePoint = false
      this.$parent.$refs['tool-bar'].isHzhzd = false

     this.$bus.$emit("clearAll")

      this.handleClearClick();

    },
    getWindDirect(angles){
      var direct = ''
      if(angles<0)
      {
          angles=angles+360;
      }
      if(angles>=15&&angles<75)
      {
          direct="东北风";
      }
      else if(angles>=75&&angles<105)
      {
          direct="东风";
      }
      else if(angles>=105&&angles<165)
      {
          direct="东南风";
      }
      else if(angles>=165&&angles<195)
      {
          direct="南风";
      }
      else if(angles>=195&&angles<255)
      {
          direct="西南风";
      }
      else if(angles>=255&&angles<285)
      {
          direct="西风";
      }
      else if(angles>=285&&angles<345)
      {
          direct="西北风";
      }
      else
      {
          direct="北风";
      }
      return direct
    },
    changeTemperatureType(number){
      const res = (number - 32) * 5 / 9
      return res.toFixed(1)
    },
    createMinDistanceQXCZ(){
      const that = this;
      if (this.qxczLayer) {
        this.qxczLayer=null;
      }
      this.pointList.map(v=>{
        const lon = Number(v.properties.LONGITUDE)
        const lat = Number(v.properties.LATITUDE)
        v.juli = that.distance(this.inputLon,this.inputLat,lon,lat)
      })
      this.pointList.sort(function(a,b) {
        return a.juli-b.juli
      })
      const minDistancePoint = this.pointList[0]
      console.log(minDistancePoint)
      util.getQXDetail(minDistancePoint.properties.IIIII).then(r=>{
        const detailInfo = r['[]'][0]['SzlsDwSjjhSfxptBiz067QxQyqxzgc']
        detailInfo['风向'] = that.getWindDirect(Number(detailInfo.winddirect))
        detailInfo['摄氏度'] = that.changeTemperatureType(Number(detailInfo.drybultemp))
        console.log("气象站指标",detailInfo)
        that.$bus.$emit("detailInfo",detailInfo)
      })
      const features = [];
      const properties = minDistancePoint.properties;
      const feature =  new Feature({
            geometry: new Point([properties.LONGITUDE,properties.LATITUDE]),
            ...properties
      })
        // debugger
      const style = new Style({
        image: new Icon({
          anchor: [0.5, 26],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: require(`@/assets/images/icon/${'气象测站.png'}`)
        }),
        // stroke: new Stroke({ color: 'red', width: 2 })
      })
      feature.setStyle(style)
      features.push(feature);
      var vectorSource = new VectorSource({
        features,
        wrapX: false
      });
      this.qxczLayer = new VectorLayer({
        source: vectorSource,
      })
      this.$map.addLayer(this.qxczLayer)
      // debugger
      that.$bus.$emit("minDistance",minDistancePoint);

    },
    handleComfirmClick() {
      const that = this;
      // debugger
      that.$bus.$emit("hasQxcz",true);
      // debugger
      this.searchGrid(new Point([this.inputLon,this.inputLat]))
      this.streetDetail(new Point([this.inputLon,this.inputLat]))
      this.clearFire();
      const fireFeat = this.$map.createFeature([this.inputLon, this.inputLat])
      this.showFireFeature(fireFeat)
      if (this.inputSearchRadius === 0 || !this.inputSearchRadius) {
        this.$message.info('请设置分析范围！')
        return
      }
      if (!this.firePtLayer) {
        this.$message.info('请先设置火灾点！')
        return
      }
      this.$map.getMap().getView().setCenter([this.inputLon,this.inputLat]);
      this.$map.getMap().getView().setZoom(16);
      // debugger
      that.createMinDistanceQXCZ();
      this.$store.dispatch('map/changeVideo', [])//清空视频数据
      this.$store.dispatch('map/changeLqzyLayer', true)
      this.$store.dispatch('map/changeIsAddFeatures', true) // 只在选中火灾点的时候获取才重新数据
      this.$store.dispatch('map/clearFeatures', []) // 设置features为空
      this.$store.dispatch('siderbar/changeCheckedLeafNodesWithBuffer', hzdfxNodes)
      // this.$store.dispatch('jjya/getSsxyPersonList', null)
      // this.$store.dispatch('jjya/getMonitorList', null)
    },
    testData(){
      const that = this;
      var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
        toIndex: 999999,
        queryParameter: {
          // name: layerName,
          attributeFilter: "",
          maxFeatures: 99999999
        },
        datasetNames: [`lishui_forestfire_v2:v_forest_qixiangcezhandian`]
      })
      const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data";
      new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
        const list = serviceResult.result.features.features;
        const tempList = []
        list.forEach(element => {
          const properties = element.properties;
          const point = new Point([properties.LONGITUDE,properties.LATITUDE]);
          tempList.push(point)
          that.pointList.push(element)
        });
        console.log(that.pointList.length)
    })
      
    },
    searchQXpoint(tempList){
      //创建最近设施分析参数实例
      debugger
      var resultSetting = new SuperMap.TransportationAnalystResultSetting({
          returnEdgeFeatures: true,
          returnEdgeGeometry: true,
          returnEdgeIDs: true,
          returnNodeFeatures: true,
          returnNodeGeometry: true,
          returnNodeIDs: true,
          returnPathGuides: true,
          returnRoutes: true
      });
      var analystParameter = new SuperMap.TransportationAnalystParameter({
          resultSetting: resultSetting,
          turnWeightField: "TurnCost",
          weightFieldName: "length"  //length,time
      });

      var findClosetFacilitiesParameter = new SuperMap.FindClosestFacilitiesParameters({
          //事件点,必设参数
          event: new Point([120.3,28.04]),
          //要查找的设施点数量。默认值为1
          expectFacilityCount: 1,
          //气象站点集合
          facilities: tempList,
          isAnalyzeById: false,
          parameter: analystParameter
      });
      const serviceUrl = "https://iserver.supermap.io/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun"
      debugger
      //进行查找
      new ol.supermap.NetworkAnalystService(serviceUrl).findClosestFacilities(findClosetFacilitiesParameter, function (serviceResult) {
          debugger
          console.log(serviceResult)
          serviceResult.result.facilityPathList.map(function (result) {
          });
  
      });

    },

    distance(la1, lo1, la2, lo2) {
      var lon1 = (Math.PI / 180) * la1;//开始经度
      var lon2 = (Math.PI / 180) * la2;//结束经度
      var lat1 = (Math.PI / 180) * lo1;//开始纬度
      var lat2 = (Math.PI / 180) * lo2;//结束纬度
      // 地球半径
      var R = 6371;
      // 两点间距离 km，如果想要米的话，结果*1000就可以了
      var s = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)) * R;

      return s;
    }

  },
  mounted(){
    const that = this;
    that.$nextTick(()=>{
      that.testData();
    })
    this.$bus.$on('fire',(value)=>{
      // console.log("传过来了",value)
      // that.handleClearClick();
      if (that.firePtLayer) {
        // debugger
        that.$store.dispatch('map/changeClearFlag', null)
        that.$store.dispatch('map/changeIsAddFeatures', false)
        that.firePtLayer && that.$map.removeLayer(that.firePtLayer)
        that.$store.dispatch('jjya/changeFirePtLayer', null)
        that.$store.dispatch('jjya/changeBuffer', null)
        that.$store.dispatch('jjya/changeFirePt', null)
      }
        that.inputLon = value.x;
        that.inputLat = value.y;
        that.systemcode = value.systemcode
        // debugger
        // that.streetDetail(new Point([value.x,value.y]))
        // that.streetDetail(new Point([value.x,value.y]))
        that.$bus.$emit("sysCode",value.systemcode)
        // that.handlePickClick();
    })

    that.$bus.$on('fireAndId',(value)=>{
      // that.inputSearchRadius = 1000;//半径
      if (that.firePtLayer) {
        that.$store.dispatch('map/changeClearFlag', null)
        that.$store.dispatch('map/changeIsAddFeatures', false)
        that.firePtLayer && that.$map.removeLayer(that.firePtLayer)
        that.$store.dispatch('jjya/changeFirePtLayer', null)
        that.$store.dispatch('jjya/changeBuffer', null)
        that.$store.dispatch('jjya/changeFirePt', null)
      }
      that.inputLon = value.x;
      that.inputLat = value.y;
      // debugger
      // that.$store.dispatch("map/clearLayerList",[]);
      // that.initData()
      that.systemcode = value.systemcode
      that.$bus.$emit("sysCode",value.systemcode)
      //等待资源加载完
      setTimeout(()=>{
        that.handleComfirmClick();
      },600);

    })
  },
  beforeDestroy(){
    this.$bus.$off('fire');
    this.$bus.$off('fireAndId');
  }
}
</script>

<style lang="scss">
.pick-wrapper {
  transition: 1s;
  position: absolute;
  right: 10px;
  top: 100px;
  z-index: 999;
  padding: 10px;
  transition: right 0.9s;
  background: url("~@/common/images/弹框.png") no-repeat;
  background-size: 100% 100%;
  width: 271px;
  height: 150px;
  .title {
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-left: 13px;
    font-size: 16px;
    .el-icon-close {
      position: absolute;
      top: 1px;
      right: 0;
      cursor: pointer;
      color: rgba(10, 204, 233, 1);
    }
  }
  .title::before {
    position: absolute;
    top: 1px;
    left: 3px;
    content: " ";
    width: 2px;
    height: 16px;
    background-color: #52feb3;
  }
  .content {
    width: 100%;
    margin-top: 5px;
    padding: 0 10px;
    .input-container {
      & > span {
        font-size: 13px;
        display: inline-block;
        width: 40px;
      }
      .input-radius {
        &::after {
          content: "米";
          position: relative;
          left: -30px;
        }
        input {
          width: 190px;
          height: 30px;
          background-color: rgba(36, 78, 59, 1);
          outline: none;
          padding-left: 8px;
          margin-top: 10px;
          font-size: 16px;
          color: rgba(41, 181, 121, 1);
          border: 1px #52feb3 solid;
        }
      }
      input::-webkit-input-placeholder,
      textarea::-webkit-input-placeholder {
        color: rgba(23, 148, 194, 1);
        font-size: 16px;
      }
      .draw-wrapper {
        width: 190px;
        color: rgba(23, 148, 194, 1);
        border: 1px #29aeea solid;
        background-color: rgba(9, 46, 79, 1);
        .item:nth-child(1) {
          border-bottom: 1px #29aeea solid;
        }
        .item {
          margin: 0 5px;
          padding: 1px;
        }
        input {
          color: rgba(23, 148, 194, 1);
          width: 110px;
          border: 0;
          outline: none;
          background-color: transparent !important;
        }
        .input-btn {
          position: absolute;
          right: 17px;
          top: 45px;
          width: 47px;
          height: 47px;
          background: url(../../assets/images/定位icon（1）.png) no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
        }
      }
    }
    .footer {
      display: flex;
      justify-content: space-between;
      width: 205px;
      padding-top: 1vh;
      margin-top: 5px;
      .btn {
        width: 66px;
        height: 30px;
        background: url("~@/common/images/按钮.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: #000;
      }
    }
  }
}
</style>
