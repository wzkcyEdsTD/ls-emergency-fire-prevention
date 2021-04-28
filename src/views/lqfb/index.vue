<template>
  <div class="lqfb-container">
    <!-- <m-header></m-header> -->
    <sider-bar />
    <info-pannel ref="infoPannel" />
    <rydw-pannel ref="rydwPannel" />
    <rightMenu/>
    <!-- <rydw-tool-bar /> -->
    <rydw-popup />
    <!-- <firePopup/> -->
    <legend-box />
    <overview />
    <zhfx />
    <qdtj v-show="yadqPannel === '预案启动条件'" />
    <sgfj />
    <zztx v-show="yadqPannel === '组织指挥体系及职责'" />
    <video-box />
    <zllb-tab ref="zlTab" />
    <video-list-pannel ref="videoListPannel"/>
    <videoList ref="videoList"/>
    <tt-video-list/>
    <xly-video-list/>
    <xftd-video-list/>
    <slsp-video-list/>
    <!-- <div class="video-wrapper">
      <video id="my-video" class="video-js vjs-default-skin" controls preload="auto" poster="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg">
        <source src="http://10.20.103.167:83/ncg/10.20.103.166/7099/0/33038111001322200202/MAIN/TCP/live.m3u8?checkinfo=ewogICAidGltZSIgOiAiMjAyMDA3MTVUMjIyOTMyWiIsCiAgICJ1cmwiIDogImh0dHA6Ly8xMC4yMC4xMDMuMTY3OjgzL25jZy8xMC4yMC4xMDMuMTY2LzcwOTkvMC8zMzAzODExMTAwMTMyMjIwMDIwMi9NQUlOL1RDUC9saXZlLm0zdTgiCn0K&idinfo=EAAAAAAQAAC4gm0bX7cgKBhtPkyaBnSxWWEUGZS7zTyPvg5%2FCOj%2BqUzgKBuq8pvgEAh8gRsn5VM%3D" type="application/x-mpegURL">
      </video>
    </div> -->
    <!-- <jylj /> -->
  </div>
</template>

<script>
import MHeader from "@/components/m-header/m-header";
import videoList from './components/videoList'
import SiderBar from './components/SiderBar'
import RydwPopup from './components/RydwPopup'
// import firePopup from './components/firePopup'
import RydwPannel from './components/RydwPannel'
import rightMenu from './components/rightMenu'
import Qdtj from './components/Qdtj'
import Sgfj from './components/Sgfj'
import Zztx from './components/Zztx'
import Overview from './components/Overview'
import Zhfx from './components/Zhfx'
import LegendBox from '@/components/Legend'
import RydwToolBar from './components/RydwToolBar'
import VideoBox from './components/VideoBox'
import zllbTab from './components/zllbTab'
import videoListPannel from './components/videoListPannel'

import Overlay from 'ol/Overlay'
import InfoPannel from './components/InfoPannel'
import attrData from './components/attrDictionary'
import MAP_URL from '@/utils/map/map-url'

import detailAxios from "@/libs/cimAPI"
import  LineString  from 'ol/geom/LineString'
import {
  TileSuperMapRest,
  FeatureService,
  SuperMap
} from '@supermap/iclient-ol'
import util from "@/libs/qxinfoAPI"
import TtVideoList from './components/ttVideoList';
import XlyVideoList from './components/xlyVideoList';
import XftdVideoList from './components/xftdVideoList';
import SlspVideoList from './components/slspVideoList';

import MultiLineString  from 'ol/geom/MultiLineString';

