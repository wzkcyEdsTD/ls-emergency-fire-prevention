<template>
  <div class="right-wrapper" :style="`right: ${rydwPannelOffsetRight}rem`">
    <div class="close" @click="closeMenu" />
    <div class="lb-wrapper">
      <div class="titleLine">
        <div class="titleHistory">
          火灾报警点
        </div>
      </div>
      <div class="titleLine">
        <div class="titleHistory">
          未处理或已处理未办结
        </div>
        <div class="search-header">
          <img src="@/common/images/搜索icon.png" class="searchIcon">
          <el-input
            v-model="searchTextUnresolve"
            class="searchFilterInput"
            placeholder="查找火灾点"
            size="small"
            @keyup.enter.native="searchFilterUnresolve"
          />
          <img src="@/common/images/关闭.png" class="clearIcon" @click="searchClearUnresolve">
        </div>
        <div id="refreshIcon" class="refreshIcon" @click="refreshEvent"/>
      </div>
      <img style="width: 100%;" src="@/common/images/边.png" alt="">
      <div class="ul-head">
        <div class="item item-1">地点</div>
        <!-- <div class="item item-1">举报人</div> -->
        <div class="item item-1">时间</div>
        <div class="item item-1">来源</div>
      </div>
      <ul style="height:30vh" >
        <li v-for="(item, index) in unresolveList" 
            :key="index" 
            class="list-item" 
            :class="{active : fireUnresolve == index}"
            @click="fireUnresolve = index;clickFire(item)">
          <div class="item item-1">{{ item.address }}</div>
          <!-- <div class="item item-1">{{ item.jubaoren }}</div> -->
          <div class="item item-1">{{ item.time }}</div>
          <div class="item item-1">{{ systemName[`${item.systemcode}`] }}</div>
        </li>
      </ul>
      <div>
        <div class="titleLine">
          <div class="title">
            {{`历史数据`}}
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
          <!-- <div class="item item-1">举报人</div> -->
          <div class="item item-1">时间</div>
          <div class="item item-1">来源</div>
        </div>
        <ul style="height:30vh" >
          <li v-for="(item, index) in tempList" 
              :key="index" 
              class="list-item" 
              :class="{active : fire == index}"
              @click="fire = index;clickFire(item)">
            <div class="item item-1">{{ item.address }}</div>
            <!-- <div class="item item-1">{{ item.jubaoren }}</div> -->
            <div class="item item-1">{{ item.time }}</div>
            <div class="item item-1">{{ systemName[`${item.systemcode}`] }}</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- <video></video> -->
  </div>
</template>
<script>

