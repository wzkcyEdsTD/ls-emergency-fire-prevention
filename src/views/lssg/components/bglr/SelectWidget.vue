<template>
  <div class="select-container">
    <select class="select-panel">
      <option v-for="(item, index) in list" :key="index" :value="item">{{ item }}</option>
    </select>
    <!-- <span class="select-indicator" /> -->
  </div>
</template>
<script>
export default {
  name: 'SelectWidget',
  props: {
    list: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>
<style scoped>
.select-container {
  position: relative;
  display: inline-block;
  min-width: 70px;
  height: 26px;
  line-height: 26px;
  text-indent: 0;
  cursor: pointer;
  background: url('~@assets/images/bglr/select-bg.png') no-repeat center;
  background-size: 100% 100%;
}
option {
  border: 0;
  color: #f5f5f5;
  background-color: #073251;
}
select {
  width: 100%;
  height: 26px;
  border: 0;
  color: #0acce9;
  appearance:none;
  outline: none;
    /*添加下拉三角图标*/
  background: url('~@assets/images/bglr/select-down-type1.png') no-repeat right center transparent;
  background-size: auto 100%;
}
</style>
