<template>
  <div class="zhfxlb-wrapper" :style="{ right: `${zhfxOffsetRight}rem` }">
    <!-- <div class="close" @click="close" /> -->

    <div class="ljxq-container">
      <div class="zbjksz-container">
        <div class="flexLine">
          <div class="title">
            监控列表
            <img src="@/common/images/边.png" alt="" class="imgLine" />
          </div>
          <div class="closeicon" @click="close"></div>
        </div>
        <div v-if="videoList.length > 0">
          <ul style="height: 25vh">
            <li
              v-for="(v, i) in videoList"
              :key="i"
              :class="{ active: videotemp == i }"
              @click="
                videotemp = i;
                handleVideoClick(v);
              "
            >
              {{ v["properties"]["MC"] }}
            </li>
          </ul>
        </div>
        <div v-else>周边无监控设施</div>
      </div>
    </div>
  </div>
</template>
<script>
import spUtils from "./shortpath";
import { getVideoByCode } from "@/api/lqfb";
import { TurnType } from "@supermap/iclient-ol";
import * as turf from "@turf/turf";
import { log } from "video.js";

export default {
  data() {
    return {
      videoList: [],
      zhfxOffsetRight: -30,
      videotemp:null
    };
  },
  methods: {
    titeEnter(e) {
      const target = e.target;
      const { clientWidth, scrollWidth, title } = target;
      if (!title && scrollWidth > clientWidth) target.title = target.innerText;
    },

    close() {
      const that = this;
      that.$nextTick(() => {
        that.zhfxOffsetRight = -30;
      });
      //   this.$store.dispatch("lqfb/changezhfxOffsetRight", -30);
    },
    handleVideoClick(v){
        // this.$map.getMap().getView().setCenter([v.properties.X,v.properties.Y]);
        // this.$map.getMap().getView().setZoom(16);
        this.$bus.$emit("videoData",v.properties);
        // debugger
    }
  },
  mounted() {
    const that = this;
    that.$bus.$on("showVideoList", (value) => {
      if (value) {
        that.$nextTick(() => {
          that.zhfxOffsetRight = 0;
        });
      } else {
        that.$nextTick(() => {
          that.zhfxOffsetRight = -30;
        });
      }
    });
    that.$bus.$on("sendVideoListData", (videoPointList) => {
      that.$nextTick(() => {
        that.videoList = videoPointList;
      });
      // console.log("qqqq",videoPointList)
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
  height: calc(100vh - 60px);
  transition: right 0.6s;
  background-color: rgba(16, 21, 24, 1);
  position: absolute;
  z-index: 1000;
  top: 0;
  right: 0;
  padding: 10px;
  z-index: 1999;
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
    height: calc(100% - 120px);
    width: 100%;
    padding-top: 1vh;
    .zbjksz-container {
      height: 300px;
      width: 100%;
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

      ul {
        padding-left: 0;
        list-style: none;
        // height: 230px;
        overflow: auto;
        font-family: PingFang SC;
        font-size: 16px;
        li {
          height: 32px;
          font-size: 16px;
          line-height: 32px;
          padding: 0px 0 0px 27px;
          // margin-top: 10px;
          list-style: none;
        //   background: url("~@/assets/images/2.png") no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
          &.active {
            background: url("~@/assets/images/1.png");
            color: hsla(153, 98%, 53%, 1);
            background-size: 100% 100%;
          }
        }
        li:hover {
        //   color: hsla(180, 100%, 47%, 1);
            background: url("../../../assets/images/矩形 515.png") no-repeat;
            background-size: 100%;
            color: hsla(153, 98%, 53%, 1);
            border: 1px solid hsla(153, 98%, 53%, 1);
            cursor: pointer;
        }
      }
      ul::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }
      ul::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.8);
        width: 4px;
        height: 30px;
      }
      ul::-webkit-scrollbar-track {
        border-radius: 0;
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>
