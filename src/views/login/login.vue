<template>
  <div class="login">
    <div class="login__title flex flex-col items-center justify-center">
      Login
    </div>
    <div class="login__form">
      <el-form ref="loginFormRef" :model="UserForm">
        <el-form-item label="账号">
          <el-input v-model="UserForm.userAccount" />
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="UserForm.userPassword" />
        </el-form-item>

        <div class="login__btn flex flex-col items-center justify-center">
          <el-button type="primary" @click="handleLogin" class="w-full"
            >登录</el-button
          >
        </div>

        <div
          class="login__tips flex flex-col w-full items-center justify-center"
        >
          没有账号？
        </div>

        <div class="login__btn flex flex-col items-center justify-center">
          <el-button type="success" @click="handleJumpRegister" class="w-full"
            >注册</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import service from "@/utils/request.js";

// 登录表单
const UserForm = reactive({
  userAccount: "",
  userPassword: "",
});
// 登录表单实例
const loginFormRef = ref(null);

// 登录请求
const handleLogin = () => {
  service
    .post("/api/user/login", UserForm)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// 跳转到注册页面 方法
const handleJumpRegister = () => {

}
</script>

<style lang="scss" scoped>
.login {
  background-color: antiquewhite;
  padding: 32px;

  &__title {
    line-height: 100%;
    padding: 0 20px 20px;
  }
  &__tips {
    line-height: 100%;
    padding: 10px 0;
  }
}
</style>
