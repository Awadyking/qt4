import { Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Dialog_action} from "../redux/Types";
import useFetcher from "../hooks/useFetcher";

export default function Register(){

const dis = useDispatch()
const {URL} = useSelector(state => state)
const {code} = useParams()
const [username , SET_username] = useState('')
const [password , SET_password] = useState('')
const [re_password , SET_re_password] = useState('')
const [age , SET_age] = useState(0)
const [name , SET_name] = useState('')
const [phone , SET_phone] = useState('')
const [email , SET_email] = useState('')
const [invite , SET_invite] = useState("")


useEffect(()=>{

dis(Dialog_action({
    isDialog : true ,
    isCancelled : false , 
    isFail : false ,
    isSuccess : false ,
    title : "تنظيم البيانات" ,
   func : () => {
    dis(Dialog_action({
        isDialog : false ,
        isCancelled : false , 
        isFail : false ,
        isSuccess : false ,
        title : "" ,
        func : () => {},
        body : ""
    }))
    
   },
    body : "يرجى إدخال إسم المستخدم باللغة الإنجليزية و رقم هاتف عليه محفظة إلكترونية و كلمة سر أكثر من 8 أحرف" ,
}))



if(code != "0"){
    SET_invite("تمت دعوتك بواسطة")
    useFetcher("GET" , URL + `/get-invition?invite=${code}` , {} , {} , dis, (x) =>{
        SET_invite("تمت دعوتك بواسطة  " + `{ ${x.name} }`)
    }
)
}

},[])




    return(
        <>
        {invite !== "" ? 
        <div className="mt-10 w-64 bg-green-500 h-12 rounded-lg text-center text-white font-bold flex justify-center items-center text-sm">{invite}</div>:<></>}
        <div className="flex flex-col mt-6 mb-8 w-96 h-fit items-center dark:bg-gray-200 rounded-2xl bg-amber-200">
            <p className="font-sans text-2xl mt-1 w-full text-center text-black">إنشاء حساب جديد</p>
            <p className="font-sans text-sm mt-1 w-full text-center text-black">أدخل بياناتك هنا للإستمرار</p>
        <div className="flex flex-wrap items-center gap-6 w-9/12 mt-6">
            <Input  label="إسم المستخدم" color="teal" onChange={(e)=>{SET_username(e.target.value)}}/>
            <Input color="teal" label="الأسم" onChange={(e)=>{SET_name(e.target.value)}}/>
            <Input color="teal" label="البريد الإلكتروني (إختياري)" onChange={(e)=>{
                if(e.target.value.length > 0){SET_email(e.target.value)}
                else{SET_email(false)}
                }}/>
            <Input color="teal" label="رقم هاتف" type="text" onChange={(e)=>{SET_phone(e.target.value)}}/>
            <Input color="teal" label="العمر" type="number" onChange={(e)=>{SET_age(e.target.value)}}/>
            <Input color ="teal" label="كلمة السر" type="password" onChange={(e)=>{SET_password(e.target.value)}}/>
            <Input color="teal" label="تأكيد كلمة السر" type="password" onChange={(e)=>{SET_re_password(e.target.value)}}/>
        </div>
         <Button 
         variant="filled" 
         className="h-10 w-40 dark:bg-green-700 mt-10  
         rounded-xl cursor-pointer"
         onClick={()=>{
        
            if(password != re_password){
                dis(Dialog_action({
                    isDialog : true ,
                    isCancelled : false , 
                    isFail : true ,
                    isSuccess : false ,
                    title : "عملية غير ناجحة" ,
                    body : "كلمة السر غير متطابقة" ,
                    func : () => {
                        dis(Dialog_action({
                            isDialog : false ,
                            isCancelled : false , 
                            isFail : false ,
                            isSuccess : false ,
                            title : "" ,
                            func : () => {},
                            body : ""
                        }))
                    }
                }))
                return
            }

            if(username == "" || password == "" || re_password == "" || age == "" || name == "" || phone == "" ){
                dis(Dialog_action({
                    isDialog : true ,
                    isCancelled : false , 
                    isFail : true ,
                    isSuccess : false ,
                    title : "عملية غير ناجحة" ,
                    body : "يرجى إدخال جميع البيانات المطلوبة" ,
                    func : () => {
                        dis(Dialog_action({
                            isDialog : false ,
                            isCancelled : false , 
                            isFail : false ,
                            isSuccess : false ,
                            title : "" ,
                            func : () => {},
                            body : ""
                        }))
                    }
            }))
                return
            }
            if(email == ""){SET_email("")}

            if(code == "0"){
            useFetcher("POST" , URL + "/register" , {username , name , age , phone_number : phone , email , password} , {} , dis, () =>{
                dis(Dialog_action({
                isDialog : true ,
                isCancelled : false , 
                isFail : false ,
                isSuccess : true ,
                title : "عملية ناجحة" ,
                body : "تم إنشاء الحساب بنجاح" ,
                func : ()=>{window.location.href = "/login"}
            }))
           
         })
        }else{
            useFetcher("POST" , URL + "/register" , {username , name , age , phone_number : phone , email , password , join_code : code} , {} , dis, () =>{
                dis(Dialog_action({
                    isDialog : true ,
                    isCancelled : false , 
                    isFail : false ,
                    isSuccess : true ,
                    title : "عملية ناجحة" ,
                    body : "تم إنشاء الحساب ودعوتك بنجاح" ,
                    func : ()=>{window.location.href = "/login"}
                }))
             })
        }

        }}
         >إنشاء الحساب</Button>
        <Link to="/login">
        <p className="underline text-xl font-bold text-blue-700 mb-8 mt-4">هل لديك حساب ؟</p>
        </Link>
        </div>
        </>
    )
}