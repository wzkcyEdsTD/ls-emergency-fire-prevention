<template>
  <div v-show="videoVisible" class="jksp-wrapper">
    <div class="title">
      监控视频
      <i :title="'全屏'" class="el-icon-copy-document" @click="getFullScreen" />
      <i :title="'关闭'" class="el-icon-close" @click="handleClose" />
    </div>
    <div id="myVideoDiv" class="video-wrapper" />
  </div>
</template>

<script>
import videojs from 'video.js'
import 'videojs-contrib-hls'

export default {
  data() {
    return {
      videoVisible: false,
      videoPlayer: null
    }
  },

  computed: {
    videoUrl() {
      return this.$store.getters.videoUrl
    }
  },

  watch: {
    videoUrl(val) {
      this.videoVisible = true
      this.changeVideo(val)
    }
  },

  mounted() {

  },

  methods: {
    initVideo() {
      var myVideoDiv = document.getElementById('myVideoDiv')
      myVideoDiv.innerHTML = `<video
        id="my-video"
        muted="muted"
        class="video-js vjs-default-skin"
        preload="auto"
        poster="../../../assets/images/图像4.png"
        width="767px"
        height="480px"
      >
        <source :src="${this.videoUrl}" type="application/x-mpegURL" />
      </video>`
      this.videoPlayer = videojs(
        'my-video',
        {
          controls: true,
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {}
      )
    },
    changeVideo(url) {
      this.initVideo()
      this.videoPlayer.reset() // 重置 video
      this.videoPlayer.src([
        {
          type: 'application/x-mpegURL',
          src: url
        }
      ])
      this.videoPlayer.load()
      this.videoPlayer.play()
    },
    handleClose() {
      this.videoVisible = false
      this.videoPlayer.dispose()
    },
    getFullScreen() {
      this.videoPlayer.requestFullscreen()
    }
  }
}
</script>

<style lang="scss">
.jksp-wrapper {
  width: 768px;
  height: 606px;
  padding: 10px;
  position: absolute;
  top: 140px;
  left: 400px;
  background: url(../../../assets/images/弹窗.png) no-repeat;
  background-size: 100%;
  .title {
    padding-left: 15px;
    margin-bottom: 10px;
    width: 100%;
    height: 25px;
    line-height: 25px;
    font-size: 18px;
    position: relative;
    .el-icon-copy-document,
    .el-icon-close {
      color: rgb(0, 240, 242);
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }
    .el-icon-copy-document {
      right: 25px;
    }
    .el-icon-close {
      right: 0px;
    }
  }
  .title:before {
    content: " ";
    width: 2px;
    height: 17px;
    background-color: #fff;
    display: inline-block;
    position: absolute;
    top: 3px;
    left: 5px;
  }
  .video-wrapper {
    width: 100%;
    height: 530px;
    background-color: pink;
    .video-js {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
