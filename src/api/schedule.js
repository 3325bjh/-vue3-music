import request from '@/utils/request.js'
export const scheduleListService=(date)=>{
    return request.get("/schedule/list?date="+date)
}

export const scheduleUpdateStateService=(scheduleId)=>{
    return request.put("/schedule/updateState?scheduleId="+scheduleId)
}
export const scheduleCreateService=(schedule)=>{
    return request.post("/schedule/create",schedule)
}
export const scheduleAutoCreateService=(content)=>{
    return request.post("/schedule/aicreate?content="+content)
}

export const scheduleDeleteService=(id)=>{
    return request.delete("/schedule/delete?id="+id)
}
export const scheduleUpdateService=(schedule)=>{
    return request.put("/schedule/update",schedule)
}