import { Link } from "react-router-dom"

export default function Card({obj}){


    return(
    <Link to={obj.to}>
    <div className="w-60 h-36 dark:bg-gray-100 bg-gray-800 bg-opacity-60 dark:bg-opacity-80 rounded-lg mb-10 flex flex-col items-center" >
    <div className="flex w-10/12 mt-4">
        <img className="w-10 h-10" src= {"/img/" + obj.ico}></img>
        <div className="h-10 text-center font-sans flex items-center justify-center mr-2 font-bold text-lg dark:text-black text-white"><div>{obj.title}</div></div>
    </div>
    <div className="w-10/12 mt-6 font-mono font-bold lg:text-sm h-fit text-xs text-center dark:text-gray-500 text-amber-200">{obj.description}</div>
    
    </div>
    </Link>)  
    
    }