<script setup>
import {
    Promotion,
    Tickets,
    User,
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import {useRouter} from 'vue-router'
import {administratorGetName} from '@/api/administrator.js'
import {ref} from 'vue'
const router=useRouter();
const name=ref("");
const getname=async()=>{
  let result=await administratorGetName();
  name.value=result.data;
 
}
getname()
</script>
<template>
    <div class="common-layout">
    <el-container>
      <el-header @click="router.push('/login')" >
        <el-page-header >
    <template #content>
      <div class="flex items-center">
        <el-avatar
          :size="32"
          class="mr-3"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="text-large font-600 mr-3"> Moment Master 后台管理系统</span>
        <el-tag>欢迎</el-tag>
        管理员:{{ name }}
      </div>
    </template>
  
  </el-page-header>
  
      </el-header>
      <el-container>
        <el-aside width="200px" class="custom-aside">
      <el-menu
        router
        default-active="/administrator/user"
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="/administrator/info">
          <el-icon><icon-menu /></el-icon>
          <span>数据分析</span>
        </el-menu-item>
        <el-menu-item index="/administrator/user">
          <el-icon><icon-menu /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/administrator/community">
          <el-icon><icon-menu /></el-icon>
          <span>社区管理</span>
        </el-menu-item>
        <el-menu-item index="/administrator/interest">
          <el-icon><icon-menu /></el-icon>
          <span>兴趣分类管理</span>
        </el-menu-item>
        <el-menu-item index="/administrator/tuisong">
          <el-icon><icon-menu /></el-icon>
          <span>推文管理</span>
        </el-menu-item>
      </el-menu>    
        </el-aside>
    <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
.common-layout{
    height: 50px;
    background-color:white;

}
.el-menu-vertical-demo{
    height: 740px;
}
</style>