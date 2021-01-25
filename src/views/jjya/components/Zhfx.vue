<template>
  <div class="zhfx-wrapper" :style="`right: 0rem`">
    <i class="left-collapse" @click="collapse"> ||</i>
    智慧分析列表
    <div>
      <h3>阻隔分析</h3>
      <div>
        <span>河流: {{ featuresData.riverNum }}</span> &nbsp;&nbsp;&nbsp;&nbsp;
        <span>道路: {{ featuresData.wayNum }}</span>
      </div>
      <br>
      <div class="zbzy">
        <h3>周边资源搜索成果</h3>
        <div class="title">
          <div>类别</div>
          <div>数量</div>
          <div>名称</div>
        </div>
        <div class="table-box">
          <div v-for="(item,index) in featuresData.ZBZY" :key="index">
            <div v-for="(item1,index1) in item.arr" :key="index1" class="item">
              <div class="category">{{ item.name }}</div>
              <div class="num">{{ item.arr? item.arr.length:0 }}</div>
              <div class="name">{{ item1.name }} </div>
            </div>
          </div>
        </div>
      </div>
      <div class="aqfxy">
        <h3>安全风险源搜索成果</h3>
        <div class="title">
          <div>类别</div>
          <div>数量</div>
          <div>名称</div>
        </div>
        <div class="table-box">
          <div v-for="(item,index) in featuresData.AQFXY" :key="index">
            <div v-for="(item1,index1) in item.arr" :key="index1" class="item">
              <div class="category">{{ item.name }}</div>
              <div class="num">{{ item.arr? item.arr.length:0 }}</div>
              <div class="name">{{ item1.name }} </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    featuresData() {
      return this.$store.getters.featuresData
    }
  },
  watch: {
  },
  methods: {
    // collapse() {
    //   this.$store.dispatch('lqfb/changeOverViewOffsetRight', this.overViewOffsetRight === 1 ? -23.1 : 1)
    // }
  }
}
</script>
<style lang="scss">
  .zhfx-wrapper {
      position: absolute;
      z-index: 999;
      bottom: 20px;
      right: 20px;
      padding: 10px;
      padding-left: 40px;
      width: 400px;
      height: calc(100vh - 90px);
      background-color: rgba($color: $color-theme, $alpha: 0.8);
      background: url('../../../assets/images/框-右边.png') no-repeat;
      background-size: 100% 100%;
      transition: right 0.9s;
      .left-collapse {
        position: absolute;
        left: 2px;
        top: 42.8%;
        height: 16%;
        width: 22px;
        font-size: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .zbzy,.aqfxy{
        .title {
          line-height: 32px;
          display: flex;
          justify-content: space-around;
        }
        .table-box {
          overflow: scroll;
          height: 300px;
          .item {
             line-height: 32px;
             display: flex;
             justify-content: space-around;
          }
        }
        .table-box::-webkit-scrollbar{
          display:none;
        }
      }
  }

</style>
