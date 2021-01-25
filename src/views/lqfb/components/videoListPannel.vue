<template>
  <div class="video-list-pannel" :style="`right: ${videoListOffsetRight}rem`">
    <div class="close" @click="close" />
    <div class="title">
      瑞安市
    </div>
    <img src="../../../assets/images/边.png" alt="">
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="(item,index) in videoList" :key="index" :name="index" :title="item.FNAME">
        <div class="ul-head">
          <div class="number">序号</div>
          <div class="name">名称</div>
        </div>
        <ul>
          <li v-for="(i,v) in item.data" v-once :key="v" class="list-item" @click="ZoomToFeature(i)">
            <div class="item number">{{ v + 1 }}</div>
            <div class="item name">{{ i.name }}</div>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getMonitorList } from '@/api/lqfb'
export default {
  data() {
    return {
      activeNames: ['1'],
      videoList: []
    }
  },
  computed: {
    videoListOffsetRight() {
      return this.$store.getters.videoListOffsetRight
    },
    jkLayer() {
      return this.$store.getters.jkLayer
    }
  },
  mounted() {
    getMonitorList().then(res => {
      if (res.code === 20000) {
        this.videoList = res.data
      }
    })
  },
  methods: {
    close() {
      this.$store.dispatch('lqfb/changeVideoListOffsetRight', -30)
      this.$store.dispatch('map/changeJkLayer', {
        layer: this.jkLayer,
        ope: 'REMOVELAYER'
      })
      this.$map.goHome()
    },
    ZoomToFeature(val) {
      this.$map.getMap().getView().setCenter([val.longitude, val.latitude])
      this.$map.getMap().getView().setZoom(20)
    }
  }
}
</script>
<style lang="scss">
  .video-list-pannel {
    width: 400px;
    height: calc(100vh - 60px);
    background-color: rgb(16, 21, 24);
    position: absolute;
    top: 0;
    z-index: 1005;
    right: 0;
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
    .title {
      height: 29px;
      font-size: 16px;
      margin: 0;
      padding: 5px 0px 4px 0px;
    }
    .ul-head {
      height: 26px;
      width: 380px;
      background-color: rgb(10, 40, 68);
      margin-top: 10px;
      display: flex;
      .number,.name{
        margin-left: 10px;
        width: 50px;
        height: 26px;
        line-height: 26px;
        font-size: 16px;
        margin-right: 50px;
      }
    }
    /*滚动条样式*/
    ul::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }
    ul::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(255,255,255,0.8);
        width: 4px;
        height: 30px;
    }
    ul::-webkit-scrollbar-track {
        border-radius: 0;
        background: rgba(255,255,255,0.2);
    }
    ul {
      list-style: none;
      padding-left: 0;
      height: 340px;
      overflow-x: hidden; overflow-y: auto;
      li {
        display: flex;
        align-items: center;
        position: relative;
        width: 380px;
        height: 41px;
        margin-bottom: 12px;
        background: url(../../../assets/images/框.png) no-repeat;
        background-size: 100% 100%;
        .number {
          width: 30px;
          margin-left: 8px;
          height: 30px;
          border-radius: 15px;
          text-align: center;
          line-height: 30px;
          color: rgba(0, 240, 242, 1);
          font-weight: bolder;
          font-size: 18px;
          margin-right: 20px;
        }
        .name {
          flex: 3;
          text-align: left;
        }
      }
      li:hover {
        cursor: pointer;
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
      flex: 3
    }
  .el-icon-arrow-right{
    transform: none;
  }
  .el-icon-arrow-right:before {
    content: "\E723";
  }
  .el-collapse .is-active .el-collapse-item__header .el-icon-arrow-right::before{
    content: "\E722";
  }
  }
</style>
