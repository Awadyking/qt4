const URL = import.meta.env.VITE_URL
const token = localStorage.getItem("token") ?? undefined 
const USER = JSON.parse(localStorage.getItem("user")) ?? undefined
const logo_path = "" 
const isLoading = false
const Theme  = localStorage.getItem("theme") || "light"
const element = document.documentElement 
const Dialog_data = {
    isDialog : false ,
    isCancelled : false , 
    isFail : false ,
    isSuccess : false ,
    title : "" ,
    body : ""
} 


const Dailog_func = ()=>{}


const Value = { URL , token , logo_path , USER , isLoading , Theme , Dialog_data , Dailog_func }

export default function Main_Reducer(state = Value, action){

switch(action.type){

case("USER"):
localStorage.setItem("user" , JSON.stringify(action.value) )
return {
    ...Value , 
    USER : action.value , 

}

case("dialog"):
return {
    ...Value , 
    Dialog_data : action.value , 

}


case("dialog_func"):
return {
    ...Value , 
    Dialog_func : action.value , 

}


case("token"):
localStorage.setItem("token" , action.value) 
return {
    ...Value , 
    token : action.value , 

}

case("logo_path"):
return  {
    ...Value , 
    logo_path : action.value , 

}

case("Loading"):
return {...Value , isLoading : action.value}


case("theme"):
let path = ""
localStorage.setItem("theme" , action.value)
if(action.value == "dark"){
    element.classList.add("dark")
path = "/img/QT4_light.png"
}else{
    element.classList.remove("dark")
    path = "/img/QT4_dark.png"
}

return {...Value , Theme : Theme , logo_path : path}


default: 
return state
}


}
