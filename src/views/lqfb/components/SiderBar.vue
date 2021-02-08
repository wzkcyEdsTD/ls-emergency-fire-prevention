<template>
  <sider-bar class="sider-bar">
    <div class="lqfb-wrapper">
      <el-collapse v-model="activeNames">
        <el-collapse-item
          v-for="v in treeData"
          :key="v.id"
          :name="v.id"
          :class="v.children == null ? 'no-arrow' : ''"
          @click.native="handleMenuClick(v.label)"
        >
          <template slot="title">
            <span>{{ v.label }}</span>
          </template>
          <div>
            <el-tree
              v-show="v.children != null"
              :ref="`tree_${v.id}`"
              :data="v.children"
              :show-checkbox="v.showCheck"
              node-key="id"
              :default-expanded-keys="[]"
              :props="defaultProps"
              @check="(data, checked) => handleCheckChange(data, checked, v.id)"
              @node-click="nodeClick"
            >
              <span slot-scope="{ node, data }" class="custom-tree-node">
                <span>
                  <i :class="data.icon" />
                  {{ node.label }}
                </span>
              </span>
            </el-tree>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </sider-bar>
</template>

<script>
import treeData from './treeData'
import SiderBar from '@/components/SiderBar'
import jkList from './监控数据.json'
import firePointList from './fire.json'
import dbsbList from './d_dbsb_jbxx.json'
import { getMonitorList } from '@/api/lqfb'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import { Point } from 'ol/geom'
import {
  TileSuperMapRest,
  FeatureService,
  SuperMap
} from '@supermap/iclient-ol'

