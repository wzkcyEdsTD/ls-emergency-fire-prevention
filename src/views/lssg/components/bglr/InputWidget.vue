<template>
  <div class="input-panel" :class="tipStyle.length > 0 ? tipStyle : tip.normal">
    <input v-model="value" type="text" @change="textChange">
  </div>
</template>
<script>
export default {
  name: 'InputWidget',
  props: {
    vType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: '',
      tipStyle: '',
      tip: {
        normal: 'input-normal',
        warn: 'input-warn'
      },
      typeEnum: {
        num: '^[0-9]*$',
        year: '^([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})$',
        month: '^(0?[1-9]|1[0-2])$',
        day: '^((0?[1-9])|((1|2)[0-9])|30|31)$',
        hour: '^(0[0-9]|1[0-9]|2[0-4]|[0-9])$',
        minute: '^(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9]|60)$'
      }
    }
  },
  created() {
    this.createListener()
  },
  methods: {
    createListener() {
      this.$on('check', (callback) => {
        if (this.value.length <= 0 || this.vType.length <= 0) {
          this.initState()
          return
        }
        if (!this.checkValue()) {
          if (typeof callback === 'function') {
            callback()
          }
        }
      })
    },
    textChange() {
      if (this.value.length <= 0 || this.vType.length <= 0) {
        this.initState()
        return
      }
      const isnormal = this.checkValue()
      this.changeState(isnormal)
    },
    initState() {
      this.tipStyle = this.tip.normal
    },
    changeState(isnormal) {
      if (isnormal) {
        this.tipStyle = this.tip.normal
      } else {
        this.tipStyle = this.tip.warn
      }
    },
    checkValue() {
      const keys = Object.keys(this.typeEnum)
      if (keys.indexOf(this.vType) > -1) {
        return this.regCheck(this.value, this.typeEnum[this.vType])
      }
    },
    regCheck(str, regx) {
      const reg = new RegExp(regx)
      return reg.test(str)
    }
  }
}
</script>
<style lang="scss" scoped>
input{
  background:none;
  outline:none;
  border:none;
  color:#f5f5f5;
}
input {
  width: 100%;
  text-align: center;
}
.input-normal {
  border-bottom: 1px solid #f1dddd;
}
.input-warn {
  border-bottom: 1px solid #F56C6C;
}
.input-panel {
  display: inline-block;
  width: 60px;
  height: 20px;
  line-height: 20px;
  text-indent: 0;
  color:#f5f5f5;
}
</style>
