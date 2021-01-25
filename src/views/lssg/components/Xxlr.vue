<template>
  <div>
    <!-- 信息录入 -->
    <div id="popup-xxlr" class="ol-popup">
      <div class="popup-header">
        <div class="popup-title">信息录入</div>
        <i id="popup-xxlr-closer" class="el-icon-close" />
      </div>
      <div id="popup-xxlr-content" class="popup-content">
        <el-form ref="form" :model="formData" label-position="left" label-width="80px">
          <el-form-item label="事故编号" prop="event_code">
            <el-input v-model="formData.event_code" size="mini" />
          </el-form-item>
          <el-form-item label="事故类型" prop="event_type">
            <el-input v-model="formData.event_type" size="mini" />
          </el-form-item>
          <el-form-item label="事故等级" prop="level">
            <el-input v-model="formData.level" size="mini" />
          </el-form-item>
          <el-form-item label="受灾面积" prop="damage_area">
            <el-input v-model="formData.damage_area" size="mini" />
          </el-form-item>
          <el-form-item label="起火时间" prop="start_date">
            <el-input v-model="formData.start_date" size="mini" />
          </el-form-item>
          <el-form-item label="灭火时间" prop="end_date">
            <el-input v-model="formData.end_date" size="mini" />
          </el-form-item>
          <el-form-item label="死亡人数" prop="num_dead">
            <el-input v-model="formData.num_dead" size="mini" />
          </el-form-item>
          <el-form-item label="受伤人数" prop="num_injured">
            <el-input v-model="formData.num_injured" size="mini" />
          </el-form-item>
          <el-form-item label="肇事者" prop="perpetrator">
            <el-input v-model="formData.perpetrator" size="mini" />
          </el-form-item>
          <el-form-item label="备 注" prop="remark">
            <el-input v-model="formData.remark" size="mini" />
          </el-form-item>
        </el-form>
        <el-button type="primary" size="mini" @click="submitForm()">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Overlay from 'ol/Overlay'
import { createEvent } from '@/api/lssg'

export default {
  data() {
    return {
      overlay: null,
      formData: {
        event_type: '',
        event_code: '',
        level: '',
        damage_area: '',
        start_date: '',
        end_date: '',
        num_injured: '',
        num_dead: '',
        perpetrator: '',
        remark: ''
      }
    }
  },
  computed: {
    lssgActiveType() {
      return this.$store.getters.lssgActiveType
    },
    drawGeojson() {
      return this.$store.getters.drawGeojson
    },
    drawLayer() {
      return this.$store.getters.drawLayer
    }
  },
  watch: {
    // lssgActiveType: {
    //   handler(val) {
    //     if (val === 'xxlr') {
    //       this.$map.getMap().on('click', this.showPopup)
    //     } else {
    //       this.$map.getMap().un('click', this.showPopup)
    //     }
    //   },
    //   immediate: true
    // }
  },
  beforeDestroy() {
    this.overlay.setPosition(undefined)
    this.$map.getMap().un('click', this.showPopup)
  },
  mounted() {
    this.initPopup()
  },
  methods: {
    submitForm() {
      createEvent({
        ...this.formData,
        geo_info: JSON.stringify(this.drawGeojson)
      }).then(res => {
        if (res.data.Msg === '保存成功') {
          this.$message.success('历史事故录入成功！')
          this.overlay.setPosition(undefined)
          this.$refs['form'].resetFields()
          this.drawLayer.setVisible(false)
          this.drawLayer.getSource().clear()
          this.$store.dispatch('map/changeDrawGeojson', null)
          this.$store.dispatch('map/changeDrawLayer', null)
          this.$store.dispatch('lssg/getLssgLayer')
        } else {
          this.$message.error('历史事故录入失败！')
        }
      })
    },
    initPopup() {
      document.getElementById('popup-xxlr').style.display = 'block'
      this.overlay = new Overlay({
        element: document.getElementById('popup-xxlr'),
        stopEvent: false
      })
      this.$map.getMap().addOverlay(this.overlay)

      const closer = document.getElementById('popup-xxlr-closer')
      // 点击要素关闭popup
      closer.onclick = () => {
        this.overlay.setPosition(undefined)
        closer.blur()
        return false
      }
    },
    showPopup(evt) {
      const feature = this.$map
        .getMap()
        .forEachFeatureAtPixel(evt.pixel, function(feature) {
          return feature
        })
      if (!feature) return
      if (feature.get('type') !== 'draw-feature') return
      // 显示属性框
      const coordinate = evt.coordinate
      this.overlay.setPosition(coordinate)
    }
  }
}
</script>

<style lang="scss">
#popup-xxlr{
  display: none;

  .el-form-item{
    margin-bottom: 0;
    .el-form-item__label{
      color: $color-text-normal;
    }
  }
}
</style>
