<template>
  <div class="zhfxlb-wrapper" :style="{ right: `${zhfxOffsetRight}rem` }">
    <div class="close" @click="close" />

    <div class="ljxq-container">
      <div class="zbjksz-container">
        <div>
          <div class="flexLine">
            <div class="title">
              {{jklb}}
              <img src="@/common/images/边.png" alt="" class="imgLine" />
            </div>
            <div class="closeicon" @click="close"></div>
          </div>
          <div class="ul-head">
            <div class="item item-1">地点</div>
            <!-- <div class="item item-1">举报人</div> -->
            <div class="item item-1">通道数量</div>
            <div class="item item-1">类型</div>
          </div>
          <ul style="max-height:80vh">
            <li v-for="(item, index) in videoList" 
                :key="index" 
                class="list-item" 
                :class="{active : videoItem == index}"
                @click="videoItem = index;handleVideoClick(item)">
              <div @mouseenter="titeEnter" class="item item-2">{{ item.properties.MC }}</div>
              <!-- <div class="item item-1">{{ item.jubaoren }}</div> -->
              <div class="item item-2">{{ item.properties.TD_NUM }}</div>
              <div class="item item-2">{{ item.properties.TYPE }}</div>
            </li>
            <div class="allmore" v-show="hasMore" @click="viewMore">
              <div class="moreText">查看更多</div>
              <div class="more" />
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      videoList: [],
      zhfxOffsetRight: -30,
      videotemp:null,
      activeNames:['1'],
      jklb:'',
      videoItem:undefined,
      hasMore:false,
      tempList:[]
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
        that.videoList = that.tempList
      })
    },
    close() {
      const that = this;
      that.$nextTick(() => {
        that.zhfxOffsetRight = -30;
        const nodes = {name:"监控列表"}
        this.$store.dispatch('map/removeRightMenuListItem', nodes)
      });
      //   this.$store.dispatch("lqfb/changezhfxOffsetRight", -30);
    },
    handleVideoClick(v){
        const that = this;
        this.$map.getMap().getView().setCenter([v.properties.X,v.properties.Y]);
        this.$map.getMap().getView().setZoom(16);
        setTimeout(()=>{
          that.$bus.$emit("videoData",v.properties);
        },1000)
    }
  },
  mounted() {
    const that = this;
    that.$bus.$on("showVideoList", (value) => {
      if (value) {
        that.$nextTick(() => {
          that.zhfxOffsetRight = 0;

        });
        const nodes = {name:"监控列表"}
        that.$store.dispatch('map/appendRightMenuList', nodes)
      } else {
        that.$nextTick(() => {
          that.zhfxOffsetRight = -30;

        });
        const nodes = {name:"监控列表"}
        that.$store.dispatch('map/removeRightMenuListItem', nodes)
      }
    });
    that.$bus.$on("sendVideoListData", (videoPointList) => {
      that.$nextTick(() => {
        that.videoList = videoPointList;
        that.tempList = videoPointList;
        if (that.videoList.length>=10) {
          that.hasMore = true;
          that.videoList = that.videoList.slice(0,10)
        }

        that.jklb = `视频列表（${that.videoList.length}）`

      });
      console.log("qqqq",videoPointList)
    });
  },
  beforeDestroy() {
    const that = this;
    that.$bus.$off("showVideoList");
    that.$bus.$off("sendVideoListData");
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
</style>
