<!-- 聊天界面 -->
<template>
  <!-- 整个界面 -->
  <div class="chat-window flex flex-col h-full w-full">
    <!-- 包裹住全部消息框的div -->
    <div class="chat-window__container flex flex-col flex-1 items-center">
      <!-- 被遍历出来的每一条数据的div -->
      <div
        class="chat-window__item w-full"
        v-for="message in currentSessionMessages"
        :key="message.id"
      >
        <!-- 包裹住头像与消息框的div -->
        <div class="chat-window__container text-base">
          <!-- 头像div -->
          <div class="flex-shrink-0 flex flex-col relative items-end"></div>
          <!-- 消息框 -->
          <div class="" style="width: calc(100% - 115px);">
            <!-- 昵称 -->
            <div></div>
            <!-- 消息内容 -->
            <div>
              {{ message.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 提交表单 -->
    <div class="chat-window__form">
      <el-form>
        <div class="flex flex-1 flex-col chat-window__div">
          <el-form-item>
            <el-input v-model="newMessage" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sendMessage">send</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// import { useChatStore } from "@/stores/chat.js";

// const chatStore = useChatStore();

// 使用pinia 获取某个用户的某个会话所有信息（分页查询）
// const currentSessionMessages = chatStore.getCurrentSessionMessages;

// 模拟pinia 获取某个用户的某个会话所有信息（分页查询）
// 入参：
// {
//   "conversationId": 7,
//   "pageNum": 1，
//   "pageSize": 10
// }
// 响应：
// {
//     "code": 0,
//     "data": [
//         {
//             "id": 3,
//             "userId": 1,
//             "conversationId": 3,
//             "content": "hello world",
//             "createTime": "2023-11-27 16:43:52"
//         },
//         {
//             "id": 2,
//             "userId": 1,
//             "conversationId": 3,
//             "content": "hello world",
//             "createTime": "2023-11-27 16:43:35"
//         },
//         {
//             "id": 1,
//             "userId": 1,
//             "conversationId": 3,
//             "content": "hello world",
//             "createTime": "2023-11-27 16:43:17"
//         }
//     ],
//     "message": "ok"
// }
const currentSessionMessages = ref([
  {
    id: 3,
    userId: 1,
    conversationId: 3,
    content:
      "你说得对，但是这就是奎桑提，HP 4700，护甲 329，魔抗 201的英雄。有不可阻挡，有护盾，还能过墙。有控制，甚至冷却时间只有1秒，只要15点蓝。转换姿态时甚至可以刷新W的cd，还有真实伤害。然后，护甲和魔抗提升后还能获得技能加速，缩短Q的cd，还缩短释放时间，然后还有攻击力。W就啊啊啊啊啊啊!!!",
    createTime: "2023-11-27 16:43:52",
  },
  {
    id: 2,
    userId: 1,
    conversationId: 3,
    content: "hello",
    createTime: "2023-11-27 16:43:35",
  },
  {
    id: 1,
    userId: 1,
    conversationId: 3,
    content: "hello?",
    createTime: "2023-11-27 16:43:17",
  },
]);

// 用户输入框
const newMessage = ref("");

// 使用pinia 发送消息
// const sendMessage = () => {
//   chatStore.sendMessage(chatStore.currentSession.id, newMessage);
// };

// 模拟pinia 发送消息
const sendMessage = () => {
  console.log(newMessage);
};
</script>

<style lang="scss" scoped>
.chat-window {
  &__box {
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding-bottom: 2.25rem;
  }

  &__item {
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  &__form {
  }
}
</style>
