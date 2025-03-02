import Card from "../components/Card"
export default function Dashboard(){

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
        to : "/create-exam" , 
      } ,

      // {
      //   title :  "قائمة المشاركات" , 
      //   description : "يمكنك مشاهدة إحصانيات مشاركاتك من هنا" ,  
      //   ico : "share.svg" , 
      //   to : "/my-shares" , 
      // } ,
      // {
      //   title : "عنا" , 
      //   description :"",  
      //   ico : "about.png" , 
      //   to : "/about" , 
      // } ,
] 




    return <div className="w-10/12 flex flex-wrap justify-evenly mt-7">
        {cards.map((i , index)=>{return <Card obj={i} key={index} />})}
        </div>
}