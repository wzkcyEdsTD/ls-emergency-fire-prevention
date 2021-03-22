<template>
  <div class="login">
    <div class="container">
      <!-- <img class="headbg" src="/libs/img/headbg.png" /> -->
      <div class="main">
        <span class="img_title" v-if="show == 0">系统登录</span>
        <span class="img_title" v-if="show == 1">运维管理</span>
        <div class="form">
          <div>
            <div>
              <i class="icon_user"></i>
              <input
                class="form_text"
                type="text"
                v-model="form.username"
                placeholder="请输入用户名"
              />
            </div>
            <div>
              <i class="icon_password"></i>
              <input
                class="form_text"
                type="password"
                v-model="form.password"
                placeholder="请输入密码"
              />
            </div>
          </div>
          <button
            :disabled="disabled"
            class="button"
            :class="`${disabled ? `disabled` : ``}`"
            @click="goLogin"
          >
            登 录
            <div v-if="disabled" class="loader-03"></div>
          </button>
          <!-- <div class="btn_icon" v-if="show == 0" @click="switchTab">
            <span style>运维管理</span>
            <img src="/libs/img/Rectangle.png" />
          </div>
          <div class="btn_icon" v-if="show == 1" @click="switchTab">
            <span style>返回首页</span>
            <img src="/libs/img/Rectangle.png" />
          </div> -->
        </div>
        <div class="footer">
          <p class="p1">
            <span>
              建议使用IE10以上、
              <a class="href" @click="gohref('https://www.google.cn/chrome/')">谷歌</a>、
              <a class="href" @click="gohref('https://browser.360.cn/')">360的极速模式</a
              >等浏览器获取更好体验
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="footer">
      <p class="p1">
        <span>
          建议使用IE10以上、
          <a class="href" @click="gohref('https://www.google.cn/chrome/')">谷歌</a>、
          <a class="href" @click="gohref('https://browser.360.cn/')">360的极速模式</a
          >等浏览器获取更好体验
        </span>
      </p>
    </div> -->
  </div>
</template>

