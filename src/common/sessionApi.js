import service from "@/plugins/request.js";

// 获取用户会话记录(分页显示)
export const fetchSessionListApi = (pageNum, pageSize) => {
  return service.get("/api/conversation/get/page", {
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
    },
  });
};

// // 获取用户会话内的消息记录(分页显示)
// export const fetchSessionMessagesListApi = (
//   conversationId,
//   pageNum,
//   pageSize
// ) => {
//   return service.get("/conversation/get/page", {
//     params: {
//       conversationId, // 这个是会话的id
//       pageNum,
//       pageSize,
//     },
//   });
// };

// 新建会话
export const addSessionApi = (title) => {
  return service.post("/api/conversation/add", title);
};

// 更新会话标题
export const updateSessionTitleApi = (id, title) => {
  return service.post("/api/conversation/update", { id, title });
};

// 删除会话
export const deleteSessionApi = (id) => {
  return service.post("/api/conversation/delete", { id });
};

// 发送消息
export const sendMessageApi = (conversationId, content) => {
  return service.get("/conversation/get/page", {
    params: {
      conversationId, // 会话的id
      content,
    },
  });
};
