<template>
  <!-- 救援路径推送 -->
  <div class="jylj-wrapper" :style="`right: 2rem`">
    <ul>
      <li>
        <span>选择火灾位置</span>
        <span class="select-btn" @click="handleSelectStart">
          <i class="el-icon-position" />
        </span>
      </li>
      <li>
        <span>选择救援队位置</span>
        <span class="select-btn" @click="handleSelectEnd">
          <i class="el-icon-position" />
        </span>
      </li>
      <!-- <li>添加取水点位置</li> -->
    </ul>
    <div class="footer">
      <div class="btn" @click="handleSubmit">确定</div>
      <div class="btn" @click="handleClear">清除</div>
    </div>
  </div>
</template>

<script>
import spUtils from './shortpath'
import MAP_URL from '@/utils/map/map-url'

export default {
  data() {
    return {
      layer: null
    }
  },
  computed: {
  },
  mounted() {
    // spUtils.init()
    this.addRoadLayer()
  },
  beforeDestroy() {
    this.removeRoadLayer()
  },
  methods: {
    handleSelectStart() {
      spUtils.selectStartPt()
    },
    handleSelectEnd() {
      spUtils.selectEndPt()
    },
    addRoadLayer() {
      this.layer = this.$map.createTileSuperMapRestLayer(MAP_URL.ROAD.url)
      this.$map.addLayer(this.layer)
    },
    removeRoadLayer() {
      this.layer && this.$map.removeLayer(this.layer)
    },

    handleSubmit() {
      spUtils.findPath()
    },

    handleClear() {
      spUtils.clearElements()
    }
  }
}
</script>

<style lang="scss">
.jylj-wrapper {
  position: absolute;
  right: 440px;
  top: 100px;
  padding: 0;
  background-color: rgba($color: $color-theme, $alpha: 0.8);
  border: 1px solid $color-text-active;
  transition: right 0.9s;
  ul{
    padding-left: 0;
    margin-top: 0;
    list-style: none;
    li{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 25px;
      width: 210px;
      &:nth-child(even){
        background-color: rgba($color: $color-background-nav, $alpha: 0.3);
      }
      .select-btn{
        border: 1px solid $color-text-active;
        border-radius: 45px;
        padding: 5px;
        &:hover{
         background-color: $color-text-active;
        color: $color-text-normal;
        cursor: pointer;
        }
      }
    }
  }
  .footer{
    display: flex;
    justify-content: space-around;
    margin-bottom: 15px;
    padding: 0 10px;
    .btn{
      display: inline-block;
      padding: 5px 13px;
      border: 1px solid $color-text-active;
      border-radius: 4px;
      color: $color-text-active;
      &:hover{
        background-color: $color-text-active;
        color: $color-text-normal;
        cursor: pointer;
      }
    }
  }
}
</style>
