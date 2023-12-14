<template>
  <div class="register">
    <div class="register__title flex flex-col items-center justify-center">
      register
    </div>
    <div class="register__form">
      <el-form ref="registerFormRef" :model="UserForm">
        <el-form-item prop="userAccount" :rules="[
                { validator: checkUserAccountValidator, trigger: 'blur' },
                { required: true, message: '请输入账号名', trigger: 'blur' }]">
          <el-input
              v-model="UserForm.userAccount"
              placeholder="请输入账号名"
          />
        </el-form-item>
        <!--        <el-form-item prop="userAccount" :rules="[-->
        <!--    { required: true, message: '请输入账号名', trigger: 'blur' },-->
        <!--    { validator: checkUserAccountValidator, trigger: 'blur' }-->
        <!--  ]">-->
        <!--          <el-input-->
        <!--              v-model="UserForm.userAccount"-->
        <!--              placeholder="请输入账号名"-->
        <!--          />-->
        <!--        </el-form-item>-->

        <el-form-item>
          <el-input
              v-model="UserForm.userPassword"
              type="password"
              placeholder="请输入密码"
              show-password
          />
        </el-form-item>

        <el-form-item prop="checkPassword" :rules="[
    { validator: checkPasswordValidator, trigger: 'blur' },
    { required: true, message: '请再输入一次密码', trigger: 'blur' }]">
          <el-input
              v-model="UserForm.checkPassword"
              type="password"
              placeholder="请再输入一次密码"
              show-password
          />
        </el-form-item>

        <div class="register__btn flex flex-col items-center justify-center">
          <el-button type="success" @click="handleRegister" class="w-full"
          >注册
          </el-button
          >
        </div>

        <div
            class="register__tips flex flex-col w-full items-center justify-center"
        >
          已有账号？
        </div>

        <div class="register__btn flex flex-col items-center justify-center">
          <el-button type="primary" @click="handleJumpLogin" class="w-full"
          >登录
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


// 自定义验证账号的函数
// const checkUserAccountValidator = (_, value) => {
//   // 检查账号是否包含中文
//   if (/[\u4e00-\u9fa5]/.test(value)) {
//     errorMsg('账号不能包含中文')
//     return Promise.reject(new Error('账号名不能包含中文'));
//   }
//
//   // 检查账号是否包含非正常的特殊符号
//   if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
//     return Promise.reject(new Error('账号名包含非法字符'));
//   }

  // 其他验证规则...

  // 如果通过所有验证规则，返回 Promise.resolve()
//   return Promise.resolve();
// };
const checkUserAccountValidator = (_, value) => {

  // 检查密码是否包含中文
  if (/[\u4e00-\u9fa5]/.test(value)) {
    errorMsg('账号不能包含中文')
    return Promise.reject(new Error('账号不能包含中文'));
  }

  // 检查密码是否包含非正常的特殊符号
  if (!/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/g.test(value)) {
    errorMsg('账号不能包含非法字符')
    return Promise.reject(new Error('账号不能包含非法字符'));
  }

  // 其他验证规则...

  // 如果通过所有验证规则，返回 Promise.resolve()
  return Promise.resolve();
};

// 自定义验证密码确认的函数
const checkPasswordValidator = (_, value) => {
  // 检查密码长度是否小于6位
  if (value.length < 6) {
    errorMsg('密码长度不能小于6位')
    return Promise.reject(new Error('密码长度不能小于6位'));
  }

  // 检查密码是否包含中文
  if (/[\u4e00-\u9fa5]/.test(value)) {
    errorMsg('密码不能包含中文')
    return Promise.reject(new Error('密码不能包含中文'));
  }

  // 检查密码是否包含非正常的特殊符号
  if (!/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/g.test(value)) {
    errorMsg('密码包含非法字符')
    return Promise.reject(new Error('密码包含非法字符'));
  }

  // 其他验证规则...

  // 如果通过所有验证规则，返回 Promise.resolve()
  return Promise.resolve();
};
// 修改handleRegister函数以仅在表单验证通过时发送请求
const handleRegister = () => {
  // 执行表单验证
  registerFormRef.value.validate().then(() => {
    const {checkPassword, ...userData} = UserForm; // 解构UserForm并排除checkPassword
    service
        .post("/api/user/register", UserForm)
        .then(async function (response) {
          const res = response.data;

          console.log(res);
          // 根据后台返回的数据执行其他操作
          if (res.code === 0) {
            // console.log("注册成功")
            // console.log(res.message)
            // 成功，执行跳转逻辑
            router.push('/login');
          } else {
            // 失败，可以处理错误信息等
            console.error('register failed:', res.message);
            errorMsg(res.message)
          }
        })
        .catch(function (error) {
          console.error('Error in login request:', error);
          errorMsg(error)
        });
  }).catch(() => {
    // 表单验证失败，不执行请求
  });
};

const successMsg = (msg) => {
  ElMessage({
    message: msg,
    type: 'success',
  })
}
const warningMsg = (msg) => {
  ElMessage({
    message: msg,
    type: 'warning',
  })
}
const errorMsg = (msg) => {
  ElMessage.error(msg)
}
</script>

<style lang="scss" scoped>
.register {
  min-width: 280px;
  background-color: rgba(255, 255, 255, 0.8); /* 白色透明背景 */
  border-radius: 10px; /* 圆角半径，根据需要调整 */
  padding: 20px; /* 可根据需要调整内边距 */

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
