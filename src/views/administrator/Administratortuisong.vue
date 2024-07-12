<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'

import { ref } from 'vue'

//文章分类数据模型
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

//用户搜索时选中的分类id
const interestId = ref('')

//用户搜索时选中的发布状态
const state = ref('')

//文章列表数据模型
const interestPosts = ref([
    {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "cover": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "interestId": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    },
    {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "cover": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "interestId": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    },
    {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "cover": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "interestId": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    },
])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(5)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size
    interestPostList();
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    interestPostList();
}

//回写文章分类
import { interestListService, interestPostListService ,interestPostAddService } from '@/api/tuisong.js'
const interestList = async () => {
    let result = await interestListService();
    interests.value = result.data;
}

//获取文章列表数据
const interestPostList = async () => {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        interestId: interestId.value ? interestId.value : null,
        state: state.value ? state.value : null
    }
    let result = await interestPostListService(params);

    //渲染视图
    total.value = result.data.total;
    interestPosts.value = result.data.items;

    //处理数据，给数据模型拓展一个属性interestName，分类名称
    for (let i = 0; i < interestPosts.value.length; i++) {
        let interestpost = interestPosts.value[i];
        for (let j = 0; j < interests.value.length; j++) {
            if (interestpost.interestId == interests.value[j].interestId) {
                interestpost.interestName = interests.value[j].interestName;

            }
        }

    }
}
interestList();
interestPostList();


import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const interestPostModel = ref({
    title: '',
    interestId: '',
    cover: '',
    content: '',
    state: ''
})

//导入token
import { useTokenStore } from '@/stores/token.js';
import { ElMessage } from 'element-plus';
const tokenStore=useTokenStore();

//上传成功的回调函数
const uploadSuccess=(result)=>{
    interestPostModel.value.cover=result.data;
    console.log(result.data);
}

//添加文章
const addInterestPost =async(clickState)=>{

    //给数据模型提供发布状态
    interestPostModel.value.state=clickState;

    let result = await interestPostAddService (interestPostModel.value);

    ElMessage.success(result.msg?result.msg:'添加成功');

    //让抽屉消失
    visibleDrawer.value=false;
    interestPostList();

}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>推文管理</span>
                <div class="extra">
                    <el-button type="primary" @click="visibleDrawer = true">添加推文</el-button>
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="文章分类：">
                <el-select placeholder="请选择" v-model="interestId">
                    <el-option v-for="i in interests" :key="i.interestId" :label="i.interestName" :value="i.interestId">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="发布状态：">
                <el-select placeholder="请选择" v-model="state">
                    <el-option label="已发布" value="已发布"></el-option>
                    <el-option label="草稿" value="草稿"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click=interestPostList>搜索</el-button>
                <el-button @click="interestId = ''; state = ''; interestPostList()">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 文章列表 -->
        <el-table :data="interestPosts" style="width: 100%">
            <el-table-column label="文章标题" width="400" prop="title"></el-table-column>
            <el-table-column label="分类" prop="interestName"></el-table-column>
            <el-table-column label="发表时间" prop="createTime"> </el-table-column>
            <el-table-column label="状态" prop="state"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary"></el-button>
                    <el-button :icon="Delete" circle plain type="danger"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />

        <!-- 抽屉 -->
        <el-drawer v-model="visibleDrawer" title="添加文章" direction="rtl" size="50%">
            <!-- 添加文章表单 -->
            <el-form :model="interestPostModel" label-width="100px">
                <el-form-item label="文章标题">
                    <el-input v-model="interestPostModel.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="文章分类">
                    <el-select placeholder="请选择" v-model="interestPostModel.interestId">
                        <el-option v-for="i in interests" :key="i.interestId" :label="i.interestName"
                            :value="i.interestId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章封面">

                    <!-- 
                    auto-upload:是否自动上传
                    action: 服务器接口路径
                    name: 上传的文件字段名
                    headers: 设置上传的请求头
                    on-success: 上传成功的回调函数 -->

                    <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false"
                    action="/api/upload"
                    name="file"
                    :headers="{'Authorization':tokenStore.token}"
                    :on-success="uploadSuccess"
                    >
                        <img v-if="interestPostModel.cover" :src="interestPostModel.cover" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="文章内容">
                    <div class="editor">
                        <quill-editor theme="snow" v-model:content="interestPostModel.content" contentType="html">
                        </quill-editor>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addInterestPost('已发布')">发布</el-button>
                    <el-button type="info" @click="addInterestPost('草稿')">草稿</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
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

/* 抽屉样式 */
.avatar-uploader {
    :deep() {
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
    }
}

.editor {
    width: 100%;

    :deep(.ql-editor) {
        min-height: 200px;
    }
}
</style>