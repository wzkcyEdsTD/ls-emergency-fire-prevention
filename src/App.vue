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
import html2canvas from 'html2canvas';
import canvg from 'canvg';
export default {
  name: 'App',
  components: {
    MHeader,
  },
  data() {
    return {
      printShow:false,
    }},
  mounted(){

  },
  methods:{

  }


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
