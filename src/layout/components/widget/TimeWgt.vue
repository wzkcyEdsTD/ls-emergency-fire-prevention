<template>
  <div class="time-container">
    <div class="time">
      {{ currentTime }}
    </div>
    <div class="date">
      {{ currentDate }}
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  name: 'TimeWgt',
  data() {
    return {
      currentDate: '',
      currentTime: '',
      timeInterval: null
    }
  },
  created() {
    this.initDate()
  },
  methods: {
    initDate() {
      const current = moment()
      this.currentDate = current.format('YYYY/MM/DD')
      this.updateTime()
    },
    updateTime() {
      const _this = this
      this.timeInterval = setInterval(function() {
        _this.currentTime = moment().format('HH:mm:ss')
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.time-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 3;
  height: 100%;
  text-align: right;
  padding: 0 20px 0 0;
  font: {
    size: 20px;
    family: PingFang SC;
    weight: bold
  };
}
.time {
  color: #0ACCE9;
}
.date {
  color: #F5F5F5;
  font-size: 10px;
}
</style>
