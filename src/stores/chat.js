import { defineStore } from "pinia";
import {
  fetchSessionListApi,
  addSessionApi,
  deleteSessionApi,
  updateSessionTitleApi,
  sendMessageApi,
  fetchSessionMessagesListApi,
} from "../common/sessionApi.js";

export const useChatStore = defineStore("chat", {
  state: () => ({
    messagesList: [], // 全部消息
  }),
  actions: {
    // 获取用户会话记录(分页显示)
    async fetchSessions(pageNum, pageSize) {
      try {
        const res = await fetchSessionListApi(pageNum, pageSize);
        if (res.code === 0) {
          // this.newSessionsList = res.data;
          console.log(res);
          return res.data;
        }
      } catch (error) {
        console.error("Error in fetchSessions:", error);
      }
    },
    // 获取用户会话内的消息记录(分页显示)
    async fetchSessionMessagesList(conversationId, pageNum, pageSize) {
      try {
        const res = await fetchSessionMessagesListApi(
          conversationId,
          pageNum,
          pageSize
        );
        if (res.code === 0) {
          console.log(res.data);
          return res.data;
        }
      } catch (error) {
        console.error("Error in fetchSessionMessagesList:", error);
      }
    },
    // 新建会话
    async addSession(title) {
      try {
        const res = await addSessionApi(title);
        if (res.code === 0) {
          return true;
        }
      } catch (error) {
        console.error("Error in addSession:", error);
      }
    },
    // 更新会话标题
    async updateSessionTitle(sessionId, newTitle) {
      try {
        const res = await updateSessionTitleApi(sessionId, newTitle);
        if (res.code === 0) {
          return true;
        }
      } catch (error) {
        console.error("Error in updateSessionTitle:", error);
      }
    },
    // 删除会话
    async deleteSession(sessionId) {
      try {
        const res = await deleteSessionApi(sessionId);
        if (res.code === 0) {
          return true;
        }
      } catch (error) {
        console.error("Error in deleteSession:", error);
      }
    },
    // 发送消息
    async sendMessage(conversationId, content) {
      try {
        const res = await sendMessageApi(conversationId, content);
        if (res.code === 0) {
          return true;
        }
      } catch (error) {
        console.error("Error in sendMessage:", error);
      }
    },
  },
});
