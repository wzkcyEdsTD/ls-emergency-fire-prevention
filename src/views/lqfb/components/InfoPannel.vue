<template>
  <div id="info-pannel-wrapper" class="info-pannel-wrapper" :style="{right:`${offsetRight}rem`}">
    <div style="padding-top:3vh" v-show="isXFDW === ''">
      <div class="title">
        信息详情
        <i class="el-icon-close" @click="collapse" />
      </div>
      <img src="../../../assets/images/边.png" alt="">
      <div class="content-box">
        <div id="table-box" class="table-box" />
      </div>
    </div>
    <div v-show="isXFDW!==''">
      <div class="title">
        信息详情
        <i class="el-icon-close" @click="collapse" />
      </div>
      <div class="tabs">
        <div class="tab-1" :class="{'active': isXFDW==='基本信息'}" @click="changeIsXFDW('基本信息')">基本信息</div>
        <div class="tab-1" :class="{'active': isXFDW==='物资装备'}" @click="changeIsXFDW('物资装备')">物资装备</div>
        <div class="tab-2" :class="{'active': isXFDW==='队伍人员'}" @click="changeIsXFDW('队伍人员')">队伍人员</div>
      </div>
      <div v-show="isXFDW === '基本信息'">
        <div class="content-box">
          <div id="table-box1" class="table-box" />
        </div>
      </div>
      <div v-show="isXFDW==='物资装备'">
        <div class="ul-head">
          <div class="item item-2">名称</div>
          <div class="item item-2">型号</div>
          <div class="item item-1">数量</div>
          <div class="item item-1">单位</div>
        </div>
        <ul id="info-pannel-wzzb" />
      </div>
      <div v-show="isXFDW==='队伍人员'">
        <div class="ul-head">
          <div class="item item-1">姓名</div>
          <div class="item item-1">性别</div>
          <div class="item item-1">年龄</div>
          <div class="item item-2">电话</div>
        </div>
        <ul id="info-pannel-dwry" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    offsetRight() {
      return this.$store.getters.infoPanelOffsetRight
    },
    isXFDW() {
      return this.$store.getters.isXFDW
    }
  },
  methods: {
    collapse() {
      this.$store.dispatch('lqfb/changeInfoPanelOffsetRight', this.offsetRight === 0 ? -25 : 0)
    },

    changeIsXFDW(type) {
      this.$store.dispatch('lqfb/changeIsXFDW', type)
    }
  }
}
</script>
<style lang="scss">
.info-pannel-wrapper {
    width: 400px;
    height: calc(100vh - 60px);
    background-color: rgb(16, 21, 24);
    position: absolute;
    top: 0;
    z-index: 1005;
    right: 0;
    padding: 10px;
    transition: right 0.9s;
    .title {
      font-size: 1.8vh;
      margin-top: 10px;
      margin-bottom: 10px;
      padding-right: 10px;
      height: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'YouSheBiaoTiHei';
      position: relative;
      .el-icon-close {
        font-size: 20px;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
        color:hsla(188, 92%, 48%, 1);
      }
    }
    .content-box {
      position: relative;
      margin-top: 20px;
      overflow-y: scroll;
      height: calc(100vh - 210px);
    }
    .table-box {
      margin-bottom: 3px;
      overflow: hidden;
      .item {
          position: relative;
          float: left;
          width: 100%;
          height: 28px;
          line-height: 28px;
          display: flex;
          margin-bottom: 8px;
        .key {
          display: block;
          flex: 3;
          font-size: 16px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #fff;
          text-align: left;
          margin-left: 30px;
          font-size: 16px;
          // justify-content: center;
        }
        .value {
          flex: 7;
          height: 28px;
          line-height: 28px;
          width: 70%;
          background-color: rgb(12, 33, 51);
          font-size: 14px;
          padding-left: 20px;
          color: hsla(195, 88%, 67%, 1);
          margin-left: 10px;
          font-weight: 400;
          text-align: left;
          overflow: hidden;
          margin-right: 20px;
          margin-left: 20px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .tabs {
      margin-top: 12px;
      width: 100%;
      height: 28px;
      .tab-1,.tab-2 {
        width: 33%;
        text-align: center;
        line-height: 28px;
        float: left;
        background-color: rgb(9, 46, 79);
        color: rgba(9, 140, 168, 1);
        cursor: pointer;
      }
      .active {
        background: url(../../../assets/images/蓝色选中框.png) no-repeat;
        background-size: 100% 100%;
        width: 33%;
        color:rgba(10, 204, 233, 1);
      }
    }
    .ul-head {
      height: 26px;
      width: 380px;
      background-color: rgb(10, 40, 68);
      margin-top: 10px;
      display: flex;
    }
    ul {
      height: calc(100vh - 210px);
      width: 100%;
      list-style: none;
      padding-left: 0;
      overflow-x: hidden; overflow-y: auto;
      margin-top: 0px;
      li {
        display: flex;
        align-items: center;
        height: 38px;
        &:hover {
          cursor: pointer;
          border: 1px solid rgba(18, 253, 148, 1);
          background: rgb(8, 81, 62);
        }
      }
      /* li:nth-child(odd) {
        background-color: #101518;
      }
      li:nth-child(even) {
        background-color: rgb(15, 34, 52);
      } */
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
    .item-2 {
      flex: 2;
    }
    /*滚动条样式*/
      ul::-webkit-scrollbar,.content-box::-webkit-scrollbar {
          width: 4px;
          height: 4px;
      }
      ul::-webkit-scrollbar-thumb,.content-box::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: rgba(255,255,255,0.8);
          width: 4px;
          height: 30px;
      }
      ul::-webkit-scrollbar-track,.content-box::-webkit-scrollbar-track {
          border-radius: 0;
          background: rgba(255,255,255,0.2);
      }
}
</style>
