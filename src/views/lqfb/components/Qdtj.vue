<template>
  <div class="qdcx_wrapper">
    <i class="el-icon-close" @click="closeQdcx" />
    <div class="title">
      当出现下列情况之一的重要火情时，经市政府森林防火指挥部总指挥或指挥批准，启动本预案。
    </div>
    <ul>
      <li class="item">1.火场跨越相邻县（市、区）、乡镇（街道）行政界限且受害面积在20公顷以上的森林火灾；</li>
      <li class="item">2.当地已组织全力扑救，但火势仍无法控制且受害面积在50公顷以上的森林火灾；</li>
      <li class="item">3.连续燃烧12小时且尚未得到有限控制的森林火灾</li>
      <li class="item">4.威胁村庄、居民点及国家重要设施,风景名胜区、国有林场、森林公园和自然保护区的森林火灾;</li>
      <li class="item">5.发生扑救人员重大伤亡的森林火灾</li>
      <li class="item">6.其它需要市和上级部门支援扑救的森林火灾。</li>
    </ul>
  </div>
</template>
<script>
export default {
  computed: {
    yadqPannel() {
      return this.$store.getters.yadqPannel
    }
  },
  methods: {
    closeQdcx() {
      this.$store.dispatch('lqfb/changeyadqPannel', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.qdcx_wrapper {
  z-index: 1001;
  width: 900px;
  height: 400px;
  // background-color: rgba(1, 51, 78, 0.8);
  background: url(../../../assets/images/弹框.png) no-repeat;
  background-size: 100% 100%;
  position:absolute;
  top: 17.4vh;
  left: 503px;
  padding: 30px;
  .el-icon-close {
    position: absolute;
    top: 9px;
    right: 8px;
    font-size: 22px;
    cursor: pointer;
    color: rgba(10, 204, 233, 1);
  }
  .title {
    margin-top: 10px;
    color: #fff;
    font-size: 16px;
    margin-bottom: 28px;
    position: relative;
  }
  .title::before {
    position: absolute;
    top: -3px;
    left: -10px;
    content: ' ';
    width: 2px;
    height: 20px;
    background-color: #fff;
  }
  ul {
    padding: 0;
    li {
      list-style: none;
      font-size: 16px;
      color: #FAFAFA;
      margin-top: 28px;
      height: 22px;
    }
  }
}
</style>
