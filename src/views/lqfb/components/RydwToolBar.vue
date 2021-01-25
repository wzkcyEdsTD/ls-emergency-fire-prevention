<template>
  <div class="rydw-type-wrapper">
    <div class="title">实时在线人数</div>
    <div class="item">
      <div class="xfy" @click="handleRydwToolBar('护林员')">
        <div class="online-num">{{ hlyOnlineNum }}</div>
        <div class="total-num">{{ hlyTotalNum }}</div>
        <div class="tips">护林员</div>
      </div>
    </div>
    <div class="item">
      <div class="hly" @click="handleRydwToolBar('消防员')">
        <div class="online-num">{{ fhryOnlineNum }}</div>
        <div class="total-num">{{ fhryTotalNum }}</div>
        <div class="tips">消防员</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getFhry, getHlyOlineNum, getFhryOlineNum, getHly } from '@/api/lqfb'
export default {
  data() {
    return {
      hlyOnlineNum: 0,
      fhryOnlineNum: 0,
      hlyTotalNum: 0,
      fhryTotalNum: 0
    }
  },
  computed: {
    rydwActiveTab() {
      return this.$store.getters.rydwActiveTab
    }
  },
  mounted() {
    this.getOnlineNum()
    setInterval(() => {
      this.getOnlineNum()
    }, 1000 * 30)

    getFhry({}).then((res) => {
      this.fhryTotalNum = res.data.result.length
    })
    getHly({}).then((res) => {
      this.hlyTotalNum = res.data.result.length
    })
  },
  methods: {
    handleRydwToolBar(val) {
      if (this.rydwActiveTab === '' || this.rydwActiveTab !== val) {
        this.$store.dispatch('lqfb/changerydwPannelOffsetRight', 0)
        this.$store.dispatch('lqfb/changeRydwActiveTab', val)
      } else {
        this.$store.dispatch('lqfb/changerydwPannelOffsetRight', -30)
        this.$store.dispatch('lqfb/changeRydwActiveTab', '')
      }
    },

    getOnlineNum() {
      getHlyOlineNum().then((res) => {
        this.hlyOnlineNum = res.data
      })
      getFhryOlineNum().then((res) => {
        this.fhryOnlineNum = res.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.rydw-type-wrapper {
  position: absolute;
  top: 0;
  left: 400px;
  height: 126;
  width: 250px;
  .title {
    height: 26px;
    font-size: 14px;
    line-height: 26px;
    text-align: center;
    width: 100%;
  }
  .item {
    width: 50%;
    margin-top: -10px;
    height: 100px;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    .hly,
    .xfy {
      width: 86px;
      height: 86px;
      border-radius: 43px;
      display: flex;
      justify-content: center;
      position: relative;
      align-items: center;
      font-size: 22px;
      color: #fff;
      position: relative;
      cursor: pointer;
      .tips {
        font-size: 14px;
        position: absolute;
        bottom: -8px;
        left: 14px;
        border-radius: 10px;
        height: 20px;
        line-height: 20px;
        padding-left: 8px;
        padding-right: 8px;
      }
      .online-num {
        position: absolute;
        top: 15px;
        left: 15px;
        width: 40px;
        text-align: center;
        font-size: 22px;
        /* background-color: pink; */
      }
      .total-num {
        position: absolute;
        bottom: 20px;
        right: 10px;
        text-align: center;
        width: 40px;
        font-size: 15px;
      }
    }
    .hly {
      background: url(../../../assets/images/颜色.png) rgb(8, 52, 85) no-repeat;
      background-size: 100%;
      .tips {
        background-image: linear-gradient(
          to right,
          hsla(278, 93%, 68%, 1),
          hsla(252, 86%, 64%, 1),
          hsla(260, 77%, 58%, 1),
          hsla(233, 77%, 51%, 1)
        );
      }
    }
    .xfy {
      background: url(../../../assets/images/颜色-黄.png) rgb(8, 52, 85)
        no-repeat;
      background-size: 100%;
      .tips {
        background-image: linear-gradient(
          to right,
          hsla(26, 93%, 68%, 1),
          hsla(26, 86%, 64%, 1),
          hsla(18, 77%, 58%, 1),
          hsla(15, 86%, 44%, 1)
        );
      }
    }
    .hly::before,
    .xfy::before {
      background-color: #fff;
      content: " ";
      width: 1px;
      height: 50px;
      position: absolute;
      top: 20px;
      left: 45px;
      transform: rotate(45deg);
    }
  }
}
</style>
