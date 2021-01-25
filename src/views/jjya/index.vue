<template>
  <div class="jjya-container">
    <sider-bar ref="siderBar" />
    <info-pannel ref="infoPannel" />
    <jylj v-if="activeMenu === '救援路径推送'" />
    <pick-fire-point />
    <legend-box />
    <!-- <zhfx /> -->
  </div>
</template>

<script>
import SiderBar from './components/SiderBar'
import PickFirePoint from './components/PickFirePoint'
import Overlay from 'ol/Overlay'
import attrData from '../lqfb/components/attrDictionary'
import InfoPannel from '../lqfb/components/InfoPannel'
import jylj from './components/jylj'
// import Zhfx from './components/Zhfx'

import LegendBox from '@/components/Legend'

export default {
  name: 'Jjya',
  components: {
    SiderBar,
    PickFirePoint,
    InfoPannel,
    LegendBox,
    jylj
    // Zhfx
  },
  data() {
    return {
      type: 'map' // 启动查询条件
    }
  },
  computed: {
    activeMenu() {
      return this.$store.getters.activeMenu
    }
  },
  mounted() {
    // 模拟火灾点
    // const iconFeature = this.$map.createFeature([120.5, 27.82], '火灾点')
    // iconFeature.setStyle(this.$map.getFirePointStyle())
    // const layer = this.$map.createVectorLayer()
    // layer.getSource().addFeature(iconFeature)
    // this.$map.addLayer(layer)
    // const buffered = turf.buffer(turf.point([120.5, 27.82]), 5, {
    //   units: 'kilometers'
    // })
    // var format = new GeoJSON()
    // var f = format.readFeature(buffered)
    // f.setStyle(this.$map.getPolygonStyle())
    // layer.getSource().addFeature(f)
    // this.$store.dispatch('jjya/changeBuffer', f)
    this.initPopup()
    this.$map.getMap().on('click', this.showPopup)
  },
  beforeDestroy() {
    this.$map.getMap().un('click', this.showPopup)
    this.infoPopup.setPosition(undefined)
  },
  methods: {
    initPopup() {
      document.getElementById('popup-info').style.display = 'block'
      this.infoPopup = new Overlay({
        element: document.getElementById('popup-info'),
        stopEvent: true
      })
      this.$map.getMap().addOverlay(this.infoPopup)
      const infoCloser = document.getElementById(`popup-info-closer`)
      // 显示value
      // 点击要素关闭popup
      infoCloser.onclick = () => {
        this.infoPopup.setPosition(undefined)
        infoCloser.blur()
        return false
      }
    },
    showPopup(evt) {
      this.clearPopup()
      const feature = this.$map
        .getMap()
        .forEachFeatureAtPixel(evt.pixel, function(feature) {
          return feature
        })

      if (!feature) return
      console.log({ feature })
      if (!feature.values_['NAME']) return
      // 显示属性框
      const coordinate = evt.coordinate
      this.infoPopup.setPosition(coordinate)

      const value = feature.values_
      const table = document.getElementById('table-box')
      const keyName = document.getElementById('key-name')
      const keyValue = document.getElementById('key-value')
      keyName.innerHTML = `${attrData[value['TABLE_NAME']]['NAME']}：`
      keyValue.innerHTML = `${value['NAME']}`
      let infoTmpl = ``
      for (const key in attrData[value['TABLE_NAME']]) {
        infoTmpl += `<div data-v-afca2d2a class="item">
                        <span data-v-afca2d2a class="key">${attrData[value['TABLE_NAME']][key]}</span>
                        <span data-v-afca2d2a class="value">${value[key]}</span>
                     </div>`
      }
      table.innerHTML = infoTmpl
    },
    clearPopup() {
      this.infoPopup.setPosition(undefined)
    }
  }
}
</script>

<style lang="scss">
.jjya {
  &-container {
    /* margin: 20px; */
  }
}
.right-container {
  width: 1546px;
  height: calc(100vh - 90px);
  position: absolute;
  top: 22px;
  right: 35px;
  .title {
    position: relative;
    height: 27px;
    font-size: 20px;
    line-height: 27px;
    margin-left: 17px;
  }
  .title:before {
    content: " ";
    position: absolute;
    top: 4px;
    left: -15px;
    width: 4px;
    height: 16px;
    background: #fff;
  }
}
</style>
