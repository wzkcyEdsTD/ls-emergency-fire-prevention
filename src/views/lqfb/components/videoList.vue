<template>
  <div class="zhfxlb-wrapper" :style="{ right: `${zhfxOffsetRight}rem` }">
    <div class="close" @click="close" />

    <div class="ljxq-container">
      <div class="zbjksz-container">
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item :title='zxsp' name="1">
            <div>
              <!-- <div class="flexLine">
                <div class="title">
                  {{zxsp}}
                  <img src="@/common/images/边.png" alt="" class="imgLine" />
                </div>
                <div class="closeicon" @click="close"></div>
              </div> -->
              <div class="ul-head">
                <div class="item item-1">设备名称</div>
                <!-- <div class="item item-1">举报人</div> -->
                <div class="item item-1">通道数量</div>
                <div class="item item-1">类型</div>
              </div>
              <ul style="max-height:75vh">
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
          </el-collapse-item>
          <el-collapse-item :title='lxsp' name="2">
            <div>
              <!-- <div class="flexLine">
                <div class="title">
                  {{lxsp}}
                  <img src="@/common/images/边.png" alt="" class="imgLine" />
                </div>
                <div class="closeicon" @click="close"></div>
              </div> -->
              <div class="ul-head">
                <div class="item item-1">设备名称</div>
                <!-- <div class="item item-1">举报人</div> -->
                <div class="item item-1">通道数量</div>
                <div class="item item-1">类型</div>
              </div>
              <ul style="max-height:75vh">
                <li v-for="(item, index) in offlineVideo" 
                    :key="index" 
                    class="list-item" 
                    :class="{active : offlineVideoItem == index}"
                    @click="offlineVideoItem = index;handleVideoClick(item)">
                  <div @mouseenter="titeEnter" class="item item-2">{{ item.properties.MC }}</div>
                  <!-- <div class="item item-1">{{ item.jubaoren }}</div> -->
                  <div class="item item-2">{{ item.properties.TD_NUM }}</div>
                  <div class="item item-2">{{ item.properties.TYPE }}</div>
                </li>
                <div class="allmore" v-show="offlineHasMore" @click="offlineViewMore">
                  <div class="moreText">查看更多</div>
                  <div class="more" />
                </div>
              </ul>
            </div>
          </el-collapse-item>
        </el-collapse>
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
      videotemp:null,
      activeNames:'1',
      jklb:'',
      videoItem:undefined,
      offlineVideoItem:undefined,
      hasMore:false,
      offlineHasMore:false,
      tempList:[],
      offlineVideo:[],
      xzspList:[],
      lxspList:[],
      lxsp:"",
      zxsp:"",
      videoLayer:undefined,
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
        that.videoList = that.xzspList
      })
    },
    offlineViewMore(){
      const that = this;
      that.$nextTick(()=>{
        that.offlineHasMore = false;
        that.offlineVideo = that.lxspList
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

    addGifMarks(point) {

      if (!this.lyr) {
        document.getElementById('marks').style.display = 'block';
        this.lyr = new Overlay({
            id: "hightVideo",
            element: document.getElementById('marks'),//绑定上面添加的元素
        });
        this.$map.getMap().addOverlay(this.lyr);
        // debugger
        this.lyr.setPosition(point); //显示  
        window.lyr = this.lyr;
      }else{
        // debugger
        this.lyr.setPosition(undefined);
        this.lyr.setPosition(point);
      }

    },

    handleVideoClick(v){
        const that = this;
        this.$map.getMap().getView().setCenter([v.properties.X,v.properties.Y]);
        this.$map.getMap().getView().setZoom(17);
        that.addGifMarks([v.properties.X,v.properties.Y])
        setTimeout(()=>{
          if (v.properties.VIDEO_URL) {
            that.$bus.$emit("videoData",v.properties);
          }
        },1000)
    }
  },
  mounted() {
    const that = this;
    that.$bus.$on("clickGIF",(value)=>{
      if (value && that.lyr) {

        const temp = that.lyr.getPosition()
        //转屏幕坐标
        const list = window.g.map.getPixelFromCoordinate(temp)
        let feature = this.$map
        .getMap()
        .forEachFeatureAtPixel(list, function(feature) {
          return feature
        })
        // debugger
        console.log(feature);
        if (feature.values_.VIDEO_URL || feature.values_.HLS_URL) {          
          that.$parent.$refs.videoListPannel.gifData(feature.values_)
        }
        // that.$bus.$emit("showPoupItem",feature);
      }
    })
    that.$bus.$on("clickSearch",(value)=>{
      if (value) {
        if (!that.lyr) {
          document.getElementById('marks').style.display = 'block';
          that.lyr = new Overlay({
              id: "hightVideo",
              element: document.getElementById('marks'),//绑定上面添加的元素
          });
          this.$map.getMap().addOverlay(that.lyr);
          // debugger
          that.lyr.setPosition(value); //显示  
          // window.lyr = that.lyr;
        }else{
          // debugger
          that.lyr.setPosition(undefined);
          that.lyr.setPosition(value);
        }
        const temp = that.lyr.getPosition()
        //转屏幕坐标
        const list = window.g.map.getPixelFromCoordinate(temp)
        let feature = this.$map
        .getMap()
        .forEachFeatureAtPixel(list, function(feature) {
          return feature
        })
        // debugger

        if (feature.values_ && feature.values_.VIDEO_URL) {          
          that.$parent.$refs.videoListPannel.gifData(feature.values_)
        }
        // that.$bus.$emit("showPoupItem",feature);
      }
    })


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
        videoPointList.sort((a,b)=>b.properties.VIDEO_URL.localeCompare(a.properties.VIDEO_URL))
        //在线视频
        that.videoList = videoPointList.filter(v=>v.properties.VIDEO_URL);
        console.log('在线视频',that.videoList);
        //离线视频
        that.offlineVideo = videoPointList.filter(v=>!v.properties.VIDEO_URL)
        that.xzspList = that.videoList
        that.lxspList = that.offlineVideo

        if (that.videoList.length>=10) {
          that.hasMore = true;
          that.videoList = that.videoList.slice(0,10)
        }

        if (that.offlineVideo.length>=10) {
          that.offlineHasMore = true;
          that.offlineVideo = that.offlineVideo.slice(0,10)
        }
        let lxspLength = 0;
        that.lxspList.forEach(element => {
          lxspLength += Number(element.properties.TD_NUM)
        });
        that.zxsp = `在线视频列表（${that.xzspList.length}）`
        that.lxsp = `离线视频列表（${lxspLength}）`
      });
    });
  },
  beforeDestroy() {
    const that = this;
    that.$bus.$off("showVideoList");
    that.$bus.$off("sendVideoListData");
    that.$bus.$off("clickGIF");
    that.$bus.$off("clickSearch");
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
