<template>
  <div class="flex flex-col h-full items-center justify-center register">
    <div class="register__header">Welcome</div>
    <div class="register__main">
      this is a main page
      <el-button type="primary" @click="handleRegister">点我注册</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import service from '@/utils/request.js';

const User = reactive({
  account: "",
  password: "",
  checkPassword: "",
});

const requestData = reactive({
  userAccount: "koko",
  userPassword: "123456789",
});

const handleRegister = () => {
  service
    .post("/api/user/register", requestData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
</script>

<style scoped>
.register {
}
</style>
