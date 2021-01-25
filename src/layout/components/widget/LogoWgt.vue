<template>
  <div class="logo-container">
    <!-- <span class="logo-title" /> -->
    <!-- <span class="logo-tip" /> -->
    <span class="logo-title">{{ title }}</span>
  </div>
</template>
<script>
export default {
  name: 'LogoWgt',
  computed: {
    title() {
      return require('@/settings').title
    }
  }
}
</script>
<style lang="scss" scoped>
.logo-container{
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  .logo-title {
    display: flex;
    width: 296px;
    height: 100;
    align-items: center;
    margin-bottom: 5px;
    font-size: 20px;
    /* background: url("~@/assets/images/nav/logo-h1@2x.png") no-repeat bottom center; */
    /* background-size: 100% auto; */
  }
  .logo-tip {
    display: inline-block;
    width: 116px;
    height: 10px;
    background: url("~@/assets/images/nav/logo-h2@2x.png") no-repeat center;
    background-size: 100% auto;
  }
}
</style>
