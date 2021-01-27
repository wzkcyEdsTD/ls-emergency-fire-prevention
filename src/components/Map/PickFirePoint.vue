<template>
  <!-- 选择火灾点位置 -->
  <div class="pick-wrapper">
    <div class="title">
      绘制火灾点
      <i class="el-icon-close" @click="closePicFirePoint" />
    </div>
    <div class="content">
      <div class="input-container">
        <div class="draw-wrapper">
          <div class="item">
            <span>经度：</span>
            <input
              v-model="inputLon"
              placeholder=""
              @keyup="inputLon = inputLon.replace(/[^\d.]/g, '')"
            >
          </div>
          <div class="item">
            <span>纬度：</span>
            <input
              v-model="inputLat"
              placeholder=""
              @keyup="inputLat = inputLat.replace(/[^\d.]/g, '')"
            >
          </div>
          <div class="input-btn" @click="handlePickClick" />
        </div>
        <div class="input-radius">
          <input
            v-model="inputSearchRadius"
            placeholder="输入分析半径"
            @keyup="inputSearchRadius = inputSearchRadius.replace(/[^\d.]/g, '')"
          >
        </div>
      </div>
      <div class="footer">
        <div class="btn" @click="handleClearClick">重选</div>
        <div class="btn" @click="handleComfirmClick">确认</div>
      </div>
    </div>

  </div>
</template>

<script>
import * as turf from '@turf/turf'
import GeoJSON from 'ol/format/GeoJSON'
// import MAP_URL from '@/utils/map/map-url'
import hzdfxNodes from './hzdfx'

