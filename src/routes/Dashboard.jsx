import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card"
import { useEffect, useState } from "react";
export default function Dashboard(){
const {USER} = useSelector(state => state)
const [name ,SET_name] = useState("")
const dis = useDispatch()
const cards = [ 
    {
        title : "إنشاء ملف إمتحان" , 
        description : "إنشاء إمتحان جديد من هنا" ,  
        ico : "create.svg" , 
        to : "/create-exam" , 
      } ,
      {
        title : "الإنضمام إلى إمتحان" , 
        description : "الإنضمام إلى إمتحان قائم من هنا" ,  
        ico : "join.svg" , 
        to : "/join-exam" , 
      } ,
      {
        title : "رفع إمتحان" , 
        description : "رفع ملف إمتحان من هنا" ,  
        ico : "upload.svg" , 
        to : "/upload-exam" , 
      } ,
      {
        title : "نتيجة الأمتحان" , 
        description : "يمكنك مشاهدة إحصانيات الامتحان من هنا" ,  
        ico : "result.png" , 
        to : "/exam-result" , 
      } ,
      {
        title : "تصحيح إمتحان" , 
        description : "تصحيح الأسئلة المقالية" ,  
        ico : "correct.png" , 
        to : "/correct-exam" , 
      } ,

      {
        title :  "قائمة المشاركات" , 
        description : "يمكنك مشاهدة إحصانيات مشاركاتك من هنا أو تسجيل الخروج منها" ,  
        ico : "share.svg" , 
        to : "/my-shares" , 
      } ,
      {
        title : "عنا" , 
        description :"من نحن",  
        ico : "about.png" , 
        to : "/about" , 
      } ,
] 


useEffect(() => {
      window.scrollTo(0 , 0)
  if(!USER){
    window.location.href = "/login"
  }else{
    SET_name(JSON.parse(USER).name)
  }
} , [])


    return (
      <>
      <div className="w-10/12 flex justify-start mt-4">
      <p className="text-xl dark:text-white m-0 text-right mt-2 font-bold ">مرحبا </p>
      <p className="text-xl dark:text-cyan-400 text-cyan-600  mr-2 m-0 text-right mt-2 font-bold underline">{name}</p>
      <p className="text-xl dark:text-white m-0 text-right mt-2 mr-1 font-bold "> !</p>
      </div>
      <div className="w-10/12 flex flex-wrap justify-evenly mt-8">
        {cards.map((i, index) => {
          return <Card obj={i} key={index} />;
        })}
        <a target="_blank" rel="noreferrer" href="https://whatsapp.com/channel/0029Vb6SJeRLI8Ye4vBeIj0u">
          <div className="cursor-pointer w-60 h-36 dark:bg-gray-100 bg-gray-800 bg-opacity-60 dark:bg-opacity-80 rounded-lg mb-10 flex flex-col items-center">
            <div className="flex w-10/12 mt-4">
              <img className="w-10 h-10" src={"/img/whatsapp.png"}></img>
              <div className="h-10 text-center font-sans flex items-center justify-center mr-2 font-bold text-lg dark:text-black text-white">
                <div>{"قناة الواتساب"}</div>
              </div>
            </div>
            <div className="w-10/12 mt-6 font-mono font-bold lg:text-sm h-fit text-xs text-center dark:text-gray-500 text-amber-200">
              {"لمتابعة التحديات على جوائز قيمة إشترك في قناتنا على الواتساب"}
            </div>
          </div>
        </a>
      </div>
      </>
    );
}