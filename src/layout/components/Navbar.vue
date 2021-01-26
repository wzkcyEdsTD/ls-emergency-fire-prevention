<template>
  <div class="navbar">
    <!-- <div class="left-menu">
      <logo-wgt>

      </logo-wgt>
    </div>
    <div class="right-menu">
      <div class="menu-operate-domain">
        <div class="domain-switch">
          <menu-wgt>

          </menu-wgt>
        </div>
        <div class="domain-broadcast">
          <broadcast-wgt>
 
          </broadcast-wgt>
        </div>
      </div>
      <div class="menu-func-domain">
        <time-wgt>

        </time-wgt>
        <span class="line" />
        <weather-wgt>

        </weather-wgt>
        <span class="line" />
        <user-wgt>

        </user-wgt>
      </div>
    </div> -->
  </div>
</template>

<script>
import LogoWgt from '@/layout/components/widget/LogoWgt'
import BroadcastWgt from '@/layout/components/widget/BroadcastWgt'
import MenuWgt from '@/layout/components/widget/MenuWgt'
import TimeWgt from '@/layout/components/widget/TimeWgt'
import UserWgt from '@/layout/components/widget/UserWgt'
import WeatherWgt from '@/layout/components/widget/WeatherWgt'

import { mapGetters } from 'vuex'

export default {
  components: {
    LogoWgt,
    BroadcastWgt,
    MenuWgt,
    TimeWgt,
    UserWgt,
    WeatherWgt
  },
  computed: {
    ...mapGetters(['avatar', 'name', 'title', 'navList'])
  },
  methods: {
    // async logout() {
    //   await this.$store.dispatch('user/logout')
    //   this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    // }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  color: $color-text-normal;
  background: $color-background-nav;
  background-size: 100% 100%;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.left-menu {
  display: inline-block;
  width: 380px;
  height: 100%;
  background: url("~@/assets/images/nav/menu-left-bg.png") no-repeat center;
  background-size: 100% 100%;
}
.right-menu {
  position: absolute;
  display: inline-flex;
  width: calc(100% - 350px);
  height: 100%;
  top: 0;
  right: 0;
  left: 350px;
  // margin-left: -20px;
  background: url("~@/assets/images/nav/menu-right-bg.png") no-repeat center;
  background-size: 100% 100%;

  .menu-operate-domain {
    display: flex;
    flex: 3;
    .domain-switch {
      flex: 3;
      width: 40%;
    }
    .domain-broadcast {
      flex: 5;
      width: 60%;
    }
  }
  .menu-func-domain {
    display: flex;
    flex: 1;
    height: 100%;
    .line {
      position: relative;
      display: inline-block;
      width: 2px;
      background-color: #f5f5f5;
      height: 30px;
      margin: 15px 0;
    }
  }
}

</style>
