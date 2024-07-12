<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import {ref} from 'vue'
import { ElMessage } from 'element-plus'
const isRegister = ref(false)
const radio1 = ref("1")
const userInfo=ref({
  username:"",
  password:"",
  rePassword:""
})

const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次确认密码'))
    } else if (value !== userInfo.value.password) {
        callback(new Error('请确保两次输入的密码一样'))
    } else {
        callback()
    }
}

const rules={
  username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 16, message: '长度为2~16位非空字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
    ],
    rePassword: [
        { validator: checkRePassword, trigger: 'blur' }
    ]
}

import {userRegisterService,userLoginService} from "@/api/user.js"
const register=async()=>{
    let result= await userRegisterService(userInfo.value);
    ElMessage.success("注册成功")
    userInfo.value={
      username:"",
      password:"",
      rePassword:""
    }
}

import {useTokenStore} from '@/stores/token.js'
import {useRouter} from 'vue-router'
import {administratorLoginService} from '@/api/administrator.js'
const router = useRouter()
const tokenStore = useTokenStore();
const login=async()=>{
  if(radio1.value==="1")
  {
  let result=await userLoginService(userInfo.value);
    ElMessage.success('登录成功')
   //把得到的token存储到pinia中
   tokenStore.setToken(result.data)
   //跳转到首页 路由完成跳转
   router.push('/')
  }
  else if(radio1.value=="2")
  {
    let result=await administratorLoginService(userInfo.value);
    ElMessage.success("登录成功")
    tokenStore.setToken(result.data)
    router.push('/administrator')
  }
  else{
    ElMessage.error("请选择角色")
  }

}
</script>

<template>
    <el-row class="login-page">
      <el-col :span="6" :offset="3" class="form-container">
        <el-card class="form-card">
          <!-- 注册表单 -->
          <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="userInfo" :rules="rules">
            <el-form-item>
              <h1>注册</h1>
            </el-form-item>
            <el-form-item prop="username"> 
              <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="userInfo.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="userInfo.password" style="padding: 0;"></el-input>
            </el-form-item>
            <el-form-item prop="rePassword">
              <el-input :prefix-icon="Lock" type="password" placeholder="请再次输入密码" v-model="userInfo.rePassword"></el-input>
            </el-form-item>
            <!-- 注册按钮 -->
            <el-form-item>
              <el-button class="button" color="#654321"  auto-insert-space @click="register">
                注册
              </el-button>
            </el-form-item>
            <el-form-item class="flex">
              <el-link type="info" :underline="false" @click="isRegister = false">
                ← 返回
              </el-link>
            </el-form-item>
          </el-form>
          <!-- 登录表单 -->
          <el-form ref="form" size="large" autocomplete="off" v-else :model="userInfo" :rules="rules">
            <el-form-item>
              <h1>登录</h1>
            </el-form-item>
            <el-form-item prop="username">
              <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="userInfo.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="userInfo.password"></el-input>
            </el-form-item>
            <el-form-item class="flex">
              <div class="flex" >
                <el-radio-group v-model="radio1" class="ml-4">
                <el-radio v-model="radio1" label="1" >用户</el-radio>
                <el-radio v-model="radio1" label="2" >管理员</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
            <!-- 登录按钮 -->
            <el-form-item>
              <el-button class="button" type="primary" auto-insert-space @click="login" color="#654321">登录</el-button>
            </el-form-item>
            <el-form-item class="flex">
              <el-link type="info" :underline="false" @click="isRegister = true">
                注册 →
              </el-link>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </template>
  
  <script>
  import { User, Lock } from '@element-plus/icons-vue'
  import { ref } from 'vue'
  
  export default {
    name: 'Login',
    components: {
      User,
      Lock
    },
    setup() {
      const isRegister = ref(false)
  
      return {
        isRegister
      }
    }
  }
  </script>
  
  <style scoped>
  .login-page {
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image:url("@/assets/背景.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .form-card {
    position: fixed;
    right: 100px;
    width: 100%;
    max-width: 400px;
    padding: 0px;
    color: rgb(101, 67, 33);
    background-color: rgba(254, 216, 145,0.8);
    border-radius: 10px;
  }
  
  .button {
    width: 100%;
  }
  
  .flex {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
:deep(.el-input__icon) {
  color: rgb(101, 67, 33); /* 这里设置你想要的颜色 */
}
 :deep(.el-radio__inner) {
       background: rgb(101, 67, 33);
       border-color:rgb(101, 67, 33);
       color: rgb(101, 67, 33);
   }
</style>
  