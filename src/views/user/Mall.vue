<script lang="ts" setup>
  import { ref } from 'vue'
  import {ElMessage} from 'element-plus'
  import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
  const userInfo = ref({
  username: "zhouzhou",
  nickname: "牛魔周",
  email: "1234567@qq.com",
  userPic:"",
  userLevel: "1",
  userExp: "1",
  gold:0,
  honor:"",
})
import { userGetInfoService} from '@/api/user.js'
import {get1Service,get2Service,get3Service,buyService} from '@/api/goods.js'
const getInfo = async () => {
  let result = await userGetInfoService();
  userInfo.value = result.data;
  console.log(userInfo.value.gold);
}
getInfo();
const goods1=ref([
    {
    name:"",
    picture:"",
    price:"7",
    description:""
},
{
    name:"",
    picture:"",
    price:"5",
    description:""
}
])
const goods2=ref([
    {
    name:"",
    picture:"",
    price:"7",
    description:""
},
{
    name:"",
    picture:"",
    price:"5",
    description:""
}
])
const goods3=ref([
    {
    name:"",
    picture:"",
    price:"7",
    description:""
},
{
    name:"",
    picture:"",
    price:"5",
    description:""
}
])
const buyGood=ref({
    id:"",
    name:"",
    picture:"",
    price:"",
    description:""
})
const goodShow1=ref(true);
const goodShow2=ref(true);
const goodShow3=ref(true);
const getGoods=async()=>{
    let result1=await get1Service();
    let result2=await get2Service();
    let result3=await get3Service();
    goods1.value=result1.data;
    goods2.value=result2.data;
    goods3.value=result3.data;
}
getGoods();
const dialogVisible=ref(false)
const buy=async()=>{
    let commitBuy={
        goodsId:buyGood.value.id,
        price:buyGood.value.price
    }
    let result=await buyService(commitBuy);
    getInfo();
    ElMessage.success("购买成功");
}
  </script>
