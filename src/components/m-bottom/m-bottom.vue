<template>
  <div id="bottom" class="bottom-wrapper">

  </div>
</template>

<script>
import { getDate } from '@/common/js/util'
export default {
  name: "MBottom",
  data() {
    return {

    };
  },
  computed: {
    currentPage: {
      get() {
        // vue中获取当前路由name
        return this.$route.name
      },
      set(val) {}
    }
  },
  mounted() {
  },
  methods: {

  },
};
</script>

<style scoped lang="less">
.bottom-wrapper {
  position: absolute;
  bottom : 0vh;
  z-index: 1999;
  width: 100%;
  height: 8vh;
  background-color: #101518;
  text-align: center;
  // transition: width 1s linear;
}
</style>
