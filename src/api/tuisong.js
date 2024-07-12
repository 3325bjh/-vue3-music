import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token.js'

//兴趣分类列表查询
export const interestListService = ()=>{
    //const tokenStore = useTokenStore();
    //在pinia中定义的响应式数据,都不需要.value
    // return request.get('/interest',{headers:{'Authorization':tokenStore.token}})
    return request.get('/interest')
}

//兴趣分类添加
export const interestAddService = (interestData)=>{
    return request.post('/interest',interestData)
}

//兴趣分类修改
export const interestUpdateService = (interestData)=>{
   return  request.put('/interest',interestData)
}

//兴趣分类删除
export const interestDeleteService = (id)=>{
    return request.delete('/interest?id='+id)
}

//推文列表查询
export const interestPostListService = (params)=>{
   return  request.get('/interestpost',{params:params})
}

//文章添加
export const interestPostAddService = (interestPostData)=>{
    return request.post('/interestpost',interestPostData);

}

export const recommendService=()=>{
    return request.get("/recommend");
}