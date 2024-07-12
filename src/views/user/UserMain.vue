<script setup>
import {ref,onMounted} from "vue"
import {scheduleListService,scheduleUpdateStateService} from "@/api/schedule.js"
import {recommendService} from "@/api/tuisong.js"
import {ElMessage} from 'element-plus'
import {getPercentService} from "@/api/user";
import {
  Check
} from '@element-plus/icons-vue'
const formatDate = ref(new Date().toISOString().slice(0, 10))

const  date1= (date) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = (`0${d.getMonth() + 1}`).slice(-2)
  const day = (`0${d.getDate()}`).slice(-2)
  return `${year}-${month}-${day}`
}

const date = ref(date1(formatDate.value))
const todoList=ref([{
    scheduleId:1,
    starttime:"8:00",
    endtime:"9:00",
    title:"锻炼",
    content:"跳绳",
    state:"未完成",
    },
    {
    scheduleId:2,
    starttime:"9:00",
    endtime:"10:00",
    title:"锻炼",
    content:"吃饭",
    state:"未完成",
    }
])
const article=ref([])
const showArticle=ref([])
const scheduleList=async(day)=> {
        date.value=(day);
        let result=await scheduleListService(date.value);
        todoList.value=result.data;
}
scheduleList(date.value)
const updateState=async(row)=>{
  let result=await scheduleUpdateStateService(row.scheduleId);
  scheduleList(date.value);
  ElMessage.success("恭喜获得1金币");
  getPercent();
}

const recommend=async()=>{
  let result=await recommendService();
  article.value=result.data;
  console.log(article.value);
}
recommend();
const show=ref(false);
const customColors="#FED891";
const percent=ref(0);
const getPercent=async()=>{
  let result = await getPercentService();
  percent.value=result.data;
}
onMounted(async () => {
  await getPercent()
});

</script>


<template>
   <!-- 轮播图 -->
     <el-carousel :interval="5000" arrow="always" height="250px">
    <el-carousel-item v-for="item in article" :key="item"  @click="show=true;showArticle=item" :style="{ backgroundImage: 'url(' + item.cover + ')', backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',backgroundPosition: 'center' }" >
      <h3 text="2xl" justify="center"></h3>
    </el-carousel-item>
  </el-carousel>



<div style="background-color: rgb(254, 255, 213); position: relative; height: 70%;">
 <!-- 日历 -->
    <el-card class="calendar-container">
    <el-calendar >
      <template #header="{ date }">
        <span style="color:rgb(101, 67, 33); font-weight: 700;">{{ date }}</span>
      </template>
      <template #date-cell="{ data }"  >
        <p 
          :class="data.isSelected ? 'is-selected' : ''"
         @click="scheduleList(data.day)"
         class="custom-date-cell"
        >
          {{ data.day.split('-').slice(1).join('.') }}
          {{ data.isSelected ? '' : '' }}
        </p>
      </template>
    </el-calendar>
</el-card>
 <!-- 进度 -->
<div style="position: absolute; left: 43%; top: 30%; text-align: center;">
<el-progress type="circle" :percentage="percent" class="progress" :color="customColors"/>
<br>
<span style="font-size: large; color: rgb(254, 216, 145);">今日任务完成度</span>
</div>

 <!-- 计划表 -->
<el-card class="todo" style="background-color:rgb(254, 216, 145); ">
<p style="color: rgb(101, 67, 33); font-weight: 700;">{{date}}待办：</p>
<el-table :data="todoList" style="width: 100%;" :header-cell-style="{background:'#ffe177'}">
    <el-table-column prop="starttime" label="开始时间" width="90" />
    <el-table-column prop="endtime" label="结束时间" width="90" />
    <el-table-column prop="title" label="标题" />
    <el-table-column prop="content" label="内容" />
    <el-table-column prop="state" label="状态" />
    <el-table-column label="完成操作" width="90">
    <template #default="{ row }">
      <el-button type="success" :icon="Check" circle @click="updateState(row)"/>
    </template>
  </el-table-column>
  </el-table>
</el-card>
</div>
<el-dialog
    v-model="show"
    title="文章推送"
    fullscreen="true"
    :before-close="handleClose"
    class="dialog1"
  >
  <div style="height: 800px; margin-top: 0%; padding-top: 0%;">
   <h2 style="text-align: center; background-color: blanchedalmond;margin-top: 0%; padding-top: 0%; height: 50px;">标题：{{showArticle.title}}</h2>
   <el-image style="float: left;width: 40%; " :src="showArticle.cover" :fit="fill" />
  <div>
   <p v-html="showArticle.content" style="font-size: 20px;"></p>
  </div>
  </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="show = false">
          关闭
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>  
  <style scoped>
 
  .is-selected {
    background-color: #f0f0f0; 
  }
  .calendar-container {
  width: 500px; /* 设置日历容器的宽度 */
  height: 550px;
  padding: 0px;
  float: left;
  margin-right: 100px;
  position: relative;
  background-color:rgb(254, 216, 145) ;
  background-image: url("@/assets/日历.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  }
  .el-calendar {
  background-color: transparent;
  position: absolute;
  margin-left: -13px;
  color: rgb(101, 67, 33);
  width: 500px;
  left: 0px;
  top: 47px;
  /* background-image: url("@/assets/日历.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%; */

}
 .todo {
  width: 600px; 
  height: 550px;
  position: absolute;
  top:0%;
  right: 0px;
 }
 .el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}
.el-carousel-item{
  background-repeat:no-repeat;
	background-attachment:fixed; 
	background-size:cover;
}
:deep( .el-calendar-table .el-calendar-day){
  width: 100%;
  height: 65px;
  text-align: center;
  border: none;
}
:deep(.el-calendar-table .is-selected) {
  background-color: transparent !important;
  color: inherit;
  border: none !important;
}
:deep(.el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group){
    background-color:rgb(255, 225, 119);
    border-color: rgb(255, 225, 119);
  }

  </style>
  <style>
.dialog1 .el-dialog__header {
    background-color: blanchedalmond;
  }
</style>

