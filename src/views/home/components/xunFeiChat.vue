<!-- 基础界面 -->
<template>
  <div class="xunfei-chat flex flex-col h-full items-center justify-center">
    <div
      class="xunfei-chat__title flex flex-col h-full items-center justify-center"
    >
      How can I help you today?
    </div>
    <div class="xunfei-chat__form">
      <el-form>
        <div class="flex flex-1 flex-col el-form__div">
          <el-form-item>
            <el-input v-model="newMessage" type="textarea" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="sendMessage">Create</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { useChatStore } from "@/stores/chat";

const chatStore = useChatStore();

const newTitle = "";
const newMessage = "";
const sendMessage = () => {
  chatStore.sendMessage(chatStore.currentSession.id, newMessage);
};
</script>

<style lang="scss" scoped>
.el-form__div {
  width: 780px;
  margin: auto;
}

.xunfei-chat {
  &__title {
    font-size: -webkit-xxx-large;
    font-weight: 600;
    color: #333;
    margin: auto;
  }
}
</style>
