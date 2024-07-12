<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const interests = ref([
    {
        "id": 3,
        "interestName": "美食",
        "createTime": "2023-09-02 12:06:59",
        "updateTime": "2023-09-02 12:06:59"
    },
    {
        "id": 4,
        "interestName": "娱乐",
        "createTime": "2023-09-02 12:08:16",
        "updateTime": "2023-09-02 12:08:16"
    },
    {
        "id": 5,
        "interestName": "军事",
        "createTime": "2023-09-02 12:08:33",
        "updateTime": "2023-09-02 12:08:33"
    }
])
//声明一个异步函数
import {interestListService,interestAddService,interestUpdateService,interestDeleteService} from '@/api/tuisong.js'
const interestList = async()=>{
    let result =await interestListService();
    interests.value=result.data;
}
interestList();

//控制添加分类弹窗
const dialogVisible = ref(false)

//添加分类数据模型
const interestModel = ref({
    interestName:''
})
//添加分类表单校验
const rules = {
    interestName: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ]
}


//调用接口，添加表单
import { ElMessage } from 'element-plus';
import { tr } from 'element-plus/es/locales.mjs';
const addInterest = async()=>{
    let result= await interestAddService(interestModel.value);
    ElMessage.success(result.msg?result.msg:'添加成功');

    //调用所有兴趣分类的函数
    interestList();
    dialogVisible.value=false;
}

//定义变量控制弹窗标题展示
const title = ref('')

//展示编辑弹窗
const showDialog=(row)=>{
    dialogVisible.value=true;
    title.value='编辑兴趣分类';
    //数据拷贝
    interestModel.value.interestName=row.interestName;
    //拓展id属性，将来传递给后台，完成分类的修改
    interestModel.value.interestId=row.interestId;
}

//编辑分类
const updateInterest =async()=>{
    let result= await interestUpdateService(interestModel.value);
    ElMessage.success(result.msg?result.msg:'修改成功');

    //调用所有兴趣分类的函数
    interestList();
    dialogVisible.value=false;
}

//清空模型的数据
const clearData=()=>{
    interestModel.value.interestName='';
}

//删除分类
import { ElMessageBox } from 'element-plus';
const deleteInterest=(row)=>{
    ElMessageBox.confirm(
    '你确认要删除该分类信息吗?',
    '温馨提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
        //调用接口
    let result= await interestDeleteService(row.interestId);
      ElMessage({
        type: '删除成功',
        message: '用户取消了删除',
      })
      //刷新页面
      interestList();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>兴趣分类</span>
                <div class="extra">
                    <el-button type="primary" @click="dialogVisible=true;title='添加兴趣分类';clearData()">添加分类</el-button>
                </div>
            </div>
        </template>
        <el-table :data="interests" style="width: 100%">
            <el-table-column label="序号" width="300" type="index"> </el-table-column>
            <el-table-column label="兴趣分类名称"  prop="interestName"></el-table-column>
            <el-table-column label="创建时间" prop="createTime"></el-table-column>
            <el-table-column label="上次更新时间" prop="createTime"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteInterest(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>

        <!-- 添加分类弹窗 -->
        <el-dialog v-model="dialogVisible"  :title="title" width="30%">
            <el-form :model="interestModel" :rules="rules" label-width="100px" style="padding-right: 20px">
                <el-form-item label="分类名称" prop="interestName">
                    <el-input v-model="interestModel.interestName" minlength="1" maxlength="10"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="title=='添加兴趣分类'?addInterest():updateInterest()"> 确认 </el-button>
                </span>
            </template>
        </el-dialog>        
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>