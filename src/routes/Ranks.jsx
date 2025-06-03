import { useEffect, useState } from "react";
import useFetcher from "../hooks/useFetcher";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function Ranks(){

const [data , SET_data] = useState({})
const [full_degree , SET_full_degree] = useState("")
const {URL , token} = useSelector(state => state)
const dis = useDispatch()
const nav = useNavigate()
const {exam_id} = useParams()




    useEffect(()=>{
        window.scrollTo(0 , 0)
         useFetcher("GET" , URL + `/get-myDegree?token=${token}&exam_id=${exam_id}` , {} , {} , dis , (x) =>{
                SET_full_degree(x.full_degree)
            useFetcher("GET" , URL + `/get-exam-tops?exam_id=${exam_id}&token=${token}` , {} , {} , dis , (y) =>{
                            console.log(y)
                            SET_data(y)
                        })
                    })
    } , [])



return (<></>)


}