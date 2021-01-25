<template>
  <!-- 选择火灾点位置 -->
  <div class="pick-wrapper" :style="`right:20rem`">
    <span>分析范围(km²)</span>
    <input
      v-model="inputSearchRadius"
      placeholder=""
      @keyup="inputSearchRadius = inputSearchRadius.replace(/[^\d.]/g, '')"
    >
    <div class="footer">
      <div class="btn" @click="handlePickClick">选择火灾点</div>
      <div class="btn" @click="handleClearClick">清除</div>
    </div>
  </div>
</template>

<script>
import * as turf from '@turf/turf'
import GeoJSON from 'ol/format/GeoJSON'

export default {
  data() {
    return {
      inputSearchRadius: 5
    }
  },
  computed: {
    firePtLayer() {
      return this.$store.getters.firePtLayer
    },
    features() {
      return this.$store.getters.features
    }
  },
  watch: {
    features(val) {
      this.initData()
    }
  },
  methods: {
    handlePickClick() {
      if (this.inputSearchRadius === 0 || !this.inputSearchRadius) {
        this.$message.info('请设置分析范围！')
        return
      }
      if (this.firePtLayer) {
        this.$message.info('请清除已有火灾点！')
        return
      }
      this.$map.doInteractionDraw('Point', (geojson, fireFeature) => {
        fireFeature.setStyle(this.$map.getFirePointStyle())
        const layer = this.$map.createVectorLayer([fireFeature])
        this.$map.addLayer(layer)
        this.$store.dispatch('jjya/changeFirePtLayer', layer)
        const buffered = turf.buffer(
          turf.point(fireFeature.getGeometry().getCoordinates()),
          this.inputSearchRadius,
          {
            units: 'kilometers'
          }
        )
        var format = new GeoJSON()
        var f = format.readFeature(buffered)
        f.setStyle(this.$map.getPolygonStyle())
        layer.getSource().addFeature(f)
        this.$store.dispatch('jjya/changeBuffer', f)
        this.$parent.$refs['siderBar'].$refs['tree_4'][0].setCheckedKeys([1, 'zbzy', 'aqfx'])
        const nodes = [] // 智能分析的tree选中的叶子节点
        nodes.push(...this.$parent.$refs['siderBar'].$refs['tree_4'][0].getCheckedNodes(true, false))
        this.$store.dispatch('map/changeIsAddFeatures', true) // 只在选中火灾点的时候获取才重新数据
        this.$store.dispatch('map/clearFeatures', []) // 设置features为空
        this.$store.dispatch('siderbar/changeCheckedLeafNodesWithBuffer', nodes)
      })
    },

    handleClearClick() {
      this.firePtLayer && this.$map.removeLayer(this.firePtLayer)
      this.$store.dispatch('jjya/changeFirePtLayer', null)
      this.$store.dispatch('jjya/changeBuffer', null)
      this.$store.dispatch('siderbar/changeCheckedLeafNodesWithBuffer', [])
      this.$parent.$refs['siderBar'].$refs['tree_4'][0].setCheckedKeys([])
    },
    initData() {
      if (this.features.length === 71) {
        const attrDic = {
          ZBZY: { // 周边资源
            JZJZNL_YJZJ: {
              name: '应急专家'
            },
            JZJZNL_YJDW: {
              name: '应急队伍'
            },
            JZJZNL_BZAZCS: {
              name: '应急避难场所'
            },
            JZJZNL_WZCBK: {
              name: '应急物资储备库'
            },
            JZJZNL_WZCBQY: {
              name: '物质企业储备库'
            },
            JZJZNL_YJGJSB: {
              name: '应急关键设备'
            },
            JZJZNL_YLJH: {
              name: '医疗救护'
            },
            JZJZNL_XFJYNL: {
              name: '消防救援能力'
            }
          },
          AQFXY: { // 安全风险源
            SLGC: {
              name: '水利工程',
              children: ['reservoir', 'pool', 'seawall', 'dyke', 'pump', 'water_gate', 'AQFXY_SL_HZ', 'AQFXY_SL_FLQKK', 'rural_drinking_water', 'AQFXY_SL_SDZ']
            },
            DLYS: {
              name: '道路运输',
              children: ['bridge', 'tunnel', 'AQFXY_JT_HD', 'port_wharf', 'waterway_transport_unit', 'D_HAZARDS_TRACKSHP_P', 'D_HAZARDS_TRAIN_STATION', 'dangerous_car_enterprise']
            },
            D_HAZARDS_CHEMICALSHP: {
              name: '化工及危险品企业'
            },
            RYMJ: {
              name: '人员密集场所',
              children: ['tourist_spot', 'agritainment', 'homestay', 'AQFXY_RM_ZDCY']
            },
            D_HARAZDS_FIREWORKS: {
              name: '烟花爆竹经营单位'
            },
            ire_safety_protect_unit: {
              name: '消防安全单位'
            },
            QT: {
              name: '其它',
              children: ['Civil_explosives_Enterprises', 'AQFXY_QT_YZDHX']
            }
          },
          riverNum: 0,
          wayNum: 0
        }
        // let riverNum = 0
        // let wayNum = 0
        const fe = []
        // 去除空数组
        this.features.forEach(item => {
          if (item.length > 0) {
            fe.push(item)
          }
        })
        fe.forEach(item => {
          if (item[0].values_['BUFFERRADIUSRIGHT']) {
            // 道路数量
            attrDic.wayNum += item.length
          } else if (item[0].values_['BUFFERRADIUSLEFT'] === '5.0' || item[0].values_['BUFFERRADIUSLEFT'] === '10.0') {
            // 水系数量
            attrDic.riverNum += item.length
          } else {
            item.forEach(i => {
              for (const listKey in attrDic) {
                for (const key in attrDic[listKey]) {
                  if (item[0].values_['TABLE_NAME'].indexOf(key) !== -1 || (attrDic[listKey][key].children && attrDic[listKey][key].children.indexOf(item[0].values_['TABLE_NAME']) !== -1)) {
                    attrDic[listKey][key].arr
                      ? attrDic[listKey][key].arr.push({
                        name: i.values_['NAME']
                      })
                      : attrDic[listKey][key].arr = [{
                        name: i.values_['NAME']
                      }]
                  }
                }
              }
            })
          }
        })
        this.$store.dispatch('map/changeFeaturesData', attrDic)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pick-wrapper {
  position: absolute;
  top: 100px;
  z-index: 999;
  padding: 10px;
  background-color: rgba($color: $color-theme, $alpha: 0.8);
  border: 1px solid $color-text-active;
  transition: right 0.9s;
  input{
    width: 100px;
  }
  .footer {
    display: flex;
    justify-content: space-around;
    margin-bottom: 5px;
    margin-top: 10px;
    padding: 0 5px;
    .btn{
      display: inline-block;
      padding: 5px 13px;
      border: 1px solid $color-text-active;
      border-radius: 4px;
      color: $color-text-active;
      /* &:hover{
        background-color: $color-text-active;
        color: $color-text-normal;
        cursor: pointer;
      } */
    }
  }
}
</style>
