<template>
  <div v-show="layerList.length > 0" class="legend-wrapper" :style="{right: `${getOffsetRight()}rem`}">
    <div class="title">图例</div>
    <div class="item-list">
      <div v-for="(v, i) in layerList" v-show="v.icon" :key="i" class="item">
        <img v-if="v.icon" :src="require(`@/assets/images/icon/${v.icon}`)">
        <span>{{ getLabel(v.label) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    layerList() {
      return this.$store.getters.layerList
    },
    zlOffsetRight() {
      return this.$store.getters.zlOffsetRight
    },
    zhfxOffsetRight() {
      return this.$store.getters.zhfxOffsetRight
    },
    infoPanelOffsetRight() {
      return this.$store.getters.infoPanelOffsetRight
    },
    yadqOffsetRight() {
      return this.$store.getters.yadqOffsetRight
    },
    yzhxdjOffsetRight() {
      return this.$store.getters.yzhxdjOffsetRight
    },
    rydwPannelOffsetRight() {
      return this.$store.getters.rydwPannelOffsetRight
    },
    videoListOffsetRight() {
      return this.$store.getters.videoListOffsetRight
    }
  },
  methods: {
    getOffsetRight() {
      if (this.zlOffsetRight === 0 || this.zhfxOffsetRight === 0 ||
      this.infoPanelOffsetRight === 0 || this.yadqOffsetRight === 0 ||
      this.yzhxdjOffsetRight === 0 || this.rydwPannelOffsetRight === 0 ||
      this.videoListOffsetRight === 0) {
        return 27
      }
      return 2
    },
    getLabel(label) {
      if (['道路'].indexOf(label) > -1) return ''
      return label
    }
  }
}
</script>

<style lang="scss">
.legend-wrapper {
  position: absolute;
  z-index: 999;
  bottom: 20px;
  padding: 10px;
  right: 420px;
  background-color: rgba($color: $color-theme, $alpha: 0.8);
  transition: right 0.9s;
  .title {
    text-align: center;
    padding: 5px 0;
  }
  .item-list {
    @include scrollBar;
    max-height: 30vh;
    overflow-y: auto;
    font-size: 14px;
    .item {
      display: flex;
      margin: 8px 0;
      align-items: center;
      >span{
        margin-left: 5px;
      }
    }
  }
}
</style>
