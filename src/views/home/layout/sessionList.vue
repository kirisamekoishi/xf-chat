<!-- src/views/SessionList.vue -->
<template>
  <!-- <el-scrollbar>
      <div
          v-for="session in sessionsList"
          :key="session.id"
          @click="selectSession(session.id)"
          class="session-list__item flex items-center justify-center"
      >
        {{ session.title }}
      </div>
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
    </el-scrollbar> -->
  <ul
    v-infinite-scroll="loadMore"
    class="session-list flex flex-col"
    style="overflow: auto"
  >
    <li
      v-for="(item, index) of sessionsList"
      :key="index"
      class="session-list__item flex items-center justify-center"
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
          @click="editHandler(index)"
        />
        <el-button
          class="session-list__btn"
          :dark="true"
          :circle="true"
          :icon="Delete"
          @click="deleteHandler(index)"
        />
      </div>
    </li>
  </ul>

  <!-- 弹出框 -->
  <el-dialog v-model="dialogVisible" title="更新标题">
    <el-form :model="form">
      <el-form-item label="会话标题">
        <el-input
          v-model="form.title"
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
import { ref, onMounted, defineComponent, onUnmounted, watch } from "vue";
import { useChatStore } from "@/stores/chat.js";
import { Delete, Edit } from "@element-plus/icons-vue";

const chatStore = useChatStore();

const sessionsList = ref([]);
//分页参数,当前页码
const pageNum = ref(0);
//分页显示条数
const pageSize = ref(5);

// 更新标题
const newTitle = ref("");
const dialogVisible = ref(false)

const closeDialog = () => {
  newTitle.value = ""
}


const loadMore = async () => {
  console.log("加载跟多数据");

  pageNum.value++;

  console.log("pageNum.value", pageNum.value);

  let resList = await chatStore.fetchSessions(pageNum.value, pageSize.value);
  //加载更多数据,和初始化数据不同,需要对数据进行追加,而不是直接覆盖
  sessionsList.value = sessionsList.value.concat(resList);
  // total.value = resList.totalSize;
};

// 更新会话标题
const editHandler = async (index,newTitle) => {
  dialogVisible.value = true
  if (await chatStore.deleteSession(index,newTitle)) {
    ElMessage({
      message: "更新成功",
      type: "success",
    });
    dialogVisible.value = false
  }
};


// 删除按钮
const deleteHandler = async (index) => {
  if (await chatStore.deleteSession(index)) {
    ElMessage({
      message: "删除成功",
      type: "success",
    });
  }
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
  padding: 0%;

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
