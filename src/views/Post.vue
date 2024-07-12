<script setup xmlns:el-col="http://www.w3.org/1999/html">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { commentCreateService, commentGetInfoService, postGetDetailService } from '@/api/community';
import { ElMessage } from "element-plus";
let drawer2 = ref(false);
const post = ref({
  postId: null,
  title: null,
  content: null,
  userName: null,
  userPic: null,
});
const comments = ref([
  { content: null, userName: null, userPic: '' },
]);

const route = useRoute();
const create = async () => {
  commentModel.value.postId = route.params.id
  let result = await commentCreateService(commentModel.value)
  await show()
  ElMessage.success("发表成功");
  drawer2.value = false;
  commentModel.value.content = null
}
const commentModel = ref({
  content: null,
  postId: null
});
const showcomment = ref(false)
const show = async () => {
  if (route.params.id) {
    let result1 = await commentGetInfoService(route.params.id);
    comments.value = result1.data;
    if (!result1.data || result1.data.length === 0) {
      ElMessage.error("无评论")
      showcomment.value = false
    }
    else {
      showcomment.value = true
    }
  }
};

onMounted(async () => {
  let result = await postGetDetailService(route.params.id);
  post.value = result.data;
});
</script>

<template>
  <div class="container">
    <div class="user-info">
      <img  
      style="position:absolute; top: 130px; left: 112px ; height:100px;"  src="@/assets/shequ.png">
      <el-avatar :size="150" :src="post.userPic" />
      <h2>{{ post.userName }}</h2>
    </div>
    <div class="right-container">
      <div class="post-details">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-content" v-html="post.content"></div>
        <div class="action-buttons">
          <el-button type="primary" @click="show">查看评论</el-button>
          <el-button type="primary" @click="drawer2=true">发表评论</el-button>
        </div>
        <el-table :data="comments" style="width: 100%" v-if="showcomment" class="comments-table">
          <el-table-column label="头像" width="150">
            <template #default="{ row }">
              <el-avatar :size="40" :src="row.userPic" />
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="评论人" width="200" />
          <el-table-column prop="content" label="内容" width="600" />
        </el-table>
      </div>
    </div>
  </div>
  <el-drawer v-model="drawer2" title="发表评论" direction="rtl" size="50%">
    <el-form :model="postModel" label-width="100px" rules="rules">
      <el-form-item label="评论内容">
        <el-input v-model="commentModel.content" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="create">发表</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  width: 100%;
  height: 100%;
}

.container {
  display: flex;
  margin: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 680px; /* 设定容器高度 */
}

.user-info {
  flex: 0 0 250px; /* 固定宽度 */
  text-align: center;
  background-color: #F5E3A3;
  padding: 20px;
  border-radius: 10px;
  margin-right: 20px;
  height: 100%; /* 固定高度 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user-info h2 {
  margin-top: 10px;
  font-size: 20px;
}

.right-container {
  flex: 1;
  overflow-y: auto; /* 允许垂直滚动 */
  height: 100%;
  background-color: #DBEDA7;
}

.post-details {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.post-title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
}

.post-content {
  margin-bottom: 20px;
  font-size: 16px;
  flex-grow: 1;
}

.action-buttons {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.comments-table {
  margin-top: 20px;
}

.el-drawer__header {
  font-size: 24px;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>
