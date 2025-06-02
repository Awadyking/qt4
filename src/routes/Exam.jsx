import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import useFetcher from "../hooks/useFetcher"
import { Button } from "@material-tailwind/react"
import Ques_Exam from "../components/Ques_Exam"
import { Dialog_action } from "../redux/Types"
export default function Exam() {

const [isWelcome , SET_isWelcome] = useState(true)
const [Min , SET_MIN] = useState("00")
const [Sec , SET_SEC] = useState("00")
const [Answers , SET_ANSWERS] = useState([])
const {URL , token} = useSelector(state => state)
const dis = useDispatch()
const nav = useNavigate()
const {id} = useParams()
const [Exam , SET_EXAM] = useState({
    exam : [
        {
            question_id : "" , 
            choices : []
        }
    ]
})
const [Exam_details , SET_EXAM_details] = useState({
    exam_info :{ 
    date : "" ,
    description : "" , 
    enter_time: 0 , 
    exam_time: 0 ,
    isCorrected: 0 , 
    isPrivate: 0 , 
    name : "" , 
    prize: "" , 
    } , 
    number_of_questions : 0
})




useEffect(()=>{
        useFetcher("GET" , URL + `/get-exam-details/?token=${token}&exam_id=${id}` ,
                     {} , {} , dis , (x) =>{SET_EXAM_details(x)})
                     
},[])


useEffect(()=>{

    
if(Min == "00" && Sec == "01" && Answers != []){
    useFetcher("POST" , URL + `/post-answer?exam_id=${id}&token=${token}` , {data : Answers} , {} , dis, () =>{
        dis(Dialog_action({
            isDialog : true ,
            isCancelled : false , 
            isFail : false ,
            isSuccess : true ,
            title : "عملية ناجحة" ,
            body : "لقد إنتهى الوقت وتم تسليم الإمتحان" ,
            func : ()=>{
                    dis(Dialog_action({
                        isDialog : false ,
                        isCancelled : false , 
                        isFail : false ,
                        isSuccess : false ,
                        title : "" ,
                        body :   "" ,
                        func : ()=>{}
                    })) ; 
                    nav("/dashboard")}
        }))
    })

}


} , [Min , Sec])


function Answer_Changer({question_id , answer}){
    const x = Answers
    const z = x.map((i)=>{
        if(i.question_id == question_id){i.answer = answer}
        return i
    })
    SET_ANSWERS(z)
}

function Upload_Answers(){
let isEmpty = false

for(let i = 0 ; i < Answers.length ; i++){
    const x = Answers
    if(x[i].answer == ""){
        isEmpty = true
    }
}


if(isEmpty){
        dis(Dialog_action({
            isDialog : true ,
            isCancelled : false , 
            isFail : true ,
            isSuccess : false ,
            title : "بيانات غير مكتملة" ,
            body : "يرجى عدم ترك أسئلة بدون إجابات" ,
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
    useFetcher("POST" , URL + `/post-answer?exam_id=${id}&token=${token}` , {data : Answers} , {} , dis, (x) =>{
        dis(Dialog_action({
            isDialog : true ,
            isCancelled : false , 
            isFail : false ,
            isSuccess : true ,
            title : "عملية ناجحة" ,
            body : x.ar_msg ,
            func : ()=>{
                      dis(Dialog_action({
                    isDialog : false ,
                    isCancelled : false , 
                    isFail : false ,
                    isSuccess : false ,
                    title : "" ,
                    body : "" ,
                    func : () => {}
                })); 
                localStorage.setItem("lastExam" , id)
                nav("/dashboard");
            }
        }))
    })
}

}



if(isWelcome){
    return(<div className="flex flex-col justify-center items-center w-full min-h-40">
        <div className="flex flex-col mt-12 w-72 h-fit items-center dark:bg-gray-600 bg-amber-200">
        <p className="text-center font-sans text-2xl mt-2 w-10/12 h-fit bg-red-600  rounded-full text-white">{Exam_details.exam_info.name}</p>
        <p className="font-sans text-lg h-fit mt-1 w-10/12 text-center dark:text-white">الوصف : {Exam_details.exam_info.description}</p>
        <p className="font-sans text-lg h-fit mt-1 w-10/12 text-center dark:text-white">مدة الدخول : {Exam_details.exam_info.screen_time} ثانيه</p>
        <p className="font-sans text-lg h-fit mt-1 w-10/12 text-center dark:text-white">مدة الاختبار : {Exam_details.exam_info.exam_time} ثانيه</p>
        <p className="font-sans text-lg h-fit mt-1 w-10/12 text-center dark:text-white">المكافاة : {Exam_details.exam_info.prize}</p>
        <p className="font-sans text-lg h-fit mt-1 w-10/12 text-center dark:text-white">عدد الاسئلة : {Exam_details.number_of_questions}</p>
        </div>
        <Button color="blue" className="mt-4 cursor-pointer" onClick={()=>{
                    useFetcher("PUT" , URL + `/put-exam/?exam_id=${id}&token=${token}` , {} , {} , dis, (x) =>{
                        SET_EXAM(x);
                        SET_isWelcome(false)
                        x.exam.map((i)=>{
                            let v = Answers
                            v.push({question_id : i.question_id , answer : ""})
                            SET_ANSWERS(v)
                        })
                        const currentDate = new Date().getTime() / 1000;
                        const FinishDate =Number(currentDate) + Number(x.config.screen_time)
                        const interval = setInterval(() => {
                        const diff = FinishDate - new Date().getTime() / 1000;
                            const min = Math.floor(diff / 60);
                            const sec = Math.floor(diff % 60) - 1;
                            SET_MIN(min < 10 ? `0${min}` : min);
                            SET_SEC(sec < 10 ? `0${sec}` : sec);
                            if(min == 0 && sec == 0){clearInterval(interval)}
                        }, 1000);
                    })
                        }}>إبدأ</Button>
    </div>)
}else{
        return (
          <div className="flex flex-col items-center mt-8 w-full ">
            <div className="w-32 h-16 bg-green-600 dark:bg-purple-600 justify-center items-center flex rounded-xl text-white text-2xl font-bold">
              <p className="m-0 text-center w-full">
                {Min}:{Sec}
              </p>
            </div>
            <div className="w-9/12">
            {Exam.exam.map((i , index)=>{
                return <Ques_Exam id={i.question_id} index={index} ques={i.question}
                 choices={i.choices} key={index} Change_Answer={(x)=>{Answer_Changer(x)}}/>
            })}
    </div>
    <div className="w-full h-fit flex justify-center mt-5 mb-5">
        <Button color="green" className="w-52 cursor-pointer" onClick={()=>{Upload_Answers()}}>تسليم الآن</Button>
    </div>
          </div>
        );
}
}