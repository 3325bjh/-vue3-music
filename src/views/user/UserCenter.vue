<script setup>
import { ref ,onMounted} from 'vue'
import { ElMessage } from 'element-plus'
import { Edit, Plus, Upload, Delete } from '@element-plus/icons-vue'
import avatar from '@/assets/avatar.png'
import { useTokenStore } from '../../stores/token'
import {getPetsService} from '@/api/goods.js'
const tokenStore = useTokenStore();
const userInfo = ref({
  username: "zhouzhou",
  nickname: "牛魔周",
  email: "1234567@qq.com",
  userPic: "",
  userLevel: "1",
  userExp: "1",
  gold: 0,
  resume: ""
})
const userUpdate = ref({
  username: "",
  nickname: "",
  email: ""
})
const password = ref({
  oldPassword: "",
  newPassword: "",
  rePassword: ""
})
import { userGetInfoService, userUpdateServece, userUpdatePwdService, userResumeService, updatePicService, userUpdateHabitService } from '@/api/user.js'
import { interestListService } from '@/api/tuisong.js'
import {postDeleteService, postGetUserService} from "@/api/community";
const getInfo = async () => {
  let result = await userGetInfoService();
  userInfo.value = result.data;
}
const select = ref("2");
getInfo();
const update = async () => {
  let result = await userUpdateServece(userUpdate.value);
  getInfo();
  userUpdate.value = {
    username: "",
    nickname: "",
    email: ""
  }
  ElMessage.success("修改成功")

}
const updatePwd = async () => {
  let result = await userUpdatePwdService(password.value);
  ElMessage.success("修改成功")
}


const edit = ref(false);

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, max: 16, message: '长度为1~16位非空字符', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 16, message: '长度为1~16位非空字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
  ],
  oldPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
  ],
  rePassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
  ]
}
const updateResume = async () => {
  if (edit.value === false) {
    let result = await userResumeService(userInfo.value.resume);
    ElMessage.success("编辑成功")
  }
}

const uploadSuccess = (result) => {
  userInfo.value.userPic = result.data;
}
const updatePic = async () => {
  let result = await updatePicService(userInfo.value.userPic);
  ElMessage.success("上传成功");
}
const value1 = ref([]);
const interests = ref([])
const getInterest = async () => {
  let result = await interestListService();
  result.data.forEach(item => {
    interests.value.push({
      value: item.interestId,
      label: item.interestName
    });
  });
}
const updateHabit = async () => {
  console.log(value1.value);
  let id = [];
  for (let key in value1.value) {
    id.push(value1.value[key]);
  }
  let result = await userUpdateHabitService(id);
  ElMessage.success("设置成功");
}

getInterest();
const pageNum = ref(1); //当前页
const total = ref(5); //总条数
const pageSize = ref(7); //每页条数
const posts = ref([
  { postId: 1, title: '帖子1', content: '这是第一个帖子内容。', userName: 'zhou', userPic: '', zoneName: null, createTime: null }
]);
const postList = async () => {
  let params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  }
  let result = await postGetUserService(params)
  total.value = result.data.total;
  posts.value = result.data.items;
}
const onSizeChange = (size) => {
  pageSize.value = size
  postList()
}
const onCurrentChange = (num) => {
  pageNum.value = num
  postList()
}
onMounted(async () => {
  await postList()
});
getInterest();
const postDelete = async (row) => {
  let result1 = await postDeleteService(row.postId)
  postList()
  ElMessage.success("帖子删除成功")
}
const pets=ref([]);
const getPets=async()=>{
  let result=await getPetsService();
  pets.value=result.data;
}
</script>

