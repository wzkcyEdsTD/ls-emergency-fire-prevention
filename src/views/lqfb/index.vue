<template>
  <div class="lqfb-container">
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
    <!-- <div class="video-wrapper">
      <video id="my-video" class="video-js vjs-default-skin" controls preload="auto" poster="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg">
        <source src="http://10.20.103.167:83/ncg/10.20.103.166/7099/0/33038111001322200202/MAIN/TCP/live.m3u8?checkinfo=ewogICAidGltZSIgOiAiMjAyMDA3MTVUMjIyOTMyWiIsCiAgICJ1cmwiIDogImh0dHA6Ly8xMC4yMC4xMDMuMTY3OjgzL25jZy8xMC4yMC4xMDMuMTY2LzcwOTkvMC8zMzAzODExMTAwMTMyMjIwMDIwMi9NQUlOL1RDUC9saXZlLm0zdTgiCn0K&idinfo=EAAAAAAQAAC4gm0bX7cgKBhtPkyaBnSxWWEUGZS7zTyPvg5%2FCOj%2BqUzgKBuq8pvgEAh8gRsn5VM%3D" type="application/x-mpegURL">
      </video>
    </div> -->
    <!-- <jylj /> -->
  </div>
</template>

<script>
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
import { getVideoByCode, getFiremanByTeamName, getEquipment, getLqzyByCoordinate } from '@/api/lqfb'
export default {
  name: 'Lqfb',
  components: {
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
    videoListPannel
  },
  data() {
    return {
      infoPopup: null,
      rydwPopyp: null,
      firePopyp: null,
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
    this.jkLayer && this.$store.dispatch('map/changeJkLayer', {
      layer: this.jkLayer,
      ope: 'REMOVELAYER'
    })
  },
  mounted() {
    if (this.drawLayer) this.drawLayer.setVisible(false)
        this.initPopup()
    this.$map.goHome()
    this.$map.getMap().on('click', this.showPopup)

    this.$store.dispatch('lqfb/changezlOffsetRight', 0)
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
    async showPopup(evt) {
      this.clearPopup()
      let feature = this.$map
        .getMap()
        .forEachFeatureAtPixel(evt.pixel, function(feature) {
          return feature
        })
      const coordinate = evt.coordinate
      // console.log({ feature })
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

      if (!feature) {
        // const filters = this.layerList.filter(v => v.label === '林区资源')
        // if (filters.length > 0) {
        //   getLqzyByCoordinate({ x: coordinate[0], y: coordinate[1] }).then(res => {
        //     this.$store.dispatch('lqfb/changeIsXFDW', '')
        //     const table = document.getElementById('table-box')
        //     if (res.status === 200 && res.data) {
        //       const data = JSON.parse(res.data.slice(5, -1))
        //       keyName.innerHTML = `行政县乡村名称：`
        //       keyValue.innerHTML = `${data['XIANNAME']}-${data['XIANNAME']}-${data['CUNNAME']}`
        //       this.infoPopup.setPosition([coordinate[0], coordinate[1]])
        //       let infoTmpl = ``
        //       for (const key in attrData['LQZY']) {
        //         infoTmpl += `<div  class="item">
        //                       <span class="key">${attrData['LQZY'][key]}：</span>
        //                       <span class="value">${data[key]}</span>
        //                   </div>`
        //       }
        //       table.innerHTML = infoTmpl
        //     }
        //   })
        // }
        return
      }

      const value = feature.values_
      if (value['VIDEO_URL']) {
        // 查询监控视频
        this.$bus.$emit("videoData",value);
        return
      }
      // 是否为火灾点
      // debugger
      if ((value['systemcode'])) {
        this.$bus.$emit("fire",value);
      }else{
      }
      // debugger
      if (!value['systemcode']) {
        if ((!value['NAME'] && !value['label'])) return
      }

      // 判断是不是防火人员
      if (value.smid && value.smid.match(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/)) {
        // this.$refs.rydwPannel.handleItemClick(value)
        return
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
      // 判断是不是阻隔带
      if (value['label']) {
        keyName.innerHTML = `类型：`
        keyValue.innerHTML = `${value['label']}`
        this.$store.dispatch('map/changeIsShowDetail', false)
        return
      }

      this.$store.dispatch('map/changeIsShowDetail', true)
      let table; let infoTmpl = ``
      // debugger
      if (feature.values_.DATATYPE === '骨干救援队伍' && feature.values_.TYPE2 === '森林消防救援队伍') {
        table = document.getElementById('table-box1')
        const infoPannelDwry = document.getElementById('info-pannel-dwry')
        const infoPannelWzzb = document.getElementById('info-pannel-wzzb')
        let dwry = ``; let wzzb = ``
        getFiremanByTeamName(feature.values_.NAME).then(res => {
          if (res.code === 20000) {
            res.data.forEach(item => {
              dwry += `<li>
                        <div class="item item-1">${item.name}</div>
                        <div class="item item-1"></div>
                        <div class="item item-1">${item.age}</div>
                        <div class="item item-2">${item.phone}</div>
                      </li>`
            })
            infoPannelDwry.innerHTML = dwry
          }
        })
        getEquipment(feature.values_.BID).then(res => {
          if (res.code === 20000) {
            res.data.forEach(item => {
              wzzb += `<li>
                        <div class="item item-2">${item.name}</div>
                        <div class="item item-2">${item.type}</div>
                        <div class="item item-1">${item.user_number}</div>
                        <div class="item item-1">${item.unit}</div>
                      </li>`
            })
            infoPannelWzzb.innerHTML = wzzb
          }
        })
        this.$store.dispatch('lqfb/changeIsXFDW', '基本信息')
      } else {
        this.$store.dispatch('lqfb/changeIsXFDW', '')
        table = document.getElementById('table-box')
      }
      // debugger
      // console.log(value)
      if (!(value['systemcode'])) {
        // console.log("不是火灾点")
        for (const key in attrData[value['TABLE_NAME']]) {
          if (value[key] != undefined) {
            infoTmpl += `<div  class="item">
                            <span class="key">${attrData[value['TABLE_NAME']][key]}：</span>
                            <span class="value">${value[key]}</span>
                        </div>`
          }
        }
      }else if ((value['systemcode'])) {
        this.firePopyp.setPosition([value.x,value.y])
        // debugger
        infoTmpl += `<div  class="item">
                <span class="key">地点：</span>
                <span class="value">${value["address"]}</span>
            </div>`
        infoTmpl += `<div  class="item">
            <span class="key">类型：</span>
            <span class="value">${value["infocontent"]}</span>
        </div>`
        infoTmpl += `<div  class="item">
            <span class="key">来源：</span>
            <span class="value">${value["systemcode"]}</span>
        </div>`
        infoTmpl += `<div  class="item">
            <span class="key">电话：</span>
            <span class="value">${value["jubaorentel"]}</span>
        </div>`
        infoTmpl += `<div  class="item">
            <span class="key">时间：</span>
            <span class="value">${value["time"]}</span>
        </div>`
        // console.log(infoTmpl)
      }

      table.innerHTML = infoTmpl
      if ((value['systemcode'])) {
        // keyNameFire.innerHTML = '地点：'
      keyValueFire.innerHTML = `${value['address']}`
      jbr.innerHTML = `${value['jubaoren']}`
      jbrtel.innerHTML = `${value['jubaorentel']}`
      const text = `${value['infocontent']}`
      // debugger
      if (text.indexOf(",")>-1) {
        const arr =text.split(',')
        // console.log(arr)

        contents.innerHTML = arr[0]
        fireIntensity.innerHTML = arr[1].split(":")[1]
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
