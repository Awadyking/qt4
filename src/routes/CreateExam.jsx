import { useState } from "react"
import Field from "../components/Field"
import Ques from "../components/Ques"
import { Button } from "@material-tailwind/react"
import CryptoJS from "crypto-js"
import { useDispatch } from "react-redux"
import { Dialog_action } from "../redux/Types"





export default function CreateExam() {

const Alphent = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let QUES_SECRET_KEY = ""
let ANSWER_SECRET_KEY = ""

const [QUES_SECRET_KEY_SHOW , SET_QUES_SECRET_KEY_SHOW] = useState("")
const [ANSWER_SECRET_KEY_SHOW , SET_ANSWER_SECRET_KEY_SHOW] = useState("")

const dis = useDispatch()
const [NAME , SET_NAME] = useState("")
const [isFetched , SET_isFetched] = useState(false)
const [DESC , SET_DESC] = useState("")
const [TIME , SET_TIME] = useState("")
const [ENTER_TIME , SET_ENTER_TIME] = useState("")
const [PRIZE , SET_PRIZE] = useState("")
const [PASS , SET_PASS] = useState("")
const [QUESTIONS , SET_QUESTIONS] = useState([
    {
        index : 0 ,
        Ques_value : "" ,
        Type_value : "choose" ,
        Correct : "" ,
        Choices : ["" , ""]
    }
])


function Encrypt(text , key){
    try{
        return CryptoJS.AES.encrypt(text , key).toString()
    }catch {
        throw new Error("Encryption Error")
    }
}



function Save(){
    
for(let i = 0 ; i < 10 ; i++){
        QUES_SECRET_KEY += Alphent.charAt(Math.floor(Math.random() * Alphent.length))
        ANSWER_SECRET_KEY += Alphent.charAt(Math.floor(Math.random() * Alphent.length))
}


SET_ANSWER_SECRET_KEY_SHOW(ANSWER_SECRET_KEY);
SET_QUES_SECRET_KEY_SHOW(QUES_SECRET_KEY);

const exam =     {
    config : {
        name : Encrypt(NAME , QUES_SECRET_KEY) ,
        description : Encrypt(DESC , QUES_SECRET_KEY) , 
        prize : Encrypt(PRIZE , QUES_SECRET_KEY) , 
        password : Encrypt(PASS , QUES_SECRET_KEY) , 
        enter_time : Encrypt(ENTER_TIME , QUES_SECRET_KEY) ,
        exam_time : Encrypt(TIME , QUES_SECRET_KEY) , 
    } , 
    exam : QUESTIONS.map((i)=>{
            if(i.Type_value == "choose"){i.Type_value = true}else{i.Type_value = false}
        return {
            question : Encrypt(i.Ques_value , QUES_SECRET_KEY) , 
            isChoosen : i.Type_value, 
            correct_answer : Encrypt(i.Correct , ANSWER_SECRET_KEY), 
            choices : i.Choices.map((j)=>{
                return Encrypt(j , QUES_SECRET_KEY)
            })
        }
    })
}


    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(exam)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "exam.json";
    link.click();
    SET_isFetched(true)


}


const Fields = [
    {
        label : "اسم الاختبار :" , 
        place : "xxxx" , 
        value : NAME, 
        setValue : SET_NAME,
        type : "text" , 
        bcolor : "#03fc84" ,
        focus : true ,
        disabled : false
    } ,
    {
        label : "وصف الاختبار :" , 
        place : "xxxx" , 
        value : DESC, 
        setValue : SET_DESC,
        type : "text" , 
        bcolor : "#03fc84" ,
        focus : false ,
        disabled : false
    } ,
    {
        label : "وقت الدخول الاختبار (بالثواني) : " , 
        place : "xxxx" , 
        value : ENTER_TIME, 
        setValue : SET_ENTER_TIME,
        type : "number" , 
        bcolor : "#03fc84" ,
        focus : false ,
        disabled : false
    } ,
    {
        label : "مدة الاختبار (بالثواني) : " , 
        place : "xxxx" , 
        value : TIME, 
        setValue : SET_TIME,
        type : "number" , 
        bcolor : "#03fc84" ,
        focus : false ,
        disabled : false
    } ,
    {
        label : "جائزة الاختبار :" , 
        place : "xxxx" , 
        value : PRIZE, 
        setValue : SET_PRIZE,
        type : "text" , 
        bcolor : "#03fc84" ,
        focus : false ,
        disabled : false
    } ,
    {
        label : "كلمة سر الاختبار :" , 
        place : "xxxx" , 
        value : PASS, 
        setValue : SET_PASS,
        type : "password" , 
        bcolor : "#03fc84" ,
        focus : false ,
        disabled : false
    } ,

]


function Ques_Changer(i , Ques_value , Type_value , Correct , Choices){

SET_QUESTIONS(
    QUESTIONS.map((j , ind)=>{
                return ind == i ? {
                    index : i , 
                     Ques_value : Ques_value , 
                     Type_value : Type_value , 
                     Correct : Correct , 
                     Choices : Choices
                    } : j
                    }))

}

function Remove_Ques(index){
    SET_QUESTIONS(QUESTIONS.filter((i , ind)=>{return ind != index}))
}


if(!isFetched){
    return (
    <>
    <p className="w-full m-0 font-bold dark:text-white text-2xl text-center mt-3 underline">إعدادات الاختبار</p>
    <div className="w-10/12 lg:w-5/12 flex flex-wrap mt-8 justify-evenly">
{Fields.map((i , index)=>{return <Field
                    label={i.label} 
                    place={i.place} 
                    value={i.value}
                    setValue={i.setValue}
                    type={i.type} 
                    bcolor={i.bcolor}
                    focus={i.focus}
                    disabled={i.disabled}
                    key={index}
                    />})}

    </div>
    <p className="w-full m-0 font-bold dark:text-white text-2xl text-center mt-5 underline">أسئلة الاختبار</p>
    <div className="w-10/12 lg:w-7/12 flex flex-col mt-8 justify-evenly">
{QUESTIONS.map((i , index)=>{return <Ques 
                                    num = {index}
                                    index={i.index} 
                                    Ques_value={i.Ques_value} 
                                    Type_value={i.Type_value} 
                                    Correct={i.Correct} 
                                    Choices={i.Choices} 
                                    Changer={Ques_Changer}
                                    Remove={Remove_Ques}
                                    key={index} />
})}
    </div>

    <div className="w-10/12 flex justify-evenly mt-5 mb-3 ">
    <Button color="blue" className="flex cursor-pointer justify-between" onClick={()=>{
        QUESTIONS.push({index : QUESTIONS.length ,Ques_value : "" , Type_value : "choose" , Correct : "" , Choices : ["" , ""]})
        SET_QUESTIONS([...QUESTIONS])
    }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
      </svg> 
      إضافة سؤال
    </Button>

    <Button color="green" className="flex cursor-pointer justify-between" onClick={()=>{
    
if(NAME == "" || DESC == "" || PASS == "" || PRIZE == "" || ENTER_TIME == "" || TIME == "" || QUESTIONS.length == 0){
    dis(Dialog_action({
        isDialog : true ,
        isCancelled : false , 
        isFail : true ,
        isSuccess : false ,
        title : "عملية غير ناجحة" ,
        body : "يجب تعبئة جميع الحقول" ,
    }))
}else{
    Save()
}

    }}>
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
  <path d="M5.75 3.75a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06-1.06L9.44 8 5.75 4.81a.75.75 0 0 1 0-1.06Z" />
</svg>
 
      حفظ 
    </Button>
    </div>
    </>
    )
}else{
    return(
        <>
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="w-full flex flex-col">
                <p className="w-full m-0 font-bold dark:text-white text-2xl text-center mt-3 underline">كود شفرة الأسئلة</p>
                <p className="w-full m-0 font-bold dark:text-white text-xl text-center mt-2 ">{QUES_SECRET_KEY_SHOW}</p>
            </div>
            <div className="w-full flex flex-col mt-9">
                <p className="w-full m-0 font-bold dark:text-white text-2xl text-center mt-3 underline">كود شفرة الإجابات</p>
                <p className="w-full m-0 font-bold dark:text-white text-xl text-center mt-2 ">{ANSWER_SECRET_KEY_SHOW}</p>
            </div>
        </div>
        </>
    )
}



}