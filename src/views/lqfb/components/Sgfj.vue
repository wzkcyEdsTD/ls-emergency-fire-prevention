<template>
  <div class="sgfj_wrapper" :style="`right: ${yadqOffsetRight}rem`">
    <div class="close" @click="close" />
    <div class="title">
      预案分级调取
    </div>
    <img src="../../../assets/images/边.png" alt="">

    <ul>
      <li class="item">
        <div class="level level-1" @click="getYA('特别重大森林火灾（ I 级 ）')">特别重大森林火灾（ I 级 ）</div>
        <div class="tips">受害森林面积在1000公顷以上的，或者死亡30人以上的，或者重伤100人以上的。</div>
      </li>
      <li class="item">
        <div class="level level-2" @click="getYA('重大森林火灾（ I I 级 ）')">重大森林火灾（ I I 级 ）</div>
        <div class="tips">受害森林面积在100~1000公顷之间，或者死亡10~30人，或者重伤50~100人。</div>
      </li>
      <li class="item">
        <div class="level level-3" @click="getYA('较大森林火灾（ I I I 级 ）')">较大森林火灾（ I I I 级 ）</div>
        <div class="tips">受害森林面积在1~100公顷之间，或者死亡3~10人，或者重伤10~50人。</div>
      </li>
      <li class="item">
        <div class="level level-4" @click="getYA('一般森林火灾（ I V 级 ）')">一般森林火灾（ I V 级 ）</div>
        <div class="tips">受害森林面积在1公顷以下或者其他林地起火的，或者死亡1~3人，或者重伤1~10人。</div>
      </li>
      <li class="item">
        <div class="level level-5" @click="getYA('普通森林火灾（ V 级 ）')">普通森林火灾（ V 级 ）</div>
        <div class="tips" />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  computed: {
    yadqPannel() {
      return this.$store.getters.yadqPannel
    },
    yadqOffsetRight() {
      return this.$store.getters.yadqOffsetRight
    }
  },
  watch: {
  },
  methods: {
    closeSgfj() {
      this.$store.dispatch('lqfb/changeyadqPannel', false)
    },
    getYA(level) {
      this.$store.dispatch('lqfb/changeYADJ', level)
      this.$store.dispatch('lqfb/changeyadqPannel', '组织指挥体系及职责')
      // this.$store.dispatch('lqfb/changeyadqOffsetRight', -30)
      this.$store.dispatch('lqfb/changezlOffsetRight', -25)
      this.$store.dispatch('lqfb/changeyzhxdjOffsetRight', -30)
      this.$store.dispatch('lqfb/changezhfxOffsetRight', -30)
    },
    close() {
      if (this.yadqPannel === '组织指挥体系及职责') {
        this.$store.dispatch('lqfb/changeyadqOffsetRight', this.yadqOffsetRight === 0 ? -25 : 0)
      } else {
        this.$store.dispatch('lqfb/changeyadqOffsetRight', -30)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sgfj_wrapper {
  width: 400px;
  height: calc(100vh - 60px);
  background-color: rgba(16, 21, 24, 1);
  position:absolute;
  top: 0;
  right: 0;
  z-index: 1001;
  padding: 10px;
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
  .el-icon-close {
    position: absolute;
    top: 9px;
    right: 8px;
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
  ul {
    padding: 0;
    margin-top: 24px;
  }
  .item {
    margin-bottom: 50px;
    list-style: none;
    height: 100;
    width: 100%;
    .tips {
      width: 100%;
      padding-left: 12px;
      font-size: 14px;
      color:rgba(95, 208, 245, 1);
    }
    .send-message {
      width: 58px;
      height: 32px;
      background-color: #29B5E8;
      color: #fff;
      text-align: center;
      line-height: 32px;
      border-radius: 5px;
      font-size: 16px;
    }
    .level {
      width: 200px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      margin-bottom: 12px;
      cursor: pointer;
    }
    .level-1 {
      // border: 1px solid #E91010;
      // background-color: rgba(233, 16, 16, 0.25);
      // color:rgba(233, 16, 16, 1)
      background-color: rgba(217, 70, 32, 1);
    }
    .level-2 {
      background-color: rgba(219, 145, 35, 1);
    }
    .level-3 {
     background-color: rgba(107, 187, 15, 1);
    }
    .level-4 {
      background-color: rgba(33, 190, 106, 1);
    }
    .level-5 {
      background-color: rgb(33, 166, 190);
    }
  }
}
</style>
