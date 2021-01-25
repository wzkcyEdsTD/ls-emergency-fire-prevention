<template>
  <div class="report-container">
    <form id="report-form">
      <div class="report-header">
        <div class="header-title">
          <h2>重要森林火情报告</h2>
          <div>第<input-wgt :v-type="`num`" />期</div>
        </div>
        <div class="header-time">
          <span><input-wgt />市森林防火指挥部</span>
          <div>
            <select-wgt :list="report.year" />年
            <select-wgt :list="report.month" />月
            <select-wgt :list="report.day" />日
            <select-wgt :list="report.hour" />时
          </div>
        </div>
        <div class="header-close" @click="close" />
        <div class="header-line" />
      </div>
      <div class="report-content">
        <div class="content-title">
          <input-wgt />市
          <input-wgt />县
          森林火灾情况报告(<input-wgt />)
        </div>
        <div class="">
          <div class="para-level1">一、火灾情况</div>
          <div class="para-level2">1、(起火事件、地点)</div>
          <div class="para-level3">
            据<input-wgt />(县、市、区)森防指办公室
            <input-wgt :v-type="`month`" />月<input-wgt :v-type="`day`" />日<input-wgt :v-type="`hour`" />时报告:
            <input-wgt />市<input-wgt />乡<input-wgt />村<input-wgt />山
            <input-wgt :v-type="`month`" />月<input-wgt :v-type="`day`" />日<input-wgt :v-type="`hour`" />时<input-wgt :v-type="`minute`" />分
            <select-wgt :list="report.occur" />森林火灾（经纬度）。
          </div>
          <div class="para-level2">2、(火灾态势、周边情况、伤亡、林相、面积、火因等)</div>
          <div class="para-level3">
            目前火场火势
            <select-wgt :list="report.extent" />，
            <select-wgt :list="report.direction" />线有<input-wgt :v-type="`num`" />条
            <select-wgt :list="report.continue" />火线，长<input-wgt />
            <select-wgt :list="report.measure" />，向
            <select-wgt :list="report.direction" />方向发展，蔓延速度极
            <select-wgt :list="report.speed" />，目前
            <select-wgt :list="report.already" />得到控制。火场周边
            <select-wgt :list="report.has" />重要设施及居民，已紧急采取<input-wgt />（疏散、开设隔离带）等措施处理。火灾共造成<input-wgt />人
            <select-wgt :list="report.hurt" />，过火面积约<input-wgt />公顷，起火原因为<input-wgt />，林相为<input-wgt />林。
          </div>
          <div class="para-level2">3、(火场天气)</div>
          <div class="para-level3">
            火场天气<select-wgt :list="report.weather" />，风力<input-wgt />级，风向<input-wgt />，
            温度<input-wgt />℃-<input-wgt />℃，降雨量<input-wgt />
          </div>
          <div class="para-level1">二、扑救情况（兵力部署、指挥员、扑救方式）</div>
          <div class="para-level3">
            截止
            <select-wgt :list="report.day" />日
            <select-wgt :list="report.hour" />时共投入兵力<input-wgt :v-type="`num`" />人
            (其中武警森部队<input-wgt :v-type="`num`" />人、专业扑火队<input-wgt :v-type="`num`" />人、武警部队<input-wgt :v-type="`num`" />人、驻军<input-wgt :v-type="`num`" />人、群众<input-wgt :v-type="`num`" />人)，
            从<input-wgt />紧急调派增援的兵力<input-wgt :v-type="`num`" />人
            (其中武警森部队<input-wgt :v-type="`num`" />人、专业扑火队<input-wgt :v-type="`num`" />人、武警部队<input-wgt :v-type="`num`" />人、驻军<input-wgt :v-type="`num`" />人、群众<input-wgt :v-type="`num`" />人)，
            预计
            <select-wgt :list="report.day" />日
            <select-wgt :list="report.hour" />时到达火场。火场
            <select-wgt :list="report.direction" />线有兵力<input-wgt :v-type="`num`" />人
            (其中武警森部队<input-wgt :v-type="`num`" />人、专业扑火队<input-wgt :v-type="`num`" />人、武警部队<input-wgt :v-type="`num`" />人、驻军<input-wgt :v-type="`num`" />人、群众<input-wgt :v-type="`num`" />人)，
            目前正在采取
            <select-wgt :list="report.clean" />的方式进行扑打（余火）。火场现有飞机<input-wgt :v-type="`num`" />架（其中直升飞机<input-wgt :v-type="`num`" />架），<input-wgt :v-type="`num`" />架飞机进行
            <select-wgt :list="report.outfire" />灭火，<input-wgt :v-type="`num`" />架
            <select-wgt :list="report.task" />任务。火场前线指挥部设在<input-wgt />县<input-wgt />镇，<input-wgt />局（县）局长（县长）<input-wgt />为前线总指挥，电话为<input-wgt />。
          </div>
          <div class="para-level1">三、扑火前指工作情况（批示、扑救方案、省区工作）</div>
          <div class="para-level3">
            <input-wgt />省领导对火灾扑救高度重视，批示“<input-wgt />”，前指拟定了<input-wgt />的扑救方案。<br>
            省领导<input-wgt />在防火指挥中心坐镇指挥。<input-wgt />为组长的工作组已经于<select-wgt :list="report.day" />日<select-wgt :list="report.hour" />时前往火场协调扑救工作。
          </div>
          <div class="para-level1">四、其它情况（火案查处、支援等）</div>
          <div class="para-level3">
            现已查明火因为<input-wgt />引起，肇事者（<input-wgt />，男，<input-wgt />岁，为<input-wgt />县<input-wgt />镇<input-wgt />村村民）已经被拘留。
            需要国家支援……。
            有新情况再续报。（本次火灾最后一次报告）
          </div>
          <div class="content-note">
            <span>注：</span>
            <ul>
              <li>1、标红部分为森林火灾必报信息</li>
              <li>2、标蓝部分如已确认在报告中体现，如未确认可延迟上报</li>
              <li>3、标绿部分为初报（续报一……）</li>
            </ul>
          </div>
          <div class="content-sign">
            <span>编辑：<input-wgt /></span>
            <span>签批：<input-wgt /></span>
          </div>
        </div>

        <div class="content-title">扑火过程中火情报告规范用语(参考)</div>
        <div class="para-level1">1.火势没有得到控制</div>
        <div class="para-level3">
          火场有明火燃烧，（东、西火线。。。南、北火线。。。），扑火力量只能对部分区段的明火进行扑打，其余正在蔓延，扑火人员没有对火场形成有效控制。
        </div>
        <div class="para-level1">2.火势得到初步控制</div>
        <div class="para-level3">
          火场稳定可控，已有部分火头被扑灭，（东、西线。。。南、北线。。。），明火没有继续蔓延，火场扑火力量有把握在（时间）内对整个火场实现合围。
        </div>
        <div class="para-level1">3.火势得到有效控制</div>
        <div class="para-level3">
          扑火人员已对整个火场形成合围，外线明火已全部扑灭，火场已无蔓延可能，火灾扑救取得决定性胜利。
        </div>
        <div class="para-level1">4.明火全部扑灭</div>
        <div class="para-level3">
          整个火场已无明火燃烧，但火场内部仍有部分烟（气）点，所有扑火人员开始分段、分区清理烟（气）点并看守火场。
        </div>
        <div class="para-level1">5.火场清理完毕</div>
        <div class="para-level3">
          经过<input-wgt />天清理看守，火场已达到无火、无烟、无气的“三无”标准，已无复燃可能，看守人员已全部撤离，火灾彻底扑灭。
        </div>
      </div>
      <div class="report-footer">
        <div class="bar-panel">
          <div v-if="reportType === '报告录入'" class="bar-save" @click="saveReport">保存</div>
          <div v-if="reportType === '报告修改'" class="bar-save" @click="saveReport">修改</div>
          <div class="bar-print" @click="printReport">打印</div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import InputWgt from './InputWidget'
