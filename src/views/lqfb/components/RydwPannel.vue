<template>
  <div class="rydw-wrapper" :style="`right: ${rydwPannelOffsetRight}rem`">
    <div class="close" @click="close" />
    <!-- 人员实时定位start -->
    <div v-show="!isShowDetail" class="rydw-list">
      <div class="title">
        人员实时定位
        <el-input
          v-model="input"
          class="search"
          placeholder="人员搜索"
          suffix-icon="el-icon-search"
          @click.native="handleSearch"
          @keyup.enter.native="handleSearch"
        />
      </div>
      <img src="../../../assets/images/边.png" alt>
      <div class="swiper">
        <div class="tabs">
          <div class="tab-1" :class="activeTab==='消防员' ? 'active' : ''" @click="handleActiveTab('消防员')">消防员</div>
          <div class="tab-2" :class="activeTab==='护林员' ? 'active' : ''" @click="handleActiveTab('护林员')">护林员</div>
        </div>
        <div v-show="activeTab==='消防员'" class="swiper-slide">
          <div class="ul-head">
            <div class="item item-1">姓名</div>
            <div class="item item-2">联系方式</div>
            <div class="item item-1">状态</div>
          </div>
          <ul>
            <li v-for="(item, index) in tableXFYData" :key="index" @click="handleItemClick(item)">
              <div class="item item-1">{{ item.name }}</div>
              <div class="item item-2">{{ item.phone }}</div>
              <div class="item item-1"><span :class="item.status == '已上线' ? 'online':'noOnline'" />{{ item.status }}</div>
            </li>
          </ul>
        </div>
        <div v-show="activeTab==='护林员'" class="swiper-slide">
          <div class="ul-head">
            <div class="item item-1">姓名</div>
            <div class="item item-2">联系方式</div>
            <div class="item item-1">状态</div>
          </div>
          <ul>
            <li v-for="(item, index) in tableHLYData" :key="index" @click="handleItemClick(item)">
              <div class="item item-1">{{ item.name }}</div>
              <div class="item item-2">{{ item.telephone }}</div>
              <div class="item item-1"><span :class="item.status == '已上线' ? 'online':'noOnline'" />{{ item.status }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 人员实时定位end -->
    <!-- 人员信息详情start -->
    <div v-show="isShowDetail" class="rydw-detail">
      <div class="title">
        人员信息详情
        <span class="back" @click="handleGoBack">
          返回
          <i class="el-icon-right" />
        </span>
      </div>
      <img src="../../../assets/images/边.png" alt>
      <div class="table-box">
        <div class="line">
          <div class="key">姓名:</div>
          <div class="value">{{ selectedItem.name || "" }}</div>
        </div>
        <div v-show="selectedItem.smid" class="line">
          <div class="key">编号:</div>
          <div class="value">{{ selectedItem.smid }}</div>
        </div>
        <div class="line">
          <div class="key">身份:</div>
          <div class="value">{{ selectedItem.type || "" }}</div>
        </div>
        <div class="line">
          <div class="key">联系方式:</div>
          <div class="value">{{ selectedItem.phone || selectedItem.telephone ||"" }}</div>
        </div>
        <div class="line">
          <div class="key">状态:</div>
          <div class="value">{{ selectedItem.status || "" }}</div>
        </div>
      </div>
      <p class="title">轨迹查询时间设置</p>
      <div class="start-date">
        起始时间：
        <el-date-picker
          v-model="startDate"
          format="MM月dd日"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          type="date"
        />
        <el-time-picker v-model="startTime" value-format="HH:mm:ss" placeholder="选择时间" />
      </div>
      <div class="end-date">
        终止时间：
        <el-date-picker
          v-model="endDate"
          format="MM月dd日"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          type="date"
        />
        <el-time-picker v-model="endTime" value-format="HH:mm:ss" placeholder="选择时间" />
      </div>
      <div class="btn">
        <el-button size="mini" type="primary" @click="handleSearchHis">确认显示轨迹</el-button>
        <!-- <el-button size="mini" type="primary" @click="handlePlay">播放轨迹</el-button>
        <el-button size="mini" type="primary" @click="handleStop">停止播放</el-button> -->
      </div>
    </div>
    <!-- 人员信息详情end -->
    <div class="online-time">
      <div class="title">
        人员在线统计时长
      </div>
      <img src="../../../assets/images/边.png" alt>
      <div class="content">
        <div v-for="(item,index) in onlineTime" :key="index" class="item">
          <div class="tips">
            {{ item.text }}：
            <div class="date">{{ item.date }}</div>
          </div>
          <div class="totalTime" v-html="timeFilter(item.time)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import moment from 'moment'
import MarkerAnimation from './MarkerAnimation'


export default {
  data() {
    return {
      tableXFYData: [],
      tableHLYData: [],
      XFYtotal: 0,
      HLYtotal: 0,
      selectedItem: {
        smid: '',
        name: '',
        phone: '',
        team: '',
        type: ''
      },
      input: '',
      lastInput: '',
      fhryLayer: null, // 消防员图层
      lsgjLayer: null, // 历史
      startDate: moment().hour() < 8 ? new moment().subtract(1, 'd').format('YYYY-MM-DD') : new moment().format('YYYY-MM-DD'),
      startTime: new moment().startOf('d').subtract(16, 'h').format('HH:mm:ss'),
      endDate: new moment().format('YYYY-MM-DD'),
      endTime: new moment().format('HH:mm:ss'),
      isShowDetail: false,
      interval: null,
      onlineTime: [
        {
          text: '今日',
          date: new moment().format('MM月DD日'),
          time: 0
        },
        {
          text: '本周',
          date: `${new moment().startOf('week').format('MM月DD日')}
                -
                ${new moment().endOf('week').format('MM月DD日')}`,
          time: 0
        },
        {
          text: '本月',
          date: `${new moment().startOf('month').format('MM月DD日')}
                -
                ${new moment().endOf('month').format('MM月DD日')}`,
          time: 0
        }
      ]
    }
  },
  computed: {
    activeTab() {
      return this.$store.getters.rydwActiveTab
    },
    rydwPannelOffsetRight() {
      return this.$store.getters.rydwPannelOffsetRight
    }
  },
  watch: {
    rydwPannelOffsetRight: {
      handler(val) {
        if (val < 0) {
          this.fhryLayer && this.fhryLayer.setVisible(false)
          this.lsgjLayer && this.lsgjLayer.setVisible(false)
        } else {
          this.fhryLayer && this.fhryLayer.setVisible(true)
          this.lsgjLayer && this.lsgjLayer.setVisible(true)
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.getList()
    this.getFhryCurPosition()
  },
  beforeDestroy() {
    this.$map.removeLayer(this.fhryLayer)
  },
  destroyed() {
  },
  methods: {
    initSearchTime() {

    },
    timeFilter(value) {
      if (value > 1000 & value <= 60000) {
        return `${(value / 1000).toFixed(2)}<div class="unit">秒</div>`
      } else if (value > 60000 && value <= 3600000) return `${(value / 60000).toFixed(2)}<div class="unit">分</div>`
      else if (value > 3600000 && value <= 864400000) return `${(value / 3600000).toFixed(2)}<div class="unit">时</div>`
      else return `${(value / 864400000).toFixed(2)}<div class="unit">天</div>`
    },
    close() {
      this.isShowDetail = false
      this.$store.dispatch('lqfb/changerydwPannelOffsetRight', -30)
    },
    handleItemClick(item) {
      this.isShowDetail = true
      this.selectedItem = { ...item }
      this.initOnlineTime(item)
    },

    initOnlineTime(item) {
      const phone = item.phone || item.telephone
    },

    getList() {
      const query = {}
      if (this.input) {
        query.param = this.input
      }
    },

    getFhryCurPosition() {
    },

    updateCurPosition() {
      this.fhryLayer.getSource().clear()
    },

    updateTableList(list) {
      // 更新表格中在线状态
      const onlinePhones = list.map((v) => v.smid)
      this.tableXFYData = this.tableXFYData.map((v) => {
        if (onlinePhones.indexOf(v.phone) > -1 || onlinePhones.indexOf(v.telephone) > -1) {
          v.status = '已上线'
        } else {
          v.status = '未上线'
        }
        return v
      }).sort((a, b) => a.status === '已上线' ? -1 : 1)

      this.tableHLYData = this.tableHLYData.map((v) => {
        if (onlinePhones.indexOf(v.phone) > -1 || onlinePhones.indexOf(v.telephone) > -1) {
          v.status = '已上线'
        } else {
          v.status = '未上线'
        }
        return v
      }).sort((a, b) => a.status === '已上线' ? -1 : 1)
    },

    handleSearch() {
      if (this.input !== this.lastInput) {
        this.lastInput = this.input
        this.getList()
        this.getFhryCurPosition()
      }
    },

    handleGoBack() {
      this.onlineTime[0].time = 0
      this.onlineTime[1].time = 0
      this.onlineTime[2].time = 0
      this.isShowDetail = false
      // 移除历史轨迹层
      this.$map.removeLayer(this.lsgjLayer)
      this.$map.goHome()
    },

    getFhryHisPositionList() {
      const timestampStart = moment(
        this.startDate + ' ' + this.startTime
      ).format('X') * 1000
      const timestampEnd = moment(this.endDate + ' ' + this.endTime).format(
        'X'
      ) * 1000

    },

    handleSearchHis() {
      this.getFhryHisPositionList()
    },

    handlePlay() {
      MarkerAnimation.startAnimation()
    },

    handleStop() {
      MarkerAnimation.stopAnimation()
    },

    ZoomToFeature(feature) {
      this.$map.getMap().getView().setCenter(feature.getGeometry().getCoordinates())
      this.$map.getMap().getView().setZoom(18)
    },

    handleActiveTab(val) {
      this.$store.dispatch('lqfb/changeRydwActiveTab', val)
    }
  }
}
</script>
<style lang="scss">
.rydw-wrapper {
  position: absolute;
  z-index: 1001;
  top: 0;
  right: 0px;
  padding: 15px;
  width: 400px;
  height: calc(100vh - 60px);
  background-color: rgb(16, 21, 24);
  background-size: 100% 100%;
  transition: right 0.9s;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 6px;
    margin-bottom: 6px;
    font-size: 16px;
    height: 22px;
    font-weight: bold;
    line-height: 22px;
    position: relative;
    .back {
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
      color: rgb(10, 204, 233);
    }
    .search {
      width: 180px;
      height: 22px;
      position: relative;
      .el-input__inner {
        height: 22px;
        border-radius: 20px;
        outline: none;
        padding-left: 15px;
        background: url(../../../assets/images/搜索底框.png) no-repeat;
        background-size: 100%;
        border: 0;
        color: hsla(196, 79%, 43%, 1);
      }
      .el-input__inner::-webkit-input-placeholder {
        color: hsla(196, 79%, 43%, 1);
      }
      .el-input__icon::before {
        content: " ";
        width: 25px;
        height: 22px;
        position: absolute;
        top: 0;
        right: -4px;
        margin-left: 2px;
        cursor: pointer;
        background: url(../../../assets/images/搜索.png) no-repeat;
        background-size: 100%;
      }
    }
  }
  .rydw-list {
    height: 100%;
  }
  .swiper {
    width: 100%;
    height: 95%;
    margin-bottom: 20px;
    .tabs {
      margin-top: 12px;
      width: 100%;
      height: 28px;
      .tab-1,
      .tab-2 {
        width: 50%;
        text-align: center;
        line-height: 28px;
        float: left;
        background-color: rgb(9, 46, 79);
        color: rgba(9, 140, 168, 1);
        cursor: pointer;
      }
      .active {
        background: url(../../../assets/images/蓝色选中框.png) no-repeat;
        background-size: contain;
        color: rgba(10, 204, 233, 1);
      }
    }
    .swiper-slide {
      height: 100%;
      width: 100%;
      .ul-head {
        height: 26px;
        width: 370px;
        background-color: rgb(10, 40, 68);
        margin-top: 10px;
        display: flex;
      }
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
        height: 90%;
        margin-top: 5px;
        overflow-x: hidden;
        overflow-y: auto;
        li {
          &:hover {
            cursor: pointer;
            border: 1px solid rgba(18, 253, 148, 1);
            background: rgb(8, 81, 62);
          }
          &.active {
            background: rgb(8, 81, 62);
            border: 1px solid rgba(18, 253, 148, 1);
          }
          display: flex;
          align-items: center;
          position: relative;
          height: 30px;
          line-height: 30px;
          margin-bottom: 13px;
        }
      }
      .item {
        text-align: center;
        line-height: 22px;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        span{
          width: 10px;
          height: 10px;
          display: inline-block;
          border-radius: 50%;
          margin-right: 4px;
        }
        .online{
          background-color: #44E182;
        }
        .noOnline{
          background-color: #707070;
        }
      }
      .item-1 {
        flex: 1;
      }
      .item-2 {
        flex: 2;
      }
    }
  }
  .table-box {
    margin-bottom: 3px;
    margin-top: 10px;
    height: 198px;
    overflow: hidden;
    .line {
      width: 100%;
      height: 30px;
      margin-bottom: 10px;
      display: flex;
      .key {
        width: 130px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        font-size: 16px;
      }
      .value {
        width: 200px;
        height: 28px;
        line-height: 28px;
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
  p.title {
    background-color: hsla(208, 80%, 17%, 1);
    height: 28px;
    width: 348px;
    font-size: 14px;
    text-align: left;
    padding-left: 10px;
    margin-bottom: 20px;
  }
  .btn {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .online-time {
    margin-top: 30px;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      width: 360px;
      margin-top: 9px;
      font-size: 16px;
      position: relative;
      padding-left: 20px;
      font-weight: bold;
      .date {
        color: #1990FF;
        margin-left: 5px;
        display: inline-block;
      }
      .totalTime {
        text-align: right;
        font-size: 28px;
        width: 100px;
        .unit {
          font-size: 16px;
          display: inline-block;
        }
      }
    }
    .item::before {
      content: ' ';
      width: 10px;
      height: 10px;
      background-color: #1990FF;
      border-radius: 5px;
      position: absolute;
      top: 15px;
      left: 0;
    }
  }
}
</style>
