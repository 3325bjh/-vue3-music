import request from "@/utils/request";
export const getData1Service=()=>{
    return request.get("/data/chart1");}
export const getDateService=()=>{
    return request.get("/data/date");}
export const getData2Service=()=>{
    return request.get("/data/chart2");}
export const getData3Service=()=>{

    return request.get("/data/chart3");
}
export const getData4Service=()=>{
    return request.get("/data/chart4");
}
export const getData5Service=()=>{
    return request.get("/data/chart5");
}
export const getData6Service=()=>{
    return request.get("/data/chart6");
}