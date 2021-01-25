<template>
  <div class="yzhxdj-wrapper" :style="`right: ${yzhxdjOffsetRight}rem`">
    <div class="close" @click="close" />
    <div class="title">
      一周森林火险等级
    </div>
    <img src="../../assets/images/边.png" alt="">
    <div class="ul-head">
      <div class="item item-1">日期</div>
      <div class="item item-2">森林火险等级</div>
      <div class="item item-2">温馨提示</div>
    </div>
    <ul>
      <li v-for="(item, index) in yzhxdjData" :key="index">
        <div class="item item-1">{{ item.date }}</div>
        <div class="item item-2">
          <div class="level" :class="`level-${item.level}`">{{ item.level + '级' }}</div>
        </div>
        <div class="item item-2">
          <img v-show="item.level[0] == 5" src="../../assets/images/警告icon.png" alt="">
          {{ item.tips }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { getFireInfo } from '@/api/lqfb'
export default {
  filters: {
    getData(val) {
      const now = new Date()
      const date = new Date(now.setDate(now.getDate() + val))
      const m = ('0' + (date.getMonth() + 1)).slice(-2)
      const d = ('0' + date.getDate()).slice(-2)
      return m + '月' + d + '日'
    }
  },
  data() {
    return {
      yzhxdjData: [
        // {
        //   level: '4级',
        //   tips: '容易引起森林火灾，林区严格控制野外用火！'
        // }, {
        //   level: '4级',
        //   tips: '容易引起森林火灾，林区严格控制野外用火！'
        // }, {
        //   level: '5级',
        //   tips: '容易引起森林火灾，林区严格控制野外用火！'
        // }, {
        //   level: '1级',
        //   tips: ''
        // }, {
        //   level: '2级',
        //   tips: ''
        // }, {
        //   level: '2级',
        //   tips: ''
        // }, {
        //   level: '3级',
        //   tips: '容易引起森林火灾，林区严格控制野外用火！'
        // }
      ]
    }
  },
  computed: {
    yzhxdjOffsetRight() {
      return this.$store.getters.yzhxdjOffsetRight
    }
  },
  mounted() {
    this.getForestFireInfo()
  },
  methods: {
    close() {
      this.$store.dispatch('lqfb/changeyzhxdjOffsetRight', -30)
    },
    getForestFireInfo() {
      getFireInfo().then(res => {
        if (res && res.data) {
          res.data.forEach(v => {
            this.yzhxdjData.push({
              date: v.date,
              level: v.level.match(/[0-9]/) ? v.level.match(/[0-9]/)[0] : 0,
              tips: v.comment
            })
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.yzhxdj-wrapper {
    position: absolute;
    z-index: 1005;
    top: 0;
    right: 0;
    padding: 10px;
    width: 400px;
    height: calc(100vh - 60px);
    background-color: rgba(16, 21, 24, 1);
    background-size: 100% 100%;
    transition: right 0.9s;
    .close {
      position: absolute;
      left: -34px;
      top: 80px;
      width: 34px;
      height: 104px;
      background: url(../../assets/images/收回底.png) no-repeat;
      background-size: contain;
      cursor: pointer;
    }
    .title {
      margin-top: 6px;
      margin-bottom: 6px;
      font-size:16px;
      height: 22px;
      font-weight:bold;
      line-height:22px;
    }
    .ul-head {
      height: 26px;
      width: 380px;
      background-color: rgb(10, 40, 68);
      margin-top: 10px;
      display: flex;
    }
    ul {
      list-style: none;
      padding-left: 0;
      li {
        height: 60px;
        width: 100%;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
      }
    }
    .item {
      font-size: 14px;
      justify-content: center;
      height: 100%;
      display: flex;
      align-items: center;
      position: relative;
      .level {
        width: 40px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        border-radius: 5px;
        border: 1px solid #fff
      }
      .level-1 {border-color: hsla(148, 89%, 63%, 1); color: hsla(148, 89%, 63%, 1)}
      .level-2 {border-color: hsla(108, 89%, 63%, 1); color: hsla(108, 89%, 63%, 1)}
      .level-3 {border-color: hsla(60, 89%, 63%, 1); color: hsla(60, 89%, 63%, 1)}
      .level-4 {border-color: hsla(34, 98%, 51%, 1); color: hsla(34, 98%, 51%, 1)}
      .level-5 {border-color: hsla(0, 97%, 60%, 1); color: hsla(0, 97%, 60%, 1)}
      img {
        width: 13px;
        height: 11px;
        display: block;
        position: absolute;
        left: -18px;
        top: 18px;
      }
    }
    .item-1 {
      flex: 1;
    }
    .item-2 {
      flex: 2;
    }
}
</style>
