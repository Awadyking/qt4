import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {logo_path_action} from "../redux/Types"

export function Main({children}){

const {Theme} = useSelector(state => state)
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
} , [])

return(<div className="h-screen w-full flex flex-col items-center bg-slate-200 dark:bg-gray-800 ">
{children}
</div>)


}