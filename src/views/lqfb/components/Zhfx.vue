<template>
  <div class="zhfxlb-wrapper" :style="{ right: `${zhfxOffsetRight}rem` }" >
    <div class="close" @click="close" v-show="!hasID"/>
    <!-- <div class="zgfx-container">
      <div class="title">阻隔分析</div>
      <img src="../../../assets/images/边.png" alt />
      <div class="zgfx-box">
        <div class="item active">
          <svg-icon icon-class="河流icon" />
          <span class="river">河流</span>
        </div>
        <div class="item">
          <svg-icon icon-class="道路icon" />
          <span class="road">道路</span>
        </div>
        <div class="item" style="color: rgb(201, 169, 99)">
          <svg-icon icon-class="地表覆盖icon" />
          <span class="cover">地表覆盖</span>
        </div>
      </div>
    </div> -->
    <div class="ljxq-container">
      <!-- <div class="title">
        路径详情
        <el-button type="primary" class="btn-yadq" @click="doPoint">选点</el-button>
        <el-button type="primary" class="btn-yadq" @click="clearPoint">清点</el-button>
        <el-button type="primary" class="btn-yadq" @click="changeYADQOffsetRight"
          >预案调取</el-button
        >
      </div>
      <img src="../../../assets/images/边.png" alt /> -->
      <!-- <div class="ljxq-box">
        <div v-show="RouteDetails == true && pathList.length === 0" class="route-box">
          暂无救援路径
        </div>
        <div v-show="RouteDetails == true && pathList.length > 0" class="route-box">
          <div class="title">
            <div class="check-box">
              <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
                @click.stop.native
              />
            </div>
            <span> <img src="../../../assets/images/救援icon.png" alt />救援队名称 </span>
            <span>
              <img src="../../../assets/images/距离icon.png" alt />距离火灾的距离
            </span>
          </div>
          <el-checkbox-group v-model="lineLayerList" @change="handleCheckedLineChange">
            <ul>
              <li
                v-for="(item, index) in pathList"
                :key="index"
                @click="detailsBtn(item)"
              >
                <span class="check-box"
                  ><el-checkbox :label="item" @click.stop.native>null </el-checkbox></span
                >
                <span>
                  <img src="../../../assets/images/救援icon.png" alt />
                  {{ item.name }}
                </span>
                <span>
                  <img src="../../../assets/images/距离icon.png" alt />
                  {{ item.sum }}米
                </span>
              </li>
            </ul>
          </el-checkbox-group>
        </div>
        <div v-show="RouteDetails === false" class="routeDetail-box">
          <div class="title">
            <span>
              <img src="../../../assets/images/救援icon.png" alt />
              {{ title }}
            </span>
            <span @click="nodetaisBtn()">
              <span>返回</span>
            </span>
          </div>
          <div class="rD-con">
            <div class="StepBar">
              <el-steps direction="vertical">
                <el-step v-for="(item, index) in details" :key="index" :title="item" />
              </el-steps>
            </div>
            <div class="road"><span />车行道 <span />人行道</div>
          </div>
        </div>
      </div> -->

      <div v-show="hasID">
        <div class="titleLine">
          <div class="titleHistory">
            地址火灾点详情
          </div>
        </div>
        <img style="width: 100%;" src="@/common/images/边.png" alt="">
        <div 
        style="height:25vh"
        class="result-wrapper">
          <ul class="result-list" id="table">
            <li class="result-data">
              <span class="indexList">地址</span>
              <div class="line"></div> 
              <img src="@/assets/images/地址.png" alt="" class="icon">
              <span
                @mouseenter="titeEnter"
                class="contentList">{{address}}</span
              >
            </li>
            <li class="result-data">
              <span class="indexList">举报人</span>
              <div class="line"></div> 
              <span
                style="padding-left:0.5vh"
                class="contentList">{{jubaoren}}</span
              >
            </li>
            <li class="result-data">
              <span class="indexList">举报人电话</span>
              <div class="line"></div>
              <span
                style="padding-left:0.5vh"
                class="contentList">{{jubaorentel}}</span
              >
            </li>
            <li class="result-data">
              <span class="indexList">火灾强度</span>
              <div class="line"></div>
              <span
                style="padding-left:0.5vh"
                class="contentList">{{fireIntensity}}</span
              >
            </li>
            <li class="result-data">
              <span class="indexList">火灾类型</span>
              <div class="line"></div>
              <span
                style="padding-left:0.5vh"
                class="contentList">{{firetype}}</span
              >
            </li>
            <li class="result-data">
              <span class="indexList">时间</span>
              <div class="line"></div>
              <span
                style="padding-left:0.5vh"
                class="contentList">{{time}}</span
              >
            </li>
            <li class="result-data">
              <span class="indexList">内容</span>
              <div class="line"></div>
              <span
                style="padding-left:0.5vh"
                class="contentList">{{contents}}</span
              >
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div class="titleLine">
          <div class="titleHistory">
            责任人
          </div>
        </div>
        <img style="width: 100%;" src="@/common/images/边.png" alt="">
        <div 
        :style="{height:syscode=='tyswxt'?'15vh':'8vh'}"
        style="height:15vh"
        class="result-wrapper">
          <ul class="result-list" id="table">
            <li
             class="result-data">

              <span class="indexList">乡镇业务负责人</span>
              <div class="line"></div> 
              <!-- <div class = "iconAndName">
                <img src="@/assets/images/乡镇人员.png" alt="" class="icon"> -->
                <span
                  @mouseenter="titeEnter"
                  class="contentList">{{streetPerson}}</span
                >
              <!-- </div> -->

            </li>
            <li class="result-data">
              <span class="indexList">联系方式</span>
              <div class="line"></div> 
              <span
                @mouseenter="titeEnter"
                class="contentList">{{streetPersonPhone}}</span
              >
            </li>
            <li 
            v-show="syscode=='tyswxt'"
            class="result-data">
              <span class="indexList">网格负责人</span>
              <div class="line"></div> 
              <!-- <img src="@/assets/images/乡镇人员.png" alt="" class="icon"> -->
              <span
                @mouseenter="titeEnter"
                class="contentList">{{gridPerson}}</span
              >
            </li>
            <li 
            v-show="syscode=='tyswxt'"
            class="result-data">
              <span class="indexList">联系方式</span>
              <div class="line"></div> 
              <span
                @mouseenter="titeEnter"
                class="contentList">{{gridPersonPhone}}</span
              >
            </li>
          </ul>
        </div>
      </div>
      <div v-show="hasID">
        <div class="titleLine">
          <div class="titleHistory">
            周边分析结果
          </div>
        </div>
        <img style="width: 100%;" src="@/common/images/边.png" alt="">
        <div 
        style="height:15vh"
        class="result-wrapper">
          <ul class="result-list-around" id="table">
            <li
             class="result-data">
              <span  class="indexList">办事网点</span>
              <div class="line"></div> 
              <span
                @mouseenter="titeEnter"
                class="contentList" >{{aroundDetail}}</span
              >
            </li>
            <li class="result-data">
              <span class="indexList">监控</span>
              <div class="line"></div> 
              <span
                class="contentList" v-if="videoList.length > 0">{{aroundVideo}}</span
              >
              <span
                class="contentList" v-else>{{`周边无监控设施`}}</span
              >
            </li>

          </ul>
        </div>
      </div>
      <el-collapse v-model="activeNames" accordion  v-show="!hasID">
        <el-collapse-item title="周边资源搜索成果" name="1">
          <div class="ljxq-content">
            <div
              v-for="(item, index) in tempdata.ZBZY"
              v-show="!ljxqDetailVisible"
              :key="index"
            >
              <div v-show="item" class="item" @click="handleLabelClick(tempdata.ZBZY[index])">
                <img :src="getImgSrc(tempdata.ZBZY[index].name)" style="width: 26px;height: 26px;" alt />
                <div class="label">
                  {{ tempdata.ZBZY[index].name }}：{{
                    tempdata.ZBZY[index].arr ? tempdata.ZBZY[index].arr.length : 0
                  }}
                </div>
              </div>
            </div>
            <div v-show="ljxqDetailVisible" class="ljxq-detail">
              <div>
                <span
                  >{{ selectedItem.name }}:<span>{{
                    selectedItem.arr ? selectedItem.arr.length : 0
                  }}</span></span
                >
                <span class="go-back" @click="ljxqDetailVisible = false">
                  <span>返回</span>
                </span>
              </div>
              <ul>
                <li
                  v-for="(v, i) in selectedItem.arr"
                  :key="i"
                  v-show="v.name"
                  @click="ZoomToFeature(v.feature)"
                  @mouseenter="titeEnter"
                >
                  {{ v.name }}
                </li>
              </ul>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="周边监控设置" name="4">
          <div class="zbjksz-container">
            <div v-if="videoList.length > 0">
              <ul style="height:25vh">
                <li v-for="(v, i) in videoList" 
                :key="i" 
                :class="{active : videotemp == i}"
                @click="videotemp = i;handleVideoClick(v)">
                  {{ v["MC"] }}
                </li>
              </ul>
            </div>
            <div v-else>周边无监控设施</div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div id="temp"></div>
  </div>
