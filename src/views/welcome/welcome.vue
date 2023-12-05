<template>
  <div class="welcome flex flex-col w-full h-full items-center justify-center">
    <div class="welcome__main flex flex-col h-full items-center justify-center">
      <RouterView/>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

// 实现路由跳转
const router = useRouter();
const register = () => {
  console.log("register");
  router.push("register");
};
const login = () => {
  console.log("login");
  router.push("login");
};
</script>

<style lang="scss" scoped>
.welcome {
  height: 100%;
  font-weight: normal;
  overflow: hidden;
  background-size: cover;
  /* 国外资源*/
  /*background-image: url("https://fastly.jsdelivr.net/gh/YuChaoM/images/OS/login.32c09ed0.jpg");*/
  /*国内资源*/
  background-image: url("https://community-avatar.oss-cn-guangzhou.aliyuncs.com/header/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202106210911152.jpg");

  &__title {
    font-size: -webkit-xxx-large;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }
}
</style>
