<template>
  <div class="register">
    <div class="register__title flex flex-col items-center justify-center">
      register
    </div>
    <div class="register__form">
      <el-form ref="registerFormRef" :model="UserForm">
        <el-form-item>
          <el-input
            v-model="UserForm.userAccount"
            placeholder="Please input account"
          />
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="UserForm.userPassword"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="UserForm.userPassword"
            type="password"
            placeholder="请再输入一次密码"
            show-password
          />
        </el-form-item>

        <div class="register__btn flex flex-col items-center justify-center">
          <el-button type="success" @click="handleRegister" class="w-full"
            >注册</el-button
          >
        </div>

        <div
          class="register__tips flex flex-col w-full items-center justify-center"
        >
          已有账号？
        </div>

        <div class="register__btn flex flex-col items-center justify-center">
          <el-button type="primary" @click="handleJumpLogin" class="w-full"
            >登录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import service from "@/utils/request.js";

// 实现路由跳转
const router = useRouter();


// 注册表单
const UserForm = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
});

// 注册表单实例
const registerFormRef = ref(null);

// 跳转到登陆页面
const handleJumpLogin = () => {
  console.log("login");
  router.push("login");
};

// 请求注册
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

<style lang="scss" scoped>
.register {
  background-color: antiquewhite;
  padding: 32px;

  &__title {
    font-size: -webkit-xxx-large;
    font-weight: 600;
    color: #333;
    line-height: 100%;
    padding: 0 20px 20px;
  }
  &__tips {
    line-height: 100%;
    padding: 10px 0;
  }
}
</style>
