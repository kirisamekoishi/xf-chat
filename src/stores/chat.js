import {defineStore} from 'pinia';
import service from "../plugins/request";
import {fetchLoginUser, fetchSessionList} from "../common/userApi";

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
        async fetchSessions(pageNum, pageSize) {
            // 调用后端接口获取用户的所有会话
            console.log('Entering getLoginUser');
            try {
                const res = await fetchSessionList(pageNum, pageSize);
                console.log('菠萝res',res.data)
                if (res.code === 0) {
                    this.sessions = res.data
                }
            } catch (error) {
                console.error('Error in getLoginUser:', error);
            }

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
