<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
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
  userLevel: "1",
  userExp: "1",
  gold: 0,
  honor:""
})
import { userGetInfoService, addExpService } from '@/api/user.js'
import { getService, useService } from '@/api/goods.js'
const getInfo = async () => {
  let result = await userGetInfoService();
  userInfo.value = result.data;
}
getInfo();
const goods = ref([
  {
    goodsId: 0,
    name: "",
    picture: "",
    price: "7",
    nums: "",
    description: "",
    addLevel: 0,
    addExp: 0,
    category: ""
  },
  {
    goodsId: 0,
    name: "",
    picture: "",
    price: "5",
    nums: "",
    description: "",
    addLevel: 0,
    addExp: "",
    category: ""
  }
]);
const goods1 = ref([
  {
    goodsId: 0,
    name: "",
    picture: "",
    price: "5",
    nums: "",
    description: "",
    addLevel: 0,
    addExp: 0,
    category: ""
  },
  {
    goodsId: 0,
    name: "",
    picture: "",
    price: "5",
    nums: "",
    description: "",
    addLevel: 0,
    addExp: 0,
    category: ""
  }
])
const goods2 = ref([
  {
    goodsId: 0,
    name: "",
    picture: "",
    price: "5",
    nums: "",
    description: "",
    addLevel: 0,
    addExp: 0,
    category: ""
  },
  {
    goodsId: 0,
    name: "",
    picture: "",
    price: "5",
    nums: "",
    description: "",
    addLevel: 0,
    addExp: 0,
    category: ""
  }
])
const goods3 = ref([
  {
    goodsId: 0,
    name: "",
    picture: "",
    price: "5",
    nums: "",
    description: "",
    addLevel: 0,
    addExp: 0,
    category: ""
  },
  {
    goodsId: 0,
    name: "",
    picture: "",
    price: "5",
    nums: "",
    description: "",
    addLevel: 0,
    addExp: 0,
    category: ""
  }
])
const useGood = ref({
  goodsId: 0,
  name: "",
  picture: "",
  nums: "",
  price: "",
  description: "",
  addLevel: 0,
  addExp: 0
})
const goodShow1 = ref(true);
const goodShow2 = ref(true);
const goodShow3 = ref(true);
const dialogVisible = ref(false)
const get = async () => {
  let result = await getService();
  let card1 = [];
  let card2 = [];
  let card3 = [];
  goods.value = result.data;
  for (let good in goods.value) {
    if (goods.value[good].category === "等级卡") {
      card1.push(goods.value[good])
    }
    else if (goods.value[good].category === "经验卡") {
      card2.push(goods.value[good])
    }
    else {
      card3.push(goods.value[good])
    }
  }
  goods1.value = card1;
  goods2.value = card2;
  goods3.value = card3;

}
get();

