<template>
  <div v-show="!isAddFeatures" class="zllb-tabs">
    <div
      v-for="(item, index) in checkedLeafNodes"
      v-show="item.isZLZY === true"
      :key="index"
      class="tab"
      :class="{active: activeTab === item.label}"
      @click="handleTab(item.label)"
    >
      <div class="el-icon-close close" @click.stop="close(item.id)" />
      {{ item.label }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'ZllbTab', // 总览列表tabs
  computed: {
    checkedLeafNodes() {
      return this.$store.getters.checkedLeafNodes
    },
    activeTab() {
      return this.$store.getters.zlActiveTab
    },
    isAddFeatures() {
      return this.$store.getters.isAddFeatures
    }
  },
  mounted() {

  },
  methods: {
    handleTab(tabName) {
      if (this.activeTab === tabName) {
        this.$store.dispatch('lqfb/changezlActiveTab', null)
        return
      }
      this.$store.dispatch('lqfb/changezlActiveTab', tabName)
    },
    close(index) {
      const nodes = this.checkedLeafNodes.filter(v => v.id !== index)
      this.$store.dispatch('siderbar/changeCheckedLeafNodes', nodes)
      if (!this.activeTab) return
      nodes.filter(v => v.isZLZY).length > 0
        ? this.$store.dispatch('lqfb/changezlActiveTab', nodes[0].label)
        : this.$store.dispatch('lqfb/changezlActiveTab', null)
    }
  }
}
</script>
<style lang="scss">
  .zllb-tabs {
    position: absolute;
    bottom: 20px;
    left: 570px;
    width: 750px;
    display: flex;
    flex-wrap: wrap-reverse;
    .tab {
      margin-right: 8px;
      width: 122px;
      height: 73px;
      position: relative;
      color:rgba(7, 231, 247, 1);
      margin-top: -18px;
      font-size: 14px;
      display: flex;
      padding-top: 22px;
      padding-left: 5px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: url(../../../assets/images/总览tab框.png) no-repeat;
      background-size: 100%;
      /* white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; */
      .close {
        width: 18px;height: 18px;
        border-radius: 9px;
        background-color: red;
        position: absolute;
        right: 0;
        top: 20px;
        color: #fff;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 900;
      }
    }
    .active {
      background: url('../../../assets/images/总览tab框(激活).png') no-repeat;
      background-size: 100%;
      color:rgba(18, 253, 148, 1)
    }
  }
</style>
