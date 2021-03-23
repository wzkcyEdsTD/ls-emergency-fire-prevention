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
    <video-list-pannel />
    <videoList/>

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
import { Point } from 'ol/geom'
import {
  TileSuperMapRest,
  FeatureService,
  SuperMap
} from '@supermap/iclient-ol'
import util from "@/libs/qxinfoAPI"
import Video from '@/components/video/video.vue'
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
    qxname:""
  },
  data() {
    return {
      infoPopup: null,
      rydwPopyp: null,
      firePopyp: null,
      fireId:null,
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
  beforeDestroy() {
    this.$map.getMap().un('click', this.showPopup)
    this.infoPopup.setPosition(undefined)
    this.$bus.$off("showPoup")
    this.$bus.$off("showPoupItem")
    this.jkLayer && this.$store.dispatch('map/changeJkLayer', {
      layer: this.jkLayer,
      ope: 'REMOVELAYER'
    })
  },
  mounted() {
    const that = this;

    // const token = this.$cookies.get("token")
    // if (!token) {
    //   this.$router.push('/login');
    // }


    if (this.drawLayer) this.drawLayer.setVisible(false)
        this.initPopup()
    this.$map.goHome()
    this.$map.getMap().on('click', this.showPopup)

    this.$store.dispatch('lqfb/changezlOffsetRight', 0)
    this.$bus.$on("showPoup",item=>{

      that.showPopupItem(item);
    });
    this.$bus.$on("showPoupItem",item=>{
      
      that.showPopupSearchItem(item);
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
      if (value['VIDEO_URL']) {
        // 查询监控视频
        this.$bus.$emit("videoData",value);
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
      if (value['IIIII']) {
        coordinate = [value.LONGITUDE,value.LATITUDE]
      }else{
        coordinate = [value.geometry.flatCoordinates[0],value.geometry.flatCoordinates[1]]
      }
      if (value['VIDEO_URL']) {
        // 查询监控视频
        this.$bus.$emit("videoData",value);
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
      if (!value['systemcode'] && !value['IIIII']) {
        if (!value['NAME']) return
      }

      // 显示属性框
      if (!(value['systemcode'])) {
        this.infoPopup.setPosition(coordinate)
      }

      this.$store.dispatch('map/changeIsShowDetail', true)
      let table; let infoTmpl = ``

      // if (feature.values_.DATATYPE === '骨干救援队伍' && feature.values_.TYPE2 === '森林消防救援队伍') {
      //   table = document.getElementById('table-box1')
      //   const infoPannelDwry = document.getElementById('info-pannel-dwry')
      //   const infoPannelWzzb = document.getElementById('info-pannel-wzzb')
      //   let dwry = ``; let wzzb = ``
      //   getFiremanByTeamName(feature.values_.NAME).then(res => {
      //     if (res.code === 20000) {
      //       res.data.forEach(item => {
      //         dwry += `<li>
      //                   <div class="item item-1">${item.name}</div>
      //                   <div class="item item-1"></div>
      //                   <div class="item item-1">${item.age}</div>
      //                   <div class="item item-2">${item.phone}</div>
      //                 </li>`
      //       })
      //       infoPannelDwry.innerHTML = dwry
      //     }
      //   })
      //   getEquipment(feature.values_.BID).then(res => {
      //     if (res.code === 20000) {
      //       res.data.forEach(item => {
      //         wzzb += `<li>
      //                   <div class="item item-2">${item.name}</div>
      //                   <div class="item item-2">${item.type}</div>
      //                   <div class="item item-1">${item.user_number}</div>
      //                   <div class="item item-1">${item.unit}</div>
      //                 </li>`
      //       })
      //       infoPannelWzzb.innerHTML = wzzb
      //     }
      //   })
      //   this.$store.dispatch('lqfb/changeIsXFDW', '基本信息')
      // } else {
        this.$store.dispatch('lqfb/changeIsXFDW', '')
        table = document.getElementById('table-box')
      // }
      // debugger
      // console.log(value)
      if (!(value['systemcode'])) {
        // console.log("不是火灾点")

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
        util.getQXDetail(value['IIIII']).then(r=>{
          const detailInfo = r['[]'][0]['SzlsDwSjjhSfxptBiz067QxQyqxzgc']
          detailInfo['风向'] = that.getWindDirect(Number(detailInfo.winddirect))
          detailInfo['摄氏度'] = that.changeTemperatureType(Number(detailInfo.drybultemp))

          //气压
          if (detailInfo['stationpress'].indexOf('32768')!= -1 ) {
            detailInfo['stationpress'] = '-'
          }else{
            detailInfo['stationpress'] = Number(detailInfo['stationpress']) / 10
            detailInfo['stationpress'] += " hPa"
          }
          //水汽压
          if (!(detailInfo['vapourpress'].indexOf('32768')!=-1)) {
            detailInfo['vapourpress'] = Number(detailInfo['vapourpress']) / 10
            detailInfo['vapourpress'] += " hPa"
          }else{
            detailInfo['vapourpress'] = '-'
          }
          //湿度
          if (!(detailInfo['relhumidity'].indexOf('32768')!=-1)) {
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
              <span class="value" title="${detailInfo["windvelocity"]}">${detailInfo["windvelocity"]} m/s</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">降雨量：</span>
              <span class="value" title="${detailInfo["precipition"]}">${detailInfo["precipition"]} mm</span>
          </div>`
          // infoTmpl += `<div  class="item">
          //     <span class="key">时间：</span>
          //     <span class="value" title="${detailInfo["biz_time"]}">${detailInfo["biz_time"]}</span>
          // </div>`
          infoTmpl += `<div  class="item">
              <span class="key">气压：</span>
              <span class="value" title="${detailInfo["stationpress"]}">${detailInfo["stationpress"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">湿度：</span>
              <span class="value" title="${detailInfo["relhumidity"]}">${detailInfo["relhumidity"]}</span>
          </div>`
          infoTmpl += `<div  class="item">
              <span class="key">水汽压：</span>
              <span class="value" title="${detailInfo["vapourpress"]}">${detailInfo["vapourpress"]}</span>
          </div>`
          // debugger
          table.innerHTML = infoTmpl
        })
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
        }else if(value['IIIII']){
          keyName.innerHTML = `名称：`
          keyValue.innerHTML = `${value['ADDRESS']}`
        }else{
          keyName.innerHTML = `${attrData[value['TABLE_NAME']]['NAME']}：`
          keyValue.innerHTML = `${value['NAME']}`
        }
      }
    },

    //手动点击时弹框
    async showPopup(evt) {
      const that = this;

      let node = $(`#e_container`)
      if (node) {
        node.css("z-index","2")
      }
      let node1 = $(`.ol-overlaycontainer-stopevent`)
      if (node1) {
        node1.css("z-index","5")
      }
      this.clearPopup()
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
      if (value['VIDEO_URL']) {
        // 查询监控视频
        this.$bus.$emit("videoData",value);
        return
      }
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
      }
      // debugger

      if (!value['systemcode'] && !value['BSWD_TYPE'] && !value['IIIII'] && !value['HLX'] && !value['OBJECTID'] && !value['TYPE']) {
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
          util.getQXDetail(value['IIIII']).then(r=>{
            const detailInfo = r['[]'][0]['SzlsDwSjjhSfxptBiz067QxQyqxzgc']
            detailInfo['风向'] = that.getWindDirect(Number(detailInfo.winddirect))
            detailInfo['摄氏度'] = that.changeTemperatureType(Number(detailInfo.drybultemp))
            //气压
            if (detailInfo['stationpress'].indexOf('32768')!= -1 ) {
              detailInfo['stationpress'] = '-'
            }else{
              detailInfo['stationpress'] = Number(detailInfo['stationpress']) / 10
              detailInfo['stationpress'] += " hPa"
            }
            //水汽压
            if (!(detailInfo['vapourpress'].indexOf('32768')!=-1)) {
              detailInfo['vapourpress'] = Number(detailInfo['vapourpress']) / 10
              detailInfo['vapourpress'] += " hPa"
            }else{
              detailInfo['vapourpress'] = '-'
            }
            //湿度
            if (!(detailInfo['relhumidity'].indexOf('32768')!=-1)) {
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
                <span class="value" title="${detailInfo["windvelocity"]}">${detailInfo["windvelocity"]} m/s</span>
            </div>`
            infoTmpl += `<div  class="item">
                <span class="key">降雨量：</span>
                <span class="value" title="${detailInfo["precipition"]}">${detailInfo["precipition"]} mm</span>
            </div>`
            // infoTmpl += `<div  class="item">
            //     <span class="key">时间：</span>
            //     <span class="value" title="${detailInfo["biz_time"]}">${detailInfo["biz_time"]}</span>
            // </div>`
            infoTmpl += `<div  class="item">
                <span class="key">气压：</span>
                <span class="value" title="${detailInfo["stationpress"]}">${detailInfo["stationpress"]}</span>
            </div>`
            infoTmpl += `<div  class="item">
                <span class="key">湿度：</span>
                <span class="value" title="${detailInfo["relhumidity"]}">${detailInfo["relhumidity"]}</span>
            </div>`
            infoTmpl += `<div  class="item">
                <span class="key">水汽压：</span>
                <span class="value" title="${detailInfo["vapourpress"]}">${detailInfo["vapourpress"]}</span>
            </div>`
            // debugger
            table.innerHTML = infoTmpl
          })
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
        }else if(value['IIIII']){
          keyName.innerHTML = `名称：`
          keyValue.innerHTML = `${value['ADDRESS']}`
        }else if(value['HLX']){
          keyName.innerHTML = `姓名：`
          keyValue.innerHTML = `${value['XM']}`
        }else if(value['OBJECTID'] && value['TYPE']){
          keyName.innerHTML = `名称：`
          keyValue.innerHTML = `${value['NAME']}`
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
