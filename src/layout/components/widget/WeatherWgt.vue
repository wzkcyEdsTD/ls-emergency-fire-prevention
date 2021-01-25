<template>
  <div class="weather-container">
    <div class="climate">
      <img :src="require(`@/${weatherAvatar}`)">
    </div>
    <div class="temperature">
      <span>{{ weatherInfo ? weatherInfo.temperature : 0 }}</span>
      <span>℃</span>
    </div>
  </div>
</template>
<script>
import jsonp from 'jsonp'
import { getCurWeatherUrlByCity } from '@/assets/js/weather'
export default {
  name: 'WeatherWgt',
  data() {
    return {
      weatherInfo: null,
      weatherAvatar: 'assets/images/nav/weather/0@1x.png'
    }
  },
  created() {
    this.getWeatherInfo()
  },
  methods: {
    getWeatherInfo() {
      const _this = this
      jsonp(getCurWeatherUrlByCity('瑞安'), (err, res) => {
        if (res) {
          _this.weatherInfo = res.results[0].now
          _this.handleWeatherInfo()
        }
        if (err) {
          console.log(err)
        }
      })
    },
    handleWeatherInfo() {
      const url = 'assets/images/nav/weather/' + this.weatherInfo.code + '@1x.png'
      this.weatherAvatar = url
    }
  }

}
</script>
<style lang="scss" scoped>
.weather-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
  height: 100%;
}
.temperature {
  color: #f5f5f5;
  font: {
    size: 20px;
    family: PingFang SC;
    weight: bold
  };

  span:nth-child(2) {
    font-size: 14px;
  }
}
.climate{
  img {
    width: 20px;
    height: 20px;
  }
}
</style>
