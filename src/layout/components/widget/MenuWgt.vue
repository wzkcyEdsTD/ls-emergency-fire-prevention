<template>
  <div class="menu-group">
    <div v-for="(v,i) in navList" :key="i" class="menu-item">
      <div class="menu-wrapper normal" :class="path.indexOf(v.link) > -1 ? `active` : `normal`" @click="routerLink($event,v.link)">
        <svg-icon :icon-class="v.icon" />
        <span>{{ v.text }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MenuWgt',
  computed: {
    ...mapGetters(['navList'])
  },
  data() {
    return {
      path: this.$route.path
    }
  },
  methods: {
    routerLink(e, to) {
      this.changeMenuStyle(e.currentTarget)
      this.$router.push(to)
    },
    changeMenuStyle(dom) {
      if (dom.className.indexOf('active') > -1) {
        return
      }
      const items = document.getElementsByClassName('menu-wrapper')
      items.forEach(item => {
        item.classList.add('normal')
        if (item.className.indexOf('active') > -1) {
          item.classList.remove('active')
        }
      })
      dom.classList.add('active')
      dom.classList.remove('normal')
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-group {
  height: 60px;
  padding: 14px 0 0 10px;
}
.menu-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  >span{
    margin-left: 5px;
  }
}
.menu-item {
  display: inline-block;
  width: 220px;
  height: 100%;
  span {
    font-size: 14px;
  }
  cursor: pointer;
  &:nth-child(2) {
    margin-left: -20px;
  }
}
.normal {
  background: url('~@/assets/images/nav/menu-normal.png') no-repeat center;
  background-size: 100% 100%;
  color: #2F91BC;
}
.active {
  background: url('~@/assets/images/nav/menu-active.png') no-repeat center;
  background-size: 100% 100%;
  color: #FFF;
}
</style>
