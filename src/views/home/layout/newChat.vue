<template>
  <div class="new-chat flex items-center justify-center">
    <el-button
      color="gray"
      size="large"
      class="new-chat__btn w-full"
      @click="dialogVisible = true"
    >
      新建对话
    </el-button>
  </div>

  <!-- 弹出框 -->
  <el-dialog v-model="dialogVisible" title="新建对话">
    <el-form :model="form">
      <el-form-item label="会话标题">
        <el-input
          v-model="form.title"
          autocomplete="off"
          placeholder="请输入您的标题"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useChatStore } from "@/stores/chat.js";

const chatStore = useChatStore();

const form = reactive({
    title: '',
})
const dialogVisible = ref(false)

const closeDialog = () => {
    form.title = ''
}

// 确认事件
const onSubmit = async () => {
  if(await chatStore.addSession(form)) {
    dialogVisible.value = false
  }
}
</script>

<style lang="scss" scoped>
.new-chat {
  margin: 0.875rem;

  &__btn {
    font-size: 1rem;
  }
}
</style>
