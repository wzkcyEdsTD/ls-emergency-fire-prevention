<template>
  <div class="zztx-wrapper" :style="`width: ${yadqOffsetRight === 0 ? 72.625 : 96.625}rem`">
    <div class="zztx-container">
      <div class="top-pannel">
        <div class="title">{{ yadj }}</div>
        <div class="tab">
          <div
            v-for="(item,index) in boxData"
            :key="index"
            class="item"
            :class="item.type === type ? 'is-active' : ' '"
            @click="type = item.type"
          >
            <svg-icon :icon-class="item.icon" />
            {{ item.title }}
          </div>
        </div>
        <i class="el-icon-close" @click="closeZztx" />
      </div>
      <!-- 应急指挥机构 start -->
      <div v-if="type === 'yjzh'" class="main-pannel">
        <div class="left-tab">
          <div class="tab" :class="isShow ? 'active': ' '" @click="isShow = true">市森林消防指挥部</div>
          <div class="tab" :class="!isShow ? 'active': ' '" @click="isShow = false">乡镇（街道）及有关单位森林消防指挥所</div>
        </div>
        <div class="right-pannel">
          <div v-show="isShow">
            <div class="table-title">
              <div class="item">成员单位</div>
              <div class="item item-3">职责</div>
            </div>
            <div class="table">
              <div v-for="(item,index) in smartPlanUnitVOList" :key="index" class="line scroll">
                <div class="item">{{ item.depName }}</div>
                <div class="item item-3 scroll">{{ item.depDescription }}</div>
              </div>
            </div>
            <div class="yjzh-notice-text">
              <div class="title">职责</div>
              <p>贯彻落实市委、市政府和上级森林消防指挥部关于森林消防工作的指示精神；制定、完善全市森林火灾应急处置的有关预案、规定和制度；及时掌握森林火灾等级变化和火情动态，组织、领导、指挥、协调全市范围内森林火灾的预防和扑救工作；处理其他有关森林火灾预防和扑救的重要工作。             </p>
            </div>
          </div>
          <div v-show="!isShow">
            <el-button v-show="count>0" type="primary" class="btn-send" disabled @click="sendMessage">一键发送({{ count }})</el-button>
            <el-button v-show="count===0" type="primary" class="btn-send" @click="sendMessage">一键发送</el-button>
            <div class="table-title">
              <div class="item">成员单位</div>
              <div class="item">联系人</div>
              <div class="item">所属街道</div>
              <div class="item">联系方式</div>
              <div class="item">职务</div>
            </div>
            <div class="table">
              <el-checkbox-group v-model="checkList">
                <div v-for="(item,index) in smartPlanOranizationVOS" :key="index" class="line">
                  <div class="item">{{ item.groupName }}</div>
                  <div class="item"><el-checkbox :label="item">{{ item.userName }}</el-checkbox></div>
                  <div class="item">{{ item.depart }}</div>
                  <div class="item">{{ item.phone }}</div>
                  <div class="item">{{ item.position }}</div>
                </div>
              </el-checkbox-group>
            </div>
            <div class="yjzh-notice-text">
              <div class="title">乡镇（街道）及有关单位森林消防指挥所</div>
              <p>乡镇（街道）森林消防指挥所由本级政府和有关部门、人民武装部负责人等组成。有关单位森林消防指挥所在单位主要领导组成。             </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 应急指挥机构 end -->
      <!-- 日常办事机构 start -->
      <div v-else-if="type === 'rcbs'" class="main-pannel" style="display:block">
        <div class="rcbs-notice-text">
          <div class="title">市森林消防指挥部办公室</div>
          <p>承担市森林消防指挥部综合协调和日常管理工作。办公室主任由市农业局（林业局）分管副局长兼任。</p>
        </div>
        <div class="rcbs-notice-text">
          <div class="title">职责</div>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;贯彻落实市委、市政府和上级森林消防指挥部关于森林消防工作的指示精神；制定、完善全市森林火灾应急处置的有关预案、规定和制度；及时掌握森林火灾等级变化和火情动态，组织、领导、指挥、协调全市范围内森林火灾的预防和扑救工作；处理其他有关森林火灾预防和扑救的重要工作。</p>
        </div>
      </div>
      <!-- 日常办事机构 end -->
      <!-- 扑火指挥机构start -->
      <div v-else-if="type === 'phzh'" class="main-pannel">
        <div class="phzh-notice-text">
          <div class="title">扑火指挥机构</div>
          <p>森林火灾发生后，应根据扑救工作需要，启动森林火灾应急预案，成立森林火灾前线指挥部，负责现场指挥，科学扑救。前线指挥部由指挥部领导或火灾发生地政府领导组成。             </p>
        </div>
      </div>
      <!-- 扑火指挥机构end -->
      <!-- 专家咨询机构start -->
      <div v-else-if="type === 'zjzx'" class="main-pannel">
        <div class="zjzx-notice-text">
          <div class="title">专家咨询机构</div>
          <p>市农业局（林业局）汇集森林火灾预防和扑灭专家信息，落实应急处置工作的科学决策咨询机制，为扑救行动提供技术咨询和现场指导。</p>
        </div>
      </div>
      <!-- 专家咨询机构end -->
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      type: 'yjzh',
      boxData: [{
        title: '应急指挥机构',
        icon: '应急指挥icon',
        type: 'yjzh'
      }, {
        title: '日常办事机构',
        icon: '日常办事icon',
        type: 'rcbs'
      }, {
        title: '扑火指挥机构',
        icon: '扑火指挥icon',
        type: 'phzh'
      }, {
        title: '专家咨询机构',
        icon: '专家咨询icon',
        type: 'zjzx'
      }],
      smartPlanUnitVOList: [],
      smartPlanOranizationVOS: [],
      isShow: true,
      checkList: [],
      timer: null,
      count: 0
    }
  },
  computed: {
    yadqPannel() {
      return this.$store.getters.yadqPannel
    },
    yadqOffsetRight() {
      return this.$store.getters.yadqOffsetRight
    },
    yadj() {
      return this.$store.getters.yadj
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      axios.get('http://10.36.234.84:9003/plan/smartPlan/listBySpecialType?specialType=%E6%A3%AE%E6%9E%97%E9%98%B2%E7%81%AB&name=%E6%A3%AE%E6%9E%97%E7%81%AB%E7%81%BE&depName=%E7%91%9E%E5%AE%89%E5%B8%82&dictName').then(res => {
        if (res.data.result) {
          this.smartPlanUnitVOList = res.data.result.records[1].smartPlanUnitList
          const smartPlanOranizationVOSList = res.data.result.records[0].smartPlanOrgnizationList
          smartPlanOranizationVOSList.forEach(element => {
            element.uname.forEach(user => {
              user.groupName = element.groupName
              this.smartPlanOranizationVOS.push(user)
            })
          })
        }
      })
    },
    closeZztx() {
      this.$store.dispatch('lqfb/changeyadqPannel', false)
      this.$store.dispatch('lqfb/changeyadqOffsetRight', -30)
    },
    sendMessage() {
      if (!this.timer) {
        this.count = 5
        this.timer = setInterval(() => {
          if (this.count > 0) this.count--
          else {
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .zztx-wrapper {
    // width: 1162px;
    // width: 1546px;
    height: calc(100vh - 90px);
    box-sizing: border-box;
    position: absolute;
    top: 8px;
    left: 315px;
    z-index: 1001;
    transition: width 0.9s;
    .zztx-container {
      .top-pannel {
        width: 100%;
        height: 17.25vh;
        background: url('../../../assets/images/弹框 (1).png') no-repeat;
        background-size: 100% 100%;
        padding-left: 18px;
        padding-right: 50px;
        position: relative;
        .title {
          height: 50px;
          line-height: 50px;
          padding-left: 15px;
          font-size: 18px;
          border-bottom: 1px solid rgb(75, 81, 87);
          margin-bottom: 20px;
        }
        .tab {
          display: flex;
          align-items: center;
          .item {
            width: 200px;
            height: 7.5vh;
            opacity: 0.6;
            border-radius:4px;
            background:linear-gradient(180deg,rgba(41,181,232,1) 0%,rgba(46,141,249,1) 100%);
            box-shadow:0px 3px 6px rgba(44,150,245,0.4);
            margin-left: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 18px;
            line-height: 2.5vh;
            .svg-icon {
              width: 27.73px;
              height: 2.5vh;
              margin-right: 10px;
            }
          }
          .is-active {
            opacity: 1;
          }
        }
        .el-icon-close {
          position: absolute;
          top: 9px;
          right: 8px;
          font-size: 22px;
          cursor: pointer;
          color: rgba(10, 204, 233, 1);
        }
       }
      .main-pannel {
        position: relative;
        display: flex;
        width: 100%;
        height: 72.5vh;
        background-color: rgba(15, 23, 30, 1);
        position: absolute;
        top: 18.6vh;
        right: 0;
        padding: 30px;
        padding-top: 15px;
        .left-tab {
          width: 190px;
          font-size: 16px;
          .tab {
            box-sizing: border-box;
            cursor: pointer;
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            box-sizing: border-box;
            padding:20px 15px 20px 15px;
            margin-bottom: 30px;
            background: url(../../../assets/images/未选中框.png) no-repeat;
            background-size: 100% 100%;
            border-radius: 1px;
            color:rgba(18, 99, 172, 1)
          }
          .active {
            background: url(../../../assets/images/选中框.png) no-repeat;
            background-size: 100% 100%;
            color: #fff
          }
        }
        .right-pannel {
          margin-left: 25px;
          width: 1212px;
          .btn-send {
            float: right;
            width: 100px;
            height: 40px;
            text-align: center;
            font-size: 16px;
            margin-bottom: 20px;
            padding-left: 10px;
            padding-right: 10px;
          }
          .table::-webkit-scrollbar {
          display: none; //Safari and Chrome
          }
          .table-title {
            width: 100%;
            height: 50px;
            background-color: rgba(49, 134, 217, 1);
            display: flex;
            flex-direction: row;
            .item {
              height: 100%;
              border-right:1px #29AEEA solid;
              border-top:1px #29AEEA solid;
              flex: 1;
              font-size: 18px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .item:first-child {
              border-left: 1px #29AEEA solid;
            }
            .item-3 {
              flex-grow:3;
              padding-left: 10px;
              padding-right: 10px;
            }
          }
          .table {
            overflow: scroll;
            border: 1px #29AEEA solid;;
            height: 40.92vh;
            width: 100%;
            background: linear-gradient(to bottom, rgba(11, 72, 141, 1), rgba(7, 36, 61, 1));
          .line {
            width: 100%;
            display: flex;
            height: 4.62vh;
            flex-direction: row;
            color: rgba(143, 200, 252, 1);
            .item {
              flex: 1;
              font-size: 18px;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
              border-right:1px #29AEEA solid;
              border-bottom:1px #29AEEA solid;
              .el-checkbox {
                .el-checkbox__label {
                  color: #8fc8fc;
                }
              }
            }
            .item:last-child {
              border-right: 0;
            }
            .item-3 {
              flex-grow:3;
              padding-left: 10px;
              padding-right: 10px;
              text-align: left;
              justify-content: left;
            }
          }
          .line:last-child .item {
              border-bottom: 0;
          }
          .scroll {
            height: 10.22vh;
          }
        }
          .yjzh-notice-text {
            margin-top: 20px;
            background: url('../../../assets/images/路径 678.png') no-repeat;
            padding: 13px 19px 19px 19px;
            .title {
              font-weight: 500;
              font-size: 22px;
              color: rgba(143, 200, 252, 1);
              margin-bottom: 25px;
            }
            p {
              text-indent:1em;
              line-height: 25px;
              font-size: 18px;
              color: rgba(18, 99, 172, 1);
              background-size: 100% 100%;
            }
          }
        }
        .rcbs-notice-text,.phzh-notice-text,.zjzx-notice-text{
          margin-top: 20px;
          background: url('../../../assets/images/路径 678.png') repeat-x;
          width: 100%;
          padding: 13px 19px 19px 19px;
          .title {
            font-weight: 500;
            font-size: 22px;
            color: rgba(143, 200, 252, 1);
            margin-bottom: 25px;
          }
          p {
            text-indent:1em;
            line-height: 25px;
            font-size: 18px;
            color: rgba(18, 99, 172, 1);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
</style>
