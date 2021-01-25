<template>
  <div class="broad-container">
    <span class="broad-speaker" />
    <div ref="wrap" class="wrap">
      <div ref="content" class="content" :class="animationClass" :style="contentStyle" @animationend="onAnimationEnd" @webkitAnimationEnd="onAnimationEnd">
        {{ content }}
      </div>
    </div>
  </div>

</template>
<script>
import html2json from 'html2json'
import jsonp from 'jsonp'
import { getFireInfo } from '@/api/lqfb'
export default {
  name: 'BroadcastWgt',
  data() {
    return {
      content: '',
      delay: 0.5,
      speed: 40,
      wrapWidth: 0,
      firstRound: true,
      duration: 5,
      offsetWidth: 0,
      animationClass: ''

    }
  },
  computed: {
    contentStyle() {
      return {
        paddingLeft: (this.firstRound ? 0 : this.wrapWidth) + 'px',
        animationDelay: (this.firstRound ? this.delay : 0) + 's',
        animationDuration: this.duration + 's'
      }
    }
  },
  watch: {
    content: {
      handler() {
        this.$nextTick(() => {
          const { wrap, content } = this.$refs
          const wrapWidth = wrap.getBoundingClientRect().width
          const offsetWidth = content.getBoundingClientRect().width
          this.wrapWidth = wrapWidth
          this.offsetWidth = offsetWidth
          this.duration = offsetWidth / this.speed
          this.animationClass = 'animate'
        })
      }
    }
  },
  created() {
    this.getForestFireInfo()
    // this.content = '07月17日;森林火险等级:5级;温馨提示:极易引起森林火灾，林区禁止一切野外用火;07月18日;森林火险等级:5级;温馨提示:极易引起森林火灾，林区禁止一切野外用火;'
  },
  methods: {
    // getForestFireInfo() {
    //   const forestFireUrl = process.env.VUE_APP_FOREST_FIRE_URL
    //   jsonp(forestFireUrl, null, function(err, data) {
    //     if (err) {
    //       console.error(err.message)
    //     } else {
    //       console.error('data:',data)
    //       html2json(data)
    //     }
    //   })
    // },
    getForestFireInfo() {
      this.content = ``
      getFireInfo().then(res => {
        if (res && res.data) {
          res.data.forEach(item => {
            this.content += `${item.date.trim()}; ${item.level.trim()}; ${item.comment.trim()}; `
          })
          this.content = this.content.slice(0, -1)
        }
      })
    },
    onAnimationEnd() {
      this.firstRound = false
      this.duration = (this.offsetWidth + this.wrapWidth) / this.speed
      this.animationClass = 'animate-infinite'
    }
  }
}
</script>
<style scoped>
.broad-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 10px 0 0;
}
.broad-speaker {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url('~@/assets/images/nav/broadcast@2x.png') no-repeat center;
  background-size: 100% 100%;
}
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  position: relative;
  padding: 0;
}
.wrap {
  padding: 0 20px;
}
.content {
  margin-left: 10px;
}
.wrap .content {
  height: 60px;
  line-height: 60px;
  position: absolute;
  white-space: nowrap;
}
.animate {
  animation: slide linear;
}
.animate-infinite {
  animation: slide-infinite linear infinite;
}
@keyframes slide {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes slide-infinite {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
