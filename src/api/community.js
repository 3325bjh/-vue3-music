import request from "@/utils/request";
export const postGetInfoService=(params)=>{
    return request.get("/community/list",{params:params})
}
export const postCreateService=(post)=>{
    return request.post("/community/create",post)
}
export const postGetDetailService=(id)=>{
    return request.get("/community/detail?id="+id)
}
export const commentGetInfoService=(postId)=>{
    return request.get("/comments/list?postId="+postId)
}
export const commentCreateService=(comment)=>{
    return request.post("/comments/create",comment)
}
export const postDeleteService=(postId)=>{
    return request.delete("/community/delete?postId="+postId)
}
export const commentDeleteService=(commentId)=>{
    return request.delete("/comments/delete?commentId="+commentId)
}
export const postGetAllService=(params)=>{
    return request.get("/community/all",{params:params})
}
export const postGetUserService=(params)=>{
    return request.get("/community/user",{params:params})
}
