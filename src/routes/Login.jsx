import { Button, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import useFetcher from "../hooks/useFetcher";
import { useDispatch, useSelector } from "react-redux";
import { Dialog_action, token_action, USER_action} from "../redux/Types";
import { useState } from "react";

export default function Login() {
const [username , SET_username] = useState('')
const [password , SET_password] = useState('')
const {URL} = useSelector(state => state)
const dis = useDispatch()


return(
    <div className="flex flex-col mt-12 w-72 h-fit items-center dark:bg-gray-200 rounded-2xl bg-amber-200">
        <p className="font-sans text-2xl mt-1 w-full text-center text-black">صفحة تسجيل الدخول</p>
        <p className="font-sans text-sm mt-1 w-full text-center text-black">أدخل بياناتك هنا للإستمرار</p>
    <div className="flex flex-col items-center gap-6 w-9/12 mt-6">
        <Input  variant="outlined" type="text" label="إسم المستخدم" color="blue" className="border-blue-700 text-blue-700" onChange={(e)=>{SET_username(e.target.value)}}/>
        <Input   variant="outlined" type="password" label="كلمة السر" color="blue"  className="border-blue-700 text-blue-700" onChange={(e)=>{SET_password(e.target.value)}}/>
    </div>
     <Button variant="filled" className="h-10 w-40 dark:bg-green-700 mt-10 rounded-xl cursor-pointer"
     onClick={()=>{
        useFetcher("POST" , URL + "/login" , {username , password} , {} , dis, (x) =>{
        dis(token_action(x.token))
        dis(USER_action(JSON.stringify(x.user_info)))
        dis(Dialog_action({
            isDialog : true ,
            isCancelled : false , 
            isFail : false ,
            isSuccess : true ,
            title : "عملية ناجحة" ,
            body : "تم تسجيل الدخول بنجاح" ,
            func : ()=>{window.location.href = "/"}
        }))
        })
        
     }}
     >تسجيل الدخول</Button>
     <Link to="/register/0">
        <p className="underline text-lg font-bold text-blue-700 mb-8 mt-4">ليس لديك حساب ؟ أنشئ حساباً</p>
        </Link>
    </div>

)


}