<template>
  <div id="app">
    <m-header></m-header>
    <div id="content" class="content">
      <router-view />
    </div>
    
  </div>
</template>

<script>
import MHeader from "@/components/m-header/m-header";
export default {
  name: 'App',
  components: {
    MHeader,
  },
}
</script>

<style>

#app {
  width: 100%;
  height: 100%;
}
#app > .content {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  > * {
    width: 100%;
    height: 100%;
  }
}
</style>
