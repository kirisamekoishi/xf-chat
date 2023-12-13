import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', {
  state: () => ({
    sessions: [],
    currentSession: null,
    messages: [],
  }),
  getters: {
    getCurrentSessionMessages() {
      // 根据当前会话获取消息，你可能需要进行分页查询
      // ...
    },
  },
  actions: {
    async fetchSessions() {
      // 调用后端接口获取用户的所有会话
      // ...
    },
    async fetchSessionMessages(sessionId) {
      // 调用后端接口获取某个会话的消息
      // ...
    },
    async updateSessionTitle(sessionId, newTitle) {
      // 调用后端接口更新会话标题
      // ...
    },
    async deleteSession(sessionId) {
      // 调用后端接口删除会话
      // ...
    },
    async sendMessage(conversationId, content) {
      // 调用后端接口发送消息
      // ...
    },
  },
});
