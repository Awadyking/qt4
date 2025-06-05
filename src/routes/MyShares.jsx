import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useFetcher from "../hooks/useFetcher"
import { Button } from "@material-tailwind/react"

export default function MyShares(){

   const {URL , token ,USER} = useSelector(state => state)
    const dis = useDispatch()
    const [MyShares , SET_MyShares] = useState([])

useEffect(()=>{
        useFetcher("GET" , URL + `/get-join?invite_code=${JSON.parse(USER).invite_code}&token=${token}` ,
                     {} , {} , dis , (x) =>{
                        SET_MyShares(x.names_of_invite_users)
                     })
                     
},[])

    return (<>
                <div className="flex flex-col w-full items-center mt-10">
            <p className="text-2xl dark:text-white w-full m-0 text-center font-bold " >سوف تحصل على زيادة في قيمة جائزتك التي تنظمها QT4 بقيمة النسبة المئوية التالية :</p>
            <div className="w-36 h-28 rounded-2xl bg-pink-500 text-center text-2xl mt-4 mb-4 text-white flex items-center justify-center font-bold">{MyShares.length * 1.5} %</div> 
            <div className="w-80 h-24 flex-col flex  items-center justify-center">
                <input className="w-80 h-10 pr-4 text-center bg-white bg-opacity-65 dark:bg-opacity-80  p-0 text-sm outline-none rounded-md cursor-text" id="invite_link" disabled  value={window.location.origin + "/register/" + JSON.parse(USER).invite_code} type={"text"}></input>
            </div>
            <p className="text-xl dark:text-white w-full m-0 text-center font-bold mt-5" >يمكنك زيادة هذه النسبة عن طريق مشاركة الرابط أعلاه مع أصدقائك</p>
            <p className="text-lg dark:text-white w-full m-0 text-center mt-2 font-bold ">مشاركة واحدة = 1.5%</p>

            {MyShares.length > 0 && typeof(MyShares) != "string" ? <>
            <p className="text-xl dark:text-white w-full m-0 text-center mt-4 underline font-bold ">قائمة دعواتك</p>
            
               <table className="w-7/12 lg:w-4/12 mb-6 h-fit dark:border-white border-2 mt-4">
      <thead>
        <tr className="border-2 dark:border-white xs:text-lg lg:text-xl font-bold  dark:text-white">
          <td className="w-1/12 border-2 dark:border-white text-center">#</td>
          <td className="w-11/12 border-2 dark:border-white text-center">
            الإسم
          </td>
        </tr>
      </thead>
<tbody>
      {MyShares.map((i, index) => {
        return (
          <tr className="border-2 dark:border-white xs:text-lg lg:text-xl h-10 dark:text-white" key={index}>
            <td className="w-1/12 border-2 dark:border-white text-center">
              {index + 1}
            </td>
            <td className="w-11/12 border-2 dark:border-white text-center">
              {i}
            </td>
          </tr>
        );
      })}
      </tbody>
    </table>
            
            
            </> : <></>}

<Button color="red" className="flex cursor-pointer justify-between mt-5 mb-10" onClick={()=>{
    localStorage.clear()
    window.location.href = "/"
}}>تسجيل الخروج</Button>

        </div>




        </>)
}