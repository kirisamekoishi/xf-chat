<!-- src/views/SessionList.vue -->
<template>
  <div class="session-list flex flex-col">
    <el-scrollbar>
      <!-- <div
          v-for="session in sessionsList"
          :key="session.id"
          @click="selectSession(session.id)"
          class="session-list__item flex items-center justify-center"
      >
        {{ session.title }}
      </div> -->
      <common-list
        :loading="loading"
        :no-more="noMore"
        @refresh="initData"
        @loadMore="loadMore"
      >
        <view class="contentBoxClass" ref="contentBox">
          <view
            class="session-list__item flex items-center"
            v-for="(item, index) of sessionsList"
            :key="index"
          >
            <div class="flex flex-1 items-center overflow-hidden">
              {{ item.title }}
            </div>
            <div class="flex items-center justify-end">
              <el-button
                class="session-list__btn"
                :dark="true"
                :circle="true"
                :icon="Edit"
                @click="editHandler"
              />
              <el-button
                class="session-list__btn"
                :dark="true"
                :circle="true"
                :icon="Delete"
                @click="deleteHandler"
              />
            </div>
          </view>
        </view>
      </common-list>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useChatStore } from "@/stores/chat.js";
import { Delete, Edit } from "@element-plus/icons-vue";
import "@/components/common-list.vue";

const chatStore = useChatStore();

// // 使用pinia 获取用户下的所有会话（批量获取）
// let sessionsList = chatStore.getSessionsList();
const sessionsList = ref([]);

//第一次加载和加载更多不同,需要手动调用,初始化内容数组和数据总量
onMounted(() => {
  initData();
});
//分页参数,当前页码
const pageNum = ref(1);
//分页显示条数
const pageSize = ref(10);
//请求是否完成
const loading = ref(false);
//是否有更多数据需要加载
const noMore = ref(false);
//初始化函数,也可以用于刷新
const initData = async () => {
  pageNum.value = 1;
  //根据需要传递给后台的参数
  // let params = {

  // }
  loading.value = true;
  //请求后台接口
  let resList = await chatStore.fetchSessions(pageNum.value, pageSize.value);
  //后台反馈的数据放入变量中
  sessionsList.value = resList;
  //设置数据总量
  // total.value = resList.totalSize;
  loading.value = false;
};
watch(sessionsList, () => {
  //判断是否有更多数据需要加载,如果接口没有返回数据,或者返回的数据大于等于总数则没有更多数据需要加载
  // if (!sessionsList.value || total.value <= sessionsList.value.length) {
  if (!sessionsList.value) {
    noMore.value = true;
  }
});

const loadMore = async () => {
  pageNum.value++;
  loading.value = true;
  let resList = await chatStore.fetchSessions(pageNum.value, pageSize.value);
  //加载更多数据,和初始化数据不同,需要对数据进行追加,而不是直接覆盖
  sessionsList.value = sessionsList.value.concat(resList);
  // total.value = resList.totalSize;
  loading.value = false;
};

// 编辑按钮
const editHandler = async () => {
  if (await chatStore.addSession(form)) {

  }
};

// 删除按钮
const deleteHandler = () => {};



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
  &__item:hover {
    padding: 0.5rem;
    white-space: nowrap;
    background-color: #666666;
  }

  &__btn {
    background-color: #999999;
  }
}
</style>
