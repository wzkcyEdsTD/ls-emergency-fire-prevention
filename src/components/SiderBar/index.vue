<template>
  <div class="sider-bar-wrapper" :style="{left:`${offsetLeft}rem`}">
    <div class="flexClass">
      <!-- <el-checkbox class="checkBox" v-model="checked" @change="checkedAll">
      </el-checkbox> -->
      <div class="top-bar">
        <div class="title">
          资源目录
          <img src="@/common/images/边.png" alt="">
        </div>
      </div>
    </div>

    <!-- <i class="right-collapse" @click="collapse"> ||</i> -->
    <slot />
  </div>
</template>
<script>
export default {
  data() {
    return {
      offsetLeft: 0,
      checked:true
    }
  },
  methods: {
    checkedAll(){
      const that = this;
      that.$bus.$emit('checkBox',that.checked)
    },
    collapse() {
      this.offsetLeft = this.offsetLeft === 0 ? -18.75 : 0
    }
  },
  mounted(){
    const that = this;
    that.$bus.$on("checkAll",val=>{
      that.$nextTick(()=>{
        that.checked = val;
      })
    })
  },
  beforeDestroy(){
    this.$bus.$off('checkAll');
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
  padding-top: 2vh;
  top: 0;
  transition: left 0.9s;
  // overflow-y: scroll;
  .flexClass{
    display: flex;
    .checkBox{
      padding-top: 3px;
    }
    .top-bar {
      width: 100%;
      height: 40px;
      margin-bottom: 10px;
      padding-left: 5px;
      padding-bottom: 4vh;
      .title {
        width: 100%;
        height: 40px;
        font-family: youshebiaotihei;
        font-size: 2.3vh;
        img {
          width: 100%;
          // position: relative;
          // left: -20px;
        }
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
