import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import useFetcher from "../hooks/useFetcher"
import CryptoJS from "crypto-js"
import { Dialog_action } from "../redux/Types"
import { Button } from "@material-tailwind/react"

export default function Correction(){

const {URL , token} = useSelector(state => state)
const dis = useDispatch()
const nav = useNavigate()
const {exam_id , password , exam_code} = useParams()
const [isStart , SET_isStart] = useState("not")
const [isLoaded , SET_isLoaded] = useState(false)
const [writtenList , SET_writtenList] = useState([]) 


const [cur_ques , SET_cur_ques] = useState("")
const [cur_correct_answer , SET_cur_correct_answer] = useState("")
const [cur_ques_id , SET_cur_ques_id] = useState(0)
const [cur_answer , SET_cur_answer] = useState("")
const [length_of_users_answers , SET_length_of_users_answers] = useState(0)
const [length_of_questions , SET_length_of_questions] = useState(0)
const [cur_index_of_users_answers , SET_cur_index_of_users_answers] = useState(0)
const [cur_index_of_questions , SET_cur_index_of_questions] = useState(0)
const [cur_user_id , SET_cur_user_id] = useState("")
const [count_of_answers , SET_count_of_answers] = useState(0)
const [data , SET_data] = useState([])





function Decrypt(text , key){
    try{
      const bytes = CryptoJS.AES.decrypt(text , key)
      const decrypted = bytes.toString(CryptoJS.enc.Utf8)
        return decrypted
    }catch {
        throw new Error("Decryption Error")
    }
}



function Correct(x){
    // Save Data
        let xdata = data.map((i)=>{return i})
        xdata.push({user_id : cur_user_id , question_id :cur_ques_id, isTrue : x ? 1 : 0})
        SET_data(xdata)
        SET_count_of_answers(count_of_answers - 1)

        // Next Answer
        let cur_user_index = cur_index_of_users_answers + 1

        if(cur_user_index  < length_of_users_answers){
            SET_cur_user_id(writtenList[cur_index_of_questions].users_answers[cur_user_index].user_id)
            SET_cur_answer(writtenList[cur_index_of_questions].users_answers[cur_user_index].answer)     
            SET_cur_index_of_users_answers(cur_index_of_users_answers + 1)   
        }else if(cur_user_index == length_of_users_answers){
            if(cur_index_of_questions + 1 < length_of_questions){
                    SET_cur_ques(writtenList[cur_index_of_questions + 1].question)
                    SET_cur_correct_answer(writtenList[cur_index_of_questions + 1].answer)
                    SET_cur_ques_id(writtenList[cur_index_of_questions + 1].question_id)
                    SET_cur_user_id(writtenList[cur_index_of_questions + 1].users_answers[0].user_id)
                    SET_cur_answer(writtenList[cur_index_of_questions + 1].users_answers[0].answer)
                    SET_length_of_users_answers(writtenList[cur_index_of_questions + 1].users_answers.length)   
                    SET_cur_index_of_questions(cur_index_of_questions + 1)
                    SET_cur_index_of_users_answers(0)
            }else{SET_isStart("done")}
        }


}




useEffect(()=>{
    useFetcher("GET" , URL + `/get-written-answer/?token=${token}&exam_id=${exam_id}&password=${password}` , {} , {} , dis , (x)=>{ 
       
    if(x.isDecrypted == 0){
        if(Decrypt(x.exam_choosen_answer[0].correct_answer , exam_code) == "" ||
             Decrypt(x.exam_written_questions[0].correct_answer , exam_code)== ""){
                dis(Dialog_action({
                    isDialog : true ,
                    isCancelled : false , 
                    isFail : true ,
                    isSuccess : false ,
                    title : "عملية غير ناجحة" ,
                    body :   "كود فك التشفير خاطئ" ,
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
                    }
                }))

          }else{
            let choosenList = []
            SET_writtenList(x.exam_written_questions)
            x.exam_choosen_answer.map((i)=>{
                choosenList.push({
                    question_id : i.question_id , 
                    answer : Decrypt(i.correct_answer , exam_code)
                })
            })
                    let yx = []
                            x.exam_written_questions.map((i)=>{
                                var z = []
                                x.users_answer.map((j)=>{
                                    if(j.question_id == i.question_id){
                                        z.push(
                                         { 
                                            answer : j.user_answer ,
                                            user_id : j.user_id
                                         }
                                        )
                                    }
                                })
                                yx.push({
                                    question_id : i.question_id , 
                                    question : i.question ,
                                    answer : Decrypt(i.correct_answer , exam_code) ,
                                    users_answers : z
                                })
                            })
                            SET_writtenList(yx)
       useFetcher("POST" , URL + `/post-decrypted-answer/?token=${token}&exam_id=${exam_id}` , {password : {password : password} , correct_answers : choosenList } , {} , dis , (y)=>{
        SET_isLoaded(true)
        dis(Dialog_action({
                    isDialog : true ,
                    isCancelled : false , 
                    isFail : false ,
                    isSuccess : true ,
                    title : "عملية ناجحة" ,
                    body :   y.detail.ar_msg ,
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
                    }
                }))}
            )
          }   
        }else if(x.isDecrypted == 1){
            useFetcher("GET" , URL + `/get-written-answer/?token=${token}&exam_id=${exam_id}&password=${password}` , {} , {} , dis , (x)=>{
                            let yx = []
                            x.exam_written_questions.map((i)=>{
                                var z = []
                                x.users_answer.map((j)=>{
                                    if(j.question_id == i.question_id){
                                        z.push(
                                         { 
                                            answer : j.user_answer ,
                                            user_id : j.user_id
                                         }
                                        )
                                    }
                                })
                                yx.push({
                                    question_id : i.question_id , 
                                    question : i.question ,
                                    answer : Decrypt(i.correct_answer , exam_code) ,
                                    users_answers : z
                                })
                            })
                            SET_writtenList(yx)
                            SET_isLoaded(true)
            })
        }
    })

},[])