</template>
<script>
import spUtils from "./shortpath";
import { getVideoByCode } from "@/api/lqfb";
import { TurnType } from "@supermap/iclient-ol";
import * as turf from "@turf/turf";
import { log } from 'video.js';

export default {
  data() {
    return {
      fireStrong:{
        "1":"一级",
        "2":"二级",
        "3":"三级",
        "4":"四级",
        "5":"五级",
        "6":"六级",
        "7":"七级",
        "8":"八级",
        "9":"九级",
      },
      hasID:false,
      activeNames: ["1","4"],
      pathList: [],
      ssxyPersonLayer: null, // 实时响应人员图层
      monitorLayer: null, // 监控图层
      RouteDetails: true,
      title: "",
      details: [],
      selectedItem: {
        arr: [],
        name: "",
      },
      syscode:'ilishui',
      ljxqDetailVisible: false,
      lineLayerList: [],
      lastLineLayerList: [],
      isIndeterminate: false,
      checkAll: false,
      terminalPoint: {},
      terminalLayer: null,
      //  自选点
      diyPtLayer: null,
      diyPathLayer: null,
      videoList:[],
      videotemp:undefined,

      jubaoren:undefined,
      jubaorentel:undefined,
      address:undefined,
      time:undefined,
      contents:undefined,
      fireIntensity:undefined,
      firetype:undefined,

      gridList:undefined,
      gridPerson:'',
      gridPersonPhone:'',
      streetPerson:'',
      streetPersonPhone:'',

      aroundVideo:'',
      aroundDetail:"",

      tempdata:{
        ZBZY:undefined
      }
    };
  },
  computed: {
    featuresData() {
      return this.$store.getters.featuresData
    },
    videoData() {
      return this.$store.getters.videoData;
    },
    netWorkData() {
      return this.$store.getters.netWorkData;
    },
    zhfxOffsetRight() {
      return this.$store.getters.zhfxOffsetRight;
    },
    zlOffsetRight() {
      return this.$store.getters.zlOffsetRight;
    },
    firePt() {
      return this.$store.getters.firePt;
    },
    ssxyPersonList() {
      return this.$store.getters.ssxyPersonList;
    },
    monitorList() {
      return this.$store.getters.monitorList;
    },
    clearFlag() {
      return this.$store.getters.clearFlag;
    },
    firePtLayer() {
      return this.$store.getters.firePtLayer;
    },
    layerList() {
      return this.$store.getters.layerList;
    },
  },
  watch: {
    featuresData(val) {
      // console.log(this.$store.getters.featuresData.ZBZY[1]);
      const that = this;
      this.$store.dispatch("lqfb/changezhfxOffsetRight", 0);
    },
    videoData(val) {
      const that = this;
      that.$nextTick(()=>{
        that.videoList = [];

        val.forEach(element => {
          that.videoList.push(element.values_)
        });
        if (val.length>0) {
          that.aroundVideo = '';
          val.forEach(element => {
            that.aroundVideo += element.values_.MC
            that.aroundVideo += "   "
          })
        }
        // var node = document.createElement();
        // node.setid
      })
      // this.$store.dispatch("lqfb/changezhfxOffsetRight", 0);

    },
    netWorkData(val){
      // console.log("办事网点",val)
      const that = this;
      // let data = this.featuresData
      let data = this.$store.getters.featuresData;
      // data.ZBZY.netWork.arr = val
      // const tempdata = data
      // debugger
      let list = []
      val.forEach(item => {
        const json = {
          name:item.values_.NAME,
          feature:item,
        }
        list.push(json)
      })
      // debugger
      // debugger

      this.$nextTick(()=>{
          // debugger
        data.ZBZY.netWork.arr = list
        if (val && val.length>0) {

          that.aroundDetail = ""
          val.forEach(element => {
            that.aroundDetail += element.values_.NAME
            that.aroundDetail += "   "
          });
          // debugger
        }else{
          that.aroundDetail = "周边无办事网点"
        }
        that.tempdata = data
        const fireEvent = this.$route.query
        // console.log(this.fireId);
        document.onreadystatechange = function () {
          if(document.readyState=="complete") {
            if (fireEvent["id"]) {
              let node = $(`#finish`)
              if (node) {
                node.remove();
                $(`#temp`).after(`<div id = 'finish'></div>`)
              }else{
                $(`#temp`).after(`<div id = 'finish'></div>`)
              }
              console.log("已添加finish节点"); 
            }
          }
        }
      })
      // this.$store.dispatch('map/changeFeaturesData', data)
    },
    ssxyPersonList(val) {
      this.ssxyPersonLayer && this.$map.removeLayer(this.ssxyPersonLayer);
      const features = val;
      features.map((v) => v.setStyle(this.$map.getFhryStyle(v)));
      this.ssxyPersonLayer = this.$map.createVectorLayer(features);
      this.$map.addLayer(this.ssxyPersonLayer);
    },
    monitorList(val) {
      this.monitorLayer && this.$map.removeLayer(this.monitorLayer);
      const features = val;
      features.map((v) => v.setStyle(this.$map.getMonitorStyle(v)));
      this.monitorLayer = this.$map.createVectorLayer(features);
      this.$map.addLayer(this.monitorLayer);
    },
    clearFlag() {
      // 清除路径
      this.clearPath();
      this.close();
      this.clearSsxyPersonLayer();
      this.clearMonitorLayer();
      this.clearPoint()
      this.$store.commit("jjya/SET_MONITOR_LIST", []);
      this.terminalLayer && this.$map.removeLayer(this.terminalLayer);
    },
    lineLayerList(val) {
      this.lastLineLayerList &&
        this.lastLineLayerList.forEach((item) => {
          this.$map.removeLayer(item.path.lineLayers);
        });
      val.forEach((item) => {
        this.$map.addLayer(item.path.lineLayers);
      });
      this.lastLineLayerList = val;
      // this.$map.addLayer(lineLayers)
    },
  },
  methods: {
    titeEnter(e) {
      const target = e.target;
      const { clientWidth, scrollWidth, title } = target;
      if (!title && scrollWidth > clientWidth) target.title = target.innerText;
    },
    handleCheckedLineChange(val) {
      const checkedCount = val.length;
      this.checkAll = checkedCount === this.pathList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.pathList.length;
    },

    handleCheckAllChange(val) {
      this.lineLayerList = val ? this.pathList : [];
      this.isIndeterminate = false;
    },

    ZoomToFeature(feature) {
      this.$map.getMap().getView().setCenter(feature.getGeometry().getCoordinates());
      this.$map.getMap().getView().setZoom(18);
    },
    handleLabelClick(item) {
      // debugger
      this.selectedItem = item;
      this.ljxqDetailVisible = true;
      // debugger
    },
    handleVideoClick(item) {
      //样式待修改
      this.$map.getMap().getView().setCenter([item.X,item.Y]);
      this.$map.getMap().getView().setZoom(16);

      this.$bus.$emit("videoData",item);

      // this.ZoomToFeature(item);
      // getVideoByCode(item.values_["indexCode"]).then((res) => {
      //   this.$store.dispatch("lqfb/changeVideoUrl", res.data);
      // });
    },
    close() {
      this.$store.dispatch("lqfb/changezhfxOffsetRight", -30);
    },
    getImgSrc(name) {
      return require(`../../../assets/images/icon/${name}.png`);
    },
    posTo(item) {
      // if (item.name === "应急队伍") {
      //   // this.$store.dispatch('jjya/changeJydwList', item.arr)
      //   const lenged = {
      //     name: "最近公路点",
      //     icon: "公路点.png",
      //     label: "最近公路点",
      //   };
      //   const list = this.layerList;
      //   list.push(lenged);
      //   this.$store.dispatch("map/changeLayerList", list);
      //   this.getshortPath(item.arr);
      // }
    },

    showShortPath() {
      this.pathList = [];
      this.posTo(this.featuresData.ZBZY.d_emergency_team);
    },

    async getNearestPtOnLine() {
      const feature = this.$map.createFeature([
        this.firePt.values_.geometry.flatCoordinates[0] - 0.01,
        this.firePt.values_.geometry.flatCoordinates[1] + 0.01,
      ]);
      // let { lineLayers, pathGuideFeatures } = await spUtils.findPath(
      //   feature,
      //   this.firePt,
      //   'http://10.36.234.81:8090/iserver/services/transportationAnalyst-roadClassify0831/rest/networkanalyst/MapManager_Network@MapManager'
      // )

      // 火灾点附近道路
      const lines = await spUtils.findBuffer(
        this.firePt.values_.geometry.flatCoordinates,
        "http://10.36.234.81:8090/iserver/services/data-roadnoother/rest/data",
        7
      );
      if (lines.length === 0) {
        // this.$message.error("最近公路点分析失败");
        return;
      }

      // const lineArr = lines.map(v => v.geometry.coordinates)
      // const multiLine = turf.multiLineString(lineArr)
      // const pt = turf.point(this.firePt.values_.geometry.flatCoordinates)

      // this.terminalPoint = turf.nearestPointOnLine(multiLine, pt, { units: 'miles' })

      // 先分析每条线段的最近点
      const pt = turf.point(this.firePt.values_.geometry.flatCoordinates);
      const ptArr = lines.map((v, i) => {
        let line = null;
        if (v.geometry.type === "LineString") {
          line = turf.lineString(v.geometry.coordinates);
        } else if (v.geometry.type === "MultiLineString") {
          line = turf.multiLineString(v.geometry.coordinates);
        }
        return turf.nearestPointOnLine(line, pt, { units: "miles" });
      });
      const ptCollection = turf.featureCollection(ptArr);
      this.terminalPoint = turf.nearestPoint(pt, ptCollection);
      // console.log('this.terminalPoint',this.terminalPoint)
      // if(!lineLayers) {
      //   this.$message.error('最近公路点分析失败')
      //   return
      // }
      // this.terminalPoint = pathGuideFeatures[pathGuideFeatures.length - 2]
      const terminalFeature = this.$map.createFeature(
        this.terminalPoint.geometry.coordinates
      );
      terminalFeature.setStyle(this.$map.getTerminalstylePointStyle());
      this.terminalLayer = this.$map.createVectorLayer([terminalFeature]);
      this.$map.addLayer(this.terminalLayer);
    },

    async getshortPath(jydwList) {
      this.pathList = await Promise.all(
        jydwList.map(async (v) => {
          const { lineLayers, pathGuideFeatures } = await spUtils.findPath(
            v.feature,
            this.firePt,
            "http://10.36.234.81:8090/iserver/services/transportationAnalyst-ruian/rest/networkanalyst/BuildNetwork@MapManager"
          );
          return { ...v, path: { lineLayers, pathGuideFeatures } };
        })
      );

      const { lineLayers, pathGuideFeatures } = await spUtils.findPath(
        jydwList[0].feature,
        this.firePt,
        "http://10.36.234.81:8090/iserver/services/transportationAnalyst-roadClassify0831/rest/networkanalyst/MapManager_Network@MapManager"
      );
      this.terminalPoint = pathGuideFeatures[pathGuideFeatures.length - 2];
      const terminalFeature = this.$map.createFeature(
        this.terminalPoint.values_.geometry.flatCoordinates
      );
      terminalFeature.setStyle(this.$map.getTerminalstylePointStyle());
      this.terminalLayer = this.$map.createVectorLayer([terminalFeature]);
      this.$map.addLayer(this.terminalLayer);

      this.pathList.map((v) => {
        let val = 0;
        v.path.pathGuideFeatures.map((item, index) => {
          // console.log(item.values_.description.match(/\d+(.\d+)?/g))
          val = val + Number(item.values_.description.match(/\d+(.\d+)?/g));
          if (v.path.pathGuideFeatures.length === index + 1) {
            item.values_.description = "终点（起火位置）";
          }
        });
        v.sum = Math.ceil(val);
      });
    },

    clearPath() {
      this.checkAll = false;
      this.lineLayerList = [];
    },

    clearSsxyPersonLayer() {
      this.$map.removeLayer(this.ssxyPersonLayer);
      this.ssxyPersonLayer = null;
    },

    clearMonitorLayer() {
      this.$map.removeLayer(this.monitorLayer);
      this.monitorLayer = null;
    },

    changeYADQOffsetRight() {
      this.$store.dispatch("lqfb/changeyadqOffsetRight", 0);
    },
    //  选自定义点
    doPoint() {
      if (this.diyPtLayer) {
        return this.$message.info("请清除已有自定义点！");
      }
      this.$map.doInteractionDraw("Point", async (geojson, diyFeature) => {
        this.$map.zoomToFeature(diyFeature, 13);
        diyFeature.setStyle(this.$map.getDiyPointStyle());
        const layer = this.$map.createVectorLayer([diyFeature]);
        this.$map.addLayer(layer);
        this.diyPtLayer = layer;
        await this.doDiyPath(diyFeature);
      });
    },
    //  清自定义点
    clearPoint() {
      this.diyPtLayer && this.$map.removeLayer(this.diyPtLayer);
      this.diyPtLayer = null;
      this.diyPathLayer && this.$map.removeLayer(this.diyPathLayer.path.lineLayers);
      this.diyPathLayer = null;
    },
    //  画线
    async doDiyPath(diyPyFeature) {
      const { lineLayers, pathGuideFeatures } = await spUtils.findPath(
        diyPyFeature,
        this.firePt,
        "http://10.36.234.81:8090/iserver/services/transportationAnalyst-ruian/rest/networkanalyst/BuildNetwork@MapManager"
      );
      const path = { ...diyPyFeature, path: { lineLayers, pathGuideFeatures } };
      this.diyPathLayer = path;
      this.$map.addLayer(path.path.lineLayers);
    },

    detailsBtn(val) {
      this.title = val.name;
      this.RouteDetails = false;
      const data = [];
      val.path.pathGuideFeatures.forEach((element) => {
        const list = element.values_.description;
        if (list.indexOf(".") === -1) {
          data.push(list);
        } else {
          const da = list.substring(0, list.indexOf(".")) + "米";
          data.push(da);
        }
        this.details = data;
      });
    },
    nodetaisBtn() {
      this.RouteDetails = true;
    },

  },
  mounted(){
    const that = this;
    this.$bus.$on('clearAll',()=>{
      that.close()
    })

    that.$bus.$on("fireAndId",value=>{
      console.log(value)
      // debugger
      that.$nextTick(()=>{
        that.hasID = true;
        that.address = value.address;
        that.jubaoren = value.jubaoren;
        that.jubaorentel = value.jubaorentel;
        that.time = value.time;
        const text =value['infocontent']
        that.syscode = value.systemcode
        if (text.indexOf(",")>-1) {
          const arr =text.split(',')
          that.contents = arr[0]
          that.fireIntensity = that.fireStrong[arr[1].split(":")[1]]
          that.firetype = arr[2].split(":")[1]
        }else{
          that.contents = value['infocontent']
        }
        // that.address = value.address;
        // that.address = value.address;
        // that.address = value.address;
      })
    })

    that.$bus.$on("gridInfo",gridInfo=>{
      console.log("网格信息",gridInfo)
      // debugger
      if (gridInfo && gridInfo.features.length>0) {
        that.gridPerson = '';
        that.gridPersonPhone = '';
        that.$nextTick(()=>{
          that.gridList = gridInfo.features
          that.gridList.forEach(element => {
            // debugger
            that.gridPerson += element.properties.NAME
            that.gridPerson += ' '

            that.gridPersonPhone += element.properties.TELEPHONE
            that.gridPersonPhone += ' '
          });
        }) 
      }else{
        that.$nextTick(()=>{
          that.gridPerson = '暂无数据'
          that.gridPersonPhone = '暂无数据'
        });
      }
    })
    that.$bus.$on("streetInfo",streetInfo=>{
      // console.log(streetInfo)
      if (streetInfo && streetInfo.features.length>0) {
        that.streetPerson = '';
        that.streetPersonPhone = '';
        that.$nextTick(()=>{
          const list = streetInfo.features
          list.forEach(element => {
            // debugger
            that.streetPerson += element.properties.NAME
            that.streetPerson += ' '

            that.streetPersonPhone += element.properties.TEL
            that.streetPersonPhone += ' '
          });
        }) 
      }else{
        that.$nextTick(()=>{
          that.streetPerson = '暂无数据'
          that.streetPersonPhone = '暂无数据'
        });
      }
    })
    that.$bus.$on("sysCode",value=>{
      // debugger
      that.$nextTick(()=>{
        that.syscode = value
      })
    })
  },
  beforeDestroy(){
    this.$bus.$off('clearAll')
    this.$bus.$off('fireAndId')
    this.$bus.$off('gridInfo')
    this.$bus.$off('streetInfo')
    this.$bus.$off('sysCode')
  }
};
</script>
<style lang="scss" scoped>
.zhfxlb-wrapper {
  width: 400px;
  height: calc(100vh - 60px);
  transition: right 0.6s;
  background-color: rgba(16, 21, 24, 1);
  position: absolute;
  z-index: 1000;
  top: 0;
  right: 0;
  padding: 10px;
  z-index: 1999;
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
  /deep/ .el-collapse-item__wrap {
    background-color: transparent;
    // background-color: #000;
  }
  /deep/.el-collapse{
    overflow: hidden;
  }
  .zgfx-container {
    height: 120px;
    width: 360px;
    padding-top: 4vh;
    .zgfx-box {
      padding: 10px;
      margin-left: 0px;
      width: 380px;
      margin-top: 15px;
      height: 40px;
      display: flex;
      align-items: center;
      background-color: rgb(11, 35, 57);
      .item {
        flex: 1;
        display: flex;
        height: 28px;
        line-height: 28px;
        align-items: center;
        justify-content: center;
        color: rgba(62, 171, 255, 1);
        font-size: 15px;
        .svg-icon {
          width: 28px;
          height: 28px;
          margin-right: 5px;
        }
        > span {
          font-size: 12px;
        }
        .river {
          color: #07e7f7;
        }
        .road {
          color: #f9a528;
        }
        .cover {
          color: #b7b0b0;
        }
      }
      .active {
        color: rgba(0, 238, 190, 1);
      }
    }
  }
  .ljxq-container {
    // height: 450px;
    height: calc(100% - 60px);
    width: 100%;
    padding-top: 1vh;

    .titleLine{
      display: flex;
      padding-right: 1vh;
      width: 100%;

      .titleHistory {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // margin-top: 6px;
        // margin-bottom: 6px;
        height: 22px;
        font-weight: bold;
        line-height: 22px;
        position: relative;

        height: 2rem;
        font-family: youshebiaotihei;
        font-size: 2.3vh;

        }

        .title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 6px;
        margin-bottom: 6px;
        height: 22px;
        font-weight: bold;
        line-height: 22px;
        position: relative;

        height: 2rem;
        font-family: youshebiaotihei;
        font-size: 2.3vh;
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

    .result-wrapper {
      margin-top: 1vh;
      width: 100%;

      font-family: PingFang;
      color: #fff;
      .result-list {
        height: 100%;
        overflow-y: auto;
        padding-left: 0.5vh;
        padding-right: 0.1vh;
        // background-image: url("~@/assets/images/火灾框.png");

        .result-data {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.1vh 0 0.1vh 0vh;
          line-height: 3.8vh;
          font-size: 1.4vh;
          height: 3.5vh;
          font-family: "PingFang SC";
          color: #ffffff;

          .iconAndName{
            width: 20vh;
          }

          .indexList {
            text-align: center;
            width: 11vh;

          }
          .line{
            position: relative;
            left: -0.5vh;
            float:left;
            width: 0.15vh;
            height: 2.5vh;
            background: #fff;
          }
          .gridIcon{
            padding-left: 1vh;

          }
          .icon{
            padding-left: 0.5vh;
            padding-right: 0.7vh;
          }
          .contentList {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            overflow: hidden;
            // cursor: pointer;

            // &.active {
            //   background: rgba(9, 226, 241, 0.6);
            // }
          }
        }

        li:nth-child(even) {
          // background:rgba(5, 88, 63, 0.29);
          background-image: url("~@/assets/images/1.png");
          background-size: 100% 100%;
        }
        li:nth-child(odd) {
          //background: linear-gradient(rgba(76, 227, 212, 0.7), rgba(23, 145, 120, 0.7), rgba(5, 88, 63, 0.29)); 
          background-image: url("~@/assets/images/2.png");
          background-size: 100% 100%;
        }
      }

      .result-list-around {
        height: 100%;
        overflow-y: auto;
        padding-left: 0.5vh;
        padding-right: 0.1vh;
        // background-image: url("~@/assets/images/火灾框.png");

        .result-data {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.1vh 0 0.1vh 0vh;
          line-height: 5.8vh;
          font-size: 1.4vh;
          height: 5.5vh;
          font-family: "PingFang SC";
          color: #ffffff;
          margin-bottom: 1.3vh;
          
          .iconAndName{
            width: 20vh;
          }

          .indexList {
            text-align: center;
            width: 11vh;
            background-image: url("~@/assets/images/2.png");
            background-size: 100% 100%;
          }
          .line{
            position: relative;
            float: left;
            width: 0.1vh;
            height: 5.8vh;
            background: #fff;
          }
          .gridIcon{
            padding-left: 1vh;

          }
          .icon{
            padding-left: 0.5vh;
            padding-right: 0.7vh;
          }
          .contentList {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            overflow: hidden;
            padding-left: 0.5vh;
            background-image: url("~@/assets/images/1.png");
            background-size: 100% 100%;
            // &.active {
            //   background: rgba(9, 226, 241, 0.6);
            // }
          }
        }

        // li:nth-child(even) {
        //   // background:rgba(5, 88, 63, 0.29);
        //   background-image: url("~@/assets/images/1.png");
        //   background-size: 100% 100%;
        // }
        // li:nth-child(odd) {
        //   //background: linear-gradient(rgba(76, 227, 212, 0.7), rgba(23, 145, 120, 0.7), rgba(5, 88, 63, 0.29)); 
        //   background-image: url("~@/assets/images/2.png");
        //   background-size: 100% 100%;
        // }
      }

    }


    .ljxq-box {
      height: 260px;
      .route-box {
        padding-top: 20px;
        img {
          display: inline-block;
        }
        .title {
          height: 29px;
          background-color: #092e4f;
          font-size: 14px;
          width: 100%;
          display: flex;
          align-items: center;
          span {
            display: flex;
            flex: 4;
            align-items: center;
            img {
              margin-right: 3px;
            }
          }
        }
        ul {
          height: 212px;
          list-style: none;
          margin: 0;
          padding: 0;
          font-size: 14px;
          overflow-y: auto;
          li {
            padding: 5px 0;
            width: 100%;
            display: flex;
            align-items: center;
            span {
              flex: 4;
              width: 180px;
              overflow: hidden;
              display: inline-block;
              white-space: nowrap;
              text-overflow: ellipsis;
              img {
                margin-right: 4px;
              }
            }
          }
          li:hover {
            background: url("../../../assets/images/矩形 515.png") no-repeat;
            background-size: 100%;
            color: hsla(153, 98%, 53%, 1);
            border: 1px solid hsla(153, 98%, 53%, 1);
            cursor: pointer;
          }
        }
        .check-box {
          flex: 1;
          padding-left: 10px;
          display: flex;
          align-items: center;
          .el-checkbox__inner {
            width: 22px;
            height: 22px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgb(9, 46, 79);
            border: 0.5px solid #1794c2;
          }
          .el-checkbox__inner::after {
            border-color: #12fd94;
            left: 8px;
            top: 3px;
          }
          .el-checkbox__inner::before {
            background-color: #12fd94;
            height: 5px;
            top: 7px;
            transform: scale(0.7);
          }
          .is-checked .el-checkbox__inner {
            background-color: rgb(10, 80, 60);
            border-color: rgb(0, 206, 136);
          }
          .is-checked .el-checkbox__inner::after {
            border-right: 2px solid #12fd94;
            border-bottom: 2px solid #12fd94;
            left: 8px;
            top: 3px;
            transform: rotate(45deg) scale(2);
          }
        }
        ul::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ul::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.8);
          width: 4px;
          height: 30px;
        }
        ul::-webkit-scrollbar-track {
          border-radius: 0;
          background: rgba(255, 255, 255, 0.2);
        }
      }
      .routeDetail-box {
        padding-top: 12px;
        .title {
          height: 26px;
          margin: 0;
          padding: 3px 24px 3px 12px;
          background-color: #092e4f;
          font-size: 14px;
          span:first-of-type {
            display: flex;
            align-items: center;
            img {
              margin-right: 3px;
              width: 13.23px;
              height: 13.23px;
            }
          }
          span:last-of-type {
            width: 47px;
            height: 19px;
            font-size: 12px;
            display: inline-block;
            background-image: linear-gradient(#0d73c1, #38cbee);
            border-radius: 2px;
            cursor: pointer;
            span {
              background: url("../../../assets/images/返回icon(1).png") no-repeat;
              background-size: 9px 9px;
              background-position: 5px 6px;
              padding-left: 18px;
            }
          }
        }
        .rD-con {
          height: 189px;
          background: url("../../../assets/images/图.png") no-repeat;
          background-size: contain;
          margin: 6px 0 0 2px;
          position: relative;
          .StepBar {
            height: 168px;
            overflow-y: auto;
            margin-left: 177px;
          }
          .road {
            position: absolute;
            top: 146px;
            left: 7px;
            font-size: 14px;
            display: flex;
            align-items: center;
            span {
              display: inline-block;
              width: 22px;
              height: 22px;
              margin-right: 6px;
            }
            span:first-of-type {
              background-color: #9912f1;
            }
            span:last-of-type {
              background-color: #fc4f0d;
              margin-left: 12px;
            }
          }
          .StepBar::-webkit-scrollbar {
            width: 4px;
            height: 4px;
          }
          .StepBar::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.8);
            width: 4px;
            height: 30px;
          }
          .StepBar::-webkit-scrollbar-track {
            border-radius: 0;
            background: rgba(255, 255, 255, 0.2);
          }
        }
      }
    }
    .ljxq-content {
      width: 100%;
      /* height: 120px; */
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      overflow-y: scroll;
      .item {
        // background-color: rgb(11, 35, 57);
        background-image: url('~@/assets/images/1.png');
        background-size: 100% 100%;
        flex: 1;
        width: 185px;
        height: 40px;
        align-items: center;
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        font-size: 14px;
        .label {
          width: 140px;
          height: 40px;
          line-height: 40px;
        }
      }
      .item:hover {
        background: url("../../../assets/images/矩形 515.png") no-repeat;
        background-size: 100%;
        color: hsla(153, 98%, 53%, 1);
        border: 1px solid hsla(153, 98%, 53%, 1);
        cursor: pointer;
      }
      ul {
        margin: 0;
        padding-left: 10px;
        li {
          padding: 10px 0 10px 27px;
          margin-top: 10px;
          cursor: pointer;
          list-style: none;
          // background: url("../../../assets/images/框(2).png") no-repeat;
          background-image: url('~@/assets/images/1.png');
          background-size: 100% 100%;
        }
      }
      .ljxq-detail {
        width: 100%;
        div {
          height: 4vh;
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          padding: 3px 0 3px 22px;
          // background: #092e4f;
          background-image: url('~@/assets/images/1.png');
          background-size: 100% 100%;
          align-items: center;
          span:first-of-type {
            span {
              display: inline-block;
              // margin-left: 4px;
              color: #eff95f;
              font-size: 20px;
            }
          }
        }
        ul{
          height: 30vh;
          overflow-y: auto;
          li{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 4vh;
          }
        }
      }
    }
    .go-back {
      width: 6vh;
      height: 3vh;
      font-size: 1.2vh;
      line-height: 3vh;
      
      // margin-right: 0.5vh;
      display: inline-block;
      // background-image: linear-gradient(#0d73c1, #38cbee);
      background-image: url('~@/assets/images/2.png');
      border-radius: 0.4vh;
      cursor: pointer;
      span {
        position: relative;
        left: 0.5vh;
        background: url("../../../assets/images/返回icon(1).png") no-repeat;
        background-size: 9px 9px;
        background-position: 5px 2px;
        padding-left: 18px;
      }
    }
    .ljxq-content::-webkit-scrollbar {
      display: none;
    }

    .el-collapse {
      height: calc(100% - 100px);
    }
  }
  .zbjksz-container {
    height: 300px;
    width: 100%;
    .el-collapse {
      width: 100%;
    }
    ul {
      padding-left: 0;
      list-style: none;
      // height: 230px;
      overflow: auto;
      font-family: PingFang SC;
      font-size: 16px;
      height: 50vh;
      overflow-y: auto;
      li {
        height: 32px;
        font-size: 16px;
        line-height: 32px;
        padding: 0px 0 0px 27px;
        // margin-top: 10px;
        list-style: none;
        background: url("~@/assets/images/1.png") no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        &.active {
          // background: #103E29;
          // border: 1px solid #0F7247;
          // color: #52FEB3;
        }
      }
      li:hover {
        // color: hsla(180, 100%, 47%, 1);
      }
    }
    ul::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    ul::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.8);
      width: 4px;
      height: 30px;
    }
    ul::-webkit-scrollbar-track {
      border-radius: 0;
      background: rgba(255, 255, 255, 0.2);
    }
  }
  .title {
    margin-top: 6px;
    margin-bottom: 6px;
    font-size: 16px;
    height: 22px;
    display: flex;
    font-weight: bold;
    line-height: 22px;
    justify-content: space-between;
    .btn-yadq {
      width: 80px;
      height: 30px;
      text-align: center;
      font-size: 16px;
      padding: 0;
    }
  }
  .el-tabs--left .el-tabs__header.is-left {
    width: 130px;
  }
  .el-step__icon {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #fff;
  }
  .el-step__title {
    font-size: 14px;
    color: #fafafa;
  }
  .el-step.is-vertical .el-step__head {
    width: 5px;
  }
  .el-step__icon-inner {
    display: none;
  }
  .el-step.is-vertical .el-step__line {
    left: 2px;
  }
  .el-step:last-of-type .el-step__line {
    display: block;
  }
  .el-step.is-vertical:last-of-type .el-step__main {
    padding-left: 4px;
  }
  .el-step.is-vertical:last-of-type .el-step__title {
    width: 170px;
    height: 23px;
    line-height: 23px;
    background: url("../../../assets/images/联合18.png") no-repeat;
    background-size: 170px;
    padding-left: 16px;
  }
  .el-icon-arrow-right {
    transform: none;
  }
  .el-icon-arrow-right:before {
    content: "\E723";
  }
  .el-collapse .is-active .el-collapse-item__header .el-icon-arrow-right::before {
    content: "\E722";
    // background-image: url('~@/assets/images/1.png');
    // background-size: 100% 100%;
  }

  /deep/ .el-collapse-item__header{
    background-image: url('~@/assets/images/2.png');
    background-size: 100% 100%;
  }

}
</style>
