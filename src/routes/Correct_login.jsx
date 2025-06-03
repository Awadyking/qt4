import { Button } from "@material-tailwind/react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useFetcher from "../hooks/useFetcher"
import { Dialog_action } from "../redux/Types"

export default function JoinCorrection(){

const [QUES_ID , SET_QUES_ID] = useState(localStorage.getItem("lastCreation"))
const [QUES_PASS , SET_QUES_PASS] = useState("")
const [QUES_CODE , SET_QUES_CODE] = useState("")
const {URL , token} = useSelector(state => state)
const dis = useDispatch()
const nav = useNavigate()



    return (
        <>
        <div className="flex flex-col w-full items-center mt-12">
            <p className="text-2xl dark:text-white w-full m-0 text-center font-bold ">كود الإختبار</p>
        <input className="w-80 h-12 pr-4 mt-5 bg-white bg-opacity-65 dark:bg-opacity-80 outline-none rounded-md border-b-green-400 border-b-4" 
        placeholder={"xxxxxxxxx"}
        type={"text"}
        value={QUES_ID}
        onChange={(e)=>{SET_QUES_ID(e.target.value)}}
        ></input>

        <p className="text-2xl dark:text-white w-full m-0 mt-6 text-center font-bold ">كلمة سر الإختبار</p>
        <input className="w-80 h-12 pr-4 mt-5 bg-white bg-opacity-65 dark:bg-opacity-80 outline-none rounded-md border-b-green-400 border-b-4" 
        placeholder={"xxxxxxxxx"}
        type={"text"}
        value={QUES_PASS}
        onChange={(e)=>{SET_QUES_PASS(e.target.value)}}
        ></input>

        <p className="text-2xl dark:text-white w-full m-0 mt-6 text-center font-bold ">كود فك تشفير الإجابات</p>
        <input className="w-80 h-12 pr-4 mt-5 bg-white bg-opacity-65 dark:bg-opacity-80 outline-none rounded-md border-b-green-400 border-b-4" 
        placeholder={"xxxxxxxxx"}
        type={"text"}
        value={QUES_CODE}
        onChange={(e)=>{SET_QUES_CODE(e.target.value)}}
        ></input>


           <Button color="orange" className="flex cursor-pointer justify-between mt-5" onClick={()=>{
            if(QUES_PASS != "" && QUES_ID != "" && QUES_CODE != ""){
                        useFetcher("GET" , URL + `/get-exam-details/?token=${token}&exam_id=${QUES_ID}` , {} , {} , dis , (x) =>{
                            nav(`/correction/${QUES_ID}/${QUES_PASS}/${QUES_CODE}`)
                            })
            }else{
                 dis(Dialog_action({
                            isDialog : true ,
                            isCancelled : false , 
                            isFail : true ,
                            isSuccess : false ,
                            title : "بيانات غير مكتملة" ,
                            body : "يرجى ملئ جميع الحقول" ,
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
           }}>
              الدخول إلى شاشة التصحيح
            </Button>
        </div>
        
        </>
    )
}