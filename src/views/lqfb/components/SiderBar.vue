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
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import { Point } from 'ol/geom'
import { Circle as CircleStyle, Fill, Stroke, Style, Icon, Text } from 'ol/style'
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
      sdlayer:undefined,
      sdTemp:false,
      gylcLayer:undefined,
      gylcTemp:false,
      slgyLayer:undefined,
      slgyTemp:false,
      videoList:undefined,
      jkList,
      firePointList,
      dbsbList,
      activeNames: [1,5,6],
      treeData,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      videoPointList:[],
      ttVideoList:[],

      temp:true,
      firelayer:null,
      district:true,
      village:false,
      grid:false,
      street:false,
      videoLayer:null,
      videoTemp:false,
      networkLayer:null,
      networkTemp:false,
      qxczLayer:null,
      qxczTemp:false,
      ttLayer:null,
      ttTemp:false,
      ttVideoLayer:null,
      ttVideoTemp:false,
      //教育资源
      //小学
      primartSchoolLayer:null,
      primartSchoolTemp:false,
      primarySchoolDistrictLayer:null,
      primarySchoolDistrictTemp:false,
      primarySchoolChildrenLayer:null,
      primarySchoolChildrenTemp:false,
      //中学
      middleSchoolDistrictLayer:null,
      middleSchoolDistrictTemp:false,
      middleschoolPointLayer:null,
      middleschoolPointTemp:false,
      middleSchoolChildrenLayer:null,
      middleSchoolChildrenTemp:false,

      isRefresh:false,
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
      for (let i = 1; i <= 10; i++) {
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
    // this.$refs[`tree_1`][0].setCheckedKeys([11, 146])
    this.$refs[`tree_6`][0].setCheckedKeys([61])
    this.$refs[`tree_5`][0].setCheckedKeys([51])
    // this.createFireLayer()
    // 显示选中图层
    this.showCheckLayer()
    const that = this;
    this.$bus.$on("fireList",value=>{
      // console.log(33333)
      if (that.firelayer) {
        window.g.map.removeLayer(that.firelayer)
        that.firelayer = null
        that.isRefresh = true
      }
      that.createFireLayer(value)
      that.isRefresh = false
    })
    this.$bus.$on("checkBox",value=>{
      if (value) {
        that.choseUncheckNodeList();
        that.$bus.$emit("checkAll",true);
      }else{
        that.clearAllNode();
        that.clearTreeChecked();
        that.$bus.$emit("checkAll",false);
          
        that.$store.dispatch('map/changeLayerList', [])
      }
    })
  },
  methods: {
    clearAllNode(){
      const that = this;
      // debugger
      for (let index = 1; index < 11; index++) {
        const tree = this.$refs[`tree_${index}`]
        if (tree) {
          var nodeList = tree[0].getCheckedNodes();
          nodeList = nodeList.filter(v=>{
            if (!!!v.children) {
              return v
            }
          })

          // console.log(nodeList)
          nodeList.map(v=>{
            that.handleCheckChange(v)
          })
        }
      }
    },
    choseUncheckNodeList(){
      const that = this;

      for (let index = 1; index < 10; index++) {
        const tree = that.$refs[`tree_${index}`]
        if (tree) {
          //已选中节点
          const nodeList = tree[0].getCheckedNodes();
          const list = new Array();
          const yjjd = tree[0].data
          yjjd.map(item=>{
            if (item.children && item.children.length>0) {
              item.children.map(v=>{
                list.push(v)
              })
            }else{
              list.push(item)
            }
          })
          if (nodeList.length>0) {
            const checkNodeId = nodeList.map(v => v.id)
            var exceptID = list.map(v=>v.id)
            exceptID = exceptID.filter(v=>{
              if (checkNodeId.indexOf(v)==-1) {
                return v
              }
            })
            const allId = list.map(v=>v.id)
            const resoultList = list.filter(v=>{
              if (exceptID.indexOf(v.id)!=-1) {
                return v
              }
            })
            
            if (resoultList.length>0) {
              resoultList.map(v=>
              {
                that.handleCheckChange(v)
  
              })
              
            }
              tree[0].setCheckedKeys(allId)
            // tree[0].setCheckedKeys(exceptID)
          }else{
            const allId = list.map(v=>v.id)
            list.map(v=>
            {
              // debugger
              that.handleCheckChange(v)
 
            })
            tree[0].setCheckedKeys(allId)
          }
          
        }
      }
    },
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

          if (element.systemcode.indexOf("tyswxt")!= -1) {
           const style = new Style({
              image: new Icon({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                src: require(`@/assets/images/icon/${'火灾点.png'}`)
              }),
              stroke: new Stroke({ color: 'red', width: 2 })
            })
            feature.setStyle(style)
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
            feature.setStyle(style)
          }
          features.push(feature);
        });

        var vectorSource = new VectorSource({
          features,
          wrapX: false
        });
        var fireLayer = new VectorLayer({
          source: vectorSource,
          className:"fire"
        })
        // fireLayer.setStyle(this.$map.getFirePointStyle())
        this.firelayer = fireLayer;
        if (!this.isRefresh) {
          this.temp = true;
        }else{
          if (!this.temp) {
            this.firelayer.setVisible(false);
          }
        }

        this.$map.addLayer(fireLayer)
      }
    },
    handleCheckChange(data, checked, id) {
      // console.log('handleCheckChange', data, checked)
      // 勾选目录树控制总览显示资源
      const that = this;
      let list = window.g.map.getLayers().array_
      // debugger
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
      if (data.label === '监控设备') {
        if (!this.videoLayer) {
          var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            toIndex: 999999,
            queryParameter: {
              // name: layerName,
              attributeFilter: "",
              maxFeatures: 99999999
            },
            datasetNames: [`lishui_forestfire_v2:d_video`]
          })
          const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data";
          // debugger

          new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
            const videoPointList = serviceResult.result.features.features;
            that.videoPointList = videoPointList;
            const features = [];
            const style = new Style({
              image: new Icon({
                anchor: [0.5, 26],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: require(`@/assets/images/icon/${'视频不可选.png'}`)
              }),
            })
            const style1 = new Style({
              image: new Icon({
                anchor: [0.5, 26],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: require(`@/assets/images/icon/监控设备.png`)
              }),
            })
            videoPointList.forEach(element => {
              const properties = element.properties;

              const feature =  new Feature({
                    geometry: new Point([properties.X,properties.Y]),
                    ...properties,
                })

              if(element.properties.VIDEO_URL){
                console.log(element.properties.MC,element.properties.X);
                feature.setStyle(style1)
              } else{
                feature.setStyle(style)
              }
              features.push(feature);
            });
 
            var vectorSource = new VectorSource({
              features,
              wrapX: false
            });
            this.videoLayer = new VectorLayer({
              source: vectorSource,
              })
            this.$map.addLayer(this.videoLayer)
            that.$bus.$emit("showVideoList",true);
            that.$bus.$emit("sendVideoListData",that.videoPointList);
        })
          this.videoTemp = true;
          this.$bus.$emit('allLegend',{"temp":this.videoTemp,"label":data.label});
        }else{
          if (this.videoTemp) {
            this.videoTemp = false
            this.$bus.$emit('allLegend',{"temp":this.videoTemp,"label":data.label});
            that.$bus.$emit("showVideoList",false);
            this.$bus.$emit("clearVideoMaker",true)
          }else if (!this.videoTemp) {
            this.videoTemp = true
            that.$bus.$emit("sendVideoListData",that.videoPointList);
            that.$bus.$emit("showVideoList",true);
            this.$bus.$emit('allLegend',{"temp":this.videoTemp,"label":data.label});
          }
          this.videoLayer.setVisible(this.videoTemp);
        }
      }
      if (data.label == '铁塔监控') {
        if (!this.ttVideoLayer) {
          var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            toIndex: 999999,
            queryParameter: {
              // name: layerName,
              attributeFilter: "",
              maxFeatures: 99999999
            },
            datasetNames: [`lishui_forestfire_v2:v_forest_tower_video`]
          })
          const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data";
          // debugger

          new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {

            const videoPointList = serviceResult.result.features.features;
            const features = [];
            that.ttVideoList = videoPointList;
             
            const style = new Style({
              image: new Icon({
                anchor: [0.5, 26],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: require(`@/assets/images/icon/铁塔监控.png`)
              }),
            })

            videoPointList.forEach(element => {
              const properties = element.properties;

              const feature =  new Feature({
                    geometry: new Point([properties.JD,properties.WD]),
                    ...properties,
                })

              feature.setStyle(style)
              features.push(feature);
            });

            var vectorSource = new VectorSource({
              features,
              wrapX: false
            });
            this.ttVideoLayer = new VectorLayer({
              source: vectorSource,
              })
            this.$map.addLayer(this.ttVideoLayer)
            that.$bus.$emit("showTTVideoList",true);
            that.$bus.$emit("sendTTVideoListData",that.ttVideoList);
        })
          this.ttVideoTemp = true;
          this.$bus.$emit('allLegend',{"temp":this.ttVideoTemp,"label":data.label});
        }else{
          if (this.ttVideoTemp) {
            this.ttVideoTemp = false
            that.$bus.$emit("showTTVideoList",false);
            this.$bus.$emit('allLegend',{"temp":this.ttVideoTemp,"label":data.label});
          }else if (!this.ttVideoTemp) {
            this.ttVideoTemp = true
            
            that.$bus.$emit("showTTVideoList",true);
            that.$bus.$emit("sendTTVideoListData",that.ttVideoList);
            
            this.$bus.$emit('allLegend',{"temp":this.ttVideoTemp,"label":data.label});
          }
          this.ttVideoLayer.setVisible(this.ttVideoTemp);
        }
      }
      if(data.label === '气象测站'){
        if (!this.qxczLayer) {
          var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            toIndex: 999999,
            maxFeatures: 99999999,
            queryParameter: {
              // name: layerName,
              attributeFilter: "",
            },
            datasetNames: [`lishui_forestfire_v2:v_forest_qixiangcezhandian`]
          })
          const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data";
          // debugger

          new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
            const list = serviceResult.result.features.features;
            // debugger
            const features = [];
            list.forEach(element => {
              const properties = element.properties;

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
            });
 
            var vectorSource = new VectorSource({
              features,
              wrapX: false
            });
            this.qxczLayer = new VectorLayer({
              source: vectorSource,
              })
            
            this.$map.addLayer(this.qxczLayer)
        })
          this.qxczTemp = true;
          this.$bus.$emit('allLegend',{"temp":this.qxczTemp,"label":data.label});
        }else{
          if (this.qxczTemp) {
            this.qxczTemp = false
            this.$bus.$emit('allLegend',{"temp":this.qxczTemp,"label":data.label});
          }else if (!this.qxczTemp) {
            this.qxczTemp = true
            this.$bus.$emit('allLegend',{"temp":this.qxczTemp,"label":data.label});
          }
          this.qxczLayer.setVisible(this.qxczTemp);
        }
      }
      if(data.label === '小学'){
        if (!this.primartSchoolLayer) {
          var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            toIndex: -1,
            maxFeatures: 99999999,
            queryParameter: {
              // name: layerName,
              attributeFilter: "",

            },
            datasetNames: [`lishui_forestfire_v2:jy_primaryschool`]
          })
          const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data";
          // debugger

          new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
            const list = serviceResult.result.features;
            // debugger
            const features = new GeoJSON().readFeatures(list)
            var vectorSource = new VectorSource({
              features,
              wrapX: false
            });
            const style = new Style({
                image: new Icon({
                  anchor: [0.5, 26],
                  anchorXUnits: 'fraction',
                  anchorYUnits: 'pixels',
                  scale:0.7,
                  src: require(`@/assets/images/icon/${'小学.png'}`)
                }),
                // stroke: new Stroke({ color: 'red', width: 2 })
            })
            this.primartSchoolLayer = new VectorLayer({
              source: vectorSource,
              style
            })
            this.$map.addLayer(this.primartSchoolLayer)
        })
          this.primartSchoolTemp = true;
          this.$bus.$emit('allLegend',{"temp":this.primartSchoolTemp,"label":data.label});
        }else{
          if (this.primartSchoolTemp) {
            this.primartSchoolTemp = false
            this.$bus.$emit('allLegend',{"temp":this.primartSchoolTemp,"label":data.label});
          }else if (!this.qxczTemp) {
            this.primartSchoolTemp = true
            this.$bus.$emit('allLegend',{"temp":this.primartSchoolTemp,"label":data.label});
          }
          this.primartSchoolLayer.setVisible(this.primartSchoolTemp);
        }
      }
      if(data.label === '小学学区'){
        if (!this.primarySchoolDistrictLayer) {
          const url = "http://10.53.137.59:8090/iserver/services/map-lishui_forestfire_v2/rest/maps/jy_primaryschool_district@lishui_forestfire_v2"
          this.primarySchoolDistrictLayer = this.$map.createTileSuperMapRestLayer(url, {
            className: "primarySchoolDistrictLayer",
          });
          this.$map.addLayer(this.primarySchoolDistrictLayer);
          this.primarySchoolDistrictTemp = true;
          this.$bus.$emit('allLegend',{"temp":this.primarySchoolDistrictTemp,"label":data.label});
          // this.$bus.$emit('primarySchoolDistrictTemp',this.primarySchoolDistrictTemp);
        }else{
          if (this.primarySchoolDistrictTemp) {
            this.primarySchoolDistrictTemp = false
            this.$bus.$emit('allLegend',{"temp":this.primarySchoolDistrictTemp,"label":data.label});
            // this.$bus.$emit('primarySchoolDistrictTemp',this.primarySchoolDistrictTemp);
            // this.$bus.$emit('primarySchoolDistrict',this.primarySchoolDistrictTemp);
          }else if (!this.primarySchoolDistrictTemp) {
            this.primarySchoolDistrictTemp = true
            this.$bus.$emit('allLegend',{"temp":this.primarySchoolDistrictTemp,"label":data.label});
            // this.$bus.$emit('primarySchoolDistrictTemp',this.primarySchoolDistrictTemp);
          }
          this.primarySchoolDistrictLayer.setVisible(this.primarySchoolDistrictTemp);
        }
      }
      if(data.label === '小学适龄儿童'){
        if (!this.primarySchoolChildrenLayer) {
          var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            toIndex:-1,
            maxFeatures: 99999999,
            queryParameter: {
              // name: layerName,
              attributeFilter: "",
              // maxFeatures: 99999999999
            },
            datasetNames: [`lishui_forestfire_v2:jy_primaryschool_children`]
          })
          const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data";
          // debugger

          new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
            const features = new GeoJSON().readFeatures(serviceResult.result.features)
            const style = new Style({
              image: new Icon({
                anchor: [0.5, 26],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                scale:0.7,
                src: require(`@/assets/images/icon/${'小学适龄儿童.png'}`)
              }),
            })
            var vectorSource = new VectorSource({
              features,
              wrapX: false
            });
            this.primarySchoolChildrenLayer = new VectorLayer({
              source: vectorSource,
              style
            })
            
            this.$map.addLayer(this.primarySchoolChildrenLayer)
        })
          this.primarySchoolChildrenTemp = true;
          this.$bus.$emit('allLegend',{"temp":this.primarySchoolChildrenTemp,"label":data.label});
          // this.$bus.$emit('primarySchoolChildrenTemp',this.primarySchoolChildrenTemp);
          // this.$store.dispatch('lqfb/changeVideoListOffsetRight', 0)
        }else{
          if (this.primarySchoolChildrenTemp) {
            this.primarySchoolChildrenTemp = false
            this.$bus.$emit('allLegend',{"temp":this.primarySchoolChildrenTemp,"label":data.label});
            // this.$bus.$emit('primarySchoolChildrenTemp',this.primarySchoolChildrenTemp);
          }else if (!this.primarySchoolChildrenTemp) {
            this.primarySchoolChildrenTemp = true
            this.$bus.$emit('allLegend',{"temp":this.primarySchoolChildrenTemp,"label":data.label});
            // this.$bus.$emit('primarySchoolChildrenTemp',this.primarySchoolChildrenTemp);
          }
          this.primarySchoolChildrenLayer.setVisible(this.primarySchoolChildrenTemp);
        }
      }
      if(data.label === '初中'){
        if (!this.middleschoolPointLayer) {
          var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            toIndex: -1,
            maxFeatures: 99999999,
            queryParameter: {
              // name: layerName,
              attributeFilter: "",
            },
            datasetNames: [`lishui_forestfire_v2:jy_middleschool`]
          })
          const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data";
          // debugger

          new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
            const list = serviceResult.result.features;

            const features = new GeoJSON().readFeatures(list)
            var vectorSource = new VectorSource({
              features,
              wrapX: false
            });
            const style = new Style({
                image: new Icon({
                  anchor: [0.5, 26],
                  anchorXUnits: 'fraction',
                  anchorYUnits: 'pixels',
                  scale:0.7,
                  src: require(`@/assets/images/icon/${'初中.png'}`)
                }),
                // stroke: new Stroke({ color: 'red', width: 2 })
            })
            this.middleschoolPointLayer = new VectorLayer({
              source: vectorSource,
              style
            })
            
            this.$map.addLayer(this.middleschoolPointLayer)
        })
          this.middleschoolPointTemp = true;
          this.$bus.$emit('allLegend',{"temp":this.middleschoolPointTemp,"label":data.label});
          // this.$bus.$emit('middleschoolPoint',this.middleschoolPointTemp);
          // this.$store.dispatch('lqfb/changeVideoListOffsetRight', 0)
        }else{
          if (this.middleschoolPointTemp) {
            this.middleschoolPointTemp = false
            this.$bus.$emit('allLegend',{"temp":this.middleschoolPointTemp,"label":data.label});
            // this.$bus.$emit('middleschoolPoint',this.middleschoolPointTemp);
          }else if (!this.middleschoolPointTemp) {
            this.middleschoolPointTemp = true
            this.$bus.$emit('allLegend',{"temp":this.middleschoolPointTemp,"label":data.label});
            // this.$bus.$emit('middleschoolPoint',this.middleschoolPointTemp);
          }
          this.middleschoolPointLayer.setVisible(this.middleschoolPointTemp);
        }
      }
      if(data.label === '初中学区'){
        if (!this.middleSchoolDistrictLayer) {
          const url = "http://10.53.137.59:8090/iserver/services/map-lishui_forestfire_v2/rest/maps/jy_middleschool_district@lishui_forestfire_v2"
          this.middleSchoolDistrictLayer = this.$map.createTileSuperMapRestLayer(url, {
            className: "middleSchoolDistrictLayer",
          });
          this.$map.addLayer(this.middleSchoolDistrictLayer);
          this.middleSchoolDistrictTemp = true;
          this.$bus.$emit('allLegend',{"temp":this.middleSchoolDistrictTemp,"label":data.label});
          // this.$bus.$emit('middleSchoolDistrictTemp',this.middleSchoolDistrictTemp);
          // this.$store.dispatch('lqfb/changeVideoListOffsetRight', 0)
        }else{
          if (this.middleSchoolDistrictTemp) {
            this.middleSchoolDistrictTemp = false
            this.$bus.$emit('allLegend',{"temp":this.middleSchoolDistrictTemp,"label":data.label});
            // this.$bus.$emit('middleSchoolDistrictTemp',this.middleSchoolDistrictTemp);
          }else if (!this.middleSchoolDistrictTemp) {
            this.middleSchoolDistrictTemp = true
            this.$bus.$emit('allLegend',{"temp":this.middleSchoolDistrictTemp,"label":data.label});
            // this.$bus.$emit('middleSchoolDistrictTemp',this.middleSchoolDistrictTemp);
          }
          this.middleSchoolDistrictLayer.setVisible(this.middleSchoolDistrictTemp);
        }
      }
      if(data.label === '初中适龄儿童'){
        if (!this.middleSchoolChildrenLayer) {
          var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            toIndex: -1,
            maxFeatures: 99999999,
            queryParameter: {
              // name: layerName,
              attributeFilter: "",
            },
            datasetNames: [`lishui_forestfire_v2:jy_middleschool_children`]
          })
          const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data";
          // debugger

          new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
            // const list = serviceResult.result.features.features;
            const features = new GeoJSON().readFeatures(serviceResult.result.features)
             const style = new Style({
              image: new Icon({
                anchor: [0.5, 26],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                scale:0.7,
                src: require(`@/assets/images/icon/${'初中适龄儿童.png'}`)
              }),
            })
            var vectorSource = new VectorSource({
              features,
              wrapX: false
            });
            this.middleSchoolChildrenLayer = new VectorLayer({
              source: vectorSource,
              style,
              })
            
            this.$map.addLayer(this.middleSchoolChildrenLayer)
        })
          this.middleSchoolChildrenTemp = true;
          this.$bus.$emit('allLegend',{"temp":this.middleSchoolChildrenTemp,"label":data.label});
          // this.$bus.$emit('middleSchoolChildren',this.middleSchoolChildrenTemp);
          // this.$store.dispatch('lqfb/changeVideoListOffsetRight', 0)
        }else{
          if (this.middleSchoolChildrenTemp) {
            this.middleSchoolChildrenTemp = false
            this.$bus.$emit('allLegend',{"temp":this.middleSchoolChildrenTemp,"label":data.label});
            // this.$bus.$emit('middleSchoolChildren',this.middleSchoolChildrenTemp);
          }else if (!this.middleSchoolChildrenTemp) {
            this.middleSchoolChildrenTemp = true
            this.$bus.$emit('allLegend',{"temp":this.middleSchoolChildrenTemp,"label":data.label});
            // this.$bus.$emit('middleSchoolChildren',this.middleSchoolChildrenTemp);
          }
          this.middleSchoolChildrenLayer.setVisible(this.middleSchoolChildrenTemp);
        }
      }
      if(data.label === '火灾报警点'){
        if(this.temp){
          this.temp = false;
          this.firelayer.setVisible(false);
          this.$bus.$emit('hzjbd',this.temp);
          // that.$bus.$emit("changeMenuLocaltion",2)
        }else if (!this.temp) {
          this.temp = true;
          this.firelayer.setVisible(true);
          this.$bus.$emit('hzjbd',this.temp);
          // that.$bus.$emit("changeMenuLocaltion",30)
        }
        this.$store.dispatch('lqfb/changezlOffsetRight', 0)
      }
      if(data.label === '办事网点'){
        if (!this.networkLayer) {
          var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            toIndex: 999999,
            queryParameter: {
              // name: layerName,
              attributeFilter: "",
              maxFeatures: 99999999
            },
            datasetNames: [`lishui_forestfire_v2:d_handle_network`]
          })
          const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data";
          // debugger

          new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
            const videoPointList = serviceResult.result.features.features;
            // debugger
            const features = [];
            videoPointList.forEach(element => {
              const properties = element.properties;

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
                  scale: 1,
                  src: require(`@/assets/images/icon/${'办事网点.png'}`)
                }),
                // stroke: new Stroke({ color: 'red', width: 2 })
              })
              feature.setStyle(style)
              features.push(feature);
            });
 
            var vectorSource = new VectorSource({
              features,
              wrapX: false
            });
            this.networkLayer = new VectorLayer({
              source: vectorSource,
              style:this.$map.getMonitorStyle()
              })
            
            //4: "119.35790729284101"
            //5: "27.541516789796798"
            this.$map.addLayer(this.networkLayer)
        })
          this.networkTemp = true;
          this.$bus.$emit('allLegend',{"temp":this.networkTemp,"label":data.label});
          // this.$store.dispatch('lqfb/changeVideoListOffsetRight', 0)
          // that.$bus.$emit('bswd',true)
        }else{
          if (this.networkTemp) {
            this.networkTemp = false
            this.$bus.$emit('allLegend',{"temp":this.networkTemp,"label":data.label});
            // that.$bus.$emit('bswd',false)
          }else if (!this.networkTemp) {
            this.networkTemp = true
            this.$bus.$emit('allLegend',{"temp":this.networkTemp,"label":data.label});
            // that.$bus.$emit('bswd',true)
          }
          this.networkLayer.setVisible(this.networkTemp);
        }
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
      if (data.label ==='林区') {
        const temp1 ={label:"国有林场"}
        const temp2 ={label:"森林公园"}
        this.handleCheckChange(temp1)
        this.handleCheckChange(temp2)
      }
      if (data.label === '国有林场') {
        if (!this.gylcLayer) {
          var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            toIndex: 999999,
            queryParameter: {
              // name: layerName,
              attributeFilter: "",
              maxFeatures: 99999999
            },
            datasetNames: [`lishui_forestfire_v2:d_national_forest`]
          })
          const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data";

          new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
            const features = new GeoJSON().readFeatures(serviceResult.result.features)
            
            features.map(f => {
              f.setStyle(new Style({
                stroke: new Stroke({
                  color: 'rgba(249,219,49, 0.8)',
                  // lineDash: [4],
                  width: 1
                }),
                fill: new Fill({
                  color: 'rgba(249,219,49, 0.8)'
                }),
                text: new Text({
                  textAlign: 'center', // 位置
                  textBaseline: 'middle', // 基准线
                  offsetY: 20,
                  font: 'normal 16px bold 微软雅黑', // 文字样式
                  text: f.get('NAME') + '', // 文本内容
                  fill: new Fill({ // 文本填充样式（即文字颜色)
                    color: '#FC9309'
                  }),
                  stroke: new Stroke({
                    color: '#101518',
                    width: 2
                  })
                })
              }))
            })
           
            var vectorSource = new VectorSource({
              features,
              wrapX: false
            });

            const style = new Style({
              image: new Icon({
                anchor: [0.5, 26],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: require(`@/assets/images/icon/${'国有林场.png'}`)
              }),
            })
            this.gylcLayer = new VectorLayer({
              source: vectorSource,
              style:style
            })
            window.g.map.getLayers().insertAt(4, this.gylcLayer)
        })
          this.gylcTemp = true;
          this.$bus.$emit('allLegend',{"temp":this.gylcTemp,"label":data.label});
          // that.$bus.$emit("gylcLayer",true);
          // this.$store.dispatch('lqfb/changeVideoListOffsetRight', 0)
        }else{
          if (this.gylcTemp) {
            this.gylcTemp = false
            this.$bus.$emit('allLegend',{"temp":this.gylcTemp,"label":data.label});
            // that.$bus.$emit("gylcLayer",false);
          }else if (!this.gylcTemp) {
            this.gylcTemp = true
            this.$bus.$emit('allLegend',{"temp":this.gylcTemp,"label":data.label});
            // that.$bus.$emit("gylcLayer",true);
          }
          this.gylcLayer.setVisible(this.gylcTemp);
        }
      }
      if (data.label === '森林公园') {
        if (!this.slgyLayer) {
          var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            toIndex: 999999,
            queryParameter: {
              // name: layerName,
              attributeFilter: "",
              maxFeatures: 99999999
            },
            datasetNames: [`lishui_forestfire_v2:d_forest_park`]
          })
          const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data";

          new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
            const features = new GeoJSON().readFeatures(serviceResult.result.features)
            
             features.map(f => {
              f.setStyle(new Style({
                stroke: new Stroke({
                  color: 'rgba(17, 243, 142, 0.8)',
                  // lineDash: [4],
                  width: 1
                }),
                fill: new Fill({
                  color: 'rgba(17, 243, 142, 0.8)'
                }),
                text: new Text({
                  textAlign: 'center', // 位置
                  textBaseline: 'middle', // 基准线
                  offsetY: 20,
                  font: 'normal 16px bold 微软雅黑', // 文字样式
                  text: f.get('NAME') + '', // 文本内容
                  fill: new Fill({ // 文本填充样式（即文字颜色)
                    color: '#6CF54B'
                  }),
                  stroke: new Stroke({
                    color: '#101518',
                    width: 2
                  })
                })
              }))
            })

            var vectorSource = new VectorSource({
              features,
              wrapX: false
            });

            const style = new Style({
              image: new Icon({
                anchor: [0.5, 26],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: require(`@/assets/images/icon/${'森林公园.png'}`)
              }),
            })
            this.slgyLayer = new VectorLayer({
              source: vectorSource,
              style:style
              })
            window.g.map.getLayers().insertAt(4, this.slgyLayer)
            // this.$map.addLayer(this.slgyLayer)
        })
          this.slgyTemp = true;
          this.$bus.$emit('allLegend',{"temp":this.slgyTemp,"label":data.label});
          // that.$bus.$emit("slgyLayer",true);
          // this.$store.dispatch('lqfb/changeVideoListOffsetRight', 0)
        }else{
          if (this.slgyTemp) {
            this.slgyTemp = false
            this.$bus.$emit('allLegend',{"temp":this.slgyTemp,"label":data.label});
            // that.$bus.$emit("slgyLayer",false);
          }else if (!this.slgyTemp) {
            this.slgyTemp = true
            this.$bus.$emit('allLegend',{"temp":this.slgyTemp,"label":data.label});
            // that.$bus.$emit("slgyLayer",true);
          }
          this.slgyLayer.setVisible(this.slgyTemp);
        }
      }
      if (data.label === '湿地') {
        if (!this.sdLayer) {
          var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            toIndex: 999999,
            queryParameter: {
              // name: layerName,
              attributeFilter: "",
              maxFeatures: 99999999
            },
            datasetNames: [`lishui_forestfire_v2:d_wetland`]
          })
          const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data";

          new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
            const features = new GeoJSON().readFeatures(serviceResult.result.features)
            features.map(f => {
              f.setStyle(new Style({
                stroke: new Stroke({
                  color: 'rgba(59, 97, 249, 0.8)',
                  // lineDash: [4],
                  width: 1
                }),
                fill: new Fill({
                  color: 'rgba(59, 97, 249, 0.8)'
                }),
                text: new Text({
                  textAlign: 'center', // 位置
                  textBaseline: 'middle', // 基准线
                  offsetY: 20,
                  font: 'normal 16px bold 微软雅黑', // 文字样式
                  text: f.get('NAME') + '', // 文本内容
                  fill: new Fill({ // 文本填充样式（即文字颜色)
                    color: '#418CFD'
                  }),
                  stroke: new Stroke({
                    color: '#101518',
                    width: 2
                  })
                })
              }))
            })
            var vectorSource = new VectorSource({
              features,
              wrapX: false
            });

            const style = new Style({
              image: new Icon({
                anchor: [0.5, 26],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: require(`@/assets/images/icon/${'湿地.png'}`)
              }),
            })
            this.sdLayer = new VectorLayer({
              source: vectorSource,
              style:style
              })
            window.g.map.getLayers().insertAt(4, this.sdLayer)
        })
          this.sdTemp = true;
          this.$bus.$emit('allLegend',{"temp":this.sdTemp,"label":data.label});
          // that.$bus.$emit("sdLayer",true);
          // this.$store.dispatch('lqfb/changeVideoListOffsetRight', 0)
        }else{
          if (this.sdTemp) {
            this.sdTemp = false
            this.$bus.$emit('allLegend',{"temp":this.sdTemp,"label":data.label});
            // that.$bus.$emit("sdLayer",false);
          }else if (!this.sdTemp) {
            this.sdTemp = true
            this.$bus.$emit('allLegend',{"temp":this.sdTemp,"label":data.label});
            // that.$bus.$emit("sdLayer",true);
          }
          this.sdLayer.setVisible(this.sdTemp);
        }
      }
      if (data.label ==='地表覆盖') {
        const temp1 ={label:"湿地"}
        this.handleCheckChange(temp1)

      }
      if (data.label === '铁塔') {
        if (!this.ttLayer) {
          var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            toIndex: -1,
            maxFeatures: 99999999,
            queryParameter: {
              // name: layerName,
              attributeFilter: "",

            },
            datasetNames: [`lishui_forestfire_v2:v_forest_tower`]
          })
          const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data";

          new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
            const features = new GeoJSON().readFeatures(serviceResult.result.features)
            features.map(f => {
              f.setStyle(new Style({
                image: new Icon({
                  anchor: [0.5, 26],
                  anchorXUnits: 'fraction',
                  anchorYUnits: 'pixels',
                  scale: 1,
                  src: require(`@/assets/images/icon/${'铁塔.png'}`)
                }),
              }))
            })
            var vectorSource = new VectorSource({
              features,
              wrapX: false
            });

            this.ttLayer = new VectorLayer({
              source: vectorSource,
            })

            this.$map.addLayer(this.ttLayer)
        })
          this.ttTemp = true;
          this.$bus.$emit('allLegend',{"temp":this.ttTemp,"label":data.label});
          // that.$bus.$emit("ttLayer",true);
          // this.$store.dispatch('lqfb/changeVideoListOffsetRight', 0)
        }else{
          if (this.ttTemp) {
            this.ttTemp = false
            this.$bus.$emit('allLegend',{"temp":this.ttTemp,"label":data.label});
            // that.$bus.$emit("ttLayer",false);
          }else if (!this.ttTemp) {
            this.ttTemp = true
            this.$bus.$emit('allLegend',{"temp":this.ttTemp,"label":data.label});
            // that.$bus.$emit("ttLayer",true);
          }
          this.ttLayer.setVisible(this.ttTemp);
        }
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
      const that = this;
      const nodes = [] // 所有大类下的tree选中的叶子节点
      this.treeData.map(v => {
        v.children &&
            nodes.push(
              ...this.$refs[`tree_${v.id}`][0].getCheckedNodes(true, false)
            )
      })
      if (nodes.length>0) {
        that.$bus.$emit("checkAll",true);
      }else{
        that.$bus.$emit("checkAll",false);
      }
      // debugger
      this.$store.dispatch('siderbar/changeCheckedLeafNodes', nodes)
      this.$bus.$emit('primartSchool',this.primartSchoolTemp);
      this.$bus.$emit('primarySchoolChildrenTemp',this.primarySchoolChildrenTemp);
      this.$bus.$emit('middleschoolPoint',this.middleschoolPointTemp);
      this.$bus.$emit('middleSchoolChildren',this.middleSchoolChildrenTemp);

    },
    nodeClick(data, node, obj) {
      console.log('nodeClick', data, node)

      // if (data.label === '事故分级调取') {
      //   this.$store.dispatch('lqfb/changeyadqOffsetRight', this.yadqOffsetRight === 0 ? -30 : 0)
      // }
      if (data.label == "火灾报警点") {
        //123123123
        // this.$bus.$emit("hzjbd",true);
      }
      // debugger
      if (data.label == "监控设备") {
        //123123123
        // that.$bus.$emit("showVideoList",true);
        return
      }
      // if (data.label === this.yadqPannel) {
      //   this.$store.dispatch('lqfb/changeyadqPannel', '')
      // } else if (data.label !== this.yadqPannel) {
      //   this.$store.dispatch('lqfb/changeyadqPannel', data.label)
      // }
      // if (data.label === '林区') this.$store.dispatch('lqfb/changeActiveMenu', '林区')
      // if ((data.id + '')[0] === '4' || (data.id + '')[0] === '6' || (data.id + '')[0] === '7') {
      //   this.$store.dispatch('lqfb/changezlOffsetRight', -25)
      // }
    },
    clearTreeChecked() {
      this.treeData.map(v => {
        this.$refs[`tree_${v.id}`][0].setCheckedKeys([])
      })
    }
  },
  beforeDestroy(){
    this.$bus.$off("fireList");
    this.$bus.$off("checkBox");
  }
}
</script>
<style lang="scss" scoped>
.lqfb-wrapper{
  overflow-y: scroll;
  height: 90%;
}
/*滚动条样式*/
.lqfb-wrapper::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}
.lqfb-wrapper::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background:#118251;
    width: 8px;
    height: 30px;
}
.lqfb-wrapper::-webkit-scrollbar-track {
    border-radius: 0;
    background:#103E29;
}
</style>
