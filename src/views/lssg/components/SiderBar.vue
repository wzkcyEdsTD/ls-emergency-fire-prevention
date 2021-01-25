<template>
  <sider-bar class="sider-bar">
    <el-collapse v-model="activeNames">
      <el-collapse-item
        v-for="v in treeData"
        :key="v.id"
        :name="v.id"
        :class="[v.children == null ? 'no-arrow' : '']"
        @click.native="handleType(v.label)"
      >
        <template slot="title">
          <span>{{ v.label }}</span>
        </template>
        <div>
          <el-tree
            v-show="v.children != null"
            :data="v.children"
            :show-checkbox="false"
            node-key="id"
            :default-expanded-keys="[]"
            :props="defaultProps"
            @node-click="handleTreeType"
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

export default {
  components: {
    SiderBar
  },
  data() {
    const treeData = [
      {
        id: 1,
        label: '历史事故总览'
      },
      {
        id: 2,
        label: '历史事故查询'
      },
      {
        id: 3,
        label: '事故记录',
        children: [
          {
            label: '事故绘制'
          },
          {
            label: '报告录入'
          }
        ]
      }
    ]
    return {
      activeNames: [1],
      treeData: JSON.parse(JSON.stringify(treeData)),
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      activeType: '历史事故总览'
    }
  },
  computed: {
    zlOffsetRight() {
      return this.$store.getters.zlOffsetRight
    },
    lssgActiveType() {
      return this.$store.getters.lssgActiveType
    },
    reportType() {
      return this.$store.getters.reportType
    }
  },
  methods: {
    handleType(data) {
      if (data === '历史事故总览' || data === '历史事故查询') {
        this.lssgActiveType === data
          ? this.$store.dispatch('lqfb/changezlOffsetRight', this.zlOffsetRight === 0 ? -25 : 0)
          : this.$store.dispatch('lqfb/changezlOffsetRight', 0)
        this.$store.dispatch('lssg/changeLssgType', data)
      }
    },
    handleTreeType(val) {
      if (this.reportType === val.label) this.$store.dispatch('lssg/changeReportType', '')
      else {
        this.$store.dispatch('lssg/changeReportType', val.label)
        // this.$store.dispatch('lqfb/changezlOffsetRight', -25)
      }
    }
  }
}
</script>
<style lang="scss"></style>