<template>
  <div class="wrapper">
    <el-container class="container1">
      <el-header class="header-container">
        <div class="header-card">
          <el-image style="width: 50px; height: 50px" :src="userInfo.userPic" :fit="fit" />
          <el-row :gutter="20" class="user-info" v-if="userInfo" style="font-weight: 500;">
            <el-col span="16">用户名: {{ userInfo.username }}</el-col>
            <el-col span="16">昵称: {{ userInfo.nickname }}</el-col>
            <el-col>邮箱: {{ userInfo.email }}</el-col>
            <el-col span="8">用户等级: {{ userInfo.userLevel }}</el-col>
            <el-col span="8">用户经验: {{ userInfo.userExp }}</el-col>
            <el-col span="8">金币: {{ userInfo.gold }}</el-col>
          </el-row>
        </div>
      </el-header>
      <el-container class="container2">
        <el-row :gutter="20" class="content-row">
          <el-col :span="6">
            <el-card class="aside-card">
              <el-menu default-active="2" class="el-menu-vertical" background-color="#e5efd6">
                <el-menu-item index="1" @click="select = 1">
                  <img src="@/assets/icon5.png" style="height: 40px;" />
                  <span style="color:#017d3f; font-weight: 700;">修改密码</span>
                </el-menu-item>
                <el-menu-item index="2" @click="select = 2">
                  <img src="@/assets/icon.png" style="height: 35px;" />
                  <span style="color:#017d3f; font-weight: 700;">修改个人信息</span>
                </el-menu-item>
                <el-menu-item index="3" @click="select = 3">
                  <img src="@/assets/icon2.png" style="height: 40px;" />
                  <span style="color:#017d3f; font-weight: 700;">设置偏好</span>
                </el-menu-item>
                <el-menu-item index="4" @click="select = 4">
                  <img src="@/assets/icon3.png" style="height: 40px;" />
                  <span style="color:#017d3f; font-weight: 700;">个人简介</span>
                </el-menu-item>
                <el-menu-item index="5" @click="select = 5">
                  <img src="@/assets/icon4.png" style="height: 40px;" />
                  <span style="color:#017d3f; font-weight: 700;">发布的帖子</span>
                </el-menu-item>
                <el-menu-item index="6" @click="select = 6">
                  <img src="@/assets/icon6.png" style="height: 40px;" />
                  <span style="color:#017d3f; font-weight: 700;">更换头像</span>
                </el-menu-item>
                <el-menu-item index="7" @click="select = 7;getPets() ">
                  <img src="@/assets/icon7.png" style="height: 40px;" />
                  <span style="color:#017d3f; font-weight: 700;">宠物展示</span>
                </el-menu-item>
              </el-menu>
            </el-card>
          </el-col>

          <el-col :span="18">
            <el-card class="main-card">
              <!-- 修改个人信息 -->
              <el-form label-width="auto" style="max-width: 600px" v-if="select == 2" :rules="rules"
                :model="userUpdate">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="userUpdate.username" />
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                  <el-input v-model="userUpdate.nickname" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="userUpdate.email" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="update" color="#017d3f">修改</el-button>
                </el-form-item>
              </el-form>
              <!-- 修改密码 -->
              <el-form label-width="auto" style="max-width: 600px" v-if="select == 1" :rules="rules" :model="password">
                <el-form-item label="原密码" prop="oldPassword">
                  <el-input v-model="password.oldPassword" />
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                  <el-input v-model="password.newPassword" />
                </el-form-item>
                <el-form-item label="确认密码" prop="rePassword">
                  <el-input v-model="password.rePassword" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updatePwd" color="#017d3f">修改</el-button>
                </el-form-item>
              </el-form>
              <!--设置偏好-->
              <el-form label-width="auto" style="max-width: 600px" v-if="select == 3">
                <div class="m-4">
                  <p>设置偏好</p>
                  <el-select v-model="value1" multiple placeholder="选择你的偏好" style="width: 240px">
                    <el-option v-for="item in interests" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
                <br>
                <el-form-item>
                  <el-button type="primary" @click="updateHabit" color="#017d3f">设置</el-button>
                </el-form-item>
              </el-form>
              <!--编辑简介-->
              <div v-if="select == 4" class="introduction-container">
                <el-card class="introduction">
                  <span v-show="!edit" class="introduction1">
                    <h1 style="text-align: center;">个人简介</h1>
                    {{ userInfo.resume }}
                  </span>
                  <el-input v-model="userInfo.resume" style="width: 370px" :autosize="{ minRows: 14, maxRows: 14 }"
                    type="textarea" placeholder="请输入简介" v-show="edit" />
                </el-card>
                <el-icon @click="edit = !edit; updateResume()" class="introduction3">
                  <Edit />
                </el-icon>编辑
              </div>
              <!--编辑帖子-->
              <div v-if="select == 5">
                帖子
                <el-table :data="posts" style="width: 100%">
                  <el-table-column prop="title" label="标题" width="180" />
                  <el-table-column prop="zoneName" label="发布板块" width="180" />
                  <el-table-column prop="createTime" label="创建时间" />
                  <el-table-column label="查看详情">
                    <template #default="{ row }">
                      <router-link :to="{ name: 'PostDetail', params: { id: row.postId } }">查看详情</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column label="删除">
                    <template #default="{ row }">
                      <el-button :icon="Delete" circle plain type="danger" @click="postDelete(row)"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[7]"
                  layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
                  @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
              </div>
              <!--更新头像-->
              <el-card class="page-container" v-if="select == 6">
                <template #header>
                  <div class="header">
                    <span>更换头像</span>
                  </div>
                </template>
                <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false" action="/api/upload"
                  name="file" :headers="{ 'Authorization': tokenStore.token }" :on-success="uploadSuccess">
                  <img v-if="userInfo.userPic" :src="userInfo.userPic" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                  </el-icon>
                </el-upload>
                <el-button type="success" :icon="Upload" size="large" @click="updatePic()" color="#017d3f">
                  上传头像
                </el-button>
              </el-card>
                <!--宠物展示-->
                <div v-if="select == 7" >
                  <el-row>
                  <el-col v-for="pet in pets" :span="3" class="goods3">
                    <el-image style="width: 100px; height: 100px" :src=pet.picture  />
                  </el-col>
                </el-row>
                </div>
            </el-card>
          </el-col>
        </el-row>

      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.wrapper {
  background-color: #ffffe5;
  height: 92%;
}



.container2 {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}

.content-row {
  width: 100%;
  max-width: 1520px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-col {
  display: flex;
}

.aside-card,
.main-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.aside-card {
  width: 500px;
  height: 500px;
  background-color: #e5efd6;
}

.main-card {
  width: 1000px;
  height: 500px;
  background-color: #e5efd6;
}

.header-container {
  display: flex;
  justify-content: center;
}

.header-card {
  width: 1500px;
  height: 150px;
  background-image: url("@/assets/导航栏.png");
  background-position: right;
  background-repeat: no-repeat;
  background-size: 100%;
  background-color: #dbeda7;
}

.el-menu-vertical {
  width: 100%;
  height: 100%;
}

.introduction-container {
  display: flex;
  justify-content: center;
  position: relative;
}

.introduction {
  width: 400px;
  height: 400px;

}

.introduction1,
.introduction2 {
  width: 100%;
  height: 400px;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>