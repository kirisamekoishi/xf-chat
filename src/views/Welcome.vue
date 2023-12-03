<template>
    <div class="flex flex-col h-full items-center justify-center welcome">
        <div>
            <div class="flex flex-col h-full items-center justify-center welcome__title">
                Welcome Back!
                <div class="flex flex-row h-full">
                    <el-row class="mb-4" style="padding: 50px;">
                        <el-button size="large" type="primary" @click="login">Log in</el-button>
                    </el-row>
                    <el-row class="mb-4" style="padding: 50px;">
                        <el-button size="large" type="success" @click="register">Register</el-button>
                    </el-row>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// 实现路由跳转
const router = useRouter()
const register = () => {
    console.log('register');
    router.push('/register')
}
const login = () => {
    console.log('login');
    router.push('/login')
}

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