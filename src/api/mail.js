import request from '@/utils/request.js'
export const sendEmailService=(eamil)=>{
    request.post("/mail/send",eamil);
}

export const canselEmailService=(eamilId)=>{
    request.post("/mail/cancel?emailId="+eamilId)
}