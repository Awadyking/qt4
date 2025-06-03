import { useEffect, useState } from "react";
import useFetcher from "../hooks/useFetcher";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Ranks(){

const [data , SET_data] = useState({})
const {URL , token} = useSelector(state => state)
const dis = useDispatch()
const nav = useNavigate()



    useEffect(()=>{
        window.scrollTo(0 , 0)
         useFetcher("GET" , URL + `/get-myDegree?token=${token}&exam_id=${EXAM_ID}` , {} , {} , dis , (x) =>{
                        console.log(x)
                        SET_data(x)
                    })
    } , [])



return (<></>)


}