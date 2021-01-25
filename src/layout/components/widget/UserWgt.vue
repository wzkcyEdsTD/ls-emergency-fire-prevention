<template>
  <div class="user-container">
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <i class="el-icon-user-solid" size="30" style="color:#f5f5f5" />
        <span class="avatar-title">{{ name }}</span>
        <i class="el-icon-caret-bottom" style="color:#f5f5f5" />
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link to="/">
          <el-dropdown-item>切换账号</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided @click.native="logout">
          <span style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserWgt',
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.user-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 3;
  height: 100%;
  cursor: pointer;
}
.avatar-wrapper {
  i:nth-child(1){
    font-size: 20px;
  }
}
.avatar-title {
  font: {
    size: 16px;
    family: PingFang SC;
    weight: bold
  };
  color: #0ACCE9;
}
</style>
