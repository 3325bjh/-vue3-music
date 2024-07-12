import request from '@/utils/request.js'
export const get1Service=()=>{
    return request.get("/goods/get1");
}
export const get2Service=()=>{
    return request.get("/goods/get2");
}
export const get3Service=()=>{
    return request.get("/goods/get3");
}
export const buyService=(buyData)=>{
    const params = new URLSearchParams()
    for(let key in buyData){
        params.append(key,buyData[key]);
    }
    return request.put("/goods/buy",params);
}
export const getService=()=>{
    return request.get("/bag/get");
}

export const useService=(goodsId)=>{
    return request.put("/bag/use?goodsId="+goodsId);
}
export const getPetsService=()=>{
    return request.get("/bag/getPets");
}