import SelectWgt from './SelectWidget'
import ReportMap from '@/assets/js/ReportMap'
import { Message } from 'element-ui'
import vue from '@/main'

import { saveReport, getReport, updateEvent } from '@/api/lssg'

export default {
  name: 'ReportEntryView',
  components: {
    InputWgt,
    SelectWgt
  },
  props: {
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    geoJson: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      report: ReportMap,
      canSave: true,
      id: null,
      geo: {}
    }
  },
  computed: {
    reportType() {
      return this.$store.getters.reportType
    },
    lssgLayer() {
      return this.$store.getters.lssgLayer
    },
    lssgTempLayer() {
      return this.$store.getters.lssgTempLayer
    }
  },
  watch: {
    id(val) {
      if (val !== null) {
        this.setAllValues(val)
      }
    },
    list: {
      immediate: true,
      handler: function(v) {
        // 监听传入数组的变化
        console.log(v)
        if (!Array.isArray(v) || v.length <= 0) {
          return
        }
        this.handleFormField(v)
      }
    }
  },
  methods: {
    saveReport() {
      if (this.reportType === '报告修改') {
        this.checkReport()
        const values = this.getAllValues()
        values.unshift(this.geo)
        this.canSave = true
        this.checkReport()
        if (this.canSave) {
          updateEvent({ id: this.id, param: values }).then(res => {
            if (res.code = 20000) {
              Message({
                message: '修改成功',
                type: 'success',
                duration: 1000,
                showClose: false
              })
              this.setAllValues(this.id)
            } else {
              Message({
                message: '修改失败',
                type: 'error',
                duration: 1000,
                showClose: false
              })
            }
          })
        } else {
          Message({
            showClose: false,
            message: '报告中存在不合法数据，请检查后在提交',
            type: 'warning',
            duration: 1000
          })
        }
      } else if (this.reportType === '报告录入') {
        if (!this.geoJson) {
          Message({
            showClose: false,
            message: '请先进行事故绘图在提交事故报告！',
            type: 'warning',
            duration: 1000
          })
          return
        }
        this.canSave = true
        this.checkReport()
        if (this.canSave) {
          const values = this.getAllValues()
          values.unshift(this.geoJson)
          saveReport(values).then(res => {
            if (!res.data.event_id) {
              Message({
                showClose: false,
                message: '提交失败',
                type: 'error',
                duration: 1000
              })
            } else {
              Message({
                showClose: false,
                message: '提交成功',
                type: 'success',
                duration: 1000
              })
            }
          })
        } else {
          Message({
            showClose: false,
            message: '报告中存在不合法数据，请检查后在提交',
            type: 'warning',
            duration: 1000
          })
        }
      }
    },
    checkReport() {
      const components = this.$children.filter(element => {
        return element.$options.name === 'InputWidget'
      })
      const that = this
      components.forEach(element => {
        element.$emit('check', () => {
          that.canSave = false
        })
      })
    },
    printReport() {
      const values = this.getAllValues()
      window.printReport(values)
    },
    getAllValues() {
      const form = document.getElementById('report-form')
      const vl = []
      form.elements.forEach(item => {
        if (item.tagName === 'SELECT') {
          vl.push(item.options[item.selectedIndex].text)
          return true
        }
        vl.push(item.value)
      })
      return vl
    },

    setAllValues(id) {
      if (this.reportType === '报告修改') {
        getReport({ id }).then(res => {
          const form = document.getElementById('report-form')
          if (!form) {
            return
          }
          this.geo = res[0]
          for (let i = 0; i < res.length; i++) {
            const item = form.elements[i]
            if (item.tagName === 'SELECT') {
              item.forEach(it => {
                if (it.innerText === res[i + 1]) {
                  it.selected = true
                }
              })
            } else {
              item.value = res[i + 1]
            }
          }
        })
      }
    },
    handleFormField(data) {
      if (Array.isArray(data)) {
        const form = document.getElementById('report-form')
        if (!form) {
          return
        }
        form.elements.forEach((element, index) => {
          if (index < this.list.length) {
            if (element.tagName === 'SELECT') {
              element.options.forEach(item => {
                if (item.value === this.list[index]) {
                  item.selected = true
                }
              })
              return false
            }
            element.value = this.list[index]
          }
        })
      }
    },
    close() {
      if (this.reportType === '报告修改') {
        this.$emit('close')
        this.$store.dispatch('lqfb/changezlOffsetRight', 0)
      } else if (this.reportType === '报告录入') {
        if (this.lssgLayer) {
          this.lssgLayer.setVisible(true)
          vue.$map.goHome()
          // remove lssg temp layer
          if (this.lssgTempLayer) {
            vue.$map.removeLayer(this.lssgTempLayer)
          }
        }
        vue.$map.goHome()
        this.$emit('close')
        this.reset()
        this.$parent.$refs.lssgcx.isDetail = false
      }
    },
    reset() {
      const reportForm = document.getElementById('report-form')
      reportForm.reset()
      this.id = null
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin background($url){
  background: url($url);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
};
@mixin font-common {
  font: {
    size: 16px;
    family: PingFang SC;
    weight: regular
  };
}
.report-container {
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  border-radius: 10px;
  // overflow: hidden;
  @include font-common();
  @include background('~@assets/images/bglr/bglr-bg.png')
}
form{
  width: 100%;
  height: 100%;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.print-page {
  position: absolute;
  top: 50px;
  left: 50px;
}
.report-header {
  position: relative;
  height: 16%;
  text-align: center;
  color: #0acce9;
  border-bottom: 2px solid #0acce9;
  .header-title {
    div {
      color: #f5f5f5;
    }
  }
  .header-time {
    color: #f5f5f5;
  }
  .header-close {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    right: 0;
    cursor: pointer;
    @include background('~@assets/images/bglr/header-close.png')
  }
  .header-time {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.report-content::-webkit-scrollbar {
  display: none;
}
.report-content {
    height: 76%;
    padding-bottom: 60px;
    overflow: auto;
    box-sizing: border-box;
    scrollbar-width: none;
    -ms-overflow-style: none;
    color: #f5f5f5;
    font-weight: regular;
    $content-text-indent:30px;
    .content-title {
      text-align: center;
      margin: 30px 0;
    }
    .content-sign {
      display: flex;
      justify-content: space-between;
      padding: 20px 30px;
    }
    .content-note {
      display: flex;
      flex-direction: row;
      justify-content: left;
      text-indent:  $content-text-indent;
      margin: 20px 0;
    }
    .para-level1 {
      text-indent:  $content-text-indent;
      line-height: 30px;
    }
    .para-level2 {
      text-indent:  $content-text-indent;
      line-height: 30px;
      margin-top: 30px;
    }
    .para-level3 {
      text-indent:  $content-text-indent;
      margin: 20px 0;
      line-height: 40px;
    }
}
.report-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  padding: 0 20px;
  @mixin bar-batn {
    width: 70px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    cursor: default;
    text-align: center;
  }
  .bar-panel {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    .bar-save {
      @include bar-batn();
      color: #fff;
      cursor: pointer;
      @include background('~@assets/images/bglr/bar-save.png')
    }
    .bar-print {
      @include bar-batn();
      color: #000;
      cursor: pointer;
      @include background('~@assets/images/bglr/bar-print.png')
    }
  }
}
</style>
