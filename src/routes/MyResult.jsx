import { Button } from "@material-tailwind/react"
import { useState } from "react"
import useFetcher from "../hooks/useFetcher"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export default function MyResult(){

const [QUES_ID , SET_QUES_ID] = useState(localStorage.getItem("lastExam"))
const [isResult , SET_isResult] = useState(false)
const {URL , token} = useSelector(state => state)
const dis = useDispatch()
const nav = useNavigate()



if(isResult == false){
    return (
        <>
        <div className="flex flex-col w-full items-center mt-20">
            <p className="text-2xl dark:text-white w-full m-0 text-center font-bold ">كود الإختبار</p>
        <input className="w-80 h-12 pr-4 mt-5 bg-white bg-opacity-65 dark:bg-opacity-80 outline-none rounded-md border-b-green-400 border-b-4" 
        placeholder={"xxxxxxxxx"}
        type={"text"}
        value={QUES_ID}
        onChange={(e)=>{SET_QUES_ID(e.target.value)}}
        ></input>
           <Button color="lime" className="flex cursor-pointer justify-between mt-5" onClick={()=>{
            useFetcher("GET" , URL + `/get-exam-details/?token=${token}&exam_id=${QUES_ID}` , {} , {} , dis , (x) =>{})
           }}>
              عرض النتيجة
            </Button>
        </div>
        
        </>

        )
}else if(isResult == true){

}


}