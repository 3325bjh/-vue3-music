<script setup>
import {onMounted, ref} from "vue";
import {Delete, Edit} from "@element-plus/icons-vue";
import {
  commentDeleteService, commentGetInfoService,
  postDeleteService,
  postGetAllService, postGetDetailService, postGetInfoService,
} from "@/api/community";
import {ElMessage} from "element-plus";

const pageNum = ref(1); //当前页
const total = ref(5); //总条数
const pageSize = ref(10); //每页条数
let drawer2 = ref(false);
const selectedValue=ref('无')
const categories=ref( [
  {value: '全部',label:'全部'},
  { value: '篮球', label: '篮球' },
  { value: '足球', label: '足球' },
  { value: '羽毛球', label: '羽毛球' },
  { value: '瑜伽', label: '瑜伽' },
  { value: '健身综合', label: '健身综合' },
  { value: '生活', label: '生活' },
  { value: '美食', label: '美食' },
  { value: '杂谈', label: '杂谈' }
]);
const seecomment = async (row) => {
  drawer2.value = true;
  let result= await commentGetInfoService(row.postId)
  comments.value=result.data
};

const posts = ref([
  { postId: 1, title: '帖子1', content: '这是第一个帖子内容。', userName: 'zhou', userPic: '',zoneName:null}
]);

const comments = ref([
  { content: null, userName: null, userPic: null, commentId: null,postId: null },
]);
const postDelete = async (row) => {
  let result1=await postDeleteService(row.postId)
  postList()
  ElMessage.success("帖子删除成功")
}
const commentDelete = async (row) => {
  let result2=await commentDeleteService(row.commentId)
  let result3=await commentGetInfoService(row.postId)
  comments.value=result3.data
  ElMessage.success("评论删除成功")
}
const postList=async() =>{
  if (selectedValue.value === '全部' || selectedValue.value === '无') {
    let params={
      pageNum:pageNum.value,
      pageSize:pageSize.value,
    }
    let result = await postGetAllService(params);
    showPosts.value = true;
    total.value = result.data.total;
    posts.value = result.data.items;
  }
 else {
    let params={
      pageNum:pageNum.value,
      pageSize:pageSize.value,
      zoneName:selectedValue.value
    }
    let result=await postGetInfoService(params)
    showPosts.value=true
    total.value=result.data.total;
    posts.value=result.data.items;
  }
}
const onSizeChange = (size) => {
  pageSize.value = size
  postList()
}
const onCurrentChange = (num) => {
  pageNum.value = num
  postList()
}
const showPosts = ref(false);
onMounted(async () => {
await postList()
});
</script>

<template>
  <div class="top-section">
    <el-select v-model="selectedValue" placeholder="选择分类" class="select" @change="postList">
      <el-option
          v-for="category in categories"
          :key="category.value"
          :label="category.label"
          :value="category.value"
      />
    </el-select>
  </div>
  <el-table :data="posts" stripe style="width: 100%" v-if="showPosts">
    <el-table-column prop="userName" label="发布者" />
    <el-table-column prop="zoneName" label="发布板块" />
    <el-table-column prop="title" label="标题" />
    <el-table-column prop="content" label="内容" />
    <el-table-column label="查看评论">
      <template #default="{ row }">
        <el-button :icon="Edit" circle plain type="primary" @click="seecomment(row)"></el-button>
      </template>
    </el-table-column>
    <el-table-column label="删除">
      <template #default="{ row }">
        <el-button :icon="Delete" circle plain type="danger" @click="postDelete(row)"></el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[10]"
                 layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
                 @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />

  <el-drawer v-model="drawer2" title="评论管理" direction="rtl" size="50%">
    <el-table :data="comments" style="width: 100%">
      <el-table-column label="头像" width="100">
        <template #default="{ row }">
          <el-avatar :size="20" :src="row.userPic" />
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="评论人" width="140" />
      <el-table-column prop="content" label="内容" width="400" />
      <el-table-column label="删除">
        <template #default="{ row }">
          <el-button :icon="Delete" circle plain type="danger" @click="commentDelete(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-drawer>
</template>


<style scoped>


</style>