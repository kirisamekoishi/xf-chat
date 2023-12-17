<!-- src/views/SessionList.vue -->
<template>
  <div class="session-list flex flex-col">
    <ul v-infinite-scroll="loadMore" class="infinite-list" style="overflow: auto">
      <li v-for="(item, index) of sessionsList" :key="index" class="infinite-list-item">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script setup>
import {ref, onMounted, defineComponent, onUnmounted, watch} from "vue";
import {useChatStore} from "@/stores/chat.js";
import "@/components/common-list.vue"

const chatStore = useChatStore();

const sessionsList = ref([]);
//分页参数,当前页码
const pageNum = ref(0);
//分页显示条数
const pageSize = ref(25)


//初始化函数,也可以用于刷新
// const initData = async () => {
//   pageNum.value = 1;
//   listLoading.value = true;
//   //请求后台接口
//   let resList = await chatStore.fetchSessions(pageNum.value, pageSize.value);
//   //后台反馈的数据放入变量中
//   sessionsList.value = resList;
//   console.log(resList)
//   //设置数据总量
//   // total.value = resList.totalSize;
//   listLoading.value = false;
// };

const loadMore = async () => {
  console.log("加载跟多数据")
  pageNum.value++;
  console.log(" pageNum.value", pageNum.value)
  let resList = await chatStore.fetchSessions(pageNum.value, pageSize.value);
  //加载更多数据,和初始化数据不同,需要对数据进行追加,而不是直接覆盖
  sessionsList.value = sessionsList.value.concat(resList);
  // total.value = resList.totalSize;
};

// 查询会话id
// const selectSession = (sessionId) => {
//   chatStore.fetchSessionMessages(sessionId);
//   // 还可以进行其他处理，比如更新当前会话的标题等
// };
// const selectSession = (sessionId) => {
//   console.log("session 被点击", sessionId);
// };
</script>

<style lang="scss" scoped>
.session-list {
  overflow: auto;

  &__item {
    padding: 0.5rem;
    white-space: nowrap;
  }
}

.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
