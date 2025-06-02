import { Button } from "@material-tailwind/react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


function App() {
const {USER} = useSelector(state => state)
const nav = useNavigate()

  return (
    <>
      <div className="flex justify-center w-10/12 h-fit mt-14 flex-wrap ">
      <img className="h-64 w-fit  rounded-2xl" src="/img/home.gif"/>
      <div className="flex flex-col mr-6 w-60 items-center  mt-2 ">
      <p className="font-sans text-xl dark:text-white w-52 text-wrap">منصتنا هي المكان المثالي لإقامة التحديات التعليمة وبث روح المنافسة في جميع الطلبة </p>
      {USER == undefined ? <div className="flex w-60 mt-3 justify-between ">
        <Button variant="filled" className="h-10 w-[120px] dark:bg-blue-700 cursor-pointer"  onClick={()=>{nav("/login")}}>تسجيل الدخول</Button>
      <Button variant="outlined" className="h-10 w-28 dark:bg-white dark:text-black text-xs  cursor-pointer" onClick={()=>{nav("/register/0")}}>إنشاء حساب</Button>
      </div> : <div className="flex w-52 mt-3 justify-center ">
        <Button variant="filled" className="h-10 w-[120px] dark:bg-blue-700  cursor-pointer" onClick={()=>{nav("/dashboard")}}>لوحة التحكم</Button>
      </div>}
      </div>
      </div>
    </>
  )
}

export default App