import fireList from './fire.json'
import video from '@/components/video/video'
import { set } from 'ol/transform'
import { Point } from 'ol/geom'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Util from "@/libs/cimAPI.js";
import GeoJSON from 'ol/format/GeoJSON'
import { Circle as CircleStyle, Fill, Stroke, Style, Icon, Text } from 'ol/style'
import {
  TileSuperMapRest,
  FeatureService,
  SuperMap
} from '@supermap/iclient-ol'
// import Video from '@/components/video/video.vue'
export default {
  components: {
    video,
  },

  data() {
    return {
        rydwPannelOffsetRight:0,
        fireList,
        fire:null,
        fireUnresolve:null,
        searchText:"",
        searchTextUnresolve:"",
        list:null,
        unresolveList:null,
        tempList:null,
        value1:null,
        systemName:{
          "ilishui":"I丽水",
          "tyswxt":"天眼守望"
        },
    }
  },
  methods:{
    refreshEvent(){
      const that = this;
      let node = $("#refreshIcon");
      node.css("-webkit-animation", "gira 0.5s ease-out 1");
      node.css("-ms-animation", "gira 0.5s ease-out 1");
      node.css("animation", "gira 0.5s ease-out 1");
      setTimeout(()=>{
        node.css("animation", "")
        that.$message({
          message: '刷新成功',
          type: 'success'
        });
        that.getData();
      },500);

      // this.$bus.$emit("refreshIcon")

    },
    getData() {
      const that = this;
      //主动刷新
      Util.testAxios().then(res=>{
        console.log(res.result.records)
        const list = res.result.records
        that.$bus.$emit('fireList',res);
      })

    },
    clickFire(item){
      // console.log(item);
      this.$map.getMap().getView().setCenter([item.x,item.y]);
      this.$map.getMap().getView().setZoom(16);
    },
    searchStreet(point){
      let geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
        toIndex: 999999,
        attributeFilter:'',
        geometry: point,
        spatialQueryMode: 'INTERSECT', // 相交空间查询模式
        datasetNames: [`lishui_forestfire_v2:d_region_street`]
      })
      // debugger
      const url = "http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data";
      new FeatureService(url).getFeaturesByGeometry(geometryParam, serviceResult => {
        // debugger
        console.log(serviceResult)
        const testList = serviceResult.result.features;
        const features = new GeoJSON().readFeatures(testList)
        features.map(f => {
          f.setStyle(new Style({
            fill: new Fill({
              color: 'rgba(205, 128, 56, 0.2)'
            }),
          }))
        })
        let vectorSource = new VectorSource({
          features,
          wrapX: false
        });
        let testLayer = new VectorLayer({
          source: vectorSource,
        })
        window.g.map.getLayers().insertAt(4, testLayer)
      })
    },
    closeMenu(){
      const that = this;
      if (that.rydwPannelOffsetRight==-25) {
        that.$nextTick(() => {
          that.rydwPannelOffsetRight=0
        })
      }else{
        that.$nextTick(() => {
          that.rydwPannelOffsetRight=-25
        })
      }
    },
    findKey (value) {
      const that = this;

      return Object.keys(that.systemName).find(k =>{
        if (that.systemName[k].indexOf(value) != -1) {
          return k;          
        }
      })
    },
    searchFilter(){
      const that = this
      if (that.searchText) {
        this.list = that.fireList.result.records.sort(that.sortUpDate)
      // debugger
        const key = that.findKey(that.searchText);
        // that.tempList = [];
        console.log(key)
        that.$nextTick(()=>{
          that.tempList = that.list.filter((item)=>{
            if (item.systemcode.indexOf(key) != -1) {
              return item;
            }else if (item.time.indexOf(that.searchText) != -1) {
              return item;
            }else if (item.address.indexOf(that.searchText) != -1) {
              return item;
            }
          })
          console.log(that.tempList)
        })
        // debugger

      }else{
        this.tempList = that.fireList.result.records.sort(that.sortUpDate)
      }
    },
    searchFilterUnresolve(){
      const that = this
      if (that.searchTextUnresolve) {
        const list = that.fireList.result.records.sort(that.sortUpDate)
        that.unresolveList = list.filter((v) =>{
          if (v.status && v.status.indexOf(`已办结`) == -1) {
            return v
          }else if (!v.status) {
            return v            
          }
        })
      // debugger
        const key = that.findKey(that.searchTextUnresolve);
        // that.tempList = [];
        // console.log(key)
        that.$nextTick(()=>{
          // debugger
          that.unresolveList = that.unresolveList.filter((item)=>{
            if (item.systemcode.indexOf(key) != -1) {
              return item;
            }else if (item.time.indexOf(that.searchTextUnresolve) != -1) {
              return item;
            }else if (item.address.indexOf(that.searchTextUnresolve) != -1) {
              return item;
            }
          })
          console.log(that.unresolveList)
        })
      }else{
        const tempList = that.fireList.result.records.sort(that.sortUpDate)
        that.unresolveList = tempList.filter((v) =>{
          if (v.status && v.status.indexOf(`已办结`) == -1) {
            return v
          }else if (!v.status) {
            return v            
          }
        })
      }
    },
    searchClear(){
      // debugger
      const that = this
      this.tempList = this.fireList.result.records.sort(that.sortUpDate);
      this.searchText = "";
    },
    searchClearUnresolve(){
      // debugger
      const that = this
      const tempList = this.fireList.result.records.sort(that.sortUpDate);
      that.unresolveList = tempList.filter((v) =>{
        if (v.status && v.status.indexOf(`已办结`) == -1) {
          return v
        }else if (!v.status) {
          return v            
        }
      })
      this.searchTextUnresolve = "";
    },
    //正序
    sortDownDate(a, b) {
      return Date.parse(a.time) - Date.parse(b.time);
    },
    //反序
    sortUpDate(a, b) {
      return Date.parse(b.time) - Date.parse(a.time);
    },
  },
  mounted() {
    const that = this;

    this.$bus.$on("fireList",value=>{
      that.$nextTick(()=>{
        that.fireList = value;
        // debugger
        that.tempList =that.fireList.result.records.sort(that.sortUpDate)
        // debugger
        that.unresolveList = that.tempList.filter((v) =>{
          if (v.status && v.status.indexOf(`已办结`) == -1) {
            return v
          }else if (!v.status) {
            return v            
          }
        } )
        that.unresolveList.forEach(element => {
          if (element.systemcode.indexOf('ilishui')!=-1) {
            // debugger
            // console.log(element)
            that.searchStreet(new Point([Number(element.x),Number(element.y)]))
          }
        });
      })
    })
    this.$bus.$on("hzjbd",(value)=>{
      // debugger
      that.$nextTick(() => {
        // debugger
        if (value) {
            this.rydwPannelOffsetRight=0
        }else{
            this.rydwPannelOffsetRight=-25
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
  // .title {
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   margin-top: 6px;
  //   margin-bottom: 6px;
  //   font-size: 16px;
  //   height: 22px;
  //   font-weight: bold;
  //   line-height: 22px;
  //   position: relative;
  //   .back {
  //     cursor: pointer;
  //     position: absolute;
  //     right: 0;
  //     top: 0;
  //     color: rgb(10, 204, 233);
  //   }
  //   .search {
  //     width: 180px;
  //     height: 22px;
  //     position: relative;
  //     .el-input__inner {
  //       height: 22px;
  //       border-radius: 20px;
  //       outline: none;
  //       padding-left: 15px;
  //       background: url(../../../assets/images/搜索底框.png) no-repeat;
  //       background-size: 100%;
  //       border: 0;
  //       color: hsla(196, 79%, 43%, 1);
  //     }
  //     .el-input__inner::-webkit-input-placeholder {
  //       color: hsla(196, 79%, 43%, 1);
  //     }
  //     .el-input__icon::before {
  //       content: " ";
  //       width: 25px;
  //       height: 22px;
  //       position: absolute;
  //       top: 0;
  //       right: -4px;
  //       margin-left: 2px;
  //       cursor: pointer;
  //       background: url(../../../assets/images/搜索.png) no-repeat;
  //       background-size: 100%;
  //     }
  //   }
  // }
  .lb-wrapper {
      width: 100%;
      height: 49%;
      // padding-bottom: 2vh;
      .titleLine{
        display: flex;
        padding-right: 1vh;
        width: 100%;
        .refreshIcon{
          // display        : flex;
          background-image: url('~@/common/images/刷新.png');
          background-size: 100% 100%;
          align-items    : center;
          justify-content: space-between;
          margin-top     : 1.5vh;
          width: 2.5vh;
          height: 2.5vh;
          position: relative;
          right: -2.5vh;
          cursor: pointer;
        }
        @-webkit-keyframes gira {
          from{-webkit-transform: rotate(0deg);}
          to{-webkit-transform: rotate(360deg);}
        }

        @keyframes gira {
          from{-webkit-transform: rotate(0deg); transform: rotate(0deg)}
          to{-webkit-transform: rotate(360deg); transform: rotate(360deg)}
        }

        .titleHistory {
          width: 30%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 6px;
          margin-bottom: 6px;
          height: 22px;
          font-weight: bold;
          line-height: 22px;
          position: relative;

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

          .title {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 6px;
          margin-bottom: 6px;
          height: 22px;
          font-weight: bold;
          line-height: 22px;
          position: relative;

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
.el-range-input{
  background: transparent !important;
  border: none;
  color: white;
}
.el-date-editor .el-range-separator {
    padding: 0 0.3125rem;
    line-height: 2rem;
    width: 5%;
    color: white;
    padding-right: 1vh;
}
.start-date, .end-date {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 1rem;
    height: 1.75rem;
    margin-left: 0rem;
    line-height: 1.75rem;
    margin-bottom: 0rem;
}
.el-picker-panel, .el-time-panel{
  background: linear-gradient(to bottom, #103224, #103224);
}
</style>