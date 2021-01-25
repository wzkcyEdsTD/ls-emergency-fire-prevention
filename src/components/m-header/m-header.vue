<template>
  <div id="header" class="header-wrapper">
    <div class="header-img">
      <img class="bg-img" src="./images/head.png" alt="">
      <img class="topLab" src="./images/标题.png" alt="">
    </div>
    <div class="info">
      <p class="time">{{date}}</p>
      <!-- <p class="time">{{times}}</p> -->
    </div>
  </div>
</template>

<script>
import { getDate } from '@/common/js/util'
export default {
  name: "MHeader",
  data() {
    return {
      date: '',
      times:"",
      showLarge: window.showLarge,
    };
  },
  computed: {
    currentPage: {
      get() {
        // vue中获取当前路由name
        return this.$route.name
      },
      set(val) {}
    }
  },
  mounted() {
    const temp = getDate();
    this.date = temp;
    // this.times = temp.split("data")[1];
    // console.log("时间",this.date,this.times);
    setInterval(() => {
      const temp = getDate();
      this.date = temp;
      // this.times = temp.split("data")[1];
    }, 1000)
  },
  methods: {
    goRoute(name) {
      if (this.currentPage != name) {
        // if (name == 'compare') {
        //   this.showLarge && this.$bus.$emit("change-screen", { value: false });
        // } else {
        //   this.showLarge && this.$bus.$emit("change-screen", { value: true });
        // }
        this.currentPage = name
        this.$router.push({name})
      }
    }
  },
};
</script>

<style scoped lang="less">
.header-wrapper {
  position: relative;
  z-index: 1999;
  width: 100%;
  height: 8vh;
  background-image: linear-gradient(#040d33,rgba(4,13,51,.94) 50%,rgba(4,13,51,0));
  text-align: center;
  // transition: width 1s linear;
  .header-img {
    position: relative;
    height: 100%;
    .bg-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    .topLab{
      height: 100%;
      // z-index: 3000;
    }
    .shadow {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 10px;
      width: 34vh;
      height: 4vh;
    }
  }

  .info {
    position: absolute;
    top: 4.3vh;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 1.5vh;
    /*text-align: left;*/
    line-height: 1.8vh;
    z-index: 3;
    font-family: "YouSheBiaoTiHei";
  }

}
</style>
