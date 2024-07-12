<script setup>
import { ref,onMounted } from 'vue'
import {
  House, DocumentAdd, HomeFilled, Avatar, ShoppingCart, Goods
} from '@element-plus/icons-vue'
import {getRemindService,updateRemindService} from'@/api/user.js'

const activeIndex = ref('/user/main')
const menuColor = ref("#FED891")
const value2=ref(1);
onMounted(async () => {
   let result=await getRemindService();
   value2.value=result.data;
});
const updateRemind=async()=>{
  console.log(value2.value);
  let result=await updateRemindService(value2.value);

}
</script>
<template>
  <div class="app-container">
    <el-menu router :default-active="activeIndex" popper-class="el-menu-demo" mode="horizontal" :ellipsis="false"
      :background-color=menuColor text-color="#000000" active-text-color="#000000" class="app-menu">
      <el-menu-item index="/login">
        返回
      </el-menu-item>
      <el-menu-item index="/user/main" @click="menuColor = '#FED891'">
        <img src="@/assets/icon5.png" style="height: 50px;" />主页
      </el-menu-item>
      <el-menu-item index="/user/plan" @click="menuColor = '#DBED80'">
        <img src="@/assets/icon.png" style="height: 50px;" /> 计划定制
      </el-menu-item>
      <el-menu-item index="/user/community" @click="menuColor = '#FED891'">
        <img src="@/assets/icon4.png" style="height: 50px;" /> 社区
      </el-menu-item>
      <el-menu-item index="/user/mall" @click="menuColor = '#DBED80'">
        <img src="@/assets/icon6.png" style="height: 50px;" />商城
      </el-menu-item>
      <el-menu-item index="/user/bag" @click="menuColor = '#DBED80'">
        <img src="@/assets/icon3.png" style="height: 50px;" />背包
      </el-menu-item>
      <el-menu-item index="/user/center" @click="menuColor = '#DBED80'">
        <img src="@/assets/icon2.png" style="height: 50px;" /> 个人中心
      </el-menu-item>
      <el-menu-item>
        是否开启计划邮件提醒
        <el-tooltip :content="'Switch value: ' + value2" placement="top">
        <el-switch v-model="value2" class="ml-2"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: red"  active-value=1
          inactive-value=0 @click="updateRemind()" />
        </el-tooltip>
      </el-menu-item>
    </el-menu>
    <router-view class="app-content"></router-view>
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
}

.app-menu {
  border-bottom: none;
  /* 去除默认底部边框 */
}

.el-menu-demo {
  padding: 0;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>