import axios from "axios"
import {isLoading , Dialog_action } from "../redux/Types"

export default function useFetcher(method , URL , data , config = {}, dis , func) {


function Error_Handler(err){
    console.log(err)
    if(err.response === undefined){
        dis(Dialog_action({
            isDialog : true ,
            isCancelled : false , 
            isFail : true ,
            isSuccess : false ,
            title : "خطأ في الاتصال" ,
            body : "تم فقد الاتصال بالسيرفر" ,
            func : () => {
                dis(Dialog_action({
                    isDialog : false ,
                    isCancelled : false , 
                    isFail : false ,
                    isSuccess : false ,
                    title : "" ,
                    body : "" ,
                    func : () => {}
                }))
            }
        }))
    }else{
        dis(Dialog_action({
            isDialog : true ,
            isCancelled : false , 
            isFail : true ,
            isSuccess : false ,
            title : "خطأ في الاتصال" ,
            body : err.response.data.detail.ar_msg || err.response.data.detail.msg ,
            func : () => {
                dis(Dialog_action({
                    isDialog : false ,
                    isCancelled : false , 
                    isFail : false ,
                    isSuccess : false ,
                    title : "" ,
                    body : "" ,
                    func : () => {}
                }))
            }
        }))
    }
}


switch (method) {
    case "GET":
    dis(isLoading(true))
    axios.get(URL, config)
    .then((Res)=>{
    dis(isLoading(false))
    func(Res.data)
    })
    .catch((err)=>{Error_Handler(err)})
    

        break;
    case "POST":
        
dis(isLoading(true))
axios.post(URL  , data , config)
.then((Res)=>{
dis(isLoading(false))
func(Res.data)

})
.catch((err)=>{Error_Handler(err)})


        break;
    case "PUT":

    dis(isLoading(true))
    axios.put(URL  , data , config)
    .then((Res)=>{
    dis(isLoading(false))
    func(Res.data)
    })
    .catch((err)=>{Error_Handler(err)})


        break;
    case "DELETE":
        
    dis(isLoading(true))
    axios.delete(URL, config)
    .then((Res)=>{
    dis(isLoading(false))
    func(Res.data)
    })
    .catch((err)=>{Error_Handler(err)})
        break;
    default:
        break;


}

}