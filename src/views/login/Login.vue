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
            登录
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
      </div>
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
</template>

<script>
/* eslint-disable */
// import { WRT_config } from "@/components/common/Tmap";
// import { doLogin } from "@/api/loginAPI";
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
        if (that.form.username =='admin' && that.form.password =='123456') {
          setTimeout(() => {
            window.sessionStorage.setItem('假装有个cook',"cook");
            that.doMessage("登陆成功");

              that.$router.push({ path: "/lqfb" })


          }, 500);
        }else if(that.form.username !='admin'){
          that.doMessage("该账户不存在",false);
        }else if(that.form.password !='123456'){
          that.doMessage("密码错误",false);
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
  background-image: url("./image/login/nCovbak.jpg");
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
      background-image: url("./image/login/loginarea.png");
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
              width: 23px;
              height: 30px;
            }
            .icon_user {
              background-image: url("./image/login/user.png");
            }
            .icon_password {
              background-image: url("./image/login/password.png");
            }
            .form_text {
              width: 301px;
              height: 66px;
              background: rgba(255, 255, 255, 0);
              border-radius: 3px;
              border: 1px solid rgba(255, 255, 255, 1);
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #9e9e9e;
              padding-left: 60px;
              font-size: 20px;
            }
            .form_text::-webkit-input-placeholder {
              color: #fff;
            }
          }
        }
        .button {
          width: 100%;
          height: 66px;
          background: rgba(0, 142, 255, 1);
          border-radius: 3px;
          font-size: 25px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          border: none;
          z-index: 800;
          box-shadow: 0 0 17px #4fd5dc inset;
          margin: 20px 0px;
        }
        .button:focus {
          background: rgba(0, 142, 255, 0.3);
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
    bottom: 4%;
    padding: 15px;
    left: 50%;
    transform: translate(-50%, 0px);
    color: #fff;
    z-index: 100;
    .p1 {
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: bolder;
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