if(isStart == "go"){
return (
      <div className="flex flex-col w-full items-center mt-10">
                <p className="text-2xl dark:text-white w-full m-0 text-center font-bold "> شاشة التصحيح</p>
                <p className="text-lg dark:text-white w-7/12 m-0 mt-2 text-right font-bold"> عدد الاجابات المتبقية : {count_of_answers}</p>
                <p className="text-lg dark:text-white w-7/12 m-0 mt-2 text-right font-bold"> السؤال : {cur_ques} ..؟</p>
                <div className="flex w-7/12 h-fit">
                <p className="text-lg dark:text-white w-2/12 m-0 mt-3 text-right font-bold">الإجابة الصحيحة : </p>
                <p className="text-lg text-green-500 w-2/12 m-0 mt-3 text-right font-bold">`{cur_correct_answer}`</p>
               </div>
               <p className="text-lg dark:text-white w-7/12 m-0 mt-2 text-right font-bold">الإجابة : </p>
            <textarea className="w-7/12 h-28 pr-4 mt-4 bg-white bg-opacity-65 dark:bg-opacity-80 outline-none rounded-md border-b-green-400 border-b-4" 
            placeholder={"xxxxxxxxx"}
            type={"text"}
            disabled
            value={cur_answer}
            ></textarea>
         <div className="flex w-1/3 justify-evenly mt-6 h-fit">
               <Button color="green" className="flex cursor-pointer justify-between mt-5" onClick={()=>{Correct(true)}}>✔ صح</Button>
               <Button color="red" className="flex cursor-pointer justify-between mt-5" onClick={()=>{Correct(false)}}>✗ خطأ</Button>
</div>
            </div>
)


}else if(isStart == "not"){
        return(    <div className="flex flex-col w-full items-center mt-20">
               <Button color="blue" className="flex cursor-pointer justify-between mt-5" onClick={()=>{
                if(isLoaded){
                    let counter = 0
                    writtenList.map((i)=>{
                       counter = counter + i.users_answers.length
                    })
                    SET_count_of_answers(counter)
                    SET_cur_ques(writtenList[0].question)
                    SET_cur_correct_answer(writtenList[0].answer)
                    SET_cur_ques_id(writtenList[0].question_id)
                    SET_cur_user_id(writtenList[0].users_answers[0].user_id)
                    SET_cur_answer(writtenList[0].users_answers[0].answer)
                    SET_length_of_questions(writtenList.length)
                    SET_length_of_users_answers(writtenList[0].users_answers.length)
                    SET_isStart("go")
                }
                else{
                    dis(Dialog_action({
                        isDialog : true ,
                        isCancelled : false , 
                        isFail : true ,
                        isSuccess : false ,
                        title : "عملية غير ناجحة" ,
                        body :   "يرجى إنتظار التحميل" ,
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
                        }
                    }))
                }
                }}>
                  الدخول إلى شاشة التصحيح
                </Button>
            </div>
            )}
else if(isStart == "done"){
    return(
        <div className="flex flex-col w-full items-center mt-10">
                <p className="text-2xl dark:text-white w-full m-0 text-center font-bold ">لقد إنتهت الإجابات </p>
                           <Button color="indigo" className="flex cursor-pointer justify-between mt-5" onClick={()=>{
                           useFetcher("POST" , URL + `/post-correction?exam_id=${exam_id}&token=${token}` , {password : {password : password} , corrected_answers : data} , {} , dis , (x) =>{
                             dis(Dialog_action({
                               isDialog : true ,
                               isCancelled : false , 
                               isFail : false ,
                               isSuccess : true ,
                               title : "عملية ناجحة" ,
                               body : "تم رفع التصحيح بنجاح" ,
                               func : ()=>{nav("/dashboard")}
                           }))
                           })
    console.log(data)

                           }}>
                              رفع التصحيح
                            </Button>
        </div>
    )
}




}