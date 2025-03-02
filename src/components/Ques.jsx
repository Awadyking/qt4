import { Button, IconButton } from "@material-tailwind/react"

export default function Ques({index , Ques_value, Type_value , Correct , Choices ,  Changer , Remove}){

    return(
        <div className="flex w-full h-fit border-4 mb-5 dark:border-white rounded-xl flex-col items-center lg:flex-row">
        <div className="flex w-full h-fit justify-evenly  flex-wrap p-2 mt-4">

<div className="w-11/12 h-8 flex justify-between mt-5">
<label className="w-fit dark:text-white text-lg font-serif text-center">{"السؤال " + `${index +1} :`}</label>
<input className="w-8/12 h-8 pr-4 bg-white bg-opacity-65 dark:bg-opacity-80 outline-none rounded-md" 
placeholder={"xxxx"}
type={"text"}
style={{borderBottom : `solid 4px #03fc84`}}
onChange={(e)=>{Changer(index , e.target.value , Type_value , Correct , Choices)}}
value={Ques_value}
></input>
</div>
    

    <div className="w-80 h-8 flex justify-between mt-5 ml-2">
    <label className="w-fit dark:text-white text-lg font-serif text-center">نوع السؤال</label>
    <select className="w-44 h-8 pr-4 bg-white bg-opacity-65 
    dark:bg-opacity-80 outline-none rounded-md" 
    value={Type_value}
    disabled={false}
    onChange={(e)=>{
        if(e.target.value == "choose"){ Changer(index , Ques_value , e.target.value , Correct , ["" , ""])}
        if(e.target.value == "text"){ Changer(index , Ques_value , e.target.value , Correct , [])}
       }}>
        <option value={"choose"}>إختيار من متعدد</option>
        <option value={"text"}>مقالي</option>
    </select>
    </div>
    
    
    <div className="w-80 h-8 flex justify-between mt-5 ml-2">
    <label className="w-fit dark:text-white text-lg font-serif text-center">الإجابة الصحيحة</label>
    <input className="w-32 h-8 pr-4 bg-white bg-opacity-65 dark:bg-opacity-80 outline-none rounded-md border-b-green-400 border-b-4" 
    placeholder={"xxx"}
    type={"text"}
    disabled={false}
    value={Correct}
    onChange={(e)=>{Changer(index , Ques_value , Type_value , e.target.value , Choices)}}
    ></input>
    </div>
    
 
<div className="w-full h-fit flex flex-col items-center">
    {Choices.map((i , ind)=>{
        return(<div className="w-80 h-8 flex justify-between mt-5 ml-2">
        <label className="w-fit dark:text-white text-lg font-serif text-center">{"الأختيار " + `${ind +1}`}</label>
        <input className="w-32 h-8 pr-4 bg-white bg-opacity-65 dark:bg-opacity-80 outline-none rounded-md border-b-green-400 border-b-4" 
        placeholder={"xxx"}
        type={"text"}
        disabled={false}
        key={ind}
        value={i}
        onChange={(e)=>{
            Choices[ind] = e.target.value
            Changer(index , Ques_value , Type_value , Correct , Choices)
        }}
        ></input>
         <IconButton color="blue" className="h-7 w-7 mt-1 cursor-pointer" onClick={()=>{
            if(Choices.length < 6){
                Choices.push("")
            Changer(index , Ques_value , Type_value , Correct , Choices)
            }
         }}>
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
      </svg>
      </IconButton>
      <IconButton color="red" className="h-7 w-7 mt-1 cursor-pointer" onClick={()=>{
        Choices.splice(index , 1)
        Changer(index , Ques_value , Type_value , Correct , Choices)
         }}>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
  <path d="M3.75 8.75a.75.75 0 0 1 0-1.5h8.5a.75.75 0 0 1 0 1.5h-8.5Z" />
</svg>

      </IconButton>

        </div>)
    })
}
   </div> 

   <Button color="red" className="mt-2" onClick={()=>{Remove(index)}}>حذف السؤال</Button>

    </div>
    </div>
    )



}
