<template>
  <div class="videoDemoPlayer">
    <!-- <p>{{ videoData.mc }}</p> -->
    <span class="release-video" @click="releaseVideo">x</span>
    <div :id="id" class="frequency-pic" />
  </div>
</template>
<script>
// import { fetchVideoURL } from "@/api/m3u8API";
export default {
  data() {
    return {
      video: undefined,
    };
  },
  props: ["videoData"],
  created() {
    this.id = "videoData" + this.$props.videoData.objectid;
  },
  beforeDestroy() {
    this.video && this.video.dispose();
  },
  async mounted() {
    // const URL = await fetchVideoURL(
    //   this.videoData.video_url.replace("http://183.131.138.61:9080", "")
    // );
    const URL = "http://61.175.104.84:10000/sms/34020000002020000001/hls/34020000001320000011_34020000001320000001/34020000001320000011_34020000001320000001_live.m3u8"
    await this.initRtmp(URL);
  },
  methods: {
    initRtmp(source) {
      return new Promise((resolve) => {
        this.video = new window.Aliplayer(
          {
            id: this.id,
            source,
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
      this.$hub.$emit("arcgis-popup-video", undefined);
    },
  },
};
</script>
<style lang="less" scoped>
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