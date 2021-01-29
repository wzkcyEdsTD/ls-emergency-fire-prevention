<template>
  <div class="sider-bar-wrapper" :style="{left:`${offsetLeft}rem`}">
    <div class="top-bar">
      <div class="title">
        资源目录
        <img src="@/common/images/边.png" alt="">
      </div>

      <!-- <div class="icon-search"><img src="../../assets/images/icon-search.png"></div> -->
    </div>
    <!-- <i class="right-collapse" @click="collapse"> ||</i> -->
    <slot />
  </div>
</template>
<script>
export default {
  data() {
    return {
      offsetLeft: 0
    }
  },
  methods: {
    collapse() {
      this.offsetLeft = this.offsetLeft === 0 ? -18.75 : 0
    }
  }
}
</script>
<style lang="scss" scoped>
.sider-bar-wrapper{
  padding: 12px 10px;
  width: 300px;
  height: calc(100vh - 60px);
  background-color: rgb(16, 21, 24);
  // background-image: url("~@/common/images/左边框.png");
  background-size: 100% 100%;
  position: relative;
  z-index: 999;
  left: 0;
  padding-top: 4vh;
  top: 0;
  transition: left 0.9s;
  overflow-y: scroll;
  .top-bar {
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    padding-bottom: 4vh;
    .title {
      width: 100%;
      height: 40px;
      font-family: youshebiaotihei;
      font-size: 1.8vh;
      img {
       width: 100%;
    }
    }

  }
  .right-collapse {
    position: absolute;
    right: 0;
    top: 41%;
    height: 16%;
    width: 22px;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
.sider-bar-wrapper::-webkit-scrollbar{
  display:none;
}
</style>
