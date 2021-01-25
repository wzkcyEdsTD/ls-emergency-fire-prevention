import CryptoJS from 'crypto-js'

var UID = "PBjYRZMvYQFSHpkOG"; 
var KEY = "SGF2tXgjTS4I9mtLc"; 

export const getCurWeatherUrlByCity = cityName => {
   // 获取当前时间戳
  var ts = Math.floor((new Date()).getTime() / 1000);
  // 构造验证参数字符串
  var str = "ts=" + ts + "&uid=" + UID;

  // 使用 HMAC-SHA1 方式，以 API 密钥（key）对上一步生成的参数字符串（raw）进行加密
  // 并将加密结果用 base64 编码，并做一个 urlencode，得到签名 sig
  var sig = CryptoJS.HmacSHA1(str, KEY).toString(CryptoJS.enc.Base64);
  sig = encodeURIComponent(sig);
  str = str + "&sig=" + sig;

  // 构造最终请求的 url
  var url = 'https://api.seniverse.com/v3/weather/now.json?location=' + cityName + "&" + str ;
  return url;
}


//'https://api.seniverse.com/v3/weather/now.json?key=SGF2tXgjTS4I9mtLc&language=zh-Hans&unit=c&location='+cityName

export const getUrl = (API) => {
  var LOCATION = "wenzhou"; 
  
   // 获取当前时间戳
  var ts = Math.floor((new Date()).getTime() / 1000);
  // 构造验证参数字符串
  var str = "ts=" + ts + "&uid=" + UID;

  // 使用 HMAC-SHA1 方式，以 API 密钥（key）对上一步生成的参数字符串（raw）进行加密
  // 并将加密结果用 base64 编码，并做一个 urlencode，得到签名 sig
  var sig = CryptoJS.HmacSHA1(str, KEY).toString(CryptoJS.enc.Base64);
  sig = encodeURIComponent(sig);
  str = str + "&sig=" + sig;

  // 构造最终请求的 url
  var url = API + "?location=" + LOCATION + "&" + str ;
  return url;
}