<script>
/* eslint-disable */
// import { WRT_config } from "@/components/common/Tmap";
import { doLogin } from "@/libs/loginApi";
import Cookies from 'js-cookie';
export default {
  data() {
    return {
      show: 0,
      form: {
        username: "",
        password: "",
      },
      disabled: false,
    };
  },
  created() {
    this.eventRegister();
  },
  methods: {
    eventRegister() {
      document.onkeydown = (e) => {
        if (window.event.keyCode == 13) {
          this.goLogin();
        }
      };
    },
    // 登录、运维切换
    switchTab() {
      this.show = this.show == 0 ? 1 : 0;
      this.form = { usename: "", password: "" };
    },
    // 登录
    async goLogin() {
      let that = this;
      if (this.form.username && this.form.password) {

        try {
          const res = await doLogin(this.form);
          setTimeout(() => {
            window.localStorage.setItem('token',res.token);
            // this.$cookies.set("token",res.token,"6h")

            const setTime = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);//6小时
            // const setTime = new Date(new Date().getTime() + 30 * 1000);//30
            Cookies.set("token", res.token, {
                expires: setTime
            });

            that.doMessage("登陆成功");
            that.$router.push({ path: "/lqfb" })
          }, 500);
        } catch (message) {
          this.doMessage(message, false);
        }
      } else {
        that.doMessage("请填写完整的用户名或密码", false);
      }
    },
    doMessage(message, isSuccess = true) {
      this.$message({
        type: isSuccess ? "success" : "error",
        message,
      });
    },
    // 跳转
    gohref(val) {
      window.open(val);
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("./image/bg.png");
  background-size: 100% 100%;
  .noShow {
    opacity: 0;
  }
  .container {
    width: 100%;
    min-height: 100%;
    height: 100%;
    background-size: 100%;
    position: absolute;
    z-index: 100;
    .disabled {
      background: rgba(0, 142, 255, 0.3);
    }
    .headbg {
      width: 1709px;
      height: 80px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 80px);
    }
    .main {
      background-image: url("./image/框.png");
      background-size: 100% 100%;
      position: absolute;
      z-index: 100;
      width: 805px;
      height: 561px;
      left: 50%;
      top: 20%;
      transform: translate(-50%, 40px);
      .img_title {
        display: block;
        position: relative;
        font-size: 36px;
        font-family: PingFangSC-Medium, PingFang SC;
        letter-spacing: 4px;
        color: #fff;
        left: 50%;
        text-align: center;
        transform: translate(-50%, 85px);
      }
      .imgcode {
        position: relative;
        top: 30px;
        right: 86px;
        float: right;
        cursor: pointer;
      }
      .form {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 120px);
        div {
          div:first-child {
            margin-bottom: 20px;
          }
          div {
            position: relative;
            i {
              position: absolute;
              top: 19px;
              left: 19px;
              background-repeat: no-repeat;
              width: 30px;
              height: 30px;
            }
            .icon_user {
              background-image: url("./image/用户.png");
              background-size: 100% 100%;
            }
            .icon_password {
              background-image: url("./image/密码.png");
              background-size: 100% 100%;
            }
            .form_text {
              width: 301px;
              height: 66px;
              background: rgba(255, 255, 255, 0);
              // background:url('./image/底.png');
              background-size: 100% 100%;
              border-radius: 3px;
              border: 1px solid rgba(255, 255, 255, 1);
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #9e9e9e;
              padding-left: 60px;
              font-size: 20px;
            }


            // input:-webkit-autofill{/*填充样式效果取消*/
            //   background:url('./image/底.png') !important;
            //   -webkit-text-fill-color: #fff !important;
            //   transition: background-color 99999s ease-in-out 0s;
            //   -webkit-transition-delay: 99999s;
            // }
            .form_text:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {  
              -webkit-text-fill-color: #ededed !important;  
              -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;  
              background-color:transparent;
              background-image: none;
              // background:url('./image/底.png');  
              background-size: 100% 100%;
              transition: background-color 50000s ease-in-out 0s;  
            } 

            .form_text::-webkit-input-placeholder {
              color: #fff;
            }
          }
        }
        .button {
          width: 100%;
          height: 66px;
          // background: rgba(0, 142, 255, 1);
          background:url("./image/矩形.png");
          background-size: 100% 100%;
          border-radius: 3px;
          font-size: 25px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #103E29;
          border: none;
          z-index: 800;
          box-shadow: 0 0 17px #4fd5dc inset;
          margin: 20px 0px;
        }
        .button:focus {
          // background: rgba(0, 142, 255, 0.3);
        }
        .btn_icon {
          width: 100%;
          font-size: 18px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
          text-align: center;
          span {
            padding-right: 10px;
          }
          img {
            height: 13px;
          }
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 16%;
    padding: 15px;
    left: 50%;
    transform: translate(-50%, 0px);
    color: #fff;
    z-index: 100;
    width: 100%;
    .p1 {
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: bolder;
      position: absolute;
      // left: 140px;
      // bottom:40px;
      top:50%;
      left:50%;
      -webkit-transform: translate(-50%,-50%);
      -moz-transform: translate(-50%,-50%);
      transform:translate(-50%,-50%);
      white-space: nowrap;
      .href {
        cursor: pointer;
        border-bottom: 1px solid #fff;
      }
    }
  }
}
//加载动画
[class*="loader-"] {
  display: inline-block;
  width: 1em;
  height: 1em;
  color: inherit;
  vertical-align: middle;
  pointer-events: none;
}
.loader-03 {
  border: 0.2em solid currentcolor;
  border-bottom-color: transparent;
  border-radius: 50%;
  -webkit-animation: 1s loader-03 linear infinite;
  animation: 1s loader-03 linear infinite;
  position: relative;
}
@keyframes loader-03 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader-03 {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
