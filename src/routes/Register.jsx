import { Button, Input } from "@material-tailwind/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dialog_action} from "../redux/Types";

export default function Register(){

const dis = useDispatch()
const {URL, token} = useSelector(state => state)
useEffect(()=>{

dis(Dialog_action({
    isDialog : true ,
    isCancelled : false , 
    isFail : false ,
    isSuccess : false ,
    title : "تنظيم البيانات" ,
    body : "يرجى إدخال إسم المستخدم باللغة الإنجليزية و رقم هاتف عليه محفظة إلاكترونية و كلمة سر أكثر من 8 أحرف" ,
}))

},[])




    return(
        <div className="flex flex-col mt-10 w-96 h-fit items-center dark:bg-gray-200 rounded-2xl bg-amber-200">
            <p className="font-sans text-2xl mt-1 w-full text-center text-black">إنشاء حساب جديد</p>
            <p className="font-sans text-sm mt-1 w-full text-center text-black">أدخل بياناتك هنا للإستمرار</p>
        <div className="flex flex-wrap items-center gap-6 w-9/12 mt-6">
            <Input  label="إسم المستخدم" color="teal"/>
            <Input color="teal" label="الأسم" />
            <Input color="teal" label="البريد الإلكتروني (إختياري)" />
            <Input color="teal" label="رقم هاتف" />
            <Input color ="teal" label="كلمة السر" />
            <Input color="teal" label="تأكيد كلمة السر" />
        </div>
         <Button variant="filled" className="h-10 w-40 dark:bg-green-700 mt-10  rounded-xl cursor-pointer">إنشاء الحساب</Button>
        <Link to="/login">
        <p className="underline text-xl font-bold text-blue-700 mb-8 mt-4">هل لديك حساب ؟</p>
        </Link>
        </div>

    )
}