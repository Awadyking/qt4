import { useDispatch } from "react-redux"
import {  theme_action } from "../redux/Types"
import {useAudio } from "../hooks/useAudio"


export default function Theme_toggle(){
    const dark_toggle = useAudio("/sounds/dark_owl.mp3")[1];
    const light_toggle = useAudio("/sounds/light_rooster.mp3")[1];
    const dis = useDispatch()
    return (
<>
        <input type="checkbox" id="dark-mode" className="toggle_input" onClick={()=>{
        if(document.getElementById("dark-mode").checked){
            dis(theme_action("light"))
            light_toggle()
        
        }else{
            dis(theme_action("dark"))
            dark_toggle()
        }
            
        }}/>
        <label for="dark-mode" className="toggle_label"></label>
        </>
    )
}