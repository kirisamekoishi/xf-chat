<script setup>
import { RouterView } from "vue-router";
import asideBar from "./layout/asideBar.vue";
</script>

<template>
  <div class="home flex flex-1 w-full h-full">
    <el-container class="home__container">
      <el-aside width="280px" class="home__aside-bar h-full w-full dark" >
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
  overflow: hidden;
  background-color: hsla(160, 100%, 37%, 0.2);
  background-size: cover;

  &__aside-bar {
    padding-bottom: .875rem;
    padding-left: .75rem;
    padding-right: .75rem;
    background-color: black;
    color: white;
  }

  &__main-bar {
    background-color: white;
    color: #000;
  }
}
</style>
