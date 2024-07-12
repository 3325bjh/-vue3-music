<script setup>
import {ref} from "vue"
import {ElMessage} from 'element-plus'
import {
  Check,
  Delete,
  Edit
} from '@element-plus/icons-vue'
const schedule=ref([{
    scheduleId:1,
    title:"锻炼",
    content:"跳绳",
    starttime:"8:00",
    endtime:"9:00",
    state:"未完成",
    date:"2024-07-06",
    emailId:""
    },
    {
    scheduleId:2,
    starttime:"9:00",
    endtime:"10:00",
    title:"锻炼",
    content:"吃饭",
    state:"未完成",
    date:"2024-07-06",
    emailId:""
    }
])
const scheduleCommit=ref({
    title:"",
    content:"",
    starttime:"",
    endtime:"",
    date:""
})
const mail=ref({
  id:"",
  tos:"",
  subject:"",
  content:"",
  date:"",
})
const formatDate = ref(new Date().toISOString().slice(0, 10))
import {scheduleListService,scheduleCreateService,scheduleAutoCreateService,scheduleDeleteService,scheduleUpdateService} from '@/api/schedule.js'
import {sendEmailService,canselEmailService} from '@/api/mail.js'
import {userGetInfoService} from '@/api/user.js'
const  date1= (date) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = (`0${d.getMonth() + 1}`).slice(-2)
  const day = (`0${d.getDate()}`).slice(-2)
  return `${year}-${month}-${day}`
}
const data1=ref(date1(formatDate.value));//日期
const show=ref(false);
const show1=ref(false);
const scheduleList=async()=> {
        let result=await scheduleListService(data1.value);
        schedule.value=result.data;
}
scheduleList();
const create=async()=>{
    let result=await scheduleCreateService(scheduleCommit.value);
    data1.value=scheduleCommit.value.date;
    scheduleList();
    ElMessage.success("添加成功");
    let result1=await userGetInfoService();
    mail.value={
      id:result.data,
      tos:result1.data.email,
      subject:"提醒",
      content:"请完成计划"+scheduleCommit.value.content,
      date:scheduleCommit.value.date+" "+scheduleCommit.value.starttime
    }
    console.log(mail.value.date);
    let result2=await sendEmailService(mail.value);
    show.value=false;
    scheduleCommit.value={
    title:"",
    content:"",
    starttime:"",
    endtime:"",
    date:""
    }
   
}
const update=async()=>{
    let result=await scheduleUpdateService(scheduleCommit.value);
    data1.value=scheduleCommit.value.date;
    scheduleList();
    ElMessage.success("更改成功");
    show1.value=false;
    scheduleCommit.value={
    title:"",
    content:"",
    starttime:"",
    endtime:"",
    date:""
    }
}
const input=ref("");
const autoCreate=async()=>{
    let result=await scheduleAutoCreateService(input.value);
    scheduleList();
    ElMessage.success("Ai定制计划成功")
}
const scheduleDelete=async(row)=>{
    console.log(row.scheduleId)
    let result=await scheduleDeleteService(row.scheduleId);
    let result1=await canselEmailService(row.emailId);
    scheduleList();
    ElMessage.success("删除成功")
}


