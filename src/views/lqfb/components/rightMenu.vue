<template>
  <div class="right-wrapper" :style="`right: ${rydwPannelOffsetRight}rem`">
    <div class="close" @click="closeMenu" />
    <div class="lb-wrapper">
      <div class="titleLine" style="margin-bottom: 0;">
        <img src="@/common/images/警告.gif" class="icon"/>
        <div class="title">
          火灾报警点
        </div>
        <div class="changeMenuButton" @click="changeMenu">
          <div class="text">
             {{textName}}
          </div>
        </div>
      </div>

      <div v-show="!selectMenu">
        <img style="width: 100%;" src="@/common/images/边.png" alt="">
        <div class="titleLine">
          <div class="search-header">
            <img src="@/common/images/搜索icon.png" class="searchIcon">
            <el-input
              v-model="searchTextAll"
              class="searchFilterInput"
              placeholder="查找火灾点"
              size="small"
              @keyup.enter.native="searchFilterAll"
            />
            <img src="@/common/images/关闭icon.png" class="clearIcon" @click="searchClearAll">
          </div>
          <div id="refreshIcon1" class="refreshIcon" @click="refreshEvent"/>
        </div>
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item :title='wcl' name="1">
            <div>
              <div class="ul-head">
                <div class="item item-1">地点</div>
                <!-- <div class="item item-1">举报人</div> -->
                <div class="item item-1">时间</div>
                <div class="item item-1">来源</div>
              </div>
              <ul style="max-height: 47vh;">
                <li v-for="(item, index) in unresolveList" 
                    :key="index" 
                    class="list-item" 
                    :class="{active : fireUnresolve == index}"
                    @click="fireUnresolve = index;clickFire(item)">
                  <div @mouseenter="titeEnter" class="item item-1">{{ item.address }}</div>
                  <!-- <div class="item item-1">{{ item.jubaoren }}</div> -->
                  <div class="item item-1">{{ item.time }}</div>
                  <div class="item item-1">{{ systemName[`${item.systemcode}`] }}</div>
                </li>
                <div class="allmore" v-show="hasMore && !hasSearch" @click="viewMore">
                  <div class="moreText">查看更多</div>
                  <div class="more" />
                </div>
                
              </ul>
            </div>
          </el-collapse-item>
          <el-collapse-item :title="yclwbj" name="2">
            <div>
              <div class="ul-head">
                <div class="item item-1">地点</div>
                <!-- <div class="item item-1">举报人</div> -->
                <div class="item item-1">时间</div>
                <div class="item item-1">来源</div>
              </div>
              <ul style="max-height: 47vh;">
                <li v-for="(item, index) in unSettledList" 
                    :key="index" 
                    class="list-item" 
                    :class="{active : fire == index}"
                    @click="fire = index;clickFire(item)">
                  <div @mouseenter="titeEnter" class="item item-1">{{ item.address }}</div>
                  <!-- <div class="item item-1">{{ item.jubaoren }}</div> -->
                  <div class="item item-1">{{ item.time }}</div>
                  <div class="item item-1">{{ systemName[`${item.systemcode}`] }}</div>
                </li>
                <div class="allmore" v-show="hasMoreUnSettled && !hasSearchUnSettled" @click="viewMoreUnSettled">
                  <div class="moreText">查看更多</div>
                  <div class="more" />
                </div>
              </ul>
            </div>
          </el-collapse-item>
          <el-collapse-item :title="ybj" name="3">
            <div>
              <div class="ul-head">
                <div class="item item-1">地点</div>
                <!-- <div class="item item-1">举报人</div> -->
                <div class="item item-1">时间</div>
                <div class="item item-1">来源</div>
              </div>
              <ul style="max-height: 47vh;" >
                <li v-for="(item, index) in tempList" 
                    :key="index" 
                    class="list-item" 
                    :class="{active : fire == index}"
                    @click="fire = index;clickFire(item)">
                  <div @mouseenter="titeEnter" class="item item-1">{{ item.address }}</div>
                  <!-- <div class="item item-1">{{ item.jubaoren }}</div> -->
                  <div class="item item-1">{{ item.time }}</div>
                  <div class="item item-1">{{ systemName[`${item.systemcode}`] }}</div>
                </li>
                <div class="allmore" v-show="hasMoreHistory && !hasSearchHistory" @click="viewMoreHistory">
                  <div class="moreText">查看更多</div>
                  <div class="more" />
                </div>
              </ul>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div v-show="selectMenu" class="secondMenu">
        <div class="titleLine">
          <div class="title" >
            {{`历史回传截图列表`}}
          </div>
        </div>
        <img style="width: 100%;" src="@/common/images/边.png" alt="">
        <div class="ul-head">
          <div class="item item-1">地点</div>
          <!-- <div class="item item-1">举报人</div> -->
          <div class="item item-1">时间</div>
          <div class="item item-2">截图</div>
        </div>
        <ul :style="{height:'71.5vh'}" v-if="imageList.length>0">
          <li v-for="(item, index) in imageList" 
              :key="index" 
              class="list-item" >
            <div @mouseenter="titeEnter" class="item item-1">{{ item.address }}</div>
            <div class="item item-1">{{ item.time }}</div>
            <div class="item item-2">
                <el-image
                  style="width: 70px; height: 70px"
                  :src="item.imgSrc"
                  :preview-src-list="item.imgList">
              </el-image>
            </div>
          </li>
          <!-- <div class="allmore" v-show="hasMore && !hasSearch" @click="viewMore">
            <div class="moreText">查看更多</div>
            <div class="more" />
          </div> -->
          
        </ul>
      </div>
      <!-- <div class="changeMenuTool">
        <img src="@/common/images/左.png" class="leftTool" @click="leftTool">
        <div class="selectMenu">
          <div class="one" @click="leftTool" :style="{'background-color': selectMenu==1 ? '#B5F3B5' : '#0C985B'}">
            <div class="text" :style="{'color': selectMenu==1 ? '#0C110B' : '#B5F3B5'}">1</div>
          </div>
          <div class="two" @click="rightTool" :style="{'background-color': selectMenu==2 ? '#B5F3B5' : '#0C985B'}">
            <div class="text" :style="{'color': selectMenu==2 ? '#0C110B' : '#B5F3B5'}">2</div>
          </div>
        </div>
        <img src="@/common/images/右.png" class="rightTool" @click="rightTool">
      </div> -->
    </div>
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
      wcl:"",
      yclwbj:"",
      ybj:"",
      activeNames:'1',
      selectMenu:false,
      textName:"截图列表",
      imageList:[],
      unSettledList:[],
      hasSearch:false,
      hasSearchUnSettled:false,
      hasSearchHistory:false,
      hasMoreUnSettled:true,
      hasMore:true,
      hasMoreHistory:true,
      rydwPannelOffsetRight:0,
      fireList,
      fire:null,
      fireUnresolve:null,
      searchText:"",
      searchTextAll:"",
      searchTextUnresolve:"",
      searchTextUnSettled:"",
      list:null,
      unresolveList:null,
      tempList:null,
      value1:null,
      systemName:{
        "ilishui":"I丽水",
        "tyswxt":"天眼守望"
      },
      size:1000,
      layerList:[],
      allFireList:[]
    }
  },
  methods:{
    changeMenu(){
      const that = this;
      that.$nextTick(()=>{
        that.selectMenu = !that.selectMenu;
        if (!that.selectMenu) {
          that.textName = "截图列表"
        }else{
          that.textName = "火灾点列表"
        }
      })
    },
    leftTool(){
      const that = this;
      that.$nextTick(()=>{
        that.selectMenu = 1;
      })
    },
    rightTool(){
      const that = this;
      that.$nextTick(()=>{
        that.selectMenu = 2;
      })
    },
    viewMoreUnSettled(){
      const that = this;
      that.$nextTick(()=>{
        that.hasMoreUnSettled = false;
        const templist1 = that.fireList.result.records.sort(that.sortUpDate);
        that.unSettledList = templist1.filter(v=>{
          if (v.status && v.status.indexOf('已处理未办结')!=-1) {
            return v
          }
        })
      })
    },
    viewMoreHistory(){
      const that = this;
      that.$nextTick(()=>{
        that.hasMoreHistory = false;
        const templist1 = that.fireList.result.records.sort(that.sortUpDate);
        that.tempList = templist1.filter(v=>{
          if (v.status && v.status.indexOf('已办结')!=-1) {
            return v
          }
        })
      })
    },
    viewMore(){
      const that = this;
      that.$nextTick(()=>{
        that.hasMore = false;
        const list = that.fireList.result.records.sort(that.sortUpDate)
        that.unresolveList = list.filter((v) =>{
          if (v.status && v.status.indexOf(`已办结`) == -1) {
            return v
          }else if (!v.status) {
            return v            
          }
        })
      })
      // console.log('1233211234567');
    },
    titeEnter(e) {
      const target = e.target;
      const { clientWidth, scrollWidth, title } = target;
      if (!title && scrollWidth > clientWidth) target.title = target.innerText;
    },
    refreshEvent(){
      const that = this;
      let node = $("#refreshIcon1");
      that.$nextTick(()=>{
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
      })


    },
    getData() {
      const that = this;
      //主动刷新
      const size = window.size;
      that.size = size;
      // debugger
      Util.testAxios(Number(that.size)).then(res=>{
        if(res.message.indexOf('成功')!=-1){
          // debugger
          if (that.size < Number(res.result.total)) {
            that.size = (res.result.total + 100);
            console.log(that.size);
            Util.testAxios(Number(that.size)).then(r=>{
              that.$bus.$emit('fireList',r);
            })
          }else{
            that.$bus.$emit('fireList',res);
          }
        }
        // console.log(res.result.records)
        // const list = res.result.records
        // that.$bus.$emit('fireList',res);
      })

    },
    clickFire(item){
      // console.log(item);
      this.$map.getMap().getView().setCenter([item.x,item.y]);
      this.$map.getMap().getView().setZoom(16);
      this.$bus.$emit("showPoup",item);
    },
    searchStreet(point){
      const that = this;
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
        // console.log(serviceResult)
        const testList = serviceResult.result.features;
        const features = new GeoJSON().readFeatures(testList)
        features.map(f => {
          f.setStyle(new Style({
            stroke: new Stroke({
              color: 'rgba(255, 0, 0, 0.8)',
              lineDash:[1,15,1],
              width: 3
            }),
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
        that.$nextTick(()=>{
          that.layerList.push(testLayer);
        })

        window.g.map.getLayers().insertAt(4, testLayer)
      })
    },
    closeMenu(){
      const that = this;
      if (that.rydwPannelOffsetRight==-25) {
        that.$nextTick(() => {
          that.rydwPannelOffsetRight=0
          that.$bus.$emit("changeMenuLocaltion",30)
        })
      }else{
        that.$nextTick(() => {
          that.rydwPannelOffsetRight=-25
          that.$bus.$emit("changeMenuLocaltion",2)
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
    searchFilterAll(){
      const that = this;
      that.searchText = that.searchTextAll;
      that.searchTextUnresolve = that.searchTextAll;
      that.searchTextUnSettled = that.searchTextAll;
      that.searchFilter();
      that.searchFilterUnresolve();
      that.searchFilterUnSettled();
      that.$nextTick(()=>{
        //未处理
        if (that.unresolveList.length>0) {
          that.activeNames='1'  
        }else if (that.unSettledList.length>0) {
          //已办结未处理
          that.activeNames='2'  
        }else if (that.tempList.length>0) {
          //已办结
          that.activeNames='3'  
        }
      })

    },
    searchFilter(){
      const that = this
      if (that.searchText) {
        this.list = that.fireList.result.records.sort(that.sortUpDate).filter(v=>{
          if (v.status && v.status.indexOf('已办结')!=-1) {
            return v
          }
        })
      // debugger
        if (that.hasMoreHistory) {
          this.list = this.list.slice(0,10)
        }
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
        that.hasSearchHistory = true;
      }else{
        that.hasSearchHistory = false;
        let templist = that.fireList.result.records.sort(that.sortUpDate)
        if (that.hasMoreHistory) {
          templist = templist.slice(0,10)
        }
        this.tempList = templist.filter(v=>{
          if (v.status && v.status.indexOf('已办结')!=-1) {
            return v
          }
        })
      }
      
    },

    searchFilterUnresolve(){
      const that = this
      if (that.searchTextUnresolve) {
        that.hasSearch = true;
        let list = that.fireList.result.records.sort(that.sortUpDate)

        list = list.filter((v) =>{
          if (v.status && v.status.indexOf(`未处理`) != -1) {
            return v
          }
        })
        if (that.hasMore) {
          list = list.slice(0,10);
        }
        that.unresolveList = list 
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
        that.hasSearch = false;
        let tempList12 = that.fireList.result.records.sort(that.sortUpDate)

        tempList12 = tempList12.filter((v) =>{
          if (v.status && v.status.indexOf(`未处理`) != -1) {
            return v
          }
        })
        if (that.hasMore) {
          tempList12 = tempList12.slice(0,10);
        }
        that.unresolveList = tempList12;

      }
      
    },
    searchFilterUnSettled(){
      const that = this
      if (that.searchTextUnSettled) {
        that.hasSearchUnSettled = true;
        let list = that.fireList.result.records.sort(that.sortUpDate)

        list = list.filter((v) =>{
          if (v.status && v.status.indexOf(`已处理未办结`) != -1) {
            return v
          }
        })
        if (that.hasMoreUnSettled) {
          list = list.slice(0,10);
        }
        that.unSettledList = list 
      // debugger
        const key = that.findKey(that.searchTextUnSettled);
        // that.tempList = [];
        // console.log(key)
        that.$nextTick(()=>{
          // debugger
          that.unSettledList = that.unSettledList.filter((item)=>{
            if (item.systemcode.indexOf(key) != -1) {
              return item;
            }else if (item.time.indexOf(that.searchTextUnSettled) != -1) {
              return item;
            }else if (item.address.indexOf(that.searchTextUnSettled) != -1) {
              return item;
            }
          })

        })
      }else{
        that.hasSearchUnSettled = false;
        let tempList333 = that.fireList.result.records.sort(that.sortUpDate)

        tempList333 = tempList333.filter((v) =>{
          if (v.status && v.status.indexOf(`已处理未办结`) != -1) {
            return v
          }
        })
        console.log("tempList333",tempList333.length);
        if (that.hasMoreUnSettled) {
          tempList333 = tempList333.slice(0,10);
        }
        that.unSettledList = tempList333;

      }
      
    },
    searchClearAll(){
      const that = this;
      that.searchTextAll = '';
      that.searchText = that.searchTextAll;
      that.searchTextUnresolve = that.searchTextAll;
      that.searchTextUnSettled = that.searchTextAll;
      that.searchFilter();
      that.searchFilterUnresolve();
      that.searchFilterUnSettled();
      // that.searchClear();
      // that.searchClearUnresolve();
      // that.searchClearUnSettled();
      that.$nextTick(()=>{
        that.activeNames='1'  
      })
    },
    searchClear(){
      // debugger
      const that = this
      var templist4 = this.fireList.result.records.sort(that.sortUpDate);
      if (that.hasMoreHistory) {
          templist4 = templist4.slice(0,10);
      }
      this.tempList = templist4.filter(v=>{
        if (v.status && v.status.indexOf('已办结')!=-1) {
          return v
        }
      })
      this.searchText = "";
      that.hasSearchHistory = false;
    },
    searchClearUnresolve(){
      // debugger
      const that = this
      var tempList5 = this.fireList.result.records.sort(that.sortUpDate);

      tempList5 = tempList5.filter((v) =>{
        if (v.status && v.status.indexOf(`未处理`) == -1) {
          return v
        }
      })
      if (that.hasMore) {
        tempList5 = tempList5.slice(0,10);
      }
      that.unresolveList = tempList5;
      this.searchTextUnresolve = "";
      that.hasSearch = false;
    },
    searchClearUnSettled(){
      // debugger
      const that = this
      var tempList6 = this.fireList.result.records.sort(that.sortUpDate);

      tempList6 = tempList6.filter((v) =>{
        if (v.status && v.status.indexOf(`已处理未办结`) == -1) {
          return v
        }
      })
      if (that.hasMoreUnSettled) {
        tempList6 = tempList6.slice(0,10);
      }
      that.unSettledList = tempList6;
      this.searchTextUnSettled = "";
      that.hasSearchUnSettled = false;
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
        //that.tempList =that.fireList.result.records.sort(that.sortUpDate)
        // debugger
        const templist1 = that.fireList.result.records.sort(that.sortUpDate);
        let imageList = templist1.filter(v=>{
          if (v.imgSts=='1') {
            return v
          }
        })
        imageList = imageList.map(v=>{
          if (v.imgSts=="1") {
            v.imgSrc = `http://10.53.137.235/forestfire/sys/common/static/${v.imgSrc}`
            v.imgList = []
            v.imgList.push(v.imgSrc)
            v.createTime = v.createTime.substr(5)
            return v
          }
        })
        that.imageList = imageList;
        console.log("imageList",that.imageList);
        that.tempList = templist1.filter(v=>{
          if (v.status && v.status.indexOf('已办结')!=-1) {
            return v
          }
        })
        that.unresolveList = templist1.filter((v) =>{
          if (v.status && v.status.indexOf(`未处理`) != -1) {
            return v
          }
        })
        that.unSettledList = templist1.filter((v) =>{
          if (v.status && v.status.indexOf(`已办结未处理`) != -1) {
            return v
          }
        })
        that.allFireList = templist1;

        that.wcl = `未处理（${that.unresolveList.length}）`
        that.yclwbj = `已处理未办结（${that.unSettledList.length}）`
        that.ybj = `已办结（${that.tempList.length}）`

       that.unresolveList.forEach(element => {
          if (element.systemcode.indexOf('ilishui')!=-1) {
            // debugger
            // console.log(element)
            that.searchStreet(new Point([Number(element.x),Number(element.y)]))
          }
        });
        
        if (that.unresolveList.length>10) {
          that.unresolveList = that.unresolveList.slice(0,10);
          that.hasMore = true;
        }else{
          that.hasMore = false;
        }
        
        if (that.tempList.length>10) {
          that.tempList = that.tempList.slice(0,10);
          that.hasMoreHistory = true;
        }else{
          that.hasMoreHistory = false;
        }

        if (that.unSettledList.length>10) {
          that.unSettledList = that.unSettledList.slice(0,10);
          that.hasMoreUnSettled = true;
        }else{
          that.hasMoreUnSettled = false;
        }
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
        if (that.layerList && that.layerList.length>0) {
          that.layerList.map(v=>{
            v.setVisible(value)
          })
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
<style lang="scss" scoped>
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
  // overflow-y: auto;
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

  .lb-wrapper {
      width: 100%;
      // height: 49%;
      // padding-bottom: 2vh;
      .titleLine{
        display: flex;
        padding-right: 1vh;
        width: 100%;
        align-items:center;
        .icon{
          width: 2vh;
          height: 2vh;
          margin-right: 1vh;
          // margin-top: 1vh;
        }
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
          // from{-webkit-transform: rotate(0deg);}
          // to{-webkit-transform: rotate(360deg);}
          from{-webkit-transform: rotate(0deg); transform: rotate(0deg)}
          to{-webkit-transform: rotate(360deg); transform: rotate(360deg)}
        }

        @keyframes gira {
          from{-webkit-transform: rotate(0deg); transform: rotate(0deg)}
          to{-webkit-transform: rotate(360deg); transform: rotate(360deg)}
        }

        .titleHistory {
          width: 40%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 6px;
          margin-bottom: 6px;
          height: 22px;
          // font-weight: bold;
          line-height: 22px;
          position: relative;

          height: 2rem;
          font-family: youshebiaotihei;
          font-size: 2.3vh;
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
        // font-weight: bold;
        line-height: 22px;
        position: relative;

        height: 2rem;
        font-family: youshebiaotihei;
        font-size: 2.3vh;
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

        .changeMenuButton{
          width: 18vh;
          height: 3vh;
          // position: relative;
          // right: 0vh;
          background: url('~@/assets/images/changeButton.png');
          background-size: 100% 100%;
          // border-radius: 1vh;
          font-family: pingfang;
          cursor: pointer;
          .text{
            position: relative;
            top: 50%;
            left: 50%;
            transform:translate(-50%,-50%);
            text-align: center;
            color: #000;
            font-size: 2vh;
          }
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
      // height: 340px;

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



  }

  .secondMenu{
    .titleLine{
      display: flex;
      padding-right: 1vh;
      width: 100%;
      .icon{
        width: 2vh;
        height: 2vh;
        margin-right: 1vh;
        // margin-top: 1vh;
      }

      .titleHistory {
        width: 40%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 6px;
        margin-bottom: 6px;
        height: 22px;
        // font-weight: bold;
        line-height: 22px;
        position: relative;

        height: 2rem;
        font-family: youshebiaotihei;
        font-size: 2.3vh;
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
        // font-weight: bold;
        line-height: 22px;
        position: relative;

        height: 2rem;
        font-family: youshebiaotihei;
        font-size: 2.3vh;
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
      overflow-x: hidden; overflow-y: auto;
      li {
          display: flex;
          align-items: center;
          position: relative;
          width: 380px;
          height: 70px;
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
      .item-2 {
      flex: 1
      }

  }

  .changeMenuTool{
    width: 100%;
    height: 6vh;
    display: flex;
    position: relative;
    bottom: 0vh;
    .leftTool{
      width: 10vh;
      height: 2vh;
      position: relative;
      left: 1vh;
      top:50%;
      transform:translateY(-50%);
      cursor: pointer;
    }
    .selectMenu{
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      transform:translate(-50%,-50%);
      .one{
        margin-right: 2vh;
        border-radius: 50%;
        width: 2.8vh;
        height: 2.8vh;
        cursor: pointer;
        background-color: #B5F3B5;
        .text{
          position: relative;
          top: 50%;
          left: 50%;
          transform:translate(-50%,-50%);
          text-align: center;
          color: #0C110B;
        }
      }
      .two{
        border-radius: 50%;
        width: 2.8vh;
        height: 2.8vh;
        background-color: #B5F3B5;
        cursor: pointer;
        .text{
          position: relative;
          top: 50%;
          left: 50%;
          text-align: center;
          transform:translate(-50%,-50%);
          color: #0C110B;
        }
      }
    }
    .rightTool{
      width: 10vh;
      height: 2vh;
      position: relative;
      right: -17vh;
      top:50%;
      transform:translateY(-50%);
      cursor: pointer;
    }
    
  }
}

::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background:#118251;
    width: 8px;
    height: 30px;
}
::-webkit-scrollbar-track {
    border-radius: 0;
    background:#103E29;
}

.search-header {
  display        : flex;
  align-items    : center;
  justify-content: space-between;
  // width          : 20vh;
  margin-top     : 1vh;
  background-image: url('~@/common/images/底.png');
  background-size: 100% 100%;
  width: 90%;
  
  .searchFilterInput {
    width: 28vh;
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

/deep/.el-collapse{
  width: 100%;
  margin-top: 1vh;
  
}
/deep/.el-collapse-item__content{
  color: #fff;
}
/deep/.el-collapse-item__wrap{
  background-color: transparent;
}

/deep/.el-collapse .el-collapse-item__header {
    background-color: #101518;
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