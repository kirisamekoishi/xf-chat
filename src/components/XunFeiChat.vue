<template>
    <div class="relative z-0 flex h-full w-full overflow-hidden">
        <!-- 可能会用到的左侧栏 -->
        <div>

        </div>
        <!-- 主页面 -->
        <div class="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
            <div class="flex-1 overflow-hidden">
                <div class="relative h-full">
                    <div class="flex h-full flex-col items-center justify-center">
                        <h1>How can I help you today?</h1>
                    </div>
                </div>
            </div>
            <div class="w-full">
                <el-form>
                    <div class="flex flex-1 flex-col el-form__div">
                        <el-form-item>
                            <el-input v-model="usertext" type="textarea" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">Create</el-button>
                            <el-button>Cancel</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'

const usertext = ref("")
const onSubmit = () => {
    console.log(usertext);
    // 等待调用后端接口
}


</script>

<style scoped>
.el-form__div {
    width: 780px;
    margin: auto;
}
</style>