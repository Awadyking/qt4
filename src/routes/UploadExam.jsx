import { Button, IconButton } from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js"
import { Dialog_action } from "../redux/Types";
import useFetcher from "../hooks/useFetcher";

export default function UploadExam() {

const dis = useDispatch()
const [data , SET_data] = useState([])
const [isPrivate , SET_isPrivate] = useState(false)
const [ US, SET_US] = useState([])
const {token , URL} = useSelector(state => state)
const [QUES_SECRET_KEY , SET_KEY] = useState("")



function PrivateChanger(index , value){
  SET_US(US.map((i , ind)=>{if(ind == index){return value} return i}))
}

function Decrypt(text , key){
    try{
      const bytes = CryptoJS.AES.decrypt(text , key)
      const decrypted = bytes.toString(CryptoJS.enc.Utf8)
        return decrypted
    }catch {
        throw new Error("Decryption Error")
    }
}


function Save(){

  if( Decrypt(data.config.name , QUES_SECRET_KEY) == ""){
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
            }))
            }
        }))
  }

  const exam ={
    config : {
        name : Decrypt(data.config.name , QUES_SECRET_KEY) ,
        description : Decrypt(data.config.description , QUES_SECRET_KEY) , 
        prize : Decrypt(data.config.prize , QUES_SECRET_KEY) , 
        password : Decrypt(data.config.password , QUES_SECRET_KEY) , 
        screen_time :  Number(Decrypt(data.config.enter_time , QUES_SECRET_KEY)) ,
        exam_time : Number(Decrypt(data.config.exam_time , QUES_SECRET_KEY)) , 
        isPrivate : isPrivate ,
        whitelist : US
    } , 
    exam : data.exam.map((i)=>{
        return {
            question : Decrypt(i.question , QUES_SECRET_KEY) , 
            correct_answer : i.correct_answer ,
            choices : i.choices.map((j)=>{
              return Decrypt(j , QUES_SECRET_KEY)
            })
            }
    })
}

useFetcher("POST" , URL + `/create-exam?token=${token}` , exam , {} , dis , (x) =>{
  dis(Dialog_action({
    isDialog : true ,
    isCancelled : false , 
    isFail : false ,
    isSuccess : true ,
    title : "عملية ناجحة" ,
    body : x.detail.ar_msg + " , الكود : " + x.detail.exam_id ,
    func : ()=>{window.location.href = "/"}
}))
})
}

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        
        if (file && file.type === 'application/json') {
        const reader = new FileReader();
          
          reader.onload = () => {
            try {
              const d = JSON.parse(reader.result);
              SET_data(d)
            } catch (err) {
                dis(Dialog_action({
                    isDialog : true ,
                    isCancelled : false , 
                    isFail : true ,
                    isSuccess : false ,
                    title : "عملية غير ناجحة" ,
                    body : "حدث خطاء في قراءة الملف" ,
                }))
            }
          };
          
          reader.onerror = () => {
            dis(Dialog_action({
                isDialog : true ,
                isCancelled : false , 
                isFail : true ,
                isSuccess : false ,
                title : "عملية غير ناجحة" ,
                body : "حدث خطاء في قراءة الملف" ,
            }))
          };
      
          reader.readAsText(file);
        } else {
            dis(Dialog_action({
                isDialog : true ,
                isCancelled : false , 
                isFail : true ,
                isSuccess : false ,
                title : "عملية غير ناجحة" ,
                body : "يرجى تحميل ملف JSON" ,
            }))
        }
      };



    return(<>

    {data.length == 0 ?
    <Button variant="gradient" 
        className="flex items-center gap-3 mt-6  w-36 mb-5"
        onClick={()=>{document.getElementById("json_select").click()}}
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>
        <input type="file" 
        className="hidden" 
        id="json_select" 
        onChange={(e)=>{handleFileChange(e)}}/>
        رفع الملف
    </Button> : <></>}

    <div className="w-80 h-8 flex justify-between mt-5 ml-2">
        <label className="w-fit dark:text-white text-lg font-serif text-center">كود فك تشفير الأسئلة</label>
        <input className="w-40 h-8 pr-4 bg-white bg-opacity-65 dark:bg-opacity-80 outline-none rounded-md border-b-green-400 border-b-4" 
        placeholder={"xxx"}
        type={"text"}
        value={QUES_SECRET_KEY}
        onChange={(e)=>{SET_KEY(e.target.value)}}
        ></input>
        </div>




    <div className="w-80 h-8 flex justify-between mt-5 ml-2">
    <label className="w-fit dark:text-white text-lg font-serif text-center">حالة الإمتحان</label>
    <select className="w-44 h-8 pr-4 bg-white bg-opacity-65 
    dark:bg-opacity-80 outline-none rounded-md" 
    value={isPrivate}
    onChange={(e)=>{
      if(e.target.value == "true"){SET_isPrivate(true) ; SET_US([""])}
      if(e.target.value == "false"){SET_isPrivate(false); SET_US([])}
    }}>
        <option value={"false"}>عام</option>
        <option value={"true"}>خاص</option>
    </select>
    </div>

<div className="w-full h-fit flex flex-col items-center">
  { US.map((i , index)=>{
        return(<div className="w-80 h-8 flex justify-between mt-5 ml-2">
        <label className="w-fit dark:text-white text-lg font-serif text-center">{"المستخدم " + `${index +1}`}</label>
        <input className="w-32 h-8 pr-4 bg-white bg-opacity-65 dark:bg-opacity-80 outline-none rounded-md border-b-green-400 border-b-4" 
        placeholder={"xxx"}
        type={"text"}
        disabled={false}
        key={index}
        value={i}
        onChange={(e)=>{PrivateChanger(index , e.target.value)}}
        ></input>
         <IconButton color="blue" className="h-7 w-7 mt-1 cursor-pointer" onClick={()=>{
            US.push("")
            SET_US([...US])
         }}>
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
      </svg>
      </IconButton>
      <IconButton color="red" className="h-7 w-7 mt-1 cursor-pointer" onClick={()=>{
        if(US.length > 1){
          US.splice(index , 1)
          SET_US([...US])          
        }

         }}>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
  <path d="M3.75 8.75a.75.75 0 0 1 0-1.5h8.5a.75.75 0 0 1 0 1.5h-8.5Z" />
</svg>
      </IconButton>

        </div>)
    })
}
   </div> 
   <Button color="purple" className="flex cursor-pointer justify-between mt-5" onClick={()=>{Save()}}>
      بدأ الإمتحان
    </Button>


    </>
        )
}