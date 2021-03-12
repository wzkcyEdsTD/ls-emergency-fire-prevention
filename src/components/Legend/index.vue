<template>
  <div v-show="allLayerList.length > 0" class="legend-wrapper" :style="{right: `${getOffsetRight()}rem`}">
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
      if (that.fireLayerTemp) {
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

        const list = []

        list.push(legend)
        list.push(legend1)
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
        if (that.hasQxcz) {
          const legend2 = {
            icon:"气象测站.png",
            label:"气象测站",
            name:"气象测站",
          }
          list.push(legend2)
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
            if (!(v.name.indexOf('气象测站')!=-1)) {
              return v
            }
          })
        }
      }
      console.log('list',this.allLayerList)
    }
  },
  data() {
    return {
      allLayerList:[],
      fireLayerTemp:true,
      qxczLayerTemp:false,
      hasQxcz:false,
    }
  },
  methods: {
    getOffsetRight() {
      if (this.zlOffsetRight === 0 || this.zhfxOffsetRight === 0 ||
      this.infoPanelOffsetRight === 0 || this.yadqOffsetRight === 0 ||
      this.yzhxdjOffsetRight === 0 || this.rydwPannelOffsetRight === 0 ||
      this.videoListOffsetRight === 0) {
        return 27
      }
      return 2
    },
    getLabel(label) {
      if (['道路'].indexOf(label) > -1) return ''
      return label
    },
  },
  mounted(){
    const that = this;
    this.$bus.$on('hzjbd',temp=>{
      console.log(temp)
      that.$nextTick(()=>{
        that.fireLayerTemp = temp;
        that.allLayerList = that.allLayerList.filter(v=>{
          if (!(v.name.indexOf('火灾点')!=-1)) {
            return v
          }
        })
        console.log(that.allLayerList)
      })
    
    });
    this.$bus.$on("qxcz",temp=>{
      // debugger
      that.$nextTick(()=>{
        that.qxczLayerTemp = temp;
        if (temp) {
          const list = []
          const legend = {
            icon:"气象测站.png",
            label:"气象测站",
            name:"气象测站",
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
          if (!that.hasQxcz) {
            that.allLayerList = that.allLayerList.filter(v=>{
              if (!(v.name.indexOf('气象测站')!=-1)) {
                return v
              }
            })
          }
        }
      })
    })
    this.$bus.$on("hasQxcz", val=>{
      that.$nextTick(()=>{
        that.hasQxcz = val
        if (val) {
          const list = []
          const legend = {
            icon:"气象测站.png",
            label:"气象测站",
            name:"气象测站",
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
          if (!that.qxczLayerTemp) {
            that.allLayerList = that.allLayerList.filter(v=>{
              if (!(v.name.indexOf('气象测站')!=-1)) {
                return v
              }
            })
          }
        }
      })
    })
    this.$bus.$on("primartSchool",temp=>{
      // debugger
      that.$nextTick(()=>{

        if (temp) {
          const list = []
          const legend = {
            icon:"小学icon.png",
            label:"小学",
            name:"小学",
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
            if (v.name!=='小学') {
              return v
            }
          })
        }
      })
    
    })
    this.$bus.$on("primarySchoolChildrenTemp",temp=>{
      // debugger
      that.$nextTick(()=>{
        that.qxczLayerTemp = temp;
        if (temp) {
          const list = []
          const legend = {
            icon:"小学适龄户籍儿童icon.png",
            label:"小学适龄儿童",
            name:"小学适龄儿童",
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
              if (!(v.name.indexOf('小学适龄儿童')!=-1)) {
                return v
              }
            })
          
        }
      })
    
    })
    this.$bus.$on("middleschoolPoint",temp=>{
      // debugger
      that.$nextTick(()=>{
        that.qxczLayerTemp = temp;
        if (temp) {
          const list = []
          const legend = {
            icon:"初中icon.png",
            label:"中学",
            name:"中学",
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
            if (v.name!=='中学') {
              return v
            }
          })
        }
      })
    
    })
    this.$bus.$on("middleSchoolChildren",temp=>{
      // debugger
      that.$nextTick(()=>{
        that.qxczLayerTemp = temp;
        if (temp) {
          const list = []
          const legend = {
            icon:"初中适龄户籍儿童icon.png",
            label:"中学适龄儿童",
            name:"中学适龄儿童",
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
            if (!(v.name.indexOf('中学适龄儿童')!=-1)) {
              return v
            }
          })
        }
      })
    
    })
  },
  beforeDestroy(){
    this.$bus.$off('hzjbd');
    this.$bus.$off('qxcz');
    this.$bus.$off("hasQxcz")
    this.$bus.$off("primartSchool")
    this.$bus.$off("primarySchoolChildrenTemp")
    this.$bus.$off("middleschoolPoint")
    this.$bus.$off("middleSchoolChildren")
  }
}
</script>

<style lang="scss">
.legend-wrapper {
  position: absolute;
  z-index: 999;
  bottom: 20px;
  padding: 10px;
  right: 420px;
  background-color: rgba($color: $color-theme, $alpha: 0.8);
  transition: right 0.9s;
  .title {
    text-align: center;
    padding: 5px 0;
  }
  .item-list {
    @include scrollBar;
    max-height: 30vh;
    overflow-y: auto;
    font-size: 14px;
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
}
</style>
