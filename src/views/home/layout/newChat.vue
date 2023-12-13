<template>
    <div class="new-chat flex items-center justify-center">
        
        <router-link to="/xunfei-chat">
            <div class="new-chat__btn">
                新建对话
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' 

const router = useRouter()

const goToXunFeiChat = () => {
    router.push('/xunfei-chat')
}

</script>

<style lang="scss" scoped>
.new-chat {
    margin: .875rem;
    &__btn {

    }
}
</style>