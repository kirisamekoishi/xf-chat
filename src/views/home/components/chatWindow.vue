<!-- 聊天界面 -->
<template>
  <!-- 整个界面 -->
  <div class="chat-window flex flex-col h-full w-full">
    <!-- 包裹住全部消息框的div -->
    <ul
        v-infinite-scroll="loadMore"
        class="chat-window__container flex flex-col flex-1 items-center overflow-auto"
    >
      <!-- 被遍历出来的每一条数据的div -->
      <el-scrollbar class="w-full">
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
            <div class="chat-box__sub-box flex flex-col">
              
              <!-- 昵称 -->
              <div
                  v-if="message.userId !== 0 && message.userId !== undefined"
                  class="chat-box__name"
              >
                YOU
              </div>
              <div v-else class="chat-box__name">讯飞认知大模型</div>
              <!-- 消息内容 -->
              <div
                  class="chat-box__content flex flex-col"
                  v-html="message.renderedText"
              ></div>
              <el-divider />
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
            <div class="flex flex-1 items-center">
              <el-input
                  v-model="newMessage"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  class="chat-form__input"
                  placeholder="请输入你的消息"
              ></el-input>

              <div style="padding: 0.875rem">
                <el-button
                    type="primary"
                    size="large"
                    :circle="true"
                    @click="sendMessage"
                >send
                </el-button
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
import {ref, onBeforeUnmount, onMounted, onUnmounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useChatStore} from "@/stores/chat.js";
import {processText} from "@/plugins/markdownHelper.js";
import {sendMessageApi} from "../../../common/sessionApi";

onMounted(() => {
  const handleRouteChange = () => {
    // 强制刷新页面
    window.location.reload();
  };
  const router = useRouter()
  router.afterEach(handleRouteChange)

  onUnmounted(() => {
    router.afterEach(null);
  });
})

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
// const sessionId = route.query.id;
// 使用 useRoute 提供的 params 获取路由参数
const sessionId = ref(route.params.sessionId);

console.log("sessionId", sessionId.value);

const isMounted = ref(true);

onBeforeUnmount(() => {
  isMounted.value = false;
});


const sendMessage = async () => {
  if (!isMounted.value) {
    return;
  }
  const userMessage = {
    id: Date.now(), // 或使用适当的唯一标识符
    userId: 1, // 假设 1 表示用户
    content: newMessage.value
  };

  // 将用户输入的文本添加到 messageList
  // messageList.value.push(userMessage);

  let content = newMessage.value;
  // 清空文本框中的消息
  newMessage.value = "";

  // 发送给后端
  const response = await sendMessageApi(sessionId.value, content);
  // const response = await chatStore.sendMessage(sessionId.value, newMessage.value);
  console.log("消息响应", response)

  if (response.code === 0) {
    // 把响应的回答也加进去
    // messageList.value.push({ id: Date.now(), userId: 0, content: response.data });
    // 加不了一点，重新向后端获取所有数据吧
    loadData()
    // 滚动聊天窗口到底部
    scrollToBottom();
  }
};
// 添加滚动到聊天窗口底部的函数
const scrollToBottom = () => {
  const container = document.querySelector('.chat-window__container');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
};
// 接收参数，加载更多
const loadMore = async () => {
  console.log("loadMore")
  if (!isMounted.value) {
    return;
  }

  pageNum.value++;

  let resList = await chatStore.fetchSessionMessagesList(
      sessionId.value,
      pageNum.value,
      pageSize.value
  );

  if (resList && Array.isArray(resList)) {
    let processedData = resList.map((item) => {
      const processedItem = processText(item.content);
      return {...item, ...processedItem};
    });

    messageList.value = messageList.value.concat(processedData);
    console.log("messageList.value", messageList.value);
  } else {
    console.error("Invalid response:", resList);
  }
};
const loadData = async () => {
  console.log("loadData")
  if (!isMounted.value) {
    return;
  }

  let resList = await chatStore.fetchSessionMessagesList(
      sessionId.value,
      1,
      50
  );
  messageList.value = [];
  if (resList && Array.isArray(resList)) {
    let processedData = resList.map((item) => {
      const processedItem = processText(item.content);
      return {...item, ...processedItem};
    });

    messageList.value = messageList.value.concat(processedData);
    console.log("messageList.value", messageList.value);
  } else {
    console.error("Invalid response:", resList);
  }
};
</script>

<style lang="scss" scoped>
.chat-window {
  &__container {
    max-height: calc(100% - 115px);
    width: 780px;
    margin: 20px auto;
    padding: 0%;

    :deep(.markdown-content) {
      background-color: black;
      color: white;
      white-space: pre-wrap; // 保留换行和空格
      font-family: monospace; // 使用等宽字体
      margin-bottom: 10px; // 适当调整下边距
      /* 其他样式属性 */
    }
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
  }

  &__form {
    width: 780px;
    margin: 20px auto;

    
  }
}

.chat-box {
  &__content {
    :deep(p){
      margin: 0.75rem 0;
    }
  }
  &__name {
    font-size: larger;
    font-weight: bolder;
    margin-bottom: 10px;
  }
}

.chat-form {
  &__input {
    font-size: 18px;
  }

  :deep(.el-textarea__inner) {
    font-size: 18px;
    line-height: 1.5rem;
    overflow-y: hidden;
  }

}

</style>
