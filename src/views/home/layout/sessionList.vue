<!-- src/views/SessionList.vue -->
<template>
  <el-scrollbar>
  <div class="session-list flex flex-col">
    <el-scrollbar>
      <div
          v-for="session in sessionsList"
          :key="session.id"
          @click="selectSession(session.id)"
          class="session-list__item flex items-center justify-center"
      >
        {{ session.title }}
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import {ref, onBeforeMount, onMounted, reactive} from "vue";
import {useChatStore} from "@/stores/chat";

const chatStore = useChatStore();

// 使用pinia 获取用户下的所有会话（批量获取）
const sessions = chatStore.sessions;

// 入参：
// {
//   "userId" : 1,
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
//             "title": "test",
//             "createTime": "2023-11-27 16:40:26"
//         },
//         {
//             "id": 4,
//             "userId": 1,
//             "title": "test",
//             "createTime": "2023-11-27 16:40:44"
//         }
//     ],
//     "message": "ok"
// }
// 模拟pinia 获取用户下的所有会话（批量获取）
let sessionsList = ref([])
// const form = reactive({pageNum:1,pageSize:10})
const loadData = async () => {
  await chatStore.fetchSessions(1, 10)
  console.log('res', chatStore.sessions)
  sessionsList.value = chatStore.sessions;
}

const sessionsData = ref([
  {
    id: 1,
    userId: 1,
    title: "你是猪",
    createTime: "2023-11-27 16:40:26",
  },
  {
    id: 2,
    userId: 1,
    title: "巴赫 G弦上的咏叹调",
    createTime: "2023-11-27 16:40:44",
  },
  {
    id: 3,
    userId: 1,
    title:
      "你说得对，但是这就是奎桑提，HP 4700，护甲 329，魔抗 201的英雄。有不可阻挡，有护盾，还能过墙。有控制，甚至冷却时间只有1秒，只要15点蓝。转换姿态时甚至可以刷新W的cd，还有真实伤害。然后，护甲和魔抗提升后还能获得技能加速，缩短Q的cd，还缩短释放时间，然后还有攻击力。W就啊啊啊啊啊啊!!!",
    createTime: "2023-11-27 16:40:44",
  },
  {
    id: 4,
    userId: 1,
    title:
      "你说得对，但是这就是奎桑提，HP 4700，护甲 329，魔抗 201的英雄。有不可阻挡，有护盾，还能过墙。有控制，甚至冷却时间只有1秒，只要15点蓝。转换姿态时甚至可以刷新W的cd，还有真实伤害。然后，护甲和魔抗提升后还能获得技能加速，缩短Q的cd，还缩短释放时间，然后还有攻击力。W就啊啊啊啊啊啊!!!",
    createTime: "2023-11-27 16:40:44",
  },
  {
    id: 5,
    userId: 1,
    title:
      "你说得对，但是这就是奎桑提，HP 4700，护甲 329，魔抗 201的英雄。有不可阻挡，有护盾，还能过墙。有控制，甚至冷却时间只有1秒，只要15点蓝。转换姿态时甚至可以刷新W的cd，还有真实伤害。然后，护甲和魔抗提升后还能获得技能加速，缩短Q的cd，还缩短释放时间，然后还有攻击力。W就啊啊啊啊啊啊!!!",
    createTime: "2023-11-27 16:40:44",
  },
  {
    id: 6,
    userId: 1,
    title: "巴赫 G弦上的咏叹调",
    createTime: "2023-11-27 16:40:44",
  },
  {
    id: 7,
    userId: 1,
    title: "巴赫 G弦上的咏叹调",
    createTime: "2023-11-27 16:40:44",
  },
  {
    id: 8,
    userId: 1,
    title: "巴赫 G弦上的咏叹调",
    createTime: "2023-11-27 16:40:44",
  },
  {
    id: 9,
    userId: 1,
    title: "巴赫 G弦上的咏叹调",
    createTime: "2023-11-27 16:40:44",
  },
  {
    id: 10,
    userId: 1,
    title: "巴赫 G弦上的咏叹调",
    createTime: "2023-11-27 16:40:44",
  },
  {
    id: 10,
    userId: 1,
    title: "巴赫 G弦上的咏叹调",
    createTime: "2023-11-27 16:40:44",
  },
  {
    id: 10,
    userId: 1,
    title: "巴赫 G弦上的咏叹调",
    createTime: "2023-11-27 16:40:44",
  },
  {
    id: 10,
    userId: 1,
    title: "巴赫 G弦上的咏叹调",
    createTime: "2023-11-27 16:40:44",
  },
  {
    id: 10,
    userId: 1,
    title: "巴赫 G弦上的咏叹调",
    createTime: "2023-11-27 16:40:44",
  },
  {
    id: 10,
    userId: 1,
    title: "巴赫 G弦上的咏叹调",
    createTime: "2023-11-27 16:40:44",
  },
  {
    id: 10,
    userId: 1,
    title: "巴赫 G弦上的咏叹调",
    createTime: "2023-11-27 16:40:44",
  },
  {
    id: 10,
    userId: 1,
    title: "巴赫 G弦上的咏叹调",
    createTime: "2023-11-27 16:40:44",
  },
  {
    id: 10,
    userId: 1,
    title: "巴赫 G弦上的咏叹调",
    createTime: "2023-11-27 16:40:44",
  },
  {
    id: 10,
    userId: 1,
    title: "巴赫 G弦上的咏叹调",
    createTime: "2023-11-27 16:40:44",
  },
]);

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
