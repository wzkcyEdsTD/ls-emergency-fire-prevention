<template>
  <div class="right-wrapper" :style="`right: ${rydwPannelOffsetRight}rem`">
    <!-- <div class="close" @click="closeMenu" /> -->
    <div class="lb-wrapper">
      <div class="titleLine">
        <div class="title">
          火灾报警点
        </div>
        <div class="search-header">
          <img src="@/common/images/搜索icon.png" class="searchIcon">
          <el-input
            v-model="searchText"
            class="searchFilterInput"
            placeholder="查找火灾点"
            size="small"
            @keyup.enter.native="searchFilter"
          />
          <img src="@/common/images/关闭.png" class="clearIcon" @click="searchClear">
        </div>
      </div>
      <img style="width: 100%;" src="@/common/images/边.png" alt="">
      <div class="ul-head">
        <div class="item item-1">地点</div>
        <div class="item item-1">举报人</div>
        <div class="item item-1">时间</div>
        <div class="item item-1">来源</div>
      </div>
      <ul style="height:25vh">
        <li v-for="(item, index) in tempList" 
            :key="index" 
            class="list-item" 
            :class="{active : fire == index}"
            @click="fire = index;clickFire(item)">
          <div class="item item-1">{{ item.address }}</div>
          <div class="item item-1">{{ item.jubaoren }}</div>
          <div class="item item-1">{{ item.time }}</div>
          <div class="item item-1">{{ item.systemcode }}</div>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>

import fireList from './fire.json'

export default {
  data() {
    return {
        rydwPannelOffsetRight:-30,
        fireList,
        fire:null,
        searchText:"",
        list:null,
        tempList:null,
    }
  },
  methods:{
    clickFire(item){
      console.log(item);
      this.$map.getMap().getView().setCenter([item.x,item.y]);
      this.$map.getMap().getView().setZoom(16);
    },
    closeMenu(){
      if (this.rydwPannelOffsetRight==-30) {
        that.$nextTick(() => {
          this.rydwPannelOffsetRight=0
        })
      }else{
        that.$nextTick(() => {
          this.rydwPannelOffsetRight=-30
        })
      }
    },
    searchFilter(){
      const that = this
      if (that.searchText) {
        this.list = that.fireList.result.records
      // debugger
        this.tempList = this.list.filter((item)=>{
          if (item.systemcode.indexOf(that.searchText) != -1) {
            return item;
          }
          if (item.time.indexOf(that.searchText) != -1) {
            return item;
          }
        })
      }else{
        this.tempList = that.fireList.result.records
      }

      console.log(this.tempList)
    },
    searchClear(){
      this.tempList = fireList.datas.custom;
      this.searchText = "";
    }
  },
  mounted() {
    const that = this;

    this.$bus.$on("fireList",value=>{
      that.$nextTick(()=>{
        that.fireList = value;
        that.tempList =that.fireList.result.records
      })
    })
    this.$bus.$on("hzjbd",(value)=>{
      that.$nextTick(() => {
        // debugger
        if (value) {
            this.rydwPannelOffsetRight=0
        }else{
            this.rydwPannelOffsetRight=-30
        }
      })
    })
  },
  beforeDestroy() {
      this.$bus.$off("hzjbd");
      this.$bus.$off("fireList");
  },

}
</script>
<style lang="scss">
.right-wrapper {
  position: absolute;
  z-index: 1001;
  top: 0;
  right: 0px;
  padding: 15px;
  width: 400px;
  height: calc(100vh - 60px);
  background-color: rgb(16, 21, 24);
  background-size: 100% 100%;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 6px;
    margin-bottom: 6px;
    font-size: 16px;
    height: 22px;
    font-weight: bold;
    line-height: 22px;
    position: relative;
    .back {
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
      color: rgb(10, 204, 233);
    }
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
      .el-input__inner::-webkit-input-placeholder {
        color: hsla(196, 79%, 43%, 1);
      }
      .el-input__icon::before {
        content: " ";
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
    .lb-wrapper {
        width: 100%;
        height: 49%;
        // padding-bottom: 2vh;
        .titleLine{
        display: flex;
        padding-right: 1vh;
            .title {
            width: 100%;
            height: 2rem;
            font-family: youshebiaotihei;
            font-size: 1.8vh;
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



        }
        .imgLine{
        display: flex;
        justify-content: flex-end;
        padding-top:0.5vh;
        padding-bottom: 0.5vh;
        .detail{
            padding-right: 1vh;
            padding-left: 1.5vh;
            
        }
        .location{

        }
        }
        .list-item{
        &:hover{
            cursor: pointer;
        }
        }
        .title {
    width: 100%;
    height: 2rem;
    font-family: youshebiaotihei;
    font-size: 1.8vh;
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
        .ul-head {
        height: 26px;
        width: 380px;
        // background-color: rgb(10, 40, 68);
        margin-top: 10px;
        display: flex;
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
        ul {
        list-style: none;
        padding-left: 0;
        height: 340px;
        overflow-x: hidden; overflow-y: auto;
        li {
            display: flex;
            align-items: center;
            position: relative;
            width: 380px;
            height: 30px;
            margin-bottom: 12px;
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
        .item-3 {
        flex: 1
        }
    }
}


.search-header {
  display        : flex;
  align-items    : center;
  justify-content: space-between;
  width          : 20vh;
  margin-top     : 1vh;
  background-image: url('~@/common/images/底.png');
  background-size: 100% 100%;

  .searchFilterInput {
    width: 15vh;
  }
  .searchIcon{
    width: 1.5vh;
    position: relative;
    left: 1vh;
    // padding-top: 0.5vh;
    // height: 100%;
  }
  .clearIcon{
    width: 1vh;
    position: relative;
    right: 1vh;
        // padding-right: 1vh;
    // padding-top: 0.5vh;
    // height: 100%;
  }
}

.no-tip {
  padding: 5px;
  color: #fff;
}

</style>
<style>
.el-input__inner {
  background: transparent !important;
  border: none;
  color: white;
}
</style>