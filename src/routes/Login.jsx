import { Button, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Login() {


return(
    <div className="flex flex-col mt-12 w-72 h-fit items-center dark:bg-gray-200 rounded-2xl bg-amber-200">
        <p className="font-sans text-2xl mt-1 w-full text-center text-black">صفحة تسجيل الدخول</p>
        <p className="font-sans text-sm mt-1 w-full text-center text-black">أدخل بياناتك هنا للإستمرار</p>
    <div className="flex flex-col items-center gap-6 w-9/12 mt-6">
        <Input  variant="outlined" type="text" label="إسم المستخدم" color="blue" className="border-blue-700 text-blue-700"/>
        <Input   variant="outlined" type="password" label="كلمة السر" color="blue"  className="border-blue-700 text-blue-700"/>
    </div>
     <Button variant="filled" className="h-10 w-40 dark:bg-green-700 mt-10 rounded-xl cursor-pointer">تسجيل الدخول</Button>
     <Link to="/register">
        <p className="underline text-lg font-bold text-blue-700 mb-8 mt-4">ليس لديك حساب ؟ أنشئ حساباً</p>
        </Link>
    </div>

)


}