<template>
  <div class="login">
    <div class="login__title flex flex-col items-center justify-center">
      Login
    </div>
    <div class="login__form">
      <el-form ref="loginFormRef" :model="UserForm">
        <el-form-item>
          <el-input v-model="UserForm.userAccount"
                    placeholder="账号"/>
        </el-form-item>

        <el-form-item>
          <el-input
              v-model="UserForm.userPassword"
              type="password"
              placeholder="密码"
              show-password
              @keyup.enter="handleLogin"
          />
        </el-form-item>

        <div class="login__btn flex flex-col items-center justify-center">
          <el-button type="primary" @click="handleLogin" class="w-full"
          >登录
          </el-button
          >
        </div>

        <div
            class="login__tips flex flex-col w-full items-center justify-center"
        >
          没有账号？
        </div>

        <div class="login__btn flex flex-col items-center justify-center">
          <el-button type="success" @click="handleJumpRegister" class="w-full"
          >注册
          </el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive} from "vue";
import {useRouter} from "vue-router";
import service from "@/plugins/request.js";

// 实现路由跳转
const router = useRouter();

// 登录表单
const UserForm = reactive({
  userAccount: "yuchaom",
  userPassword: "123456",
});
// 登录表单实例
const loginFormRef = ref(null);

// 登录请求
const handleLogin = () => {
  service
      .post("/api/user/login", UserForm)
      .then((response) => {
        console.log('response', response)
        const res =  response;

        console.log(res);
        // 根据后台返回的数据执行其他操作
        if (res.code === 0) {
          console.log("登陆成功")
          console.log(document.cookie)
          console.log(res.message)
          // 登录成功，执行跳转逻辑
          router.push('/home');
        } else {
          // 登录失败，可以处理错误信息等
          console.error('Login failed:', res.message);
        }
      })
      .catch(function (error) {
        console.error('Error in login request:', error);
      });
};

// 跳转到注册页面 方法
const handleJumpRegister = () => {
  console.log("register");
  router.push("register");
};
</script>

<style lang="scss" scoped>
.login {
  min-width: 280px;
  background-color: rgba(255, 255, 255, 0.8); /* 白色透明背景 */
  border-radius: 10px; /* 圆角半径，根据需要调整 */
  padding: 20px;

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

