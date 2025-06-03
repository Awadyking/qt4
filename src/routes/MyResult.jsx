import { Button } from "@material-tailwind/react"
import { useState } from "react"
import useFetcher from "../hooks/useFetcher"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"


export default function MyResult(){

const [EXAM_ID , SET_EXAM_ID] = useState(localStorage.getItem("lastExam"))
const [isResult , SET_isResult] = useState(false)
const [data , SET_data] = useState({})
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
        value={EXAM_ID}
        onChange={(e)=>{SET_EXAM_ID(e.target.value)}}
        ></input>
           <Button color="lime" className="flex cursor-pointer justify-between mt-5" onClick={()=>{
            useFetcher("GET" , URL + `/get-myDegree?token=${token}&exam_id=${EXAM_ID}` , {} , {} , dis , (x) =>{
                SET_data(x)
                SET_isResult(true)
            })
           }}>
              عرض النتيجة
            </Button>
        </div>
        
        </>

        )
}else if(isResult == true){
    return (
        <>
        <div className="flex flex-col w-full items-center mt-10">
            <p className="text-2xl dark:text-white w-full m-0 text-center font-bold " >نتيجة الإمتحان</p>
            <div className="flex lg:w-4/12 justify-evenly mt-6 w-7/12">
            <div className="w-24 h-20 rounded-2xl bg-purple-500 text-center text-2xl text-white flex items-center justify-center font-bold">%{Math.floor((data.my_degree / data.full_degree) * 100)}</div>
            <div className="w-16 h-20 rounded-2xl bg-cyan-500 text-center flex flex-col text-2xl text-white items-center font-bold pt-1">
                        <p>{data.my_degree}</p>
                        <hr className="w-9/12 border-2 border-white"/>
                        <p>{data.full_degree}</p>
                 </div>            
        </div>
             <Link to={`/rank/${EXAM_ID}`}>
                 <p className="w-full text-xl underline m-0 mt-4 text-center dark:text-teal-400 text-amber-600 font-bold">لمشاهدة الترتيب أنقر هنا</p>
                 </Link>
                <p className="w-full text-2xl underline m-0 mt-6 text-center dark:text-white font-bold">الإجابات </p>

            {data.user_answers.map((i , index)=>{
                if(i.isTrue == 1){
                    return(
                        <div className="flex flex-col w-64 items-center h-32 bg-green-500 mt-4 rounded-2xl justify-evenly">
                            <p className="w-full text-lg mt-2 m-0 text-right text-white font-bold pr-2">السؤال {index + 1} :</p>
                            <div className="flex w-9/12 justify-between bg-gray-100 items-center pr-2 pl-2">
                                <p className="w-full text-lg mt-2 m-0 text-right text-dark font-bold">{i.answer}</p>
                                ✅
                            </div>
                        </div>
                    )
                }else{
                    return(
                        <div className="flex flex-col w-64 items-center h-36 bg-red-500 mt-4 rounded-2xl justify-evenly ">
                            <p className="w-full text-lg mt-2 m-0 text-right text-white font-bold pr-2">السؤال {index + 1} :</p>
                            <div className="flex w-9/12 justify-between bg-gray-100 items-center pr-2 pl-2">
                                <p className="w-full text-lg mt-2 m-0 text-right text-dark font-bold">{i.answer}</p>
                                ❌
                            </div>
                            <div className="flex w-9/12 justify-between bg-gray-100 items-center pr-2 pl-2">
                                <p className="w-full text-lg mt-2 m-0 text-right text-dark font-bold">{i.correct_answer}</p>
                                ✅
                            </div>

                        </div>
                    )
                }
            })}
            <div className="mb-10"></div>
        </div>
        </>
    )
}


}