<template >
      <div class="header-card" style=" color:rgb(101, 67, 33); height: 150px;">
          <div class="touxiang">
            <p style="font-size: 15px; color:rgb(34, 16, 14); font-weight: 900; position: absolute; left: 18px; top:90px">昵称：{{userInfo.nickname}}</p>
            <p style="font-size: 15px; color:rgb(34, 16, 14); font-weight: 900; position: absolute; left: 18px; top:130px">头衔：{{userInfo.honor}}</p>
            <el-image style="width: 27px; height: 37px;position: absolute;top:101px;left: 102px;" :src="userInfo.userPic"  />
          </div>
          <!-- <el-image style="width: 100px; height: 100px" :src="userInfo.userPic" :fit="fill" />
          
          <el-row :gutter="20" class="user-info" v-if="userInfo">
            <el-col span="24" style="font-size:13px;"> {{ userInfo.username }}</el-col>
            <el-col>@ {{ userInfo.nickname }}</el-col>
            <el-col span="8" style="font-size:13px;">等级: {{ userInfo.userLevel }}</el-col>
            <el-col span="8" style="font-size:13px;">经验: {{ userInfo.userExp }}</el-col>
            <el-col span="8" style="font-size:13px;">金币: {{ userInfo.gold }}</el-col>
          </el-row> -->
         <p style="font-weight: 900;">金币：{{userInfo.gold}}</p> 
        </div>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"  style="background-color:#FFFFE5;">
      <h5 class="mb-2" style="text-align: center;">筛选</h5>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        style="height: 510px;"
        background-color="#FFFFE5"
        
      >
      <el-menu-item index="1" @click="goodShow1=false;goodShow2=true;goodShow3=true">
        <el-icon><icon-menu /></el-icon>
          <span >全部</span>
        </el-menu-item>
        <el-menu-item index="2" @click="goodShow1=false;goodShow2=true;goodShow3=false">
          <el-icon><icon-menu /></el-icon>
          <span>经验卡</span>
        </el-menu-item>
        <el-menu-item index="3"  @click="goodShow1=false;goodShow2=false;goodShow3=true">
          <el-icon><icon-menu /></el-icon>
          <span>宠物</span>
        </el-menu-item>
      </el-menu>
      </el-aside>
      <el-container >
        <el-header style="position: relative; height: 250px;">
        <img src="@/assets/market.png"  class="overlay-image">
        </el-header>
        <el-main>
    <div style="margin-top: 10px;" v-show="goodShow1">
    <!-- <h1>等级卡</h1> -->
    <el-row :gutter="0">
    <el-col v-for="good in goods1" :span="3" class="goods1">
      <el-card class="item-card" @click="dialogVisible = true; buyGood = good" :body-style="{ padding: '0px' }">
    <template #header>
      <div class="card-header" style="background-color: white;">
        <el-image style="width: 50px; height: 50px" :src="good.picture" />
      </div>
    </template>
    <p style="text-align: center; background-color:rgb(255, 245, 231); height: 40px;">价格：{{ good.price }}</p>
  </el-card>
 </el-col>
  </el-row>
    </div>
    <div style="margin-top: 10px;" v-show="goodShow2">
    <h1>经验卡</h1>
    <hr>
    <el-row :gutter="0">
    <el-col v-for="good in goods2" :span="3" class="goods2">
    <el-card class="item-card" @click="dialogVisible=true; buyGood=good" :body-style="{ padding: '0px'}">
        <template #header>
      <div class="card-header">
        <el-image style="width: 50px; height: 50px" :src=good.picture  />
      </div>
    </template>
    <p style="text-align: center; background-color:rgb(255, 245, 231); height: 40px;">价格：{{ good.price }}</p>
  </el-card>
 </el-col>
  </el-row>
    </div>
    <div style="margin-top: 10px;" v-show="goodShow3">
    <h1>宠物</h1>
    <hr>
    <el-row :gutter="0">
    <el-col v-for="good in goods3" :span="3" class="goods3">
    <el-card class="item-card" @click="dialogVisible=true; buyGood=good " :body-style="{ padding: '0px' }">
        <template #header style="background-color: white;">
    <el-image style="width: 70px; height: 70px" :src=good.picture  />
    </template>
    <p style="text-align: center; background-color:rgb(255, 245, 231); height: 40px;">价格：{{ good.price }}</p>
  </el-card>
 </el-col>
  </el-row>
    </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="购买物品"
    width="500"
    custom-class ="dialog"
    center
    :style="{ height: '400px' }"
    :before-close="handleClose">
    <div style="text-align: center;">
    <el-image style="width: 100px; height: 100px;" :src=buyGood.picture />
    </div>
    <h1 style="text-align: center;">{{ buyGood.name }}</h1>
    <p style="text-align: center;">{{ buyGood.description }}</p>
    <p style="text-align: center;">价格:{{ buyGood.price }}</p>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消购买</el-button>
        <el-button type="primary" @click="dialogVisible = false;buy()">
          立即购买
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>
  
  
  
  <style scoped>
.common-layout{
        height:580px;
        margin: 0px;
        padding: 0px;
      }
.header-card{
  display: flex;
  align-items: center;
  background-image: url("@/assets/导航栏.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size:100%;
}
.el-container {
  height: 100%;
}
.el-header
 {
  background-color:white;
  padding: 0px;
  border-left: none;
  height: 200px;
  
}

.el-aside {
  background-color:white;
  color: #333;
  line-height: 100%;
}

.el-main {
  background-color: white;
  color: #333;
}
.item-card{
    width: 130px;
    height: 160px;
    margin-top: 15px;
    border: none;
    padding: 0px;
}
.background-image
 {
  width: 100%;
  height: 100%;
}
.overlay-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog{
  
}
.touxiang{
  height: 150px;
  width: 150px;
  background-image: url("@/assets/头像.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size:100%;
}
  </style>
  