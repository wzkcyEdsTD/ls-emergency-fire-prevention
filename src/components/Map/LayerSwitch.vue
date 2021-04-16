<template>
  <div class="layer-switch-wrapper" v-show="showPrintMap">
    <ul>
      <!-- 定位 -->
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
      <!-- 底图切换 -->
      <li
        :title="'地图切换'"
        class="tool"
        :style="activeType === '地图切换' ? 'height:13vh' : ''"
        @click="handleActiveType('地图切换')"
      >
        <img
          v-show="activeType !== '地图切换'"
          src="../../assets/images/框1.png"
          alt=""
        >
        <img
          v-show="activeType === '地图切换'"
          src="../../assets/images/绿框.png"
          alt=""
        >
        <svg-icon v-show="activeType !== '地图切换'" icon-class="影像icon" />
        <svg-icon v-show="activeType === '地图切换'" icon-class="影像icon-选中" />
        <div
          class="dropdown-lists"
          style="padding-left: 4px;padding-right: 4px;"
          :style="activeType === '地图切换' ? 'height:9vh' : 'height:0px'"
        >
          <div
            v-for="(item, index) in mapList"
            :key="index"
            class="item"
            @click="handleToolChange(item)"
          >
            {{ item }}
          </div>
        </div>
      </li>
      <!-- 工具 -->
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
            style="font-size:14px"
            @click="handleToolChange(item)"
          >
            {{ item }}
          </div>
        </div>
      </li>
      <!-- 清空 -->
      <li
        :title="'清空'"
        @click="clearAllLayer()"
      >
        <img
          src="../../assets/images/清除.png"
          class="clearClass"
          alt=""
        >
        <!-- <img
          v-show="!layerType"
          src="../../assets/images/清除选中.png"
          alt=""
        > -->
      </li>
    </ul>
  </div>
</template>

<script>
import MAP_URL from '@/utils/map/map-url'
import Measure from "@/utils/map/measure_new.js";
import html2canvas from 'html2canvas';
export default {
  data() {
    return {
      layerType:true,
      showPrintMap:true,
      activeType: '',
      radio: '标准地图',
      measureLayers: [],
      list:[],
      map:window.g.map,
      mapList:['影像图','大数据'],
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
      mapType:"影像图",
      hasID:false,
    }
  },
  computed: {
    lqzyLayer() {
      return this.$store.getters.lqzyLayer
    }
  },
  methods: {
    clearAllLayer(){
      const that = this;
      that.$nextTick(()=>{
        // that.layerType = !that.layerType
        that.$bus.$emit('checkBox',false)
        that.$bus.$emit('qingKong',true)
        // that.$store.dispatch('map/setClearAllFlag', null)
        // that.$store.dispatch('map/setClearAllFlag', true)
      })
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
      const that = this;
      const map = window.g.map;
      if (data.label === '示高线') {
        this.showDGX()
        return
      }

      if (data.label === '林区资源') {
        this.showLQZY()
        return
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

        this.$bus.$emit("printMap",false);
        // that.printShow = true;
        setTimeout(()=>{
          html2canvas(document.getElementById("app"),{
            useCORS: true,
            backgroundColor: null
            }).then((canvas)=>{
              canvas.toBlob(function(blob) {
                saveAs(blob, 'map.png');
              });
          })
        this.$bus.$emit("printMap",true);
        })

      }
      if (val === '定位'){
        this.$map.goHome()
      }
      if (val === '大数据') {
        const map = window.g.map;
        const dsjUrl = 'http://10.53.137.59:8090/iserver/services/map-agscachev2-lishuidsj2020cgcs2000/rest/maps/lishui_dsj__2020_cgcs2000'
        const dsjLayer = this.$map.createTileSuperMapRestLayer(dsjUrl, {
          className: "dsj",
        });
        const layerList = map.getLayers().array_;
        const baseLayer = layerList[0]
        if (baseLayer.className_!='dsj') {
          const zjLayer = layerList.find(v=>v.className_=="zj_c")
          map.getLayers().insertAt(0, dsjLayer)
          window.g.map.removeLayer(baseLayer)
          if (zjLayer) {
            window.g.map.removeLayer(zjLayer)
          }
          
        }
      }
      if (val === '影像图') {
        const map = window.g.map;
        const imgUrl = 'http://10.53.137.59:8090/iserver/services/map-agscache-Layers/rest/maps/Layers'
        const zjurl = "http://10.53.137.59:8090/iserver/services/map-agscachev2-lishuiyxzj2020cgcs2000/rest/maps/lishui_yxzj_2020_cgcs2000"

        const wenzhouLayer = this.$map.createTileSuperMapRestLayer(imgUrl, {
          className: "img_c",
        });
        const zjLayer = this.$map.createTileSuperMapRestLayer(zjurl, {
          className: "zj_c",
        });
        const layerList = map.getLayers().array_;
        const baseLayer = layerList[0]
        if (baseLayer.className_!='img_c') {
          //先插入注记，再插入底图
          map.getLayers().insertAt(0, zjLayer)
          map.getLayers().insertAt(0, wenzhouLayer)
          window.g.map.removeLayer(baseLayer)
        }
      }
      if (val === '标准版') {
        const map = window.g.map;
        const bzbUrl = 'http://10.53.137.59:8090/iserver/services/map-agscachev2-lishuibzbwudem2020cgcs2000/rest/maps/lishui_bzb_wudem_2020_cgcs2000'
        const bzbUrlLayer = this.$map.createTileSuperMapRestLayer(bzbUrl, {
          className: "bzb",
        });
        const layerList = map.getLayers().array_;
        const baseLayer = layerList[0]
        if (baseLayer.className_!='bzb') {
          const zjLayer = layerList.find(v=>v.className_=="zj_c")
          map.getLayers().insertAt(0, bzbUrlLayer)
          window.g.map.removeLayer(baseLayer)
          if (zjLayer) {
            window.g.map.removeLayer(zjLayer)
          }
          
        }
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
  mounted(){
    const that = this;

    const fireEvent = that.$route.query
    if (fireEvent["id"]) {
      console.log(fireEvent["id"])
      that.hasID = true;
    }else{
      that.hasID = false;
    }

    that.$nextTick(()=>{
      that.showPrintMap=true
      const fireEvent = this.$route.query
      // console.log(this.fireId);
      if (fireEvent["id"]) {
        that.showPrintMap=false;
      }
    })
    that.$bus.$on("printMap",value=>{
      console.log(value);
      that.$nextTick(()=>{
        that.showPrintMap = value
      })
    });


  },
  beforeDestroy(){
    const that = this;
    that.$bus.$off("printMap")
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
          font-size: 13px;
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
