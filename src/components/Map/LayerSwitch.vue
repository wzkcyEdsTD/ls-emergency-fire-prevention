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
        :style="activeType === '影像' ? '' : ''"
        @click="change()"
      >
        <img
          v-show="mapType === 'img_c'"
          src="../../assets/images/框1.png"
          alt=""
        >
        <img
          v-show="mapType === 'vec_c'"
          src="../../assets/images/绿框.png"
          alt=""
        >
        <svg-icon v-show="mapType === 'img_c'" icon-class="影像icon" />
        <svg-icon v-show="mapType === 'vec_c'" icon-class="影像icon-选中" />
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
        :style="activeType === '工具' ? 'height:24vh' : ''"
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
          :style="activeType === '工具' ? 'height:19vh' : 'height:0px'"
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
import Measure from "@/utils/map/measure_new.js";
export default {
  data() {
    return {
      activeType: '',
      radio: '标准地图',
      measureLayers: [],
      list:[],
      map:window.g.map,
      vectorList: [
        {
          label: '标准地图',
          url: MAP_URL.ZWPT_SG_WZ_CGCS2000,
          type:"vec_c"
        }
      ],
      imgList: [
        {
          label: '矢量图',
          url: MAP_URL.ZWPT_SG_WZ_CGCS2000,
          type:"vec_c"
        },
        {
          label: '影像图',
          url: MAP_URL.IMG_2019,
          type:"img_c"
        },
      ],
      toolList: ['绘点', '绘线',"绘面",'清空',"打印"],
      dgxLayer: null ,// 示高线图层
      mapType:"img_c",
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
      const map = window.g.map;
      if (data.label === '示高线') {
        this.showDGX()
        return
      }

      if (data.label === '林区资源') {
        this.showLQZY()
        return
      }

      let temp = null;
      let temp1 = null;
      if(data.type == "vec_c"){
        const layerList = map.getLayers().array_;
        layerList.forEach((item)=>{
          if(item.className_=="vec_c"){
            temp = item
            item.setVisible(true)
          }else if(item.className_=="cva_c"){
            item.setVisible(true)
          }
        })
        //若无矢量图
        if(!temp){
          const vec_layer = this.$map.crtLayerWMTS("vec_c")
          const cva_layer = this.$map.crtLayerWMTS("cva_c")
                    // const cva_layer = this.$map.crtLayerWMTS("cva_c")
          temp = vec_layer;
          map.getLayers().item(0).setVisible(false)//影像图
          map.getLayers().item(1).setVisible(false)//影像图注记
          map.addLayer(vec_layer);
          map.addLayer(cva_layer);
        }else{
          // map.getLayers().item(5).setVisible(true)//矢量图
          // map.getLayers().item(6).setVisible(true)//矢量图注记
        }
      }else if(data.type == "img_c"){
        const layerList = map.getLayers().array_;
        layerList.forEach(element => {
          if(element.className_ == "vec_c"){
            element.setVisible(false)
          }else if(element.className_ == "cva_c"){
            element.setVisible(false)
          }
        });
        map.getLayers().item(0).setVisible(true)//影像图
        map.getLayers().item(1).setVisible(true)//影像图注记
        // map.getLayers().item(5).setVisible(false)//矢量图
        // map.getLayers().item(6).setVisible(false)//矢量图注记
      }

    },
    change(){
      //影像切矢量
      const map = window.g.map;
      //影像切矢量
      //img_w
      if(this.mapType == "img_c"){
        let temp = null;
        const layerList = map.getLayers().array_;
        layerList.forEach((item)=>{
          if(item.className_=="vec_c"){
            temp = item
            item.setVisible(true)
          }else if(item.className_=="cva_c"){
            item.setVisible(true)
          }
        })
        //若无矢量图
        if(!temp){
          const vec_layer = this.$map.crtLayerWMTS("vec_c")
          const cva_layer = this.$map.crtLayerWMTS("cva_c")
          temp = vec_layer;
          map.getLayers().item(0).setVisible(false)//影像图
          map.getLayers().item(1).setVisible(false)//影像图注记

          // 矢量图层插入顺序
          map.getLayers().insertAt(2, vec_layer)
          map.getLayers().insertAt(3, cva_layer)
        }else{
          // map.getLayers().item(5).setVisible(true)//矢量图
          // map.getLayers().item(6).setVisible(true)//矢量图注记
        }
        this.mapType = "vec_c"
      }else if(this.mapType == "vec_c"){
        const layerList = map.getLayers().array_;
        layerList.forEach(element => {
          if(element.className_ == "vec_c"){
            element.setVisible(false)
          }else if(element.className_ == "cva_c"){
            element.setVisible(false)
          }
        });
        map.getLayers().item(0).setVisible(true)//影像图
        map.getLayers().item(1).setVisible(true)//影像图注记
        // map.getLayers().item(5).setVisible(false)//矢量图
        // map.getLayers().item(6).setVisible(false)//矢量图注记
        this.mapType = "img_c"
      }
    },
    handleToolChange(val) {
      if (val === '清空') {
        // this.$store.dispatch('map/changeClearFlag', null)
        if(this.list){
          this.list.forEach(element => {
            window.g.map.removeLayer(element)
            const dom = $(".tooltip-static")
            dom.remove()
          });
          this.list = [];
        }

      }
      if (val === '绘点') {
       const tempLayer = Measure.returnLayer(window.g.map,"Point");
        this.list.push(tempLayer);
      }
      if (val === '绘线') {
       const tempLayer = Measure.returnLayer(window.g.map,"LineString");
       this.list.push(tempLayer);
      }
      if (val === '绘面') {
        const tempLayer = Measure.returnLayer(window.g.map,"Polygon");
        this.list.push(tempLayer);
        console.log(this.list)
      }
      if (val === '打印') {
        let map = this.$map.getMap();
        const that = this;
        map.once("postcompose", function(event) {
          var canvas1,canvas2;
          if(that.mapType == "img_c"){
            canvas1 = $(".img_c").children('canvas')[0];//底图
            canvas2 = $(".cia_c").children('canvas')[0];//注记
          }else if(that.mapType=="vec_c"){
            canvas1 = $(".vec_c").children('canvas')[0];//底图
            canvas2 = $(".cva_c").children('canvas')[0];//注记
          }
          var canvas3 = $(".ol-layer").children('canvas')[0];//各种矢量图
          var canvas4 = $(".districtLayer").children('canvas')[0];//区县
          var canvas5 = $(".villageLayer").children('canvas')[0];//行政村社区
          var canvas6 = $(".streetLayer").children('canvas')[0];//乡镇街道
          var canvas7 = $(".gridLayer").children('canvas')[0];//网格
          canvas1.getContext("2d").drawImage(canvas2,0,0);
          if(canvas3){
            const width = canvas3.width;
            if(Number(width)>0){
              canvas1.getContext("2d").drawImage(canvas3,0,0);
            }
          }
          if(canvas4){
            const width = canvas4.width;
            if(Number(width)>0){
              canvas1.getContext("2d").drawImage(canvas4,0,0);
            }
          }
          if(canvas5){
            const width = canvas5.width;
            if(Number(width)>0){
              canvas1.getContext("2d").drawImage(canvas5,0,0);
            }
          }
          if(canvas6){
            const width = canvas6.width;
            if(Number(width)>0){
              canvas1.getContext("2d").drawImage(canvas6,0,0);
            }
          }
          if(canvas7){
            const width = canvas7.width;
            if(Number(width)>0){
              canvas1.getContext("2d").drawImage(canvas7,0,0);
            }
          }
          if (navigator.msSaveBlob) {
            navigator.msSaveBlob(canvas1.msToBlob(), 'map.png');
          } else {
            canvas1.toBlob(function(blob) {
              saveAs(blob, 'map.png');
            });
          }
        });
        map.renderSync();

      }
      if (val === '定位'){
        this.$map.goHome()
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
  },
  mounted:{
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
