<template>
  <!-- 人员定位属性框-->
  <div id="popup-rydw" class="ol-popup">
    <div class="popup-header">
      <div class="popup-title">详情</div>
      <i id="popup-rydw-closer" class="el-icon-close" />
    </div>
    <div id="popup-rydw-content" class="popup-content">
      <div>
        <span>姓名：张三</span>
        <span>编号：123456</span>
        <span>联系方式：137xxxxxx</span>
      </div>
      <div class="sub-title">轨迹查询</div>
      <div>
        <el-date-picker
          v-model="value"
          :picker-options="pickerOptions"
          align="right"
          end-placeholder="结束日期"
          range-separator="至"
          start-placeholder="开始日期"
          type="datetimerange"
        />
      </div>
      <el-button size="mini" type="primary" @click="submitForm('ruleForm')">显示轨迹</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value: [new Date(2020, 1, 10, 10, 10), new Date(2020, 2, 11, 10, 10)]
    }
  }
}
</script>

<style lang="scss">
#popup-rydw {
  display: none;

}

#popup-rydw.ol-popup {
    width: 450px;
    /* height: 150px; */
    background-color: rgba(1, 51, 78, 0.8);
    position: absolute;
    left: -225px;
    bottom: 22px;
    .popup-header {
      width: 100%;
      height: 41px;
      background: rgba(0, 0, 0, 0.25);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .popup-title {
        color: rgba(41, 181, 232, 1);
        font-size: 20px;
        margin-left: 10px;
        position: relative;
      }
      .el-icon-close {
        width: 17px;
        height: 17px;
        margin-right: 11px;
        cursor: pointer;
      }
    }
    .popup-content {
      padding: 5px 20px 6px 20px;
      .pop-item {
        margin-top: 18px;
        font-size: 16px;
        .pop-key,
        .pop-value {
          display: inline-block;
        }
      }
    }
  }
  .ol-popup::before {
    position: absolute;
    top: 100%;
    left: calc(50% - 10px);
    border-top: 20px solid transparent;
    content: ' ';
    width: 0px;
    height: 0px;
    border-right: 10px solid transparent;
    border-top: 10px solid rgba(1, 51, 78, 0.8);
    border-left: 10px solid transparent;
  }
</style>
