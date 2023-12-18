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
    sessionsList: [], // 全部会话
    newSessionsList: [], // 某个用户里的某一页的会话
    messagesList: [], // 全部消息
    newMessagesList: [], // 某个会话里的某一页消息
  }),
  getters: {
    // // 下拉刷新得到更新后的会话列表数据
    // getSessionsList() {
    //   // 在这里对 sessionsList 进行进一步的处理和计算
    //   this.sessionsList.push(...this.newSessionsList);
    //   this.newSessionsList.splice(0, this.newSessionsList.length);
    //   return this.sessionsList;
    // },
    // // 下拉刷新得到更新后的消息列表数据
    // getSessionMessagesList() {
    //   return this.messagesList;
    // },
  },
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
          return res;
        }
      } catch (error) {
        console.error("Error in sendMessage:", error);
      }
    },
  },
});
