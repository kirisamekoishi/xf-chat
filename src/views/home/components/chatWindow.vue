<!-- 聊天界面 -->
<template>
  <!-- 整个界面 -->
  <div class="chat-window flex flex-col h-full w-full">
    <!-- 包裹住全部消息框的div -->
    <ul
      v-infinite-scroll="loadMore"
      class="chat-window__container flex flex-col flex-1 items-center overflow-auto"
    >
      <el-scrollbar>
        <!-- 被遍历出来的每一条数据的div -->
        <li
          class="chat-window__item overflow-hidden"
          v-for="message in messageList"
          :key="message.id"
        >
          <!-- 包裹住头像与消息框的div -->
          <div class="chat-box text-base">
            <!-- 头像div -->
            <div
              class="chat-box__tou flex-shrink-0 flex flex-col relative items-end"
            ></div>
            <!-- 消息框 -->
            <div class="chat-box__sub-box">
              <!-- 昵称 -->
              <div
                v-if="message.userId !== 0 && message.userId !== undefined"
                class="chat-box__name"
              >
                YOU
              </div>
              <div v-else class="chat-box__name">ChatGPT</div>
              <!-- 消息内容 -->
              <div class="chat-box__content">
                {{ message.content }}
              </div>
            </div>
          </div>
        </li>
      </el-scrollbar>
    </ul>

    <!-- 提交表单 -->
    <div class="chat-window__form">
      <el-form>
        <div class="flex flex-1 flex-col chat-form">
          <el-form-item>
            <div class="flex flex-1 w-full items-center">
              <el-input
                v-model="newMessage"
                type="textarea"
                class="form__input"
              ></el-input>

              <div style="padding: 0.875rem">
                <el-button
                  type="primary"
                  size="large"
                  :circle="true"
                  @click="sendMessage"
                  >send</el-button
                >
              </div>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useChatStore } from "@/stores/chat.js";

const route = useRoute();
const chatStore = useChatStore();

const messageList = ref([]);
//分页参数,当前页码
const pageNum = ref(0);
//分页显示条数
const pageSize = ref(10);
// 用户输入框
const newMessage = ref("");

// 接收 sessionList 传递过来的 id
const sessionId = route.query.id;
console.log("sessionId", sessionId);
// 监听路由参数回显表格数据
// watch(
//   () => route.query.id,
//   (newVal) => {
//     formState.UNION_ID = newVal || ''
//   },
//   {
//     immediate: true
//   }
// )
// 使用pinia 发送消息
const sendMessage = async () => {
  if (await chatStore.sendMessage(sessionId, newMessage.value)) {
  }
};

// 接收参数，加载更多
const loadMore = async () => {
  pageNum.value++;

  let resList = await chatStore.fetchSessionMessagesList(
    sessionId,
    pageNum.value,
    pageSize.value
  );

  messageList.value = messageList.value.concat(resList);
};
</script>

<style lang="scss" scoped>
.chat-window {
  &__container {
    max-height: calc(100% - 115px);
    margin: 20px 40px;
    padding: 0%;
  }
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
    background-color: #ececec;
  }

  &__form {
  }
}
.chat-form {
  &__input {
    font-size: 20px;
  }
  :deep(.el-textarea__inner) {
    font-size: 20px;
    line-height: 1.5rem;
  }
}

.chat-box {
}
</style>
