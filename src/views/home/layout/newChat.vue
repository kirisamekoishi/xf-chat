<template>
  <div class="new-chat flex items-center justify-center">
    <!-- <router-link to="/xunfei-chat">
            <div class="new-chat__btn">
                新建对话
            </div>
        </router-link> -->
    <el-button
      color="gray"
      size="large"
      class="new-chat__btn w-full"
      @click="dialogFormVisible = true"
    >
      新建对话
    </el-button>
  </div>

  <!-- 弹出框 -->
  <el-dialog v-model="dialogFormVisible" title="新建对话">
    <el-form :model="form">
      <el-form-item label="会话标题" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" placeholder="请输入您的标题"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="closeDialog">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
  
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// const goToXunFeiChat = () => {
//   router.push("/xunfei-chat");
// };

const dialogFormVisible = ref(false)

const closeDialog = () => {
    // 传递标题给后端
    
    // 
    dialogFormVisible.value = false
}

const form = reactive({
    title: '',
})

</script>

<style lang="scss" scoped>
.new-chat {
  margin: 0.875rem;

  &__btn {
    font-size: 1rem;
  }
}
</style>
