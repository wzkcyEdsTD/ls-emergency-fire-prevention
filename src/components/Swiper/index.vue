<template>
  <div class="swiper-wrapper">
    <div class="tabs">
      <div class="tab-1" :class="mySwiper.activeIndex===0 ? 'active': ''" @click="mySwiper.slideTo(0)">{{ title1 }}</div>
      <div class="tab-2" :class="mySwiper.activeIndex===1 ? 'active': ''" @click="mySwiper.slideTo(1)">{{ title2 }}</div>
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <slot name="tab-1" />
        </div>
        <div class="swiper-slide">
          <slot name="tab-2" />
        </div>
      </div>
    </div>

    <div class="swiper-page">
      <div id="swiper-button-prev" class="swiper-button-prev" />
      <div id="swiper-pagination1" class="swiper-pagination1" />
      <div id="swiper-button-next" class="swiper-button-next" />
    </div>
  </div>
</template>
<script>
import 'swiper/css/swiper.css'
import Swiper from 'swiper'
export default {
  props: {
    title1: {
      type: String,
      default: '乡镇区域'
    },
    title2: {
      type: String,
      default: '林区数量'
    }
  },
  data() {
    return {
      mySwiper: {}
    }
  },
  mounted() {
    this.initSwiper()
  },
  methods: {
    initSwiper() {
      const mySwiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination1',
          clickable: true,
          // 自定义分页器，必须的type类型
          type: 'custom',
          clickableClass: 'swiper-pagination-customs',
          renderCustom: function(swiper, current, total) {
            var paginationHtml = ``
            for (var i = 1; i <= total; i++) {
              // 判断是不是激活焦点，是的话添加active类，不是就只添加基本样式类
              if (i === (current)) {
                paginationHtml += `<div class="swiper-pagination-customs swiper-pagination-customs-active">${i}</div>`
              } else {
                paginationHtml += `<div class="swiper-pagination-customs">${i}</div>`
              }
            }
            return paginationHtml
          }
        },
        navigation: {
          nextEl: '#swiper-button-next',
          prevEl: '#swiper-button-prev'
        },
        on: {
          slideChange: function() {
            const lis = document.querySelectorAll('#swiper-pagination1 div')
            for (let i = 0; i < lis.length; i++) {
              lis[i].onclick = function() {
                var index = this.innerHTML
                mySwiper.slideTo(index - 1, 500, false)
              }
            }
          }
        }
      })
      this.mySwiper = mySwiper
      const lis = document.querySelectorAll('#swiper-pagination1 div')
      for (let i = 0; i < lis.length; i++) {
        lis[i].onclick = function() {
          var index = this.innerHTML
          mySwiper.slideTo(index - 1, 500, false)
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .swiper-wrapper {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    .tabs {
        margin-top: 12px;
        width: 100%;
        height: 28px;
      .tab-1,.tab-2 {
          width: 49%;
          text-align: center;
          line-height: 28px;
          float: left;
          background-color: rgb(9, 46, 79);
          color: rgba(9, 140, 168, 1);
          cursor: pointer;
      }
      .active {
          background: url(../../assets/images/蓝色选中框.png) no-repeat;
          background-size: contain;
          color:rgba(10, 204, 233, 1);
      }
    }
    .swiper-container {
        margin-top: 10px;
        width: 100%;
        height: 260px;
        position: relative;
    }
    .swiper-page {
        width: 100%;
        height: 40px;
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .swiper-pagination1 {
        height: 40px;
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 0.725rem;
        margin-bottom: -0.6rem;
    }
    .swiper-pagination-customs {
        width: 23px;
        height: 23px;
        border-radius: 11.5px;
        background-color: rgba(201, 231, 228, 1);
        text-align: center;
        line-height: 23px;
        color: rgba(24, 47, 69, 1);
        margin-right: 10px;
        cursor: pointer;
    }
    .swiper-pagination-customs-active {
        background-color: rgba(10, 204, 233, 1);
        color: #fff;
    }
    .swiper-button-prev {
        width: 100px;
        height: 40px;
        margin-top: 145px;
        background: url('../../assets/images/联合 11.png') no-repeat;
        margin-left: 10px;
    }
    .swiper-button-next {
        margin-right: -20px;
        width: 100px;
        height: 40px;
        margin-top: 145px;
        background: url('../../assets/images/联合 10.png') no-repeat;
    }
    .swiper-button-prev::after,.swiper-button-next::after {
    content: '';
    }
  }
</style>
