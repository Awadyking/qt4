import { useEffect, useState } from "react";
import useFetcher from "../hooks/useFetcher";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Ranks(){

const [data , SET_data] = useState([
    {
        username : "" , 
        name : "" ,
        degree : 0
    } , 
    {
        username : "" , 
        name : "" ,
        degree : 1
    } ,     
])
const [full_degree , SET_full_degree] = useState("")
const [exam_data , SET_exam_data] = useState({})
const {URL , token} = useSelector(state => state)
const dis = useDispatch()
const {exam_id} = useParams()




    useEffect(()=>{
        window.scrollTo(0 , 0)
            useFetcher("GET" , URL + `/get-exam-tops?exam_id=${exam_id}&token=${token}` , {} , {} , dis , (y) =>{
                            SET_full_degree(y.full_degree)
                            console.log(y)
                            if(y.data.length == 1){
                                y.data.push({
                                    name : "System" , 
                                    username : "admin" , 
                                    degree : 0
                                })
                            }
                             SET_data(y.data)
                                useFetcher("GET" , URL + `/get-exam-details/?token=${token}&exam_id=${exam_id}` , {} , {} , dis , (x) =>{
                                    SET_exam_data(x.exam_info)
                                })
                        })


    } , [])



return (
  <>
    <p className="font-sans text-2xl mt-3 w-full text-center dark:text-white underline">
      الترتيب
    </p>
    <table className="w-10/12 lg:w-7/12 h-fit dark:border-white border-2 mt-4">
      <thead>
        <tr className="border-2 dark:border-white xs:text-lg lg:text-xl font-bold  dark:text-white">
          <td className="w-1/12 border-2 dark:border-white text-center">#</td>
          <td className="w-3/12 border-2 dark:border-white text-center">
            الإسم
          </td>
          <td className="w-1/12 border-2 dark:border-white text-center">
            الدرجة
          </td>
          <td className="w-2/12 border-2 dark:border-white text-center">
            الدرجة الكلية
          </td>
          <td className="w-2/12 border-2 dark:border-white text-center">
            النسبة المئوية
          </td>
          <td className="w-1/12 border-2 dark:border-white text-center">
            الحالة
          </td>
        </tr>
      </thead>
<tbody>
      {data.map((i, index) => {
        var j = Math.floor((i.degree / full_degree) * 100);
        var color = "";

        if (index == 0) {
          color += " bg-sky-400";
        } else if (j > 50 && j <= 80) {
          color += " bg-yellow-400";
        } else if (j > 80 && j < 100) {
          color += " bg-orange-400";
        } else if (j == 100 && index != 0) {
          color += " bg-green-400";
        } else if (j >= 0 && j <= 50) {
          color += " bg-red-400";
        }
    

        return (
          <tr className="border-2 dark:border-white xs:text-lg lg:text-xl h-10 dark:text-white" key={index}>
            <td className="w-1/12 border-2 dark:border-white text-center">
              {index + 1}
            </td>
            <td className="w-3/12 border-2 dark:border-white text-center">
              {i.name}
            </td>
            <td className="w-1/12 border-2 dark:border-white text-center">
              {i.degree}
            </td>
            <td className="w-2/12 border-2 dark:border-white text-center">
              {full_degree}
            </td>
            <td className="w-2/12 border-2 dark:border-white text-center">
              % {Math.floor((i.degree / full_degree) * 100)}
            </td>
            <td
              className={
                "w-1/12 border-2 dark:border-white text-center" + color
              }
            ></td>
          </tr>
        );
      })}
      </tbody>
    </table>

    <div className="flex w-10/12 lg:w-7/12 h-fit flex-wrap mt-5">
      
      <div className="flex p-1 h-6 w-28 items-center ">
        <div className="h-4 w-4 bg-red-400"></div>
        <p className="dark:text-white text-xs mr-2">راسب</p>
      </div>


    <div className="flex p-1 h-6 w-28 items-center ">
        <div className="h-4 w-4 bg-yellow-400"></div>
        <p className="dark:text-white text-xs mr-2">متوسط</p>
      </div>

    <div className="flex p-1 h-6 w-28 items-center ">
        <div className="h-4 w-4 bg-orange-400"></div>
        <p className="dark:text-white text-xs mr-2">جيد جداً</p>
      </div>

    <div className="flex p-1 h-6 w-28 items-center ">
        <div className="h-4 w-4 bg-green-400"></div>
        <p className="dark:text-white text-xs mr-2">ممتاز</p>
      </div>

        <div className="flex p-1 h-6 w-28 items-center ">
          <div className="h-4 w-4 bg-sky-400"></div>
            <p className="dark:text-white text-xs mr-2">الأول</p>
      </div>

</div>

{data[0].degree != data[1].degree ? <div className="flex w-full justify-center">
      <p className="font-sans text-xl mt-4  text-center dark:text-white">الفائز بجائزة ال ({exam_data.prize}) هو :</p>
             <p className="text-xl underline m-0 mt-4 mr-2 text-center dark:text-teal-400 text-amber-600 font-bold">{data[0].name}</p>
    </div> : <p className="font-sans text-xl mt-4 w-full text-center dark:text-white">سيتم حسم المنافسة من خلال إمتحان خاص للأشخاص المتساويين في أعلى الدرجات</p>}


  </>
);


}