import service from "@/plugins/request.js";

export const fetchLoginUser = () => {
    return new Promise((resolve, reject) => {
        service
            .get("/api/user/get/loginUser", {
                withCredentials: true,
            })
            .then(function (response) {
                console.log(response.data);
                resolve(response.data);
            })
            .catch(function (error) {
                console.log(error);
                reject(error);
            });
    });
};
export const fetchSessionList = (pageNum, pageSize) => {
    return new Promise((resolve, reject) => {
        service
            .get("/api/conversation/get/page", {
                    params: {
                        pageNum: pageNum,
                        pageSize: pageSize,
                    }
                }
            )
            .then(function (response) {
                console.log(response.data);
                resolve(response.data);
            })
            .catch(function (error) {
                console.log(error);
                reject(error);
            });
    });
};


