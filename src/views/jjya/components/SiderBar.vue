<template>
  <sider-bar>
    <!-- <div class="menu">
      <div v-for="v in data" :key="v.id" :class="type === v.type ? 'menu-item active' : 'menu-item'" @click="changeType(v.type)">
        <svg-icon :icon-class="v.icon" />
        <span>{{ v.label }}</span>
      </div>
    </div> -->

    <el-collapse v-model="activeNames">
      <el-collapse-item
        v-for="v in treeData"
        :key="v.id"
        :name="v.id"
        :class="v.children == null ? 'no-arrow' : ''"
      >
        <template slot="title">
          <div
            style="width:100%;height:100%;display:flex;align-items: center;"
            @click="changeType(v.type, v.label)"
          >
            <svg-icon :icon-class="v.icon" />
            <span>{{ v.label }}</span>
          </div>
        </template>
        <div v-if="v.children">
          <el-tree
            :ref="`tree_${v.id}`"
            :data="v.children"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[]"
            :props="defaultProps"
            @check="(data, checked) => handleCheckChange(data, checked, v.id)"
            @check-change="handleNodeCheckChange"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>
                <i :class="data.icon" />
                {{ node.label }}
              </span>
            </span>
          </el-tree>
        </div>
      </el-collapse-item>
    </el-collapse>
  </sider-bar>
</template>

<script>
import SiderBar from '@/components/SiderBar'

import treeData from './treeData'
export default {
  components: {
    SiderBar
  },
  data() {
    return {
      activeNames: [1],
      treeData,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      type: 'qdcx'
    }
  },
  methods: {
    changeType(type, label) {
      this.type = type
      this.$store.dispatch('jjya/changeActiveMenu', label)
    },

    handleCheckChange(data, checked, id) {
      this.$store.dispatch('map/changeIsAddFeatures', false)
      const nodes = [] // 智能分析的tree选中的叶子节点
      nodes.push(...this.$refs[`tree_4`][0].getCheckedNodes(true, false))
      this.$store.dispatch('siderbar/changeCheckedLeafNodesWithBuffer', nodes)
    },

    handleNodeCheckChange(node, checked, children) {
      // console.log({node, checked, children})

    }
  }
}
</script>
<style lang="scss"></style>