export default {
  name: 'Lqfb',
  components: {
    MHeader,
    videoList,
    rightMenu,
    SiderBar,
    // firePopup,
    RydwPopup,
    LegendBox,
    InfoPannel,
    Qdtj,
    Sgfj,
    Zztx,
    Overview,
    RydwPannel,
    Zhfx,
    RydwToolBar,
    VideoBox,
    zllbTab,
    videoListPannel,
    TtVideoList,
    XlyVideoList,
    XftdVideoList,
    SlspVideoList,

  },
  data() {
    return {
      infoPopup: null,
      rydwPopyp: null,
      firePopyp: null,
      fireId:null,
      r:'',
      temperature:'',
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
      }
    }
  },
  computed: {
    mode() {
      return this.$store.getters.lqfbMode
    },
    clearAllFlag() {
      return this.$store.getters.clearAllFlag
    },
    activeMenu() {
      return this.$store.getters.lqfbActiveMenu
    },
    offsetRight() {
      return this.$store.getters.infoPanelOffsetRight
    },
    yadqPannel() {
      return this.$store.getters.yadqPannel
    },
    layerList() {
      return this.$store.getters.layerList
    },
    jkspUrl() {
      return this.$store.getters.jkspUrl
    },
    jkLayer() {
      return this.$store.getters.jkLayer
    },
    drawLayer() {
      return this.$store.getters.drawLayer
    }
  },
  watch:{
    clearAllFlag(val) {
      const that = this;
      if (val) {
        that.clearPopup();
      }
    }
  },
  beforeDestroy() {
    this.$map.getMap().un('click', this.showPopup)
    this.infoPopup.setPosition(undefined)
    this.$bus.$off("showPoup")
    this.$bus.$off("showPoupItem")
    this.$bus.$off("qingKong")
    this.$bus.$off("clearVideoMaker")
    this.jkLayer && this.$store.dispatch('map/changeJkLayer', {
      layer: this.jkLayer,
      ope: 'REMOVELAYER'
    })
  },
  mounted() {
    const that = this;
    if (this.drawLayer) this.drawLayer.setVisible(false)
        this.initPopup()
    this.$map.goHome()
    this.$map.getMap().on('click', this.showPopup)
    this.$bus.$on("clearVideoMaker",value=>{
      that.$refs.videoList.addGifMarks(undefined)
    })
    this.$store.dispatch('lqfb/changezlOffsetRight', 0)
    this.$bus.$on("showPoup",item=>{

      that.showPopupItem(item);
    });
    this.$bus.$on("showPoupItem",item=>{
      that.showPopupSearchItem(item);
    })
    this.$bus.$on("qingKong",val=>{
      if (val) {
        that.clearPopup();
      }
    })
  },
  methods: {
    initPopup() {
      document.getElementById('popup-info').style.display = 'block'
      document.getElementById('popup-rydw').style.display = 'block'
      document.getElementById('popup-fire').style.display = 'block'
      this.infoPopup = new Overlay({
        element: document.getElementById('popup-info'),
        stopEvent: true
      })
      this.rydwPopyp = new Overlay({
        element: document.getElementById('popup-rydw'),
        stopEvent: false
      })
      this.firePopyp = new Overlay({
        element: document.getElementById('popup-fire'),
        stopEvent: true
      })
      this.$map.getMap().addOverlay(this.infoPopup)
      this.$map.getMap().addOverlay(this.rydwPopyp)
      this.$map.getMap().addOverlay(this.firePopyp)
      const infoCloser = document.getElementById(`popup-info-closer`)
      const rydwCloser = document.getElementById(`popup-rydw-closer`)
      const fireCloser = document.getElementById(`popup-fire-closer`)
      // 显示value
      // 点击要素关闭popup
      infoCloser.onclick = () => {
        this.infoPopup.setPosition(undefined)
        infoCloser.blur()
        return false
      }
      rydwCloser.onclick = () => {
        this.rydwPopyp.setPosition(undefined)
        rydwCloser.blur()
        return false
      }
      fireCloser.onclick = () => {
        // console.log("qwe")
        this.firePopyp.setPosition(undefined)
        fireCloser.blur()
        return false
      }
    },
    
    //火灾点自动弹框
    async showPopupItem(item) {
      const that = this;
      that.$store.dispatch("lqfb/changeInfoPanelOffsetRight",-30);
      let node = $(`#e_container`)
      if (node) {
        node.css("z-index","2")
      }
      let node1 = $(`.ol-overlaycontainer-stopevent`)
      if (node1) {
        node1.css("z-index","5")
      }

      this.clearPopup()


      const keyName = document.getElementById('key-name')
      const keyValue = document.getElementById('key-value')
      // const keyNameFire = document.getElementById('key-name-fire')
      const keyValueFire = document.getElementById('key-value-fire')
      const jbr = document.getElementById("key-value-fire-jbr")
      const jbrtel = document.getElementById('key-value-fire-jbrtel')
      const firetype = document.getElementById("key-value-fire-type")
      const fireIntensity = document.getElementById('key-value-fire-intensity')
      const contents = document.getElementById('key-value-fire-cont')
      const time = document.getElementById('key-value-fire-time')

      const popInfoDetail = document.getElementById('pop-info-deatil')


      const value = item
      that.$refs.videoList.addGifMarks(undefined)
      if (value['VIDEO_URL'] || value['VIDEO_URL']=="") {
        // 查询监控视频
        if (value['VIDEO_URL']) {          
          this.$bus.$emit("videoData",value);
        }
        return
      }
      if (value['OBJECTID']) {
        return
      }
      // 是否为火灾点
      // debugger
      if ((value['systemcode'])) {
        // debugger
        // that.searchGrid(new Point([value.x,value.y]));
        this.$bus.$emit("fire",value);
        this.$bus.$emit("gridInfo",null);
        this.$bus.$emit("streetInfo",null);
        this.$store.dispatch("lqfb/changeInfoPanelOffsetRight",-30);
      }else{
      }

      // debugger
      if (!value['systemcode'] && !value['BSWD_TYPE']) {
        if ((!value['NAME'] && !value['label'])) return
      }

      // 显示属性框
      if (!(value['systemcode'])) {
        this.infoPopup.setPosition(coordinate)
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

      }else{
        // console.log(11111111)
        keyName.innerHTML = `${attrData[value['TABLE_NAME']]['NAME']}：`
        keyValue.innerHTML = `${value['NAME']}`
      }
    },

    //除了火灾点其他点位的自动弹框
    async showPopupSearchItem(feature){
      const that = this;
      that.$store.dispatch("lqfb/changeInfoPanelOffsetRight",-30);
      let node = $(`#e_container`)
      if (node) {
        node.css("z-index","2")
      }
      let node1 = $(`.ol-overlaycontainer-stopevent`)
      if (node1) {
        node1.css("z-index","5")
      }
      this.clearPopup()

      const keyName = document.getElementById('key-name')
      const keyValue = document.getElementById('key-value')
      const keyName1 = document.getElementById('key-name-1')
      const keyValue1 = document.getElementById('key-value-1')
      // const keyNameFire = document.getElementById('key-name-fire')
      const keyValueFire = document.getElementById('key-value-fire')
      const jbr = document.getElementById("key-value-fire-jbr")
      const jbrtel = document.getElementById('key-value-fire-jbrtel')
      const firetype = document.getElementById("key-value-fire-type")
      const fireIntensity = document.getElementById('key-value-fire-intensity')
      const contents = document.getElementById('key-value-fire-cont')
      const time = document.getElementById('key-value-fire-time')

      const popInfoDetail = document.getElementById('pop-info-deatil')
      // debugger
      const value = feature.values_
      let coordinate = []
      that.$refs.videoList.addGifMarks(undefined)
      if (value['IIIII']) {
        coordinate = [value.LONGITUDE,value.LATITUDE]
      }else{
        coordinate = [value.geometry.flatCoordinates[0],value.geometry.flatCoordinates[1]]
      }
      if (value['VIDEO_URL'] || value['VIDEO_URL']=="") {
        // 查询监控视频
        that.$refs.videoList.addGifMarks([value.X,value.Y])
        if (value['VIDEO_URL']) {          
          this.$bus.$emit("videoData",value);
        }
        return
      }
      // //办事网点
      // if (value['BSWD_TYPE']) {
      //   return
      // }
      // if (value['OBJECTID']) {
      //   return
      // }
      // 是否为火灾点
      // debugger
      if ((value['systemcode'])) {
        // debugger
        // that.searchGrid(new Point([value.x,value.y]));
        this.$bus.$emit("fire",value);
        this.$bus.$emit("gridInfo",null);
        this.$bus.$emit("streetInfo",null);
        this.$store.dispatch("lqfb/changeInfoPanelOffsetRight",-30);
      }else{
      }
      // debugger
      if (!value['systemcode'] && !value['IIIII'] &&!value['ZZMC']) {
        if (!value['NAME']) return
      }
      if (value['IIIII']) {        
        that.r = await util.getQXDetail(value['IIIII']);
      }
      // 显示属性框
      if (!(value['systemcode'])) {
        this.infoPopup.setPosition(coordinate)
      }

      this.$store.dispatch('map/changeIsShowDetail', true)
      let table; let infoTmpl = ``

      this.$store.dispatch('lqfb/changeIsXFDW', '')
      table = document.getElementById('table-box')

      if (!(value['systemcode'])) {

        if(value['BSWD_TYPE']){

          infoTmpl += `<div  class="item">
                  <span class="key">名称：</span>
                  <span class="value" title="${value["NAME"]}">${value["NAME"]}</span>
              </div>`
          infoTmpl += `<div  class="item">
              <span class="key">类型：</span>
              <span class="value" title="${value["BSWD_TYPE"]}">${value["BSWD_TYPE"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">地址：</span>
              <span class="value" title="${value["DZ"]}">${value["DZ"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">联系电话：</span>
              <span class="value" title="${value["LXDH"]}">${value["LXDH"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">工作时间：</span>
              <span class="value" title="${value["GZSJ"]}">${value["GZSJ"]}</span>
          </div>`

        }else if(value['DATATYPE'] && value['DATATYPE'].indexOf('救援队伍')!=-1){
          infoTmpl += `<div  class="item">
                  <span class="key">负责人：</span>
                  <span class="value" title="${value["LINK_MAN"]}">${value["LINK_MAN"]}</span>
              </div>`
          infoTmpl += `<div  class="item">
              <span class="key">类型：</span>
              <span class="value" title="${value["NAME"]}">${value["NAME"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">地址：</span>
              <span class="value" title="${value["STREET"]}">${value["STREET"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">联系电话：</span>
              <span class="value" title="${value["PHONE"]}">${value["PHONE"]}</span>
          </div>`
        }else if(value['IIIII']){

          const detailInfo = that.r['[]'][0]['SzlsDwSjjhQxjHourlyelement']
          detailInfo['风向'] = that.getWindDirect(Number(detailInfo.winddirect))
          detailInfo['摄氏度'] = that.changeTemperatureType(Number(detailInfo.temperature))
          that.temperature = detailInfo['摄氏度'];
          // //气压
          // if (detailInfo['stationpress'].indexOf('32768')!= -1 ) {
          //   detailInfo['stationpress'] = '-'
          // }else{
          //   detailInfo['stationpress'] = Number(detailInfo['stationpress']) / 10
          //   detailInfo['stationpress'] += " hPa"
          // }
          // //水汽压
          // if (!(detailInfo['vapourpress'].indexOf('32768')!=-1)) {
          //   detailInfo['vapourpress'] = Number(detailInfo['vapourpress']) / 10
          //   detailInfo['vapourpress'] += " hPa"
          // }else{
          //   detailInfo['vapourpress'] = '-'
          // }
          //湿度
          if ((detailInfo['relhumidity'])&&(!(detailInfo['relhumidity'].indexOf('32768')!=-1))) {
            detailInfo['relhumidity'] += " %"
          }else{
            detailInfo['relhumidity'] = '-'
          }
          // debugger

          // console.log("气象站指标",detailInfo)
          infoTmpl += `<div  class="item">
              <span class="key">名称：</span>
              <span class="value" title="${value['ADDRESS']}">${value['ADDRESS']}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">温度：</span>
              <span class="value" title="${detailInfo["摄氏度"]}">${detailInfo["摄氏度"]} ℃</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">风向：</span>
              <span class="value" title="${detailInfo["风向"]}">${detailInfo["风向"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">风速：</span>
              <span class="value" title="${detailInfo["windspeed"]}">${Number(detailInfo["windspeed"])} m/s</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">降雨量：</span>
              <span class="value" title="${detailInfo["precipitation"]}">${Number(detailInfo["precipitation"])} mm</span>
          </div>`
          // infoTmpl += `<div  class="item">
          //     <span class="key">时间：</span>
          //     <span class="value" title="${detailInfo["biz_time"]}">${detailInfo["biz_time"]}</span>
          // </div>`
          infoTmpl += `<div  class="item">
              <span class="key">湿度：</span>
              <span class="value" title="${detailInfo["relhumidity"]}">${detailInfo["relhumidity"]}</span>
          </div>`
          // debugger
          table.innerHTML = infoTmpl

        }else if(value['ZZMC']){
          infoTmpl += `<div  class="item">
              <span class="key">名称：</span>
              <span class="value" title="${value['ZZMC']}">${value['ZZMC']}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">地址：</span>
              <span class="value" title="${value["ZDDZ"]}">${value["ZDDZ"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">站址编码：</span>
              <span class="value" title="${value["ZZBM"]}">${value["ZZBM"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">地市：</span>
              <span class="value" title="${value["CITY"]}">${value["CITY"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">县市：</span>
              <span class="value" title="${value["DISTRICT_1"]}">${value["DISTRICT_1"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">乡镇：</span>
              <span class="value" title="${value["STREET"]}">${value["STREET"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">场景划分：</span>
              <span class="value" title="${value["CJHF"]}">${value["CJHF"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">铁塔类型：</span>
              <span class="value" title="${value["TTLX"]}">${value["TTLX"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">铁塔高度：</span>
              <span class="value" title="${value["TTGD"]}">${value["TTGD"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">机房类型：</span>
              <span class="value" title="${value["JFLX"]}">${value["JFLX"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">供电类型：</span>
              <span class="value" title="${value["GDLX"]}">${value["GDLX"]}</span>
          </div>`
        }else{
          for (const key in attrData[value['TABLE_NAME']]) {
            if (value[key] != undefined) {
              infoTmpl += `<div  class="item">
                              <span class="key">${attrData[value['TABLE_NAME']][key]}：</span>
                              <span class="value">${value[key]}</span>
                          </div>`
            }
          }
        }
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

      }else{
        if (value['BSWD_TYPE']) {
          keyName.innerHTML = `名称：`
          keyValue.innerHTML = `${value['NAME']}`
          keyName1.innerHTML = "地址："
          keyValue1.innerHTML = `${value['DZ']}`
        }else if(value['IIIII']){
          keyName.innerHTML = `名称：`
          keyValue.innerHTML = `${value['ADDRESS']}`
          keyName1.innerHTML = "温度："
          keyValue1.innerHTML = `${that.temperature}℃`
        }else if(value['ZZMC']){
          keyName.innerHTML = `名称：`
          keyValue.innerHTML = `${value['ZZMC']}`
          keyName1.innerHTML = "地址："
          keyValue1.innerHTML = `${value['ZDDZ']}`
        }else if(value['HLX']){
          keyName.innerHTML = `姓名：`
          keyValue.innerHTML = `${value['XM']}`
          keyName1.innerHTML = "地址："   
          keyValue1.innerHTML = `${value['JZDZ']}`
        }else if(value['OBJECTID'] && value['TYPE']){
          keyName.innerHTML = `名称：`
          keyValue.innerHTML = `${value['NAME']}`
          keyName1.innerHTML = "地址："
          keyValue1.innerHTML = `${value['ADDRESS']}`
        }else{
          keyName.innerHTML = `${attrData[value['TABLE_NAME']]['NAME']}：`
          keyValue.innerHTML = `${value['NAME']}`
          // debugger
          keyName1.innerHTML = `类型：`
          keyValue1.innerHTML = `${value['TYPE']}`
        }
      }
    },

    //手动点击时弹框
    async showPopup(evt) {
      const that = this;
      // debugger
      let node = $(`#e_container`)
      if (node) {
        node.css("z-index","2")
      }
      let node1 = $(`.ol-overlaycontainer-stopevent`)
      if (node1) {
        node1.css("z-index","5")
      }
      this.clearPopup()
      console.log(evt.pixel);
      // debugger
      let feature = this.$map
        .getMap()
        .forEachFeatureAtPixel(evt.pixel, function(feature) {
          return feature
        })
      const coordinate = evt.coordinate
      console.log({ feature })
      if (!feature) {
        return
      }
      if (!feature) {
        const filters = this.layerList.filter(v => v.label === '巡逻范围')
        if (filters.length > 0) {
          // WMS坐标查询属性
          feature = await this.$map.getFeaturesByCoordinate({
            lon: coordinate[0],
            lat: coordinate[1],
            url: MAP_URL.dataUrl,
            dataSourceName: 'pg_wzyjdb',
            layerName: 'SLFH_FHRY'
          })
          feature && (feature.values_['TABLE_NAME'] = 'SLFH_FHRY')
        }
      }

      const keyName = document.getElementById('key-name')
      const keyValue = document.getElementById('key-value')
      const keyName1 = document.getElementById('key-name-1')
      const keyValue1 = document.getElementById('key-value-1')
      // const keyNameFire = document.getElementById('key-name-fire')
      const keyValueFire = document.getElementById('key-value-fire')
      const jbr = document.getElementById("key-value-fire-jbr")
      const jbrtel = document.getElementById('key-value-fire-jbrtel')
      const firetype = document.getElementById("key-value-fire-type")
      const fireIntensity = document.getElementById('key-value-fire-intensity')
      const contents = document.getElementById('key-value-fire-cont')
      const time = document.getElementById('key-value-fire-time')

      const popInfoDetail = document.getElementById('pop-info-deatil')

      const value = feature.values_

      that.$refs.videoList.addGifMarks(undefined)
      // debugger
      if (value['geometry'] instanceof  MultiLineString || value['geometry'] instanceof  LineString) {
        this.infoPopup.setPosition(coordinate)
        //消防车道详情
        const infoTmpl = `<div  class="item">
          <span class="key">名称：</span>
          <span class="value" title="${value["MC"]}">${value["MC"]}</span>
        </div>`
        const table = document.getElementById('table-box');
        table.innerHTML = infoTmpl
        keyName.innerHTML = `名称：`
        keyValue.innerHTML = `${value['MC']}`
        // keyName1.hide();
        // keyValue1.hide();
        // debugger
        return
      }
      if (value['VIDEO_URL'] || value['VIDEO_URL']=="") {
        // 查询监控视频
        that.$refs.videoList.addGifMarks([value.X,value.Y])
        if (value['VIDEO_URL']) {          
          this.$bus.$emit("videoData",value);
        }
        return

      }
      if (value['HLS_URL'] || value['HLS_URL']=="" || value['CAMERA_TYPE'] || value['CAMERA_TYPE']=='') {
        // debugger
        // 查询监控视频
        that.$refs.videoList.addGifMarks([value.X,value.Y])
        if (value['HLS_URL']) {          
          this.$bus.$emit("videoData",value);
        }
        return
      }
      // if (value['OBJECTID']) {
      //   return
      // }
      // 是否为火灾点
      if ((value['systemcode'])) {
        // debugger
        // that.searchGrid(new Point([value.x,value.y]));
        this.$bus.$emit("fire",value);
        this.$bus.$emit("gridInfo",null);
        this.$bus.$emit("streetInfo",null);
        this.$store.dispatch("lqfb/changeInfoPanelOffsetRight",-30);
      }
      // debugger

      if (!value['systemcode'] && !value['BSWD_TYPE'] && !value['IIIII'] && !value['HLX'] && !value['OBJECTID'] && !value['TYPE'] && !value['ZZMC']) {
        if ((!value['NAME'] && !value['label'])) return
      }
      if (value['IIIII']) {        
        that. r = await util.getQXDetail(value['IIIII']);
      }
      // 显示属性框
      if (!(value['systemcode'])) {
        this.infoPopup.setPosition(coordinate)
      }

      this.$store.dispatch('map/changeIsShowDetail', true)
      let table; let infoTmpl = ``
      // debugger

        this.$store.dispatch('lqfb/changeIsXFDW', '')
        table = document.getElementById('table-box')






      // debugger
      // console.log(123)
      if (!(value['systemcode'])) {
        //办事网点
        if (value['BSWD_TYPE']) {

          infoTmpl += `<div  class="item">
                  <span class="key">名称：</span>
                  <span class="value" title="${value["NAME"]}">${value["NAME"]}</span>
              </div>`
          infoTmpl += `<div  class="item">
              <span class="key">类型：</span>
              <span class="value" title="${value["BSWD_TYPE"]}">${value["BSWD_TYPE"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">区县：</span>
              <span class="value" title="${value["SZQX"]}">${value["SZQX"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">街道：</span>
              <span class="value" title="${value["SZZ"]}">${value["SZZ"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">级别：</span>
              <span class="value" title="${value["XZJB"]}">${value["XZJB"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">地址：</span>
              <span class="value" title="${value["DZ"]}">${value["DZ"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">联系电话：</span>
              <span class="value" title="${value["LXDH"]}">${value["LXDH"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">工作时间：</span>
              <span class="value" title="${value["GZSJ"]}">${value["GZSJ"]}</span>
          </div>`

        }else if(value['IIIII']){
          // util.getQXDetail(value['IIIII']).then(r=>{
            const detailInfo = that.r['[]'][0]['SzlsDwSjjhQxjHourlyelement']
            detailInfo['风向'] = that.getWindDirect(Number(detailInfo.winddirect))
            detailInfo['摄氏度'] = that.changeTemperatureType(Number(detailInfo.temperature))
            that.temperature = detailInfo['摄氏度']
            //气压
            // if (detailInfo['stationpress'].indexOf('32768')!= -1 ) {
            //   detailInfo['stationpress'] = '-'
            // }else{
            //   detailInfo['stationpress'] = Number(detailInfo['stationpress']) / 10
            //   detailInfo['stationpress'] += " hPa"
            // }
            // //水汽压
            // if (!(detailInfo['vapourpress'].indexOf('32768')!=-1)) {
            //   detailInfo['vapourpress'] = Number(detailInfo['vapourpress']) / 10
            //   detailInfo['vapourpress'] += " hPa"
            // }else{
            //   detailInfo['vapourpress'] = '-'
            // }
            //湿度
            if ((detailInfo['relhumidity'])&&(!(detailInfo['relhumidity'].indexOf('32768')!=-1))) {
              detailInfo['relhumidity'] += " %"
            }else{
              detailInfo['relhumidity'] = '-'
            }
            // console.log("气象站指标",detailInfo)
            infoTmpl += `<div  class="item">
                <span class="key">名称：</span>
                <span class="value" title="${value['ADDRESS']}">${value['ADDRESS']}</span>
            </div>`
            infoTmpl += `<div  class="item">
                <span class="key">温度：</span>
                <span class="value" title="${detailInfo["摄氏度"]}">${detailInfo["摄氏度"]} ℃</span>
            </div>`
            infoTmpl += `<div  class="item">
                <span class="key">风向：</span>
                <span class="value" title="${detailInfo["风向"]}">${detailInfo["风向"]}</span>
            </div>`
            infoTmpl += `<div  class="item">
                <span class="key">风速：</span>
                <span class="value" title="${detailInfo["windspeed"]}">${Number(detailInfo["windspeed"])} m/s</span>
            </div>`
            infoTmpl += `<div  class="item">
                <span class="key">降雨量：</span>
                <span class="value" title="${detailInfo["precipitation"]}">${Number(detailInfo["precipitation"])} mm</span>
            </div>`
            // infoTmpl += `<div  class="item">
            //     <span class="key">时间：</span>
            //     <span class="value" title="${detailInfo["biz_time"]}">${detailInfo["biz_time"]}</span>
            // </div>`
            // infoTmpl += `<div  class="item">
            //     <span class="key">气压：</span>
            //     <span class="value" title="${detailInfo["stationpress"]}">${detailInfo["stationpress"]}</span>
            // </div>`
            infoTmpl += `<div  class="item">
                <span class="key">湿度：</span>
                <span class="value" title="${detailInfo["relhumidity"]}">${detailInfo["relhumidity"]}</span>
            </div>`
            // infoTmpl += `<div  class="item">
            //     <span class="key">水汽压：</span>
            //     <span class="value" title="${detailInfo["vapourpress"]}">${detailInfo["vapourpress"]}</span>
            // </div>`
            // debugger
            table.innerHTML = infoTmpl
          // })
        }else if(value['ZZMC']){
          infoTmpl += `<div  class="item">
              <span class="key">名称：</span>
              <span class="value" title="${value['ZZMC']}">${value['ZZMC']}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">地址：</span>
              <span class="value" title="${value["ZDDZ"]}">${value["ZDDZ"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">站址编码：</span>
              <span class="value" title="${value["ZZBM"]}">${value["ZZBM"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">地市：</span>
              <span class="value" title="${value["CITY"]}">${value["CITY"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">县市：</span>
              <span class="value" title="${value["DISTRICT_1"]}">${value["DISTRICT_1"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">乡镇：</span>
              <span class="value" title="${value["STREET"]}">${value["STREET"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">场景划分：</span>
              <span class="value" title="${value["CJHF"]}">${value["CJHF"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">铁塔类型：</span>
              <span class="value" title="${value["TTLX"]}">${value["TTLX"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">铁塔高度：</span>
              <span class="value" title="${value["TTGD"]}">${value["TTGD"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">机房类型：</span>
              <span class="value" title="${value["JFLX"]}">${value["JFLX"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">供电类型：</span>
              <span class="value" title="${value["GDLX"]}">${value["GDLX"]}</span>
          </div>`
        }else if(value['HLX']){
          // debugger
            infoTmpl += `<div  class="item">
                <span class="key">姓名：</span>
                <span class="value" title="${value["XM"]}">${value["XM"]}</span>
            </div>`
            infoTmpl += `<div  class="item">
                <span class="key">地址：</span>
                <span class="value" title="${value['JZDZ']}">${value['JZDZ']}</span>
            </div>`
            infoTmpl += `<div  class="item">
                <span class="key">户类型：</span>
                <span class="value" title="${value["HLX"]}">${value["HLX"]}</span>
            </div>`
            // infoTmpl += `<div  class="item">
            //     <span class="key">出生日期：</span>
            //     <span class="value" title="${value["CSRQ"]}">${value["CSRQ"]}</span>
            // </div>`
            // infoTmpl += `<div  class="item">
            //     <span class="key">户号：</span>
            //     <span class="value" title="${value["HH"]}">${value["HH"]}</span>
            // </div>`
            infoTmpl += `<div  class="item">
                <span class="key">街道名称：</span>
                <span class="value" title="${value["JDMC"]}">${value["JDMC"]}</span>
            </div>`
        }else if(value['OBJECTID'] && value['TYPE']){
            infoTmpl += `<div  class="item">
                <span class="key">名称：</span>
                <span class="value" title="${value["NAME"]}">${value["NAME"]}</span>
            </div>`
            infoTmpl += `<div  class="item">
                <span class="key">地址：</span>
                <span class="value" title="${value['ADDRESS']}">${value['ADDRESS']}</span>
            </div>`
            infoTmpl += `<div  class="item">
                <span class="key">类型：</span>
                <span class="value" title="${value["TYPE"]}">${value["TYPE"]}</span>
            </div>`
            infoTmpl += `<div  class="item">
                <span class="key">范围：</span>
                <span class="value" title="${value["AREA"]}">${value["AREA"]}</span>
            </div>`
            // infoTmpl += `<div  class="item">
            //     <span class="key">户号：</span>
            //     <span class="value" title="${value["HH"]}">${value["HH"]}</span>
            // </div>`
        }else if(value['DATATYPE'] && value['DATATYPE'].indexOf('救援队伍')!=-1){
          infoTmpl += `<div  class="item">
                  <span class="key">负责人：</span>
                  <span class="value" title="${value["LINK_MAN"]}">${value["LINK_MAN"]}</span>
              </div>`
          infoTmpl += `<div  class="item">
              <span class="key">类型：</span>
              <span class="value" title="${value["NAME"]}">${value["NAME"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">地址：</span>
              <span class="value" title="${value["STREET"]}">${value["STREET"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">联系电话：</span>
              <span class="value" title="${value["PHONE"]}">${value["PHONE"]}</span>
          </div>`
        }else{
          for (const key in attrData[value['TABLE_NAME']]) {
            if (value[key] != undefined) {
              infoTmpl += `<div  class="item">
                              <span class="key">${attrData[value['TABLE_NAME']][key]}：</span>
                              <span class="value">${value[key]}</span>
                          </div>`
            }
          }
        }
      }else if ((value['systemcode'])) {
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

      }else{
        if (value['BSWD_TYPE']) {
          keyName.innerHTML = `名称：`
          keyValue.innerHTML = `${value['NAME']}`
          keyName1.innerHTML = "地址："
          keyValue1.innerHTML = `${value['DZ']}`
        }else if(value['IIIII']){
          keyName.innerHTML = `名称：`
          keyValue.innerHTML = `${value['ADDRESS']}`
          keyName1.innerHTML = "温度："
          keyValue1.innerHTML = `${that.temperature}℃`
        }else if(value['ZZMC']){
          keyName.innerHTML = `名称：`
          keyValue.innerHTML = `${value['ZZMC']}`
          keyName1.innerHTML = "地址："
          keyValue1.innerHTML = `${value['ZDDZ']}`
        }else if(value['HLX']){
          keyName.innerHTML = `姓名：`
          keyValue.innerHTML = `${value['XM']}`
          keyName1.innerHTML = "地址："   
          keyValue1.innerHTML = `${value['JZDZ']}`
        }else if(value['OBJECTID'] && value['TYPE']){
          keyName.innerHTML = `名称：`
          keyValue.innerHTML = `${value['NAME']}`
          keyName1.innerHTML = "地址："
          keyValue1.innerHTML = `${value['ADDRESS']}`
        }else{
          keyName.innerHTML = `${attrData[value['TABLE_NAME']]['NAME']}：`
          keyValue.innerHTML = `${value['NAME']}`
        }
      }
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
      // const res = (number - 32) * 5 / 9
      const res = number / 10
      return res.toFixed(1)
    },

    clearPopup() {
      this.rydwPopyp.setPosition(undefined)
      this.infoPopup.setPosition(undefined)
      this.firePopyp.setPosition(undefined)
    },

    collapse() {
      this.$store.dispatch(
        'lqfb/changeInfoPanelOffsetRight',
        this.offsetRight === 0 ? -50 : 0
      )
    },

    qiXiangBySQL(id){
      var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
        toIndex: 999999,
        queryParameter: {
          // name: layerName,
          attributeFilter: `STATIONNUM='${id}'`,
          maxFeatures: 99999999
        },
        datasetNames: [`lishui_forestfire_v2:szls_dw_sjjh_sfxpt_biz_067_qx_qyqxzgc`]
      })
      const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data";
          debugger

      new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
            const list = serviceResult.result.features.features;
            debugger

        })

    }


  }
}
</script>

<style lang="scss">
.lqfb {
  &-container {
    /* margin: 20px; */
  }
}
</style>
