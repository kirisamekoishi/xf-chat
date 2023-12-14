import {ref, computed} from 'vue'
import ACCESS_ENUM from "../access/accessEnum";
import {defineStore} from 'pinia'
import {fetchLoginUser} from "../common/userApi";

// 定义 Pinia store
export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        // 定义user对象，以及他的属性
        loginUser: {
            userName: "未登录",
            userRole: null,
        },
    }),
    actions: {
        async getLoginUser() {
            console.log('Entering getLoginUser');
            try {
                const res = await fetchLoginUser();
                console.log(res)
                if (res.code === 0) {
                    this.loginUser = res.data;
                }
            } catch (error) {
                console.error('Error in getLoginUser:', error);
            }
        },
    },
    mutations: {
        setLoginUser(user) {
            this.loginUser = user;
        },
    },
});


