import service from "@/plugins/request.js";

export const fetchLoginUser = () => {
  return service.get("/api/user/get/loginUser", {
    withCredentials: true,
  });
};