const use = async () => {
  console.log(useGood.value.id);
  let result1 = await useService(useGood.value.goodsId);
  let data = {
    addLevel: useGood.value.addLevel,
    addExp: useGood.value.addExp
  }
  console.log(data);
  let result2 = await addExpService(data);
  ElMessage.success("使用成功");
  getInfo();
  get();
}
</script>
<template>
  <div class="header-card" style=" color:rgb(101, 67, 33); height: 150px;">
    <div class="touxiang">
      <p style="font-size: 15px; color:rgb(34, 16, 14); font-weight: 900; position: absolute; left: 18px; top:90px">
        昵称：{{ userInfo.nickname }}</p>
      <p style="font-size: 15px; color:rgb(34, 16, 14); font-weight: 900; position: absolute; left: 18px; top:130px">
        头衔：{{ userInfo.honor }}</p>
      <el-image style="width: 27px; height: 37px;position: absolute;top:101px;left: 102px;" :src="userInfo.userPic" />
    </div>
  </div>
    <!-- <div class="header-card" style="background-color: #36205D; color: white; height: 165px;">
          <el-image style="width: 100px; height: 100px" :src="userInfo.userPic" :fit="fill" />
          <el-row :gutter="20" class="user-info" v-if="userInfo">
            <el-col span="24" style="font-size:13px;"> {{ userInfo.username }}</el-col>
            <el-col>@ {{ userInfo.nickname }}</el-col>
            <el-col span="8" style="font-size:13px;">等级: {{ userInfo.userLevel }}</el-col>
            <el-col span="8" style="font-size:13px;">经验: {{ userInfo.userExp }}</el-col>
            <el-col span="8" style="font-size:13px;">金币: {{ userInfo.gold }}</el-col>
          </el-row>
        </div> -->
    <div class="common-layout">
      <el-container>
        <el-aside width="200px" style="background-color:#FFFFE5 ;">
          <h5 class="mb-2" style="text-align: center;">筛选</h5>
          <el-menu default-active="2" class="el-menu-vertical-demo" style="height: 510px;" background-color="#FFFFE5">
            <el-menu-item index="1" @click="goodShow1 = true; goodShow2 = true; goodShow3 = true">
              <el-icon><icon-menu /></el-icon>
              <span>全部</span>
            </el-menu-item>
            <el-menu-item index="2" @click="goodShow1 = true; goodShow2 = false; goodShow3 = false">
              <el-icon><icon-menu /></el-icon>
              <span>等级卡</span>
            </el-menu-item>
            <el-menu-item index="3" @click="goodShow1 = false; goodShow2 = true; goodShow3 = false">
              <el-icon><icon-menu /></el-icon>
              <span>经验卡</span>
            </el-menu-item>
            <el-menu-item index="4" @click="goodShow1 = false; goodShow2 = false; goodShow3 = true">
              <el-icon><icon-menu /></el-icon>
              <span>宠物</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <div style="margin-top: 10px;" v-show="goodShow1">
              <h1>等级卡</h1>
              <el-row :gutter="0">
                <el-col v-for="good in goods1" :span="3" class="goods1">
                  <el-card class="item-card" @click="dialogVisible = true; useGood = good">
                    <el-image style="width: 80px; height: 80px" :src=good.picture />
                  </el-card>
                </el-col>
              </el-row>
            </div>
            <div style="margin-top: 10px;" v-show="goodShow2">
              经验卡
              <hr>
              <el-row :gutter="0">
                <el-col v-for="good in goods2" :span="3" class="goods2">
                  <el-card class="item-card" @click="dialogVisible = true; useGood = good">
                    <div class="card-header">
                      <el-image style="width: 80px; height: 80px" :src=good.picture />
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
            <div style="margin-top: 10px;" v-show="goodShow3">
              宠物
              <hr>
              <el-row :gutter="0">
                <el-col v-for="good in goods3" :span="3" class="goods3">
                  <el-card class="item-card">
                    <el-image style="width: 80px; height: 80px" :src=good.picture />
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <el-dialog v-model="dialogVisible" title="使用物品" width="500" class="custom-dialog" center
      :style="{ height: '400px' }" :before-close="handleClose">
      <div style="text-align: center;">
        <el-image style="width: 100px; height: 100px" :src=useGood.picture />
      </div>
      <h1 style="text-align: center;">{{ useGood.name }}</h1>
      <p style="text-align: center;">{{ useGood.description }}</p>
      <p style="text-align: center;">数量:{{ useGood.nums }}</p>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false; use()">
            使用
          </el-button>
        </div>
      </template>
    </el-dialog>
</template>



<style scoped>
.common-layout {
  height: 580px;
  margin: 0px;
  padding: 0px;
}

.el-container {
  height: 100%;
}

.el-aside {
  background-color: white;
  color: #333;
  line-height: 100%;
}

.el-main {
  background-color: white;
  color: #333;
}

.item-card {
  width: 130px;
  height: 150px;
  margin-top: 15px;
}

.header-card{
  display: flex;
  align-items: center;
  background-image: url("@/assets/导航栏.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size:100%;
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