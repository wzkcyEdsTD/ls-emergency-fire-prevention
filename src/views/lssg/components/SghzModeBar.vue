<template>
  <div class="sghz-mode-wrapper">
    <div class="tips">绘制工具</div>
    <div :class="mode === 'draw-mode' ? 'active' : ''" class="draw-mode" @click="handleDrawClick">
      <svg-icon icon-class="绘制icon" />绘制
    </div>
    <div
      :class="mode === 'modify-mode' ? 'active' : ''"
      class="modify-mode"
      @click="handleModifyClick"
    >
      <svg-icon icon-class="修改icon" style="fill:#fff" />修改
    </div>
    <div class="modify-mode" @click="handlCanceleModifyClick">取消修改</div>
    <div class="modify-mode" @click="handleClear">清除</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mode: null,
      drawLayer: null,
      modify: null
    }
  },
  computed: {
    zlOffsetRight() {
      return this.$store.getters.zlOffsetRight
    }
  },
  mounted() {
    this.drawLayer = this.$map.createVectorLayer()
    this.$map.addLayer(this.drawLayer)
  },
  methods: {
    handleDrawClick() {
      this.mode = 'draw-mode'
      this.$map.doInteractionDraw('Polygon', (geojson, feature) => {
        feature.setProperties({
          type: 'draw-feature'
        })
        this.drawLayer.getSource().addFeature(feature)
        this.drawLayer.setVisible(true)
        this.$store.dispatch('map/changeDrawGeojson', geojson)
        this.$store.dispatch('map/changeDrawLayer', this.drawLayer)
        this.$store.dispatch('lssg/changeReportType', '报告录入')
        this.mode = null
      })
    },

    handleModifyClick() {
      this.mode = 'modify-mode'
      this.modify = this.$map.addInteractionModify()
      console.log(this.modify)
    },

    handlCanceleModifyClick() {
      this.mode = null
      this.$map.removeInteractionModify(this.modify)
      console.log(this.modify)
    },

    handleClear() {
      this.drawLayer.setVisible(false)
      this.drawLayer.getSource().clear()
      this.$store.dispatch('map/changeDrawGeojson', null)
      this.$store.dispatch('map/changeDrawLayer', null)
    }
  }
}
</script>
<style lang="scss" scoped>
.sghz-mode-wrapper {
  transition: right 0.9s;
  position: absolute;
  top: 100px;
  right: 33px;
  display: flex;
  border-radius: 3px;
  border: 1px #28b4e7 solid;
  .draw-mode,
  .modify-mode,
  .tips {
    flex: 1;
    height: 50px;
    width: 130px;
    box-sizing: border-box;
    font-size: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;
    background-color: #01334e;
    color: #28b4e7;
  }
  .tips {
    color: #fff;
    position: relative;
    cursor: auto;
  }
  .tips:before {
    content: ' ';
    margin-right: 6px;
    width: 4px;
    height: 20px;
    background-color: #fff;
  }
  .active {
    background-color: #28b3e6;
    color: #fff;
  }
  .svg-icon {
    margin-right: 15px;
  }
}
</style>
