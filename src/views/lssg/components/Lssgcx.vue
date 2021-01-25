<template>
  <div class="lssgcx-wrapper" @click="dropDown('')">
    <!-- <div class="close" @click="close" /> -->
    <div v-show="isDetail=== false">
      <div class="title">
        历史事故列表
        <!-- <div class="lssg-search">
          <input type="text" placeholder="事故搜索">
          <svg-icon icon-class="搜索icon" />
        </div>-->
      </div>
      <img src="../../../assets/images/边.png" alt>
      <div class="select-box">
        <div class="line">
          <div class="label">事故年份</div>
          <div class="input-box" @click="dropDown('事故年份')">
            <input type="text" class="select" readonly :value="currentYear">
            <div class="select-arrow" />
            <div class="drop-down" :style="`display: ${isSGNF === true ? 'block' : 'none'}`">
              <ul>
                <li
                  v-for="(item, index) in yearList"
                  :key="index"
                  @click="currentYear = item"
                >{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="line">
          <div class="label">所属区域</div>
          <div class="input-box" @click="dropDown('所属区域')">
            <input type="text" class="select" readonly :value="currentTownName">
            <div class="select-arrow" />
            <div class="drop-down" :style="`display: ${isSSQY === true ? 'block' : 'none'}`">
              <ul>
                <li
                  v-for="(item, index) in townList"
                  :key="index"
                  @click="currentTownName = item"
                >{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="line">
          <div class="btn btn-confirm" @click="searchLssg">确认</div>
          <div class="btn btn-reset" @click="resetLssg">重置</div>
        </div>
      </div>
      <img src="../../../assets/images/边.png" alt>
      <div class="lssg-list">
        <div class="ul-head">
          <div class="item item-1">事故编号</div>
          <div class="item item-1">发生年份</div>
          <div class="item item-1">受灾面积</div>
        </div>
        <ul>
          <li
            v-for="(item, index) in LssgcxList"
            :key="index"
            :data-qid="item.id"
            class="li-active"
            @click.prevent="handleDetail($event, item)"
          >
            <div class="item item-1 num item-active">{{ index +1 }}</div>
            <div class="item item-1 item-active">{{ item.year }}年</div>
            <div class="item item-1 item-active">{{ item.damage_area }}公顷</div>
          </li>
        </ul>
      </div>
    </div>
    <div v-show="isDetail=== true">
      <div class="title">
        历史事故详情
        <span class="back" @click="handleGoBack">
          返回
          <i class="el-icon-right" />
        </span>
      </div>
      <img src="../../../assets/images/边.png" alt>
      <div class="lssg-detail">
        <div v-for="(item, index) in lssgDetai" :key="index" class="line">
          <div class="key">{{ item.key }}</div>
          <input class="value" type="text" readonly :value="item.value || ''">
        </div>
        <el-button size="small" type="primary" @click="selectReport">事故报告</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import vue from '@/main'
import { queryEvent, getLssgList } from '@/api/lssg'
export default {
  data() {
    return {
      isSGNF: false,
      isSSQY: false,
      LssgcxList: [],
      isDetail: false,
      lssgDetai: [],
      currentYear: '全部',
      currentTownName: '全部',
      yearList: [
        '全部',
        '2009',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019',
        '2020'
      ],
      townList: [
        '全部',
        '芳庄乡',
        '北麂乡',
        '塘下镇',
        '陶山镇',
        '桐浦镇',
        '湖岭镇',
        '林川镇',
        '高楼镇',
        '马屿镇',
        '曹村镇',
        '平阳坑镇',
        '安阳街道',
        '玉海街道',
        '锦湖街道',
        '潘岱街道',
        '东山街道',
        '上望街道',
        '莘塍街道',
        '汀田街道',
        '飞云街道',
        '云周街道',
        '仙降街道',
        '南滨街道'
      ]
    }
  },
  computed: {
    zlOffsetRight() {
      return this.$store.getters.zlOffsetRight
    },
    lssgList() {
      return this.$store.getters.lssgList
    },
    lssgLayer() {
      return this.$store.getters.lssgLayer
    },
    lssgTempLayer() {
      return this.$store.getters.lssgTempLayer
    },
    lssgDetailItem() {
      return this.$store.getters.lssgDetailItem
    }
  },
  watch: {
    lssgDetailItem(val) {
      this.handleDetailData(val)
    }
  },
  mounted() {
    this.initLssgData()
  },
  methods: {
    initLssgData() {
      queryEvent('').then(res => {
        this.LssgcxList = res.data.result
        this.LssgcxList = this.LssgcxList
          .filter((v) => v.geo_info)
          .filter((v) => v.year > 1900)
          .filter((v) => v.damage_area > 0)
          .sort((a, b) => b.damage_area - a.damage_area)
      })
    },
    resetLssg() {
      this.currentYear = '全部'
      this.currentTownName = '全部'
      this.initLssgData()
      this.$store.dispatch('lssg/getLssgLayer')
    },
    dropDown(val) {
      if (val === '事故级别') {
        this.isSGNF = false
        this.isSSQY = false
        this.isSGJB = !this.isSGJB
      } else if (val === '事故年份') {
        this.isSGJB = false
        this.isSSQY = false
        this.isSGNF = !this.isSGNF
      } else if (val === '所属区域') {
        this.isSGJB = false
        this.isSGNF = false
        this.isSSQY = !this.isSSQY
      }
    },
    handleDetail(e, item) {
      console.log('lssg item:', item)
      // console.log('click object ', e.currentTarget.dataset.qid)
      // const qid = e.currentTarget.dataset.qid

      // const targetFeature = this.lssgList.data.result.filter(v => v.id === qid).filter(v => v.geo_info)[0]

      // console.log('target feature ', targetFeature)

      if (this.lssgLayer && item && item.geo_info) {
        // hide layer
        this.lssgLayer.setVisible(false)
        // remove layer
        if (this.lssgTempLayer) {
          vue.$map.removeLayer(this.lssgTempLayer)
          this.$store.dispatch('lssg/changeLssgTempLayer', layer)
        }

        const feature = vue.$map.createFeatureByGeoJson(item.geo_info)
        const layer = vue.$map.createVectorLayer([feature])
        const mask = vue.$map.createMaskByGeoJson(
          require('@/components/Map/ruian.json')
        )
        layer.addFilter(mask)
        vue.$map.addLayer(layer)

        // zoom to the geometry
        vue.$map
          .getMap()
          .getView()
          .fit(feature.getGeometry(), { padding: [100, 50, 50, 50] })
        this.$store.dispatch('lssg/changeLssgTempLayer', layer)
      }
      this.$store.dispatch('lssg/changeLssgDetailItem', item)
    },

    handleDetailData(item) {
      this.lssgDetai = [
        { key: '受灾面积', value: item.damage_area },
        { key: '月份', value: item.month },
        { key: '受伤人数', value: item.num_injured },
        { key: '肇事者', value: item.perpetrater },
        { key: '原因', value: item.reason },
        { key: '所属区域', value: item.town },
        { key: '受灾树种', value: item.tree },
        { key: '事故年份', value: item.year },
        { key: '风力', value: item.wind_strength },
        { key: '风向', value: item.wind_direction },
        { key: '天气', value: item.weather },
        { key: '气温', value: item.temperature },
        { key: '降雨量', value: item.rain },
        { key: '前线总指挥', value: item.commander },
        { key: '电话', value: item.phone },
        { key: '救援人数', value: item.num_person },
        { key: '救援设备', value: item.equipment }
      ]
      // item.damage_area && this.lssgDetai.push({ key: '受灾面积', value: item.damage_area })
      // item.month && this.lssgDetai.push({ key: '月份', value: item.month })
      // item.num_injured && this.lssgDetai.push({ key: '受伤人数', value: item.num_injured })
      // item.perpetrater && this.lssgDetai.push({ key: '肇事者', value: item.perpetrater })
      // item.reason && this.lssgDetai.push({ key: '原因', value: item.reason })
      // item.town && this.lssgDetai.push({ key: '所属区域', value: item.town })
      // if (item.tree && item.tree !== ' ') this.lssgDetai.push({ key: '受灾树种', value: item.tree })
      // item.year && this.lssgDetai.push({ key: '事故年份', value: item.year })
      this.isDetail = true
    },

    // 返回
    handleGoBack() {
      if (this.lssgLayer) {
        this.lssgLayer.setVisible(true)
        vue.$map.goHome()
        // remove lssg temp layer
        if (this.lssgTempLayer) {
          vue.$map.removeLayer(this.lssgTempLayer)
        }
      }
      this.isDetail = !this.isDetail
    },
    close() {
      this.$store.dispatch(
        'lqfb/changezlOffsetRight',
        this.zlOffsetRight === 0 ? -25 : 0
      )
    },
    searchLssg() {
      let params = ''
      if (this.currentYear === '全部' && this.currentTownName !== '全部') { params = `?town=${this.currentTownName}` }
      if (this.currentYear !== '全部' && this.currentTownName === '全部') { params = `?year=${this.currentYear}` }
      if (this.currentYear !== '全部' && this.currentTownName !== '全部') { params = `?year=${this.currentYear}&town=${this.currentTownName}` }
      queryEvent(params).then((res) => {
        this.LssgcxList = res.data.result
        // this.LssgcxList = this.LssgcxList.sort((a, b) => b.year - a.year)
        this.LssgcxList = this.LssgcxList
          .filter((v) => v.geo_info)
          .filter((v) => v.year > 1900)
          .filter((v) => v.damage_area > 0)
          .sort((a, b) => b.damage_area - a.damage_area)

        const lssgFeatures = this.LssgcxList.filter((v) => {
          if (!v.geo_info) return false
          if (typeof v.geo_info === 'string') {
            try {
              var obj = JSON.parse(v.geo_info)
              if (typeof obj === 'object' && obj) {
                return true
              } else {
                return false
              }
            } catch (e) {
              console.log('error：' + v.geo_info + '!!!' + e)
              return false
            }
          }
        }).map((v) =>
          vue.$map.createFeatureByGeoJson(JSON.parse(v.geo_info), v)
        )
        if (this.lssgLayer && lssgFeatures) {
          vue.$map.removeLayer(this.lssgLayer)
          const layer = vue.$map.createVectorLayer(lssgFeatures)
          const mask = vue.$map.createMaskByGeoJson(
            require('@/components/Map/ruian.json')
          )
          layer.addFilter(mask)
          vue.$map.addLayer(layer)
          // commit('SET_LSSG_LAYER', layer)
          this.$store.dispatch('lssg/changeLssgLayer', layer)
        }
      })
    },
    selectReport() {
      this.$store.dispatch('lqfb/changezlOffsetRight', -25)
      this.$store.dispatch('lssg/changeReportType', '报告修改')
      this.$parent.$refs.report.id = 3
    }
  }
}
</script>
<style lang="scss" >
.lssgcx-wrapper {
  height: 100%;
  width: 100%;
  padding: 10px;
  .close {
    position: absolute;
    left: -34px;
    top: 80px;
    width: 34px;
    height: 104px;
    background: url(../../../assets/images/收回底.png) no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  .title {
    margin-bottom: 6px;
    font-size: 16px;
    height: 22px;
    font-weight: bold;
    line-height: 22px;
    margin-top: 10px;
    position: relative;
    display: flex;
    justify-content: space-between;
    .back {
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
      color: rgb(10, 204, 233);
    }
    .lssg-search {
      position: relative;
      display: flex;
      align-items: center;
      margin-right: 22px;
      input {
        width: 180px;
        height: 22px;
        background: url(../../../assets/images/搜索底框.png) no-repeat;
        background-size: 100%;
        outline: none;
        border: 0;
        padding-left: 20px;
        color: hsla(196, 79%, 43%, 1);
        font-size: 14px;
      }
      input::-webkit-input-placeholder {
        color: hsla(196, 79%, 43%, 1);
      }
      .svg-icon {
        width: 24px;
        height: 22px;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
      }
    }
  }
  .select-box {
    width: 100%;
    height: 180px;
    .line {
      width: 100%;
      height: 30px;
      margin-top: 30px;
      display: flex;
      justify-content: center;
      .label {
        width: 130px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 18px;
      }
      .input-box {
        width: 230px;
        height: 30px;
        cursor: pointer;
        position: relative;
        display: flex;
        .select {
          width: 204px;
          height: 100%;
          background-color: rgb(9, 46, 79);
          outline: none;
          border: 0;
          color: hsla(196, 79%, 43%, 1);
          padding-left: 10px;
          cursor: pointer;
        }
        .select::-webkit-input-placeholder {
          color: hsla(196, 79%, 43%, 1);
        }
        .select-arrow {
          width: 30px;
          height: 44px;
          margin-top: -2px;
          background-color: pink;
          background: url(../../../assets/images/箭头.png) no-repeat;
          background-size: 100% 100%;
        }
        .drop-down {
          position: absolute;
          top: 40px;
          right: 20px;
          width: 80px;
          height: 110px;
          background: url(../../../assets/images/弹出框.png) no-repeat;
          background-size: contain;
          padding: 5px;
          z-index: 1000;
          ul {
            list-style: none;
            margin-top: 5px;
            height: 92px;
            padding-left: 0;
            overflow-y: scroll;
            li {
              text-align: center;
              font-size: 16px;
              height: 20px;
              line-height: 20px;
              margin-top: 4px;
            }
            li:hover {
              color: hsla(153, 98%, 53%, 1);
            }
          }
          ul::-webkit-scrollbar {
            width: 4px;
            height: 4px;
          }
          ul::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.8);
            width: 4px;
            height: 30px;
          }
          ul::-webkit-scrollbar-track {
            border-radius: 0;
            background: rgba(255, 255, 255, 0.2);
          }
        }
      }
      .btn {
        background: url(../../../assets/images/按钮.png) no-repeat;
        background-size: 100%;
        width: 60px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        margin-left: 20px;
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }
  .lssg-list {
    .ul-head {
      height: 26px;
      width: 380px;
      background-color: rgb(10, 40, 68);
      margin-top: 20px;
      display: flex;
    }
    .item {
      text-align: center;
      line-height: 26px;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item-1 {
      flex: 1;
    }
    .item-3 {
      flex: 3;
    }
    .num {
      color: hsla(180, 100%, 47%, 1);
      font-size: 18px;
    }

    /*滚动条样式*/
    ul::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    ul::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.8);
      width: 4px;
      height: 30px;
    }
    ul::-webkit-scrollbar-track {
      border-radius: 0;
      background: rgba(255, 255, 255, 0.2);
    }
    ul {
      list-style: none;
      padding-left: 0;
      height: 540px;
      margin-top: 20px;
      overflow-x: hidden;
      overflow-y: auto;
      li {
        display: flex;
        align-items: center;
        position: relative;
        width: 380px;
        height: 41px;
        margin-bottom: 18px;
        background: url("../../../assets/images/框(1).png") no-repeat;
        background-size: 100% 100%;
        margin-bottom: 20px;
        cursor: pointer;
      }
      li:hover {
        background: url("../../../assets/images/选中框1.png") no-repeat;
        background-size: 100% 100%;
        .item {
          color: hsla(153, 98%, 53%, 1);
        }
        .num {
          color: hsla(153, 98%, 53%, 1);
        }
      }
    }
  }
  .lssg-detail {
    width: 100%;
    height: 800px;
    margin-top: 15px;
    .line {
      width: 100%;
      height: 30px;
      margin-bottom: 14px;
      display: flex;
      .key {
        width: 130px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
      }
      .value {
        width: 246px;
        height: 30px;
        line-height: 30px;
        background-color: rgb(12, 33, 51);
        outline: none;
        border: 0;
        font-size: 14px;
        color: hsla(196, 79%, 43%, 1);
        padding-left: 20px;
        cursor: pointer;
      }
      .value::-webkit-input-placeholder {
        color: hsla(196, 79%, 43%, 1);
      }
    }
  }
}
</style>
