<script setup>
import asideBar from "./components/asideBar.vue";
import mainBar from "./components/mainBar.vue";
</script>

<template>
  <div class="home flex flex-1 w-full">
    <el-container class="home__container">

      <div class="home__aside-bar flex h-full">
        <el-aside width="200px"><asideBar /></el-aside>
      </div>

      <div class="home__main-bar flex flex-1 w-full h-full">
        <el-main><mainBar /></el-main>
      </div>

    </el-container>
  </div>
</template>


<style lang="scss" scoped>

.home__main-bar{
  margin: auto;
}

</style>