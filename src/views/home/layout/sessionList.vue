<!-- src/views/SessionList.vue -->
<template>
  <div>

  </div>
  <ul
      v-infinite-scroll="loadMore"
      class="session-list flex flex-col overflow-auto w-full"
  >
    <el-scrollbar>
      <li
          v-for="item of sessionsList"
          :key="item.id"
          class="session-list__item flex items-center justify-center infinite-list-item"
      >
        <div class="session-list__title flex flex-1 items-center overflow-hidden"
             @click="toSessionMessageList(item.id)"
        >
          {{ item.title }}
        </div>
        <div class="flex items-center justify-end">
          <el-button
              class="session-list__btn"
              :dark="true"
              :circle="true"
              :icon="Edit"
              @click="openEditDialog(item.id, item.title)"
          />
          <el-button
              class="session-list__btn"
              :dark="true"
              :circle="true"
              :icon="Delete"
              @click="deleteHandler(item.id)"
          />
        </div>
      </li>
    </el-scrollbar>
  </ul>

  <!-- 弹出框 -->
  <el-dialog v-model="dialogVisible" title="更新标题">
    <el-form :model="form">
      <el-form-item label="会话标题">
        <el-input
            v-model="form.newTitle"
            autocomplete="off"
            placeholder="请输入新的标题"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="editHandler"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref} from "vue";
import {useChatStore} from "@/stores/chat.js";
import {useRouter} from "vue-router";
import {Delete, Edit} from "@element-plus/icons-vue";

const chatStore = useChatStore();
const router = useRouter();

// 弹窗表单
const form = reactive({
  newTitle: "",
});

const sessionsList = ref([]);
//分页参数,当前页码
const pageNum = ref(0);
//分页显示条数
const pageSize = ref(20);

// 加载更多数据
const loadMore = async () => {
  console.log("加载跟多数据")
  pageNum.value++;
  console.log(" pageNum.value", pageNum.value)
  let resList = await chatStore.fetchSessions(pageNum.value, pageSize.value);
  //加载更多数据,和初始化数据不同,需要对数据进行追加,而不是直接覆盖
  sessionsList.value = sessionsList.value.concat(resList);
  // total.value = resList.totalSize;
};

// 跳转到对应的消息列表
const toSessionMessageList = (sessionId) => {
  router.push({
    path: `/xunfei-chat/${sessionId}`,
    // query: {
    //   id: sessionId
    // },
  });
};

// 更新会话标题按钮
const dialogVisible = ref(false);
const closeDialog = () => {
  newTitle.value = "";
};
// 更新会话标题
let dialogSessionId = "";
const openEditDialog = (id, title) => {
  dialogSessionId = id;
  form.newTitle = title;
  dialogVisible.value = true;
};
const editHandler = async () => {
  try {
    if (await chatStore.updateSessionTitle(dialogSessionId, form.newTitle)) {
      ElMessage({
        message: "更新成功",
        type: "success",
      });

      // 找到具有相匹配 ID 的会话的索引
      const indexToUpdate = sessionsList.value.findIndex(
          (session) => session.id === dialogSessionId
      );

      // 更新 sessionsList 数组中相应会话的标题
      if (indexToUpdate !== -1) {
        sessionsList.value[indexToUpdate].title = form.newTitle;
      }

      dialogSessionId = "";
      dialogVisible.value = false;
    }
  } catch (error) {
    console.error("更新会话标题时出错：", error);
  }
};

// 删除按钮
const deleteHandler = async (conversationId) => {
  try {
    if (await chatStore.deleteSession(conversationId)) {
      ElMessage({
        message: "删除成功",
        type: "success",
      });
      // 找到具有相匹配 ID 的会话的索引
      const indexToDelete = sessionsList.value.findIndex(
          (session) => session.id === conversationId
      );

      // 从 sessionsList 数组中删除会话
      if (indexToDelete !== -1) {
        sessionsList.value.splice(indexToDelete, 1);
      }

    }
  } catch (error) {
    console.error("删除会话时出错：", error);
  }
};
</script>

<style lang="scss" scoped>
.session-list {
  overflow: auto;
  padding: 0%;
  :deep(.el-button) {
    margin: 0%;
  }

  &__item {
    padding: 0.5rem;
    
    white-space: nowrap;
  }

  &__item:hover {
    padding: 0.5rem;
    white-space: nowrap;
    background-color: #666666;
  }
  &__title {
    margin-right: 0.5rem;
  }

  &__btn {
    background-color: #999999;
  }
}




</style>