export default {
  components: {
    SiderBar
  },
  data() {
    return {
      jkList,
      firePointList,
      dbsbList,
      activeNames: [1,5,6],
      treeData,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      temp:true,
      firelayer:null,
      district:true,
      village:false,
      grid:false,
      street:false,
      videoLayer:null,
      videoTemp:false,
    }
  },
  computed: {
    yadqPannel() {
      return this.$store.getters.yadqPannel
    },
    clearFlag() {
      return this.$store.getters.clearFlag
    },
    yadqOffsetRight() {
      return this.$store.getters.yadqOffsetRight
    },
    checkedLeafNodes() {
      return this.$store.getters.checkedLeafNodes
    },
    videoListOffsetRight() {
      return this.$store.getters.videoListOffsetRight
    },
    jkLayer() {
      return this.$store.getters.jkLayer
    },
    isAddFeatures() {
      return this.$store.getters.isAddFeatures
    }
  },
  watch: {
    clearFlag() {
      this.clearTreeChecked()
    },
    jkLayer(val) {
      if (val == null) {
        this.$refs[`tree_7`][0].setCheckedKeys([])
      }
    },
    checkedLeafNodes(val) {
      // console.log(9999999999999, val)
      this.clearTreeChecked()
      for (let i = 1; i <= 7; i++) {
        if (this.$refs[`tree_${i}`]) {
          const ids = []
          val.forEach(item => {
            if ((item.id + '').substring(0, 1) == i) {
              ids.push(item.id)
            }
          })
          this.$refs[`tree_${i}`][0].setCheckedKeys(ids)
        }
      }
    }
  },
  mounted() {
    // 默认选中林区节点
    this.$refs[`tree_1`][0].setCheckedKeys([11, 146])
    this.$refs[`tree_6`][0].setCheckedKeys([61])
    this.$refs[`tree_5`][0].setCheckedKeys([51])
    // this.createFireLayer()
    // 显示选中图层
    this.showCheckLayer()
    const that = this;
    this.$bus.$on("fireList",value=>{
      console.log(33333)
      that.createFireLayer(value);
    })
  },
  methods: {

    createFireLayer(fireList){
      const list = fireList.result.records
      if (list.length>0) {
        // debugger
        const features = [];
        const arrlist = list; 
        arrlist.forEach(element => {
          const properties = element;
          const feature =  new Feature({
                geometry: new Point([element.x,element.y]),
                ...properties
            })
          features.push(feature);
        });

        var vectorSource = new VectorSource({
          features,
          wrapX: false
        });
        var fireLayer = new VectorLayer({
          source: vectorSource,
        })
        fireLayer.setStyle(this.$map.getFirePointStyle())
        this.firelayer = fireLayer;
        this.temp = true;
        this.$map.addLayer(fireLayer)
      }




    },
    handleCheckChange(data, checked, id) {
      //console.log('handleCheckChange', data, checked)
      // 勾选目录树控制总览显示资源
      // debugger
      let list = window.g.map.getLayers().array_

      if ((data.id + '').substring(0, 2) === '11') {
        this.$store.dispatch('lqfb/changeActiveMenu', '基础要素')
      } else if ((data.id + '')[0] === '2') {
        this.$store.dispatch('lqfb/changeActiveMenu', '应急资源')
      } else if ((data.id + '')[0] === '3') {
        this.$store.dispatch('lqfb/changeActiveMenu', '安全风险源')
      }
      // if ((data.id + '')[0] === '4' || (data.id + '')[0] === '6' || (data.id + '')[0] === '7') {
      //   this.$store.dispatch('lqfb/changezlOffsetRight', -25)
      // }
      if (data.label === '监控') {
        if (!this.videoLayer) {
          var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            toIndex: 999999,
            queryParameter: {
              // name: layerName,
              attributeFilter: "",
              maxFeatures: 99999999
            },
            datasetNames: [`lishui_forestfire:d_video`]
          })
          const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire/rest/data";
          // debugger

          new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
            const videoPointList = serviceResult.result.features.features;
            // debugger
            const features = [];
            videoPointList.forEach(element => {
              const properties = element.properties;

              const feature =  new Feature({
                    geometry: new Point([properties.X,properties.Y]),
                    ...properties
                })
                // debugger
              features.push(feature);
            });
 
            var vectorSource = new VectorSource({
              features,
              wrapX: false
            });
            this.videoLayer = new VectorLayer({
              source: vectorSource,
              style:this.$map.getMonitorStyle()
              })
            
            //4: "119.35790729284101"
            //5: "27.541516789796798"
            this.$map.addLayer(this.videoLayer)
        })
          this.videoTemp = true;
          // this.$store.dispatch('lqfb/changeVideoListOffsetRight', 0)
        }else{
          if (this.videoTemp) {
            this.videoTemp = false
          }else if (!this.videoTemp) {
            this.videoTemp = true
          }
          this.videoLayer.setVisible(this.videoTemp);
        }

        return
      }
      if(data.label === '火灾报警点'){
        if(this.temp){
          this.temp = false;
          this.firelayer.setVisible(false);
          this.$bus.$emit('hzjbd',this.temp);
        }else if (!this.temp) {
          this.temp = true;
          this.firelayer.setVisible(true);
          this.$bus.$emit('hzjbd',this.temp);
        }
        this.$store.dispatch('lqfb/changezlOffsetRight', 0)
      }

      if(data.label === '区县'){
        this.district = !this.district
        list.forEach(element => {
          if (element.className_=="districtLayer") {
            element.setVisible(this.district)
          }
        });

      }
      if(data.label === '乡镇街道'){
        this.street = !this.street
        list.forEach(element => {
          if (element.className_=="streetLayer") {
            element.setVisible(this.street)
          }
        });
      }
      if(data.label === '行政村社区'){
        this.village = !this.village
        list.forEach(element => {
          if (element.className_=="villageLayer") {
            element.setVisible(this.village)
          }
        });
      }
      if(data.label === '网格'){
        this.grid = !this.grid
        list.forEach(element => {
          if (element.className_=="gridLayer") {
            element.setVisible(this.grid)
          }
        });
      }
      // 显示选中图层
      this.showCheckLayer()
    },
    handleMenuClick(menu) {
      this.$store.dispatch('lqfb/changeActiveMenu', menu)

      if (menu === '预案调取') {
        this.$store.dispatch('lqfb/changeyadqPannel', false)
        this.$store.dispatch('lqfb/changeyadqOffsetRight', -30)
      }
      // if (menu === '巡逻范围' || menu === '预案调取' || menu === '监控设备') {
      //   this.$store.dispatch('lqfb/changezlOffsetRight', -25)
      // }
      // if (menu === '监控设备') {
      //   this.$store.dispatch('lqfb/changeVideoListOffsetRight', this.videoListOffsetRight === 0 ? -30 : 0)
      // }
    },
    showCheckLayer() {
      const nodes = [] // 所有大类下的tree选中的叶子节点
      this.treeData.map(v => {
        v.children &&
            nodes.push(
              ...this.$refs[`tree_${v.id}`][0].getCheckedNodes(true, false)
            )
      })
      this.$store.dispatch('siderbar/changeCheckedLeafNodes', nodes)
    },
    nodeClick(data, node, obj) {
      console.log('nodeClick', data, node)

      if (data.label === '事故分级调取') {
        this.$store.dispatch('lqfb/changeyadqOffsetRight', this.yadqOffsetRight === 0 ? -30 : 0)
      }
      if (data.label == "火灾报警点") {
        //123123123
        this.$bus.$emit("hzjbd",true);
      }
      if (data.label === this.yadqPannel) {
        this.$store.dispatch('lqfb/changeyadqPannel', '')
      } else if (data.label !== this.yadqPannel) {
        this.$store.dispatch('lqfb/changeyadqPannel', data.label)
      }
      if (data.label === '林区') this.$store.dispatch('lqfb/changeActiveMenu', '林区')
      if ((data.id + '')[0] === '4' || (data.id + '')[0] === '6' || (data.id + '')[0] === '7') {
        this.$store.dispatch('lqfb/changezlOffsetRight', -25)
      }
    },
    clearTreeChecked() {
      this.treeData.map(v => {
        this.$refs[`tree_${v.id}`][0].setCheckedKeys([])
      })
    }
  },
  beforeDestroy(){
    this.$bus.$off("fireList");
  }
}
</script>
<style lang="scss">
</style>