</script>
<template>
 <div class="common-layout">
    <el-container>
      <el-aside width="50%">
        <el-card class="asideCard" >
    <h1 style="text-align: center; color: #017d3f;">已制定计划</h1>
    <el-row :gutter="600">
    <el-col :span="12">
    <div class="block" >
      <span class="demonstration" style="color: #017d3f;">选择日期</span>
      <el-date-picker
        v-model="data1"
        type="date"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        placeholder="选择一天"
        @change="scheduleList()"
        popper-class="SelectPopper"
      />
    </div>
    </el-col>
    <el-col :span="12">
    <el-button type="primary" @click="show=true" color="#017d3f">新建计划</el-button>
    </el-col>
    </el-row>
    <el-table :data="schedule" style="width: 100%"  :cell-style="{background:'#f0f9eb'}" :header-cell-style="{background:'#f0f9eb'}">
    <el-table-column prop="date" label="日期" width="110" />
    <el-table-column prop="title" label="标题" width="100" />
    <el-table-column prop="content" label="内容" width="110" />
    <el-table-column prop="starttime" label="开始时间"  />
    <el-table-column prop="endtime" label="结束时间" />
    <el-table-column prop="state" label="完成情况" />
    <el-table-column label="编辑" width="70">
    <template #default="{ row }" >
      <el-button type="success" :icon="Edit" circle @click="show1=true;scheduleCommit=row" />
    </template>
  </el-table-column>
  <el-table-column label="删除" width="70" >
    <template #default="{ row }">
      <el-button type="danger" :icon="Delete" circle @click="scheduleDelete(row)"/>
    </template>
  </el-table-column>
  </el-table>
    </el-card>
    </el-aside>
    <el-main >
    <el-card class="mainCard">
        <h1 style="text-align: center; color: #017d3f;">吉伊为你定制计划</h1>
        <img src="@/assets/icon.png" style="height: 500px;"/>
      <br>
      <el-row :gutter="100">
        <el-col :span="12">
      <el-input v-model="input" style="width: 240px" placeholder="输入内容自动生成计划" />
    </el-col>
    <el-col :span="12">
      <el-button  @click="autoCreate" color="#017d3f">生成计划</el-button>
    </el-col>
      </el-row>

    </el-card>
    </el-main>
    </el-container>
  </div>
  <el-dialog v-model="show" title="新建计划">
  <el-form :model="scheduleCommit" label-width="auto" style="max-width: 600px" >
    <el-form-item label="标题">
      <el-input v-model="scheduleCommit.title" />
    </el-form-item>
    <el-form-item label="日期">
      <el-col :span="11">
        <el-date-picker
          type="date"
          v-model="scheduleCommit.date"
          placeholder="选择日期"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
    </el-form-item>
    <el-form-item label="内容">
      <el-input  v-model="scheduleCommit.content"/>
    </el-form-item>
    <el-form-item label="开始时间">
        <el-time-picker
      v-model="scheduleCommit.starttime"
      arrow-control
      placeholder="Arbitrary time"
      value-format="HH:mm"
    />
    </el-form-item>
    <el-form-item label="结束时间">
        <el-time-picker
      v-model="scheduleCommit.endtime"
      arrow-control
      placeholder="Arbitrary time"
      value-format="HH:mm"
    />
    </el-form-item>
   <el-form-item>
      <el-button type="primary" @click="create">建立</el-button>
      <el-button @click="show=false">取消</el-button>
    </el-form-item>
  </el-form>
</el-dialog>


<el-dialog v-model="show1" title="更改计划">
  <el-form :model="scheduleCommit" label-width="auto" style="max-width: 600px" >
    <el-form-item label="标题">
      <el-input v-model="scheduleCommit.title" />
    </el-form-item>
    <el-form-item label="日期">
      <el-col :span="11">
        <el-date-picker
          type="date"
          v-model="scheduleCommit.date"
          placeholder="选择日期"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
    </el-form-item>
    <el-form-item label="内容">
      <el-input  v-model="scheduleCommit.content"/>
    </el-form-item>
    <el-form-item label="开始时间">
        <el-time-picker
      v-model="scheduleCommit.starttime"
      arrow-control
      placeholder="Arbitrary time"
      value-format="h:mm"
    />
    </el-form-item>
    <el-form-item label="结束时间">
        <el-time-picker
      v-model="scheduleCommit.endtime"
      arrow-control
      placeholder="Arbitrary time"
      value-format="h:mm"
    />
    </el-form-item>
   <el-form-item>
      <el-button type="primary" @click="update">更改</el-button>
      <el-button @click="show=false">取消</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
</template>

<style scoped>
.common-layout{
  background-color:#FFFFE5;
}
.asideCard{
    width: 99%;
    height: 100%;
    background-color:rgb(229, 239, 214);
}
.mainCard{
    width: 99%;
    height: 99%;
    background-color:rgb(229, 239, 214);
    overflow: auto;
    display: flex;
    justify-content: center;
}
.el-aside{
    overflow: hidden;
    margin-top: 17px;
    height: 680px;
   
}
.el-main{
    height: 720px;
}
</style>