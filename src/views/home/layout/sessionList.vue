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
          <view class="card" v-for="(item, index) of sessionsList" :key="index">
            <!-- //  unit-item是自定义的组件内容,用于根据需要实现不同的自定义内容
          //  <unit-item :unit-info="item" :index="index" @handleMaintenance="handleMaintenance"/> -->
            {{ item.title }}
          </view>
        </view>
      </common-list>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import { useChatStore } from "@/stores/chat";

// const chatStore = useChatStore();

// // 使用pinia 获取用户下的所有会话（批量获取）
// let sessionsList = chatStore.getSessionsList();

//第一次加载和加载更多不同,需要手动调用,初始化内容数组和数据总量
onMounted(() => {
  initData();
});
//分页参数,当前页码
const pageNum = ref(1);
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
  let resList = await fetchSessions(pageNum.value, 10);
  //后台反馈的数据放入变量中
  sessionsList.value = resList.content;
  //设置数据总量
  total.value = resList.totalSize;
  loading.value = false;
};
watch(sessionsList, () => {
  //判断是否有更多数据需要加载,如果接口没有返回数据,或者返回的数据大于等于总数则没有更多数据需要加载
  if (!sessionsList.value || total.value <= sessionsList.value.length) {
    noMore.value = true;
  }
});

const loadMore = async () => {
  pageNum.value++;
  loading.value = true;
  let resList = await getXXXList(params);
  //加载更多数据,和初始化数据不同,需要对数据进行追加,而不是直接覆盖
  sessionsList.value = sessionsList.value.concat(resList.ontent);
  total.value = resList.totalSize;
  loading.value = false;
};

// const sessionsData = ref([
//   {
//     id: 1,
//     userId: 1,
//     title: "你是猪",
//     createTime: "2023-11-27 16:40:26",
//   },
//   {
//     id: 2,
//     userId: 1,
//     title: "巴赫 G弦上的咏叹调",
//     createTime: "2023-11-27 16:40:44",
//   },
//   {
//     id: 3,
//     userId: 1,
//     title:
//       "你说得对，但是这就是奎桑提，HP 4700，护甲 329，魔抗 201的英雄。有不可阻挡，有护盾，还能过墙。有控制，甚至冷却时间只有1秒，只要15点蓝。转换姿态时甚至可以刷新W的cd，还有真实伤害。然后，护甲和魔抗提升后还能获得技能加速，缩短Q的cd，还缩短释放时间，然后还有攻击力。W就啊啊啊啊啊啊!!!",
//     createTime: "2023-11-27 16:40:44",
//   },
//   {
//     id: 4,
//     userId: 1,
//     title: "巴赫 G弦上的咏叹调",
//     createTime: "2023-11-27 16:40:44",
//   },
//   {
//     id: 5,
//     userId: 1,
//     title: "巴赫 G弦上的咏叹调",
//     createTime: "2023-11-27 16:40:44",
//   },
//   {
//     id: 6,
//     userId: 1,
//     title: "巴赫 G弦上的咏叹调",
//     createTime: "2023-11-27 16:40:44",
//   },
//   {
//     id: 7,
//     userId: 1,
//     title: "巴赫 G弦上的咏叹调",
//     createTime: "2023-11-27 16:40:44",
//   },
//   {
//     id: 8,
//     userId: 1,
//     title: "巴赫 G弦上的咏叹调",
//     createTime: "2023-11-27 16:40:44",
//   },
//   {
//     id: 9,
//     userId: 1,
//     title: "巴赫 G弦上的咏叹调",
//     createTime: "2023-11-27 16:40:44",
//   },
//   {
//     id: 10,
//     userId: 1,
//     title: "巴赫 G弦上的咏叹调",
//     createTime: "2023-11-27 16:40:44",
//   },
//   {
//     id: 10,
//     userId: 1,
//     title: "巴赫 G弦上的咏叹调",
//     createTime: "2023-11-27 16:40:44",
//   },
//   {
//     id: 10,
//     userId: 1,
//     title: "巴赫 G弦上的咏叹调",
//     createTime: "2023-11-27 16:40:44",
//   },
//   {
//     id: 10,
//     userId: 1,
//     title: "巴赫 G弦上的咏叹调",
//     createTime: "2023-11-27 16:40:44",
//   },
//   {
//     id: 10,
//     userId: 1,
//     title: "巴赫 G弦上的咏叹调",
//     createTime: "2023-11-27 16:40:44",
//   },
//   {
//     id: 10,
//     userId: 1,
//     title: "巴赫 G弦上的咏叹调",
//     createTime: "2023-11-27 16:40:44",
//   },
//   {
//     id: 10,
//     userId: 1,
//     title: "巴赫 G弦上的咏叹调",
//     createTime: "2023-11-27 16:40:44",
//   },
//   {
//     id: 10,
//     userId: 1,
//     title: "巴赫 G弦上的咏叹调",
//     createTime: "2023-11-27 16:40:44",
//   },
//   {
//     id: 10,
//     userId: 1,
//     title: "巴赫 G弦上的咏叹调",
//     createTime: "2023-11-27 16:40:44",
//   },
//   {
//     id: 10,
//     userId: 1,
//     title: "巴赫 G弦上的咏叹调",
//     createTime: "2023-11-27 16:40:44",
//   },
// ]);

// 查询会话id
// const selectSession = (sessionId) => {
//   chatStore.fetchSessionMessages(sessionId);
//   // 还可以进行其他处理，比如更新当前会话的标题等
// };
const selectSession = (sessionId) => {
  console.log("session 被点击", sessionId);
};
</script>

<style lang="scss" scoped>
.session-list {
  overflow: auto;

  &__item {
    padding: 0.5rem;
    white-space: nowrap;
  }
}
</style>
