<template>
  <div v-show="allLayerList.length > 0" class="legend-wrapper" :class="{active:rightMenu==2}">
    <div class="title">图例</div>
    <div class="item-list">
      <div v-for="(v, i) in allLayerList" v-show="v.icon" :key="i" class="item">
        <img v-if="v.icon" class="icon" :src="require(`@/assets/images/icon/${v.icon}`)">
        <span>{{ getLabel(v.label) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    layerList() {
      let list = this.$store.getters.layerList
      return list
    },
    rightMenuList(){
      return this.$store.getters.rightMenuList
    },
    zlOffsetRight() {
      return this.$store.getters.zlOffsetRight
    },
    zhfxOffsetRight() {
      return this.$store.getters.zhfxOffsetRight
    },
    infoPanelOffsetRight() {
      return this.$store.getters.infoPanelOffsetRight
    },
    yadqOffsetRight() {
      return this.$store.getters.yadqOffsetRight
    },
    yzhxdjOffsetRight() {
      return this.$store.getters.yzhxdjOffsetRight
    },
    rydwPannelOffsetRight() {
      return this.$store.getters.rydwPannelOffsetRight
    },
    videoListOffsetRight() {
      return this.$store.getters.videoListOffsetRight
    }
  },
  watch:{
    layerList(val) {
      const that = this;
      this.allLayerList = val;
      const legend = {
          icon:"火灾点.png",
          label:"火灾点（天眼守望）",
          name:"火灾点（天眼守望）",
      }
      const legend1 = {
        icon:"举报人icon.png",
        label:"火灾点（I丽水）",
        name:"火灾点（I丽水）",
      }
      //气象站
      const legend2 = {
        icon:"气象测站.png",
        label:"气象测站",
        name:"气象测站",
      }
      //小学
      const legend3 = {
        icon:"小学.png",
        label:"小学",
        name:"小学",
      }
      //小学适龄儿童
      const legend4 = {
        icon:"小学适龄儿童.png",
        label:"小学适龄儿童",
        name:"小学适龄儿童",
      }    
      //初中
      const legend5 = {
        icon:"初中.png",
        label:"初中",
        name:"初中",
      }
      //初中适龄儿童
      const legend6 = {
        icon:"初中适龄儿童.png",
        label:"初中适龄儿童",
        name:"初中适龄儿童",
      } 
      //监控
      const legend7 = {
        icon:"视频监控.png",
        label:"视频监控",
        name:"视频监控",
      }
      //办事网点
      const legend8 = {
        icon:"办事网点.png",
        label:"办事网点",
        name:"办事网点",
      }
      //森林公园
      const legend9 = {
        icon:"森林公园.png",
        label:"森林公园",
        name:"森林公园",
      }
      //国有林场
      const legend10 = {
        icon:"国有林场.png",
        label:"国有林场",
        name:"国有林场",
      }
      //湿地
      const legend11 = {
        icon:"湿地.png",
        label:"湿地",
        name:"湿地",
      }
      //小学学区
      const legend12 = {
        icon:"小学学区.jpg",
        label:"小学学区",
        name:"小学学区",
      }
      //初中学区
      const legend13 = {
        icon:"初中学区.jpg",
        label:"初中学区",
        name:"初中学区",
      }
      //铁塔
      const legend14 = {
        icon:"铁塔.png",
        label:"铁塔",
        name:"铁塔",
      }
      //铁塔监控
      const legend15 = {
        icon:"铁塔监控.png",
        label:"铁塔监控",
        name:"铁塔监控",
      }
      //小流域监控
      const legend16 = {
        icon:"小流域监控.png",
        label:"小流域监控",
        name:"小流域监控",
      }
      //消防通道视频监控
      const legend17 = {
        icon:"消防通道视频监控.png",
        label:"消防通道视频监控",
        name:"消防通道视频监控",
      }
      //水利视频监控
      const legend18 = {
        icon:"水利视频监控.png",
        label:"水利视频监控",
        name:"水利视频监控",
      }
      const list = []
      if (that.fireLayerTemp) {
        list.push(legend)
        list.push(legend1)
      }
      if (that.hasQxcz || that.qxczLayerTemp) {
        list.push(legend2)
      }
      if (that.primartSchool) {
        list.push(legend3)
      }
      if (that.primarySchoolChildrenTemp) {
        list.push(legend4)
      }
      if (that.middleschoolPoint) {
        list.push(legend5)
      }
      if (that.middleSchoolChildren) {
        list.push(legend6)
      }
      if (that.showVideoList) {
        list.push(legend7)
      }
      if (that.bswd) {
        list.push(legend8)
      }
      if (that.gylc) {
        list.push(legend10)
      }
      if (that.slgy) {
        list.push(legend9)
      }
      if (that.sd) {
        list.push(legend11)
      }     
      if (that.primarySchoolDistrictTemp) {
        list.push(legend12)
      }
      if (that.middleSchoolDistrictTemp) {
        list.push(legend13)
      }
      if (that.tt) {
        list.push(legend14)
      }     
      if (that.ttjk) {
        list.push(legend15)
      }
      if (that.xly) {
        list.push(legend16)
      }
      if (that.xftd) {
        list.push(legend17)
      }
      if (that.slsp) {
        list.push(legend18)
      }

      //过滤重复item
      if (this.allLayerList.length == 0) {
        this.allLayerList = [...this.allLayerList, ...list]
      } else {
        const obj = {};
        const arr = [...this.allLayerList, ...list];
        arr.map(v => {
          if (!obj[v.name]) { obj[v.name] = v }
        })

        const setNameArr = [...new Set(arr.map(v => v.name))];
        this.allLayerList = setNameArr.map(v => obj[v])
      }
    },
    rightMenuList(list){
      console.log('当前剩余',list.length)
      const that = this;
      if (list.length>0) {

        that.rightMenu = 30;
        
        that.$bus.$emit("changeMenuLocaltion",30)
      }else{

        that.rightMenu = 2;
        
        that.$bus.$emit("changeMenuLocaltion",2)
      }
    }
  },
  data() {
    return {
      allLayerList:[],
      fireLayerTemp:true,
      qxczLayerTemp:false,
      hasQxcz:false,
      primartSchool:false,
      primarySchoolChildrenTemp:false,
      middleschoolPoint:false,
      middleSchoolChildren:false,
      primarySchoolDistrictTemp:false,
      middleSchoolDistrictTemp:false,
      showVideoList:false,
      bwsd:false,
      rightMenu:30,
      gylc:false,
      slgy:false,
      sd:false,
      tt:false,
      ttjk:false,
      xly:false,
      xftd:false,
      slsp:false,
    }
  },
  methods: {
    getOffsetRight(val) {
      const that = this;
      that.$nextTick(()=>{
        that.rightMenu = val
      })
    },
    getLabel(label) {
      if (['道路'].indexOf(label) > -1) return ''
      return label
    },
  },
  mounted(){
    const that = this;
    this.$bus.$on('allLegend',val=>{
      let list = [];
      that.$nextTick(()=>{
        switch (val.label) {
          case '铁塔监控':
            that.ttjk = val.temp;
            break;
          case '视频监控':
            that.showVideoList = val.temp;
            break;
          case '气象测站':
            that.qxczLayerTemp = val.temp;
            break;
          case '小学':
            that.primartSchool = val.temp;
            break;
          case '小学学区':
            that.primarySchoolDistrictTemp = val.temp;
            break;
          case '小学适龄儿童':
            that.primarySchoolChildrenTemp = val.temp;
            break;
          case '初中':
            that.middleschoolPoint = val.temp;
            break;
          case '初中学区':
            that.middleSchoolDistrictTemp = val.temp;
            break;
          case '初中适龄儿童':
            that.middleSchoolChildren = val.temp;
            break;
          case '办事网点':
            that.bswd = val.temp;
            break;
          case '国有林场':
            that.gylc = val.temp;
            break;
          case '森林公园':
            that.slgy = val.temp;
            break;
          case '湿地':
            that.sd = val.temp;
            break;
          case '铁塔':
            that.tt = val.temp;
            break;
          case '小流域监控':
            that.xly = val.temp;
            break;
          case '消防通道视频监控':
            that.xftd = val.temp;
            break;
          case '水利视频监控':
            that.slsp = val.temp;
            break;
          default:
            break;
        }
        if (val.temp) {
          // const list = []
          const legend = {
            icon:`${val.label}.png`,
            label:`${val.label}`,
            name:`${val.label}`,
          }
          list.push(legend)
          if (this.allLayerList.length == 0) {
            this.allLayerList = [...this.allLayerList, ...list]
          } else {
            const obj = {};
            const arr = [...this.allLayerList, ...list];
            arr.map(v => {
              if (!obj[v.name]) { obj[v.name] = v }
            })

            const setNameArr = [...new Set(arr.map(v => v.name))];
            this.allLayerList = setNameArr.map(v => obj[v])
          }
        }else{
            that.allLayerList = that.allLayerList.filter(v=>{
              if (!(v.name.indexOf('val.label')!=-1)) {
                return v
              }
            })
          
        }
      })
    })
    this.$bus.$on('hzjbd',temp=>{
      // console.log(temp)
      that.$nextTick(()=>{
        that.fireLayerTemp = temp;
        that.allLayerList = that.allLayerList.filter(v=>{
          if (!(v.name.indexOf('火灾点')!=-1)) {
            return v
          }
        })
      })
    });
    },
  beforeDestroy(){
    this.$bus.$off('hzjbd');
    this.$bus.$off('allLegend');
  }
}
</script>

<style lang="scss">
.legend-wrapper {
  position: absolute;
  z-index: 999;
  bottom: 20px;
  padding: 10px;
  right: 30rem;
  // background-color: rgba($color: $color-theme, $alpha: 0.8);
  background-image: url("~@/common/images/弹框.png");
  background-size: 100% 100%;
  transition: right 0.9s;
  &.active{
    right:2rem
  }
  .title {
    text-align: center;
    padding: 5px 0;
  }
  .item-list {
    @include scrollBar;
    max-height: 20vh;
    overflow-y: auto;
    font-size: 14px;
    overflow-y: auto;
    margin-bottom: 2vh;
    .item {
      display: flex;
      margin: 8px 0;
      align-items: center;
      >span{
        margin-left: 5px;
      }
      .icon{
        width: 26px;
        height: 26px;
      }
    }
  }

    /*滚动条样式*/
  .item-list::-webkit-scrollbar {
      width: 4px;
      height: 4px;
  }
  .item-list::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background:#118251;
      width: 8px;
      height: 30px;
  }
  .item-list::-webkit-scrollbar-track {
      border-radius: 0;
      background:#103E29;
  }
}
</style>
