<template>
  <div class="layer-switch-wrapper">
    <ul>
      <li class="vector" :title="'地图定位'" @click="handleToolChange('定位')">
        <img
          v-show="activeType !== '矢量'"
          src="../../assets/images/框1.png"
          alt="矢量"
        >
        <img
          v-show="activeType === '矢量'"
          src="../../assets/images/绿框.png"
          alt="矢量"
        >
        <svg-icon v-show="activeType !== '矢量'" icon-class="矢量icon" />
        <svg-icon v-show="activeType === '矢量'" icon-class="矢量icon-选中" />
      </li>
      <li
        :title="'地图切换'"
        class="img-container"
        :style="activeType === '影像' ? 'height:17vh' : ''"
        @click="handleToolChange('影像')"
      >
        <img
          v-show="activeType !== '影像'"
          src="../../assets/images/框1.png"
          alt=""
        >
        <img
          v-show="activeType === '影像'"
          src="../../assets/images/绿框.png"
          alt=""
        >
        <svg-icon v-show="activeType !== '影像'" icon-class="影像icon" />
        <svg-icon v-show="activeType === '影像'" icon-class="影像icon-选中" />
        <div
          class="dropdown-lists"
          :style="activeType === '影像' ? 'height:375px' : 'height:0px'"
        >
          <div
            v-for="(item, index) in imgList"
            :key="index"
            class="item"
            @click="handleDropdownChange(item)"
          >
            {{ item.label }}
          </div>
        </div>
      </li>
      <li
        :title="'工具'"
        class="tool"
        :style="activeType === '工具' ? 'height:160px' : ''"
        @click="handleActiveType('工具')"
      >
        <img
          v-show="activeType !== '工具'"
          src="../../assets/images/框1.png"
          alt=""
        >
        <img
          v-show="activeType === '工具'"
          src="../../assets/images/绿框.png"
          alt=""
        >
        <svg-icon v-show="activeType !== '工具'" icon-class="工具icon" />
        <svg-icon v-show="activeType === '工具'" icon-class="工具icon-选中" />
        <div
          class="dropdown-lists"
          :style="activeType === '工具' ? 'height:90px' : 'height:0px'"
        >
          <div
            v-for="(item, index) in toolList"
            :key="index"
            class="item"
            @click="handleToolChange(item)"
          >
            {{ item }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import MAP_URL from '@/utils/map/map-url'

export default {
  data() {
    return {
      activeType: '',
      radio: '标准地图',
      measureLayers: [],
      vectorList: [
        {
          label: '标准地图',
          url: MAP_URL.ZWPT_SG_WZ_CGCS2000
        }
      ],
      imgList: [
        {
          label: '矢量底图',
          url: MAP_URL.ZWPT_SG_WZ_CGCS2000
        },
        {
          label: '影像底图',
          url: MAP_URL.IMG_2019
        },
        // {
        //   label: '18年影像',
        //   url: MAP_URL.IMG_2018
        // },
        // {
        //   label: '17年影像',
        //   url: MAP_URL.IMG_2017
        // },
        // {
        //   label: '14年影像',
        //   url: MAP_URL.IMG_2014
        // },
        // {
        //   label: '12年影像',
        //   url: MAP_URL.IMG_2012
        // },
        // {
        //   label: '示高线',
        //   url: MAP_URL.DGX
        // },
        // {
        //   label: '林区资源',
        //   url: MAP_URL.SLZY
        // }
      ],
      toolList: ['清空', '定位', '测距'],
      dgxLayer: null // 示高线图层
    }
  },
  computed: {
    lqzyLayer() {
      return this.$store.getters.lqzyLayer
    }
  },
  methods: {
    changeMapType(){

    },

    handleActiveType(type) {
      if (this.activeType !== '矢量' && type === '矢量') {
        this.handleDropdownChange(this.vectorList[0])
      }
      if (this.activeType === type) {
        if (type === '矢量') return
        else this.activeType = ''
      } else {
        this.activeType = type
      }
    },

    handleDropdownChange(data) {
      if (data.label === '示高线') {
        this.showDGX()
        return
      }

      if (data.label === '林区资源') {
        this.showLQZY()
        return
      }
      this.$store.dispatch('map/updateBaseLayerSourceUrl', data.url.url)
      data.label.indexOf('影像') > -1
        ? this.$store.dispatch('map/setZjLayerVisible', true)
        : this.$store.dispatch('map/setZjLayerVisible', false)
    },

    handleToolChange(val) {
      if (val === '清空') {
        this.$store.dispatch('map/changeClearFlag', null)
        this.measureLayers.map(v => {
          this.$map.removeLayer(v.layer)
          this.$map.getMap().removeOverlay(v.overlay)
        })
      }
      if (val === '定位') {
        this.$map.goHome()
      }
      if (val === '测距') {
        this.$map.doLineMeasure((layer, overlay) => {
          this.measureLayers.push({
            layer,
            overlay
          })
        })
      }
    },

    showDGX() {
      // 示高线
      if (this.dgxLayer) {
        this.$map.removeLayer(this.dgxLayer)
        this.dgxLayer = null
        return
      }
      this.dgxLayer = this.$map.createWMSLayer(MAP_URL.DGX)
      this.$map.addLayer(this.dgxLayer)
    },

    showLQZY() {
      if (this.lqzyLayer) {
        this.$store.dispatch('map/changeLayerListByUrl', { appendLayerUrlList: [], removeLayerUrlList: [MAP_URL.SLZY] })
        this.$store.dispatch('map/changeLqzyLayer', false)
        return
      }
      this.$store.dispatch('map/changeLayerListByUrl', { appendLayerUrlList: [MAP_URL.SLZY], removeLayerUrlList: [] })
      this.$store.dispatch('map/changeLqzyLayer', true)
    }
  }
}
</script>

<style lang="scss">
.layer-switch-wrapper {
  position: absolute;
  z-index: 999;
  left: 324px;
  top: 4vh;
  width: 50px;
  display: flex;
  align-items: center;
  ul {
    padding-left: 0;
    list-style: none;
    width: 50px;
    height: 200px;
    li {
      width: 50px;
      height: 50px;
      box-sizing: border-box;
      background-color: hsla(203, 20%, 8%, 1);
      border: 1px solid hsla(160, 100%, 40%, 1);
      cursor: pointer;
      position: relative;
      margin-bottom: 25px;
      transition: height 0.3s;
      img {
        width: 72px;
        height: 72px;
        position: absolute;
        top: -14px;
        left: -14.5px;
      }
      .svg-icon {
        width: 40px;
        height: 40px;
        position: absolute;
        left: 5px;
        top: 5px;
      }
      .dropdown-lists {
        position: absolute;
        left: 0;
        top: 60px;
        height: 50px;
        width: 100%;
        padding-left: 8px;
        padding-right: 8px;
        overflow: hidden;
        transition: height 0.3s;
        .item {
          margin-top: 8px;
          font-size: 14px;
          padding-bottom: 5px;
          border-bottom: 1px solid rgb(15, 119, 197);
        }
        .item:hover {
          color: hsla(153, 98%, 53%, 1);
        }
      }
    }
  }
}
.ol-tooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: white;
  padding: 4px 8px;
  opacity: 0.7;
  white-space: nowrap;
  font-size: 12px;
}
.ol-tooltip-measure {
  opacity: 1;
  font-weight: bold;
}
.ol-tooltip-static {
  background-color: #ffcc33;
  color: black;
  border: 1px solid white;
}
.ol-tooltip-measure:before,
.ol-tooltip-static:before {
  border-top: 6px solid rgba(0, 0, 0, 0.5);
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  content: "";
  position: absolute;
  bottom: -6px;
  margin-left: -7px;
  left: 50%;
}
.ol-tooltip-static:before {
  border-top-color: #ffcc33;
}
</style>
