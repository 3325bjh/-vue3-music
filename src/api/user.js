import request from '@/utils/request.js'
export const userRegisterService=(registerData)=>{
    const params = new URLSearchParams()
    for(let key in registerData){
        params.append(key,registerData[key]);
    }
    return request.post("/user/register",params)

}
export const userLoginService=(loginData)=>{
    const params = new URLSearchParams()
    for(let key in loginData){
        params.append(key,loginData[key]);
    }
    return request.post("/user/login",params)
}
export const userGetInfoService=()=>{
    return request.get("/user/getInfo")
}

export const userUpdateServece=(userInfo)=>{
    return request.put("/user/update",userInfo)
}
export const userUpdatePwdService=(password)=>{
    return request.put("/user/updatePwd",password)
}
export const userUpdateHabitService=(habit)=>{
    return request.put("/interest/setIts?id="+habit);
}
export const userListService=(params)=>{
    return request.get("/user/list",{params:params})
}

export const userDeleteService=(id)=>{
    return request.delete("/user/delete?userId="+id);
}

export const userUpdateStateService=(updateData)=>{
    const params = new URLSearchParams()
    for(let key in updateData){
        params.append(key,updateData[key]);
    }
    return request.put("/user/updateState",params)
}
export const userResumeService=(resume)=>{
    return request.put("/user/addResume?resume="+resume)
}
export const addExpService=(data)=>{
    const params = new URLSearchParams()
    for(let key in data){
        params.append(key,data[key]);
    }
    return request.put("/user/addExp",params)
}
export const updatePicService=(url)=>{
    return request.put("/user/updatePic?pic="+url);
}
export const getPercentService=()=>{
    return request.get("/user/percent")
}
export const getRemindService=()=>{
    return request.get("/user/getremind")
}
export const updateRemindService=(isremind)=>{
    return request.put("/user/updateRemind?isremind="+isremind)
}