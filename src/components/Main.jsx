import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {logo_path_action} from "../redux/Types"

export function Main({children}){

const {Theme , token} = useSelector(state => state)
const element = document.documentElement
const dis = useDispatch()

useEffect(()=>{
        if(Theme == "dark"){
                element.classList.add("dark")
                dis(logo_path_action("/img/QT4_light.png"))
                
            }else{
                element.classList.remove("dark")
                dis(logo_path_action("/img/QT4_dark.png"))
                document.getElementById("dark-mode").checked = true
            }

let path = window.location.pathname

if(!token && 
 path != "/login" &&
 path != "/" && 
path[0] + path[1] + path[2] + path[3] + path[4] + path[5] + path[6] + path[7] + path[8] != "/register"

) {window.location.href = "/login"}

} , [])

return(<div className="main w-full flex flex-col items-center bg-slate-300 dark:bg-gray-800 ">
{children}
</div>)


}