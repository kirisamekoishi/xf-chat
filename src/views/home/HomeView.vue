<script setup>
import { RouterView } from "vue-router";
import asideBar from "./layout/asideBar.vue";
</script>

<template>
  <div class="home flex flex-1 w-full">
    <el-container class="home__container">
      <el-aside width="280px" class="home__aside-bar">
        <asideBar />
      </el-aside>

      <el-main class="home__main-bar">
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100%;
  font-weight: normal;
  overflow: hidden;
  background-color: hsla(160, 100%, 37%, 0.2);
  background-size: cover;

  &__aside-bar {
    background-color: bisque;
  }

  &__main-bar {
    background-color: dimgray;
  }
}
</style>
