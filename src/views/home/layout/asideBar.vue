<template>
  <div class="aside-bar h-full flex flex-col flex-1">
    <div class="aside-bar__new-chat">
      <newChat />
    </div>
    <div class="aside-bar__session-list flex">
      <sessionList />
    </div>
    <div class="aside-bar__user-account">
      <userAccount />
    </div>
  </div>
</template>

<script setup>
import newChat from "./newChat.vue";
import sessionList from "./sessionList.vue";
import userAccount from "./userAccount.vue";
</script>

<style lang="scss" scoped>
.aside-bar {
  &__session-list {
    height: calc(100% - 115px);
  }
}
</style>
