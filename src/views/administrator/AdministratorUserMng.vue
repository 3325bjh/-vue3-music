<script setup>
import {
    Delete,Edit
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import {userListService,userDeleteService,userUpdateStateService} from '@/api/user.js'
import {ElMessage,ElMessageBox} from 'element-plus'
const users = ref([
  {
    id:'',
    username: '陆冕1号',
    nickname: '璐璐',
    email: '123456@qq.com',
    createTime:'',
    userState:'0',
    userLevel:"1",
    preference:"打搅"
  },
  {
    id:'',
    username: '陆冕2号',
    nickname: '璐璐',
    email: '123456@qq.com',
    createTime:'',
    userState:'0',
    userLevel:"1",
    preference:"打搅"
  },
  {
    id:'',
    username: '陆冕3号',
    nickname: '璐璐',
    email: '123456@qq.com',
    createTime:'',
    userState:'0',
    userLevel:"1",
    preference:"打搅"
  },
  {
    id:'',
    username: '陆冕4号',
    nickname: '璐璐',
    email: '123456@qq.com',
    createTime:'',
    userState:'0',
    userLevel:"1",
    preference:"打搅"
  },
  {
    id:'',
    username: '陆冕5号',
    nickname: '璐璐',
    email: '123456@qq.com',
    createTime:'',
    userState:'0',
    userLevel:"1",
    preference:"打搅"
  }
])
const pageNum = ref(1)//当前页
const total = ref(5)//总条数
const pageSize = ref(10)//每页条数
const onSizeChange = (size) => {
    pageSize.value = size
    articleList()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    articleList()
}
const username1=ref("")
const articleList=async()=>{
  let params={
    pageNum:pageNum.value,
    pageSize:pageSize.value,
    username:username1.value ? username1.value : null
  }
  let result = await userListService(params);
  total.value=result.data.total;
  users.value=result.data.items;
}
articleList();

const userDelete=async(row)=>{
  console.log(row.id);
  let result=await userDeleteService(row.id);
  ElMessage.success("删除成功");
  articleList();
}

const open = (row) => {
  ElMessageBox.prompt('更新用户状态', '编辑', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern: /^(封禁|正常)$/,
    inputErrorMessage: '请输入"封禁"或"正常"',
  })
    . then(async ({ value }) => {
    let updateData={
      id:row.id,
      state:value
    }
    console.log(row.id)
    console.log(value)
    let result=await userUpdateStateService(updateData);
    articleList();
    ElMessage({
        type: 'success',
        message: `更改用户状态成功`,
      });
    })
    // .catch(() => {
    //   ElMessage({
    //     type: 'info',
    //     message: '取消编辑',
    //   })
    // })
}
</script>
<template>
    <el-form inline>
            <el-form-item label="用户名称：">
                <el-input placeholder="请输入" v-model="username1">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="articleList">搜索</el-button>
            </el-form-item>
    </el-form>



    <el-table :data="users" stripe style="width: 100%">
    <el-table-column prop="username" label="姓名"  />
    <el-table-column prop="nickname" label="昵称"  />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="createTime" label="注册时间" />
    <el-table-column prop="userState" label="用户状态" />
    <el-table-column prop="userLevel" label="用户等级" />
    <el-table-column prop="preference" label="用户偏好" />
    <el-table-column label="编辑">
    <template #default="{ row }">
    <el-button :icon="Edit" circle plain type="primary" @click="open(row)"></el-button>
    </template>
  </el-table-column>
    <el-table-column label="删除">
    <template #default="{ row }">
    <el-button :icon="Delete" circle plain type="danger" @click="userDelete(row)"></el-button>
    </template>
  </el-table-column>
  </el-table>
  <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[10]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />

</template>

<style scoped>


</style>