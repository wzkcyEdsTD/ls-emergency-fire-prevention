<template>
  <div class="zhfxlb-wrapper" :style="{ right: `${zhfxOffsetRight}rem` }">
    <div class="close" @click="close" />

    <div class="ljxq-container">
      <div class="zbjksz-container">
        <div class="titleLine">
          <div class="title" >
            {{`铁塔监控列表`}}
          </div>
        </div>
        <img style="width: 100%;" src="@/common/images/边.png" alt="">
        <ul style="max-height:75vh">
          <li v-for="(item, index) in videoList" 
              :key="index" 
              class="list-item" 
              :class="{active : videoItem == index}"
              @click="videoItem = index;handleVideoClick(item)">
            <div @mouseenter="titeEnter" class="item item-2">{{ item.properties.MCSB }}</div>
          </li>
          <!-- <div class="allmore" v-show="hasMore" @click="viewMore">
            <div class="moreText">查看更多</div>
            <div class="more" />
          </div> -->
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
import Overlay from 'ol/Overlay'
export default {
  data() {
    return {
      videoList: [],
      zhfxOffsetRight: -30,
      videoItem:undefined,
      offlineVideoItem:undefined,
      hasMore:false,
      videoList:[],
      ttVideoList:[],
      lyr:undefined
    };
  },
  methods: {
    titeEnter(e) {
      const target = e.target;
      const { clientWidth, scrollWidth, title } = target;
      if (!title && scrollWidth > clientWidth) target.title = target.innerText;
    },
    viewMore(){
      const that = this;
      that.$nextTick(()=>{
        that.hasMore = false;
        that.videoList = that.ttVideoList
      })
    },
    close() {
      const that = this;
      that.$nextTick(() => {
        that.zhfxOffsetRight = -30;
        const nodes = {name:"铁塔监控列表"}
        this.$store.dispatch('map/removeRightMenuListItem', nodes)
      });
      //   this.$store.dispatch("lqfb/changezhfxOffsetRight", -30);
    },
    handleVideoClick(v){
        const that = this;
        this.$map.getMap().getView().setCenter([v.properties.JD,v.properties.WD]);
        this.$map.getMap().getView().setZoom(17);
        that.$parent.$refs.videoList.addGifMarks([v.properties.JD,v.properties.WD])
        setTimeout(()=>{
          if (v.properties.HLS_URL) {
            that.$bus.$emit("videoData",v.properties);
          }
        },1000)
    }
  },
  mounted() {
    const that = this;

    that.$bus.$on("showTTVideoList", (value) => {
      if (value) {
        that.$nextTick(() => {
          that.zhfxOffsetRight = 0;

        });
        const nodes = {name:"铁塔监控列表"}
        that.$store.dispatch('map/appendRightMenuList', nodes)
      } else {
        that.$nextTick(() => {
          that.zhfxOffsetRight = -30;

        });
        const nodes = {name:"铁塔监控列表"}
        that.$store.dispatch('map/removeRightMenuListItem', nodes)
      }
    });
    that.$bus.$on("sendTTVideoListData", (videoPointList) => {
      that.$nextTick(() => {
        that.ttVideoList = videoPointList
        that.videoList = that.ttVideoList
        // if (that.videoList.length>=10) {
        //   that.hasMore = true;
        //   that.videoList = that.videoList.slice(0,10)
        // }
        that.ttjk = `铁塔视频列表（${that.ttVideoList.length}）`
      });
    });
  },
  beforeDestroy() {
    const that = this;
    that.$bus.$off("showTTVideoList");
    that.$bus.$off("sendTTVideoListData");
  },
};
</script>
<style lang="scss" scoped>
.zhfxlb-wrapper {
  width: 400px;
  height: 100%;
  transition: right 0.6s;
  background-color: rgba(16, 21, 24, 1);
  position: absolute;
  z-index: 1000;
  top: 0;
  right: 0;
  padding: 10px;
  z-index: 1002;
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

  .ljxq-container {
    // height: 450px;
    // height: calc(100% - 120px);
    padding-top: 1vh;
    .zbjksz-container {
      .flexLine{
        display: flex;
        .title {
          width: 100%;
          height: 40px;
          font-family: youshebiaotihei;
          font-size: 2.3vh;
          .imgLine {
            width: 100%;
          }
        }
        .closeicon{
          background-image: url('~@/common/images/关闭icon.png');
          background-size: 100%;
          width: 2vh;
          height: 2vh;
          cursor: pointer;
          margin-right: 1vh;
        }
      }
      .titleLine{
        display: flex;
        padding-right: 1vh;
        width: 100%;
        align-items:center;
        .icon{
          width: 2vh;
          height: 2vh;
          margin-right: 1vh;
          // margin-top: 1vh;
        }
        .refreshIcon{
          // display        : flex;
          background-image: url('~@/common/images/刷新.png');
          background-size: 100% 100%;
          margin-top     : 1.5vh;
          width: 2.5vh;
          height: 2.5vh;
          position: relative;
          right: -1.5vh;
          cursor: pointer;
          // animation: 0.5s ease-out 0s 1 normal none running gira;
          &.active {
            animation: gira 0.5s 1;
          }
        }
        @-webkit-keyframes gira {
          // from{-webkit-transform: rotate(0deg);}
          // to{-webkit-transform: rotate(360deg);}
          from{-webkit-transform: rotate(0deg);}
          to{-webkit-transform: rotate(360deg);}
        }

        @keyframes gira {
          from{-webkit-transform: rotate(0deg); transform: rotate(0deg)}
          to{-webkit-transform: rotate(360deg); transform: rotate(360deg)}
        }
        .titleHistory {
          width: 40%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 6px;
          margin-bottom: 6px;
          height: 22px;
          // font-weight: bold;
          line-height: 22px;
          position: relative;

          height: 2rem;
          font-family: youshebiaotihei;
          font-size: 2.3vh;
          // padding-top: 4vh;
          // padding-bottom: 4vh;
            .search {
              width: 180px;
              height: 22px;
              position: relative;
            .el-input__inner {
                height: 22px;
                border-radius: 20px;
                outline: none;
                padding-left: 15px;
                background: url(../../../assets/images/搜索底框.png) no-repeat;
                background-size: 100%;
                border: 0;
                color: hsla(196, 79%, 43%, 1);
            }
            .el-input__inner::-webkit-input-placeholder {color: hsla(196, 79%, 43%, 1);}
            .el-input__icon::before {
                content: ' ';
                width: 25px;
                height: 22px;
                position: absolute;
                top: 0;
                right: -4px;
                margin-left: 2px;
                cursor: pointer;
                background: url(../../../assets/images/搜索.png) no-repeat;
                background-size: 100%;
            }
            }
          }

        .title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 6px;
        margin-bottom: 6px;
        height: 22px;
        // font-weight: bold;
        line-height: 22px;
        position: relative;

        height: 2rem;
        font-family: youshebiaotihei;
        font-size: 2.3vh;
        // padding-top: 4vh;
        // padding-bottom: 4vh;
          .search {
          width: 180px;
          height: 22px;
          position: relative;
          .el-input__inner {
              height: 22px;
              border-radius: 20px;
              outline: none;
              padding-left: 15px;
              background: url(../../../assets/images/搜索底框.png) no-repeat;
              background-size: 100%;
              border: 0;
              color: hsla(196, 79%, 43%, 1);
          }
          .el-input__inner::-webkit-input-placeholder {color: hsla(196, 79%, 43%, 1);}
          .el-input__icon::before {
              content: ' ';
              width: 25px;
              height: 22px;
              position: absolute;
              top: 0;
              right: -4px;
              margin-left: 2px;
              cursor: pointer;
              background: url(../../../assets/images/搜索.png) no-repeat;
              background-size: 100%;
          }
          }
        }
        .titleInput{
        background-color: rgba(82, 254, 179, .5);
        color: #fff;
        border-radius: 5px;
        }

        .changeMenuButton{
          width: 18vh;
          height: 3vh;
          // position: relative;
          // right: 0vh;
          background: url('~@/assets/images/changeButton.png');
          background-size: 100% 100%;
          // border-radius: 1vh;
          font-family: pingfang;
          cursor: pointer;
          .text{
            position: relative;
            top: 50%;
            left: 50%;
            transform:translate(-50%,-50%);
            text-align: center;
            color: #000;
            font-size: 2vh;
          }
        }

      }
      .ul-head {
      height: 26px;
      width: 380px;
      // background-color: rgb(10, 40, 68);
      margin-top: 10px;
      display: flex;
      }
      ul {
      list-style: none;
      padding-left: 0;
      overflow-x: hidden; overflow-y: auto;
        li {
            display: flex;
            align-items: center;
            position: relative;
            width: 380px;
            height: 35px;
            margin-bottom: 5px;
            font-family: PingFang SC;
            font-size: 16px;
            // background: url(../../../assets/images/框.png) no-repeat;
            background-size: 100% 100%;
            &.active {
            background: #103E29;
            border: 1px solid #0F7247;
            color: #52FEB3;

            }
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
            margin-right: 40px;
            }
        }
      }
      .item {
      // text-align: center;
      padding-left: 3vh;
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
        flex: 1;
        cursor: pointer;
      }
      .allmore{
        cursor: pointer;
        display:flex;
        justify-content:center;
        align-items: center;
        padding-left: 1vh;
        .more{
          background: url('~@/common/images/14和12.png');
          background-size: 100% 100%;
          width: 1.5vh;
          height: 1.5vh;
          position: relative;
          top: 0vh;
          left: 0.5vh;
          
        }
        .moreText{
          font-size: 16px;
        }
      }

      /*滚动条样式*/
      ul::-webkit-scrollbar {
          width: 4px;
          height: 4px;
      }
      ul::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background:#118251;
          width: 8px;
          height: 30px;
      }
      ul::-webkit-scrollbar-track {
          border-radius: 0;
          background:#103E29;
      }

    }
  }
}

/deep/.el-collapse{
  width: 100%;
  margin-top: 1vh;
  height: 100%;
}
/deep/.el-collapse-item__content{
  color: #fff;
}
/deep/.el-collapse-item__wrap{
  background-color: transparent;
}

/deep/.el-collapse .el-collapse-item__header {
    background: #101518;
    color: #FAFAFA;
    border: none;
    height: 4vh;
    font-size: 2vh;
    line-height: 4vh;
    font-family: youshebiaotihei;
    padding-left: 1.5vh;
}

/deep/.el-collapse-item__header:focus {
    background: url('~@/assets/images/框new.png');
    background-size: 100%;
    color: #fafafa;
}
</style>
