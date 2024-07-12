<script setup>
import {ref} from 'vue';
import {
  Search,
  Edit
} from '@element-plus/icons-vue'
import {postCreateService, postGetInfoService} from "@/api/community";
import {QuillEditor} from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {ElMessage} from "element-plus";
const selectedValue=ref('无')
const categories=ref( [
{ value: '篮球', label: '篮球' },
  { value: '足球', label: '足球' },
  { value: '羽毛球', label: '羽毛球' },
  { value: '瑜伽', label: '瑜伽' },
  { value: '健身综合', label: '健身综合' },
  { value: '生活', label: '生活' },
  { value: '美食', label: '美食' },
  { value: '杂谈', label: '杂谈' }
]);
const posts=ref([
  { postId: 1, title: '帖子1', content: '这是第一个帖子内容。' , userName:'zhou',userPic:''}
]);
const url= 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
let drawer2=ref(false);
const rules ={
  title:[{required:true,message:'请输入标题',trigger:"blur"}],
  content:[{ required:true,message:'请输入内容',trigger:"blur"}]
}
const postList=async() =>{
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
const create=async ()=>{
  postModel.value.zoneName=selectedValue.value;
  let result=await postCreateService(postModel.value)
  postList()
  ElMessage.success("发布成功");
  drawer2.value=false
}
const postModel = ref({
  title: '',
  content: '',
  zoneName:''
})
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(6)//每页条数
const showPosts = ref(false);

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size
  postList()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
  postList()
}
</script>

<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <el-select v-model="selectedValue" placeholder="选择分类" class="select" @change="postList">
          <el-option
            v-for="category in categories"
            :key="category.value"
            :label="category.label"
            :value="category.value"
          />
        </el-select>
        
        <el-button :icon="Search"></el-button>
        <el-button type="primary" :icon="Edit" @click="drawer2=true">发布帖子</el-button>
      </el-header>

      

      <el-main class="main">
        <div class="posts-section" v-if="showPosts">
          <el-row :gutter="20" style="margin: 0px; padding:0px;">
            <el-col :span="12" v-for="post in posts" :key="post.postId" style="margin: 0px; padding:0px;">
              <el-card style="width: 700px; height: 260px;background-color:#DBEDA7">
                <div class="block">
                  <el-avatar :size="50" :src="post.userPic" />
                  <h3>{{post.userName}}</h3>
                </div>
                <hr>
                <h1>{{ post.title }}</h1>
                <router-link :to="{ name: 'PostDetail', params: { id: post.postId }}">查看详情</router-link>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>

  <div style="height: 10px;">
  <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[6, 12, 18, 24]" size="small"
                 layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
                 @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end ;" />
                 </div>

  <el-drawer v-model="drawer2" title="添加文章" direction="rtl" size="50%">
    <el-form :model="postModel" label-width="100px" rules="rules">
      <el-form-item label="文章标题">
        <el-input v-model="postModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>

      <el-form-item label="文章内容">
        <div class="editor">
          <quill-editor theme="snow" v-model:content="postModel.content" contentType="html">
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="create">发布</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: white;
  margin: 0px;
}

.header {
  padding: 20px;
  background-image: url('@/assets/headback.png');
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  color: #000;
  width: 100%;
  height:80px;
  margin: 0px;
}

.top-section {
  margin: 0px;
  padding: 0px;
}

.main {
  background-color:#FFFFE5;
  margin: 0px;
  padding: 0px;
  height: 520px; /* 100vh 减去 header 和分页的高度 */
  overflow-y: auto; /* 使 el-main 可滚动 */
}

.posts-section {
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
}

.select {
  width: 200px;
}

.search-input {
  width: 300px;
}

.el-card {
  margin-bottom: 10px;
}

.block {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
