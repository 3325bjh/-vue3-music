import request from '@/utils/request.js'
export const administratorLoginService=(loginData)=>{
    const params = new URLSearchParams()
    for(let key in loginData){
        params.append(key,loginData[key]);
    }
    return request.post("/administrator/login",params)
}

export const administratorGetName=()=>{
    return request.get("/administrator/getName")
}