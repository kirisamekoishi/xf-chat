<template>
  <div class="welcome flex flex-col w-full h-full items-center justify-center">
    <div class="welcome__main flex flex-col h-full items-center justify-center">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

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
  &__title {
    font-size: -webkit-xxx-large;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }
}
</style>
