<template>
  <div class="video-list-pannel" :style="`right: ${videoListOffsetRight}rem`">
    <div class="close" @click="close" />
    <div class="title">
      视频详情
    </div>
    <img src="../../../assets/images/边.png" alt="">
    <!-- <div class="content-box">
      <div id="video-table-box" class="table-box" />
    </div> -->
    <div class="videoDemoPlayer" v-show="videoShow">
      <p>{{ mc }}</p>
      <span class="release-video" @click="releaseVideo">x</span>
      <div id="myVideoPlayer" class="frequency-pic" />
    </div>
  </div>
</template>

<script>
import { fetchVideoURL } from "@/libs/m3u8API";
export default {
  data() {
    return {
      id:null,
      video: undefined,
      url:undefined,
      videoShow:false,
      mc:undefined
    }
  },
  computed: {
    videoListOffsetRight() {
      return this.$store.getters.videoListOffsetRight
    },
  },
 async mounted() {
    const that = this;
    this.$bus.$on("videoData",value=>{

      if (value.HLS_URL) {
        that.$nextTick(async()=>{
          that.videoShow = true
          that.mc = value.MCSB
          if (this.video) {
            try {
              this.video.dispose();
            } catch (error) {
              console.log(error);
            }
            this.video = null;
          }
          const URL = await fetchVideoURL(
            value.HLS_URL.replace("http://183.131.138.61:9080", "")
          );
          await that.initRtmp(URL);
        })
      }else{
        that.$nextTick(async()=>{
          that.videoShow = true
          that.mc = value.MC
          if (this.video) {
            try {
              this.video.dispose();
            } catch (error) {
              console.log(error);
            }
            this.video = null;
          }
          const URL = await fetchVideoURL(
            value.VIDEO_URL.replace("http://183.131.138.61:9080", "")
          );
          await that.initRtmp(URL);
        })

      }
    });
  },
  methods: {
    gifData(value){
      const that = this;
      if (value.HLS_URL) {
        // debugger
        that.$nextTick(async()=>{
          that.videoShow = true
          that.mc = value.MCSB
          if (this.video) {
            try {
              this.video.dispose();
            } catch (error) {
              console.log(error);
            }
            this.video = null;
          }
          const URL = await fetchVideoURL(
            value.HLS_URL.replace("http://183.131.138.61:9080", "")
          );
          await that.initRtmp(URL);
        })
      }else{
        that.$nextTick(async()=>{
          that.videoShow = true
          that.mc = value.MC
          if (this.video) {
            try {
              this.video.dispose();
            } catch (error) {
              console.log(error);
            }
            this.video = null;
          }
          const URL = await fetchVideoURL(
            value.VIDEO_URL.replace("http://183.131.138.61:9080", "")
          );
          await that.initRtmp(URL);
        })
      }

    },
    initRtmp(url) {
      // if (this.video) {
      //   this.video.dispose();
      //   this.video = null;
      // }
      return new Promise((resolve) => {
        this.video = new window.Aliplayer(
          {
            id: "myVideoPlayer",
            source:url,
            width: "100%",
            height: "100%",
            autoplay: true,
            controlBarVisibility: "hover",
            isLive: true,
            muted: true,
          },
          (player) => {
            player.mute();
            player.play();
            resolve(true);
          }
        );
      });
    },
    releaseVideo() {
      try {
        this.video.dispose();
      } catch (error) {
        console.log(error);
      }
      this.video = null;
      this.videoShow = false;
    },
    close() {
      this.$store.dispatch('lqfb/changeVideoListOffsetRight', -30)
    },
  },
  beforeDestroy() {
    this.$bus.$off('videoData')
    if(this.video){
      try {
        this.video.dispose();
      } catch (error) {
        console.log(error);
      }
    }
  },
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

.videoDemoPlayer {
  position: fixed;
  width: 1000px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 30;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  > p {
    color: white;
    line-height: 30px;
  }
  .frequency-pic {
    flex: 1;
    border-radius: 10px;
    overflow: hidden;
  }
  .release-video {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
}

</style>