export default {
  data() {
    return {
      inputSearchRadius: 2,
      inputLon: null,
      inputLat: null
    }
  },
  computed: {
    firePtLayer() {
      return this.$store.getters.firePtLayer
    },
    features() {
      return this.$store.getters.features
    },
    clearFlag() {
      return this.$store.getters.clearFlag
    },
    lqzyLayer() {
      return this.$store.getters.lqzyLayer
    }
  },
  watch: {
    features(val) {
      this.initData()
    },
    clearFlag() {
      this.clearFire()
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

      // 没有输入经纬度则用鼠标选择
      if (this.inputLat || this.inputLon) {
        if (!this.inputLon) {
          this.$message.info('请请输入经度！')
          return
        }
        if (!this.inputLat) {
          this.$message.info('请请输入纬度！')
          return
        }
        const fireFeat = this.$map.createFeature([this.inputLon, this.inputLat])
        this.showFireFeature(fireFeat)
      } else {
        this.$map.doInteractionDraw('Point', (geojson, fireFeature) => {
          this.showFireFeature(fireFeature)
        })
      }
    },

    showFireFeature(fireFeature) {
      this.$map.zoomToFeature(fireFeature, 13)
      fireFeature.setStyle(this.$map.getFirePointStyle())
      this.$store.dispatch('jjya/changeFirePt', fireFeature)
      const layer = this.$map.createVectorLayer([fireFeature])
      this.$map.addLayer(layer)
      const fireCoor = fireFeature.getGeometry().getCoordinates()
      this.inputLon = fireCoor[0]
      this.inputLat = fireCoor[1]
      const buffered = turf.buffer(
        turf.point(fireCoor),
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
      this.$store.dispatch('jjya/changeFirePtLayer', layer)
    },

    clearFire() {
      this.$store.dispatch('map/changeIsAddFeatures', false)
      this.inputLon = null
      this.inputLat = null
      this.firePtLayer && this.$map.removeLayer(this.firePtLayer)
      // this.$store.dispatch('map/changeLqzyLayer', false)
      this.$store.dispatch('jjya/changeFirePtLayer', null)
      this.$store.dispatch('jjya/changeBuffer', null)
      this.$store.dispatch('jjya/changeFirePt', null)
      this.$store.dispatch('siderbar/changeCheckedLeafNodesWithBuffer', [])
    },

    handleClearClick() {
      this.clearFire()
      this.$store.dispatch('map/changeClearFlag', null)
      // this.handlePickClick()
    },
    initData() {
      if (this.features.length === 81) {
        const attrDic = {
          ZBZY: { // 周边资源
            JZJZNL_YJDW: {
              name: '应急队伍'
            },
            JZJZNL_YJZJ: {
              name: '应急专家'
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
          wayNum: 0,
          dbfgNum: 0
        }
        // debugger
        // 去除空数组
        const fe = this.features.filter(v => v.length > 0)
        fe.forEach(item => {
          if (item[0].values_['BUFFERRADIUSRIGHT']) {
            // 道路数量
            attrDic.wayNum += item.length
          } else if (item[0].values_['BUFFERRADIUSLEFT']) {
            // 水系数量
            attrDic.riverNum += item.length
          } else if (item[0].values_['TABLE_NAME']) {
            item.forEach(i => {
              for (const listKey in attrDic) {
                for (const key in attrDic[listKey]) {
                  if (item[0].values_['TABLE_NAME'].indexOf(key) !== -1 || (attrDic[listKey][key].children && attrDic[listKey][key].children.indexOf(item[0].values_['TABLE_NAME']) !== -1)) {
                    attrDic[listKey][key].arr
                      ? attrDic[listKey][key].arr.push({
                        name: i.values_['NAME'],
                        feature: i
                      })
                      : attrDic[listKey][key].arr = [{
                        name: i.values_['NAME'],
                        feature: i
                      }]
                  }
                }
              }
            })
          } else {
            // 地表覆盖数量
            attrDic.dbfgNum += item.length
          }
        })
        this.$store.dispatch('map/changeFeaturesData', attrDic)
      }
    },
    closePicFirePoint() {
      this.$parent.isShowPickFirePoint = false
      this.$parent.$refs['tool-bar'].isHzhzd = false
    },
    handleComfirmClick() {
      if (this.inputSearchRadius === 0 || !this.inputSearchRadius) {
        this.$message.info('请设置分析范围！')
        return
      }
      if (!this.firePtLayer) {
        this.$message.info('请先设置火灾点！')
        return
      }
      this.$store.dispatch('map/changeLqzyLayer', true)
      this.$store.dispatch('map/changeIsAddFeatures', true) // 只在选中火灾点的时候获取才重新数据
      this.$store.dispatch('map/clearFeatures', []) // 设置features为空
      this.$store.dispatch('siderbar/changeCheckedLeafNodesWithBuffer', hzdfxNodes)
      this.$store.dispatch('jjya/getSsxyPersonList', null)
      this.$store.dispatch('jjya/getMonitorList', null)
    }
  }
}
</script>

<style lang="scss">
.pick-wrapper {
  transition: 1s;
  position: absolute;
  right: 10px;
  top: 100px;
  z-index: 999;
  padding: 10px;
  transition: right 0.9s;
  background: url('../../assets/images/弹框-火灾点.png') no-repeat;
  background-size: 100% 100%;
  width: 271px;
  height: 177px;
  .title {
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-left: 13px;
    font-size: 16px;
    .el-icon-close {
      position: absolute;
      top: 1px;
      right: 0;
      cursor: pointer;
      color: rgba(10, 204, 233, 1);
    }
  }
  .title::before {
    position: absolute;
    top: 1px;
    left: 3px;
    content: ' ';
    width: 2px;
    height: 16px;
    background-color: #fff;
  }
 .content {
    width: 100%;
    margin-top: 5px;
    padding: 0 10px;
    .input-container {
      &>span{
        font-size: 13px;
        display: inline-block;
        width: 40px;
      }
      .input-radius{
        &::after{
          content: 'km';
          position: relative;
          left: -30px;
        }
        input {
          width: 190px;
          height: 30px;
          background-color: rgba(9, 46, 79, 1);
          outline: none;
          padding-left: 8px;
          margin-top: 10px;
          font-size: 16px;
          color:rgba(23, 148, 194, 1);
          border:1px #29AEEA solid;
        }
      }
      input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{
        color:rgba(23, 148, 194, 1);
        font-size: 16px;
      }
      .draw-wrapper{
        width: 190px;
        color:rgba(23, 148, 194, 1);
        border:1px #29AEEA solid;
        background-color: rgba(9, 46, 79, 1);
        .item:nth-child(1){
          border-bottom:1px #29AEEA solid;
        }
        .item{
          margin: 0 5px;
          padding: 1px;
        }
        input{
          color:rgba(23, 148, 194, 1);
          width: 110px;
          border: 0;
          outline: none;
          background-color: transparent!important;
        }
        .input-btn {
          position: absolute;
          right: 17px;
          top: 45px;
          width: 47px;
          height: 47px;
          background: url(../../assets/images/定位icon（1）.png) no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
        }
      }

    }
    .footer{
      display: flex;
      justify-content: space-between;
      width: 205px;
      margin-top: 5px;
      .btn {
        width: 66px;
        height: 30px;
        background: url(../../assets/images/按钮.png) no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color:#fff;
      }
    }

 }
}
</style>
