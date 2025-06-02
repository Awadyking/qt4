import React from "react";
import { Button , Dialog,
  DialogHeader , DialogBody , DialogFooter} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog_action } from "../redux/Types";
 
export default function APP_Dialog() {

const dis = useDispatch()
 const  { Dialog_data } = useSelector(state => state)


  return (
    <>
      <Dialog open={Dialog_data.isDialog}>
        <DialogHeader>
          <p className="w-full text-center text-xl font-bold">
          {Dialog_data.title}
          </p>
        </DialogHeader>
        <DialogBody className="flex flex-col w-full h-fit items-center">
          {Dialog_data.isSuccess == true ? <div>
            <img className="w-9/12 h-fit" src="/img/success.gif"/>
          </div> : <></>}
          {Dialog_data.isFail == true ? <div>
            <img className="w-9/12 h-fit" src="/img/failed.png"/>
          </div> : <></>}
          {Dialog_data.body}
        </DialogBody>
        <DialogFooter>
          {Dialog_data.isCancelled == true ? 
          <>
          <Button
            variant="text"
            color="red"
            onClick={()=>{dis(Dialog_action({
              isDialog : false ,
              isCancelled : false , 
              isFail : false ,
              isSuccess : false ,
              title : "" ,
            }))}}
            className="mr-1 cursor-pointer"
          >
            <span>إلغاء</span>
          </Button> 
            <Button variant="gradient" className="cursor-pointer" color="green" onClick={()=>{Dialog_data.func()}}>
                <span>حسنا</span>
            </Button>
          </>
          : <>
                <Button variant="gradient" className="cursor-pointer" color="green" onClick={()=>{Dialog_data.func()}}>
                    <span>حسنا</span>
                  </Button>
          </> }
        </DialogFooter>
      </Dialog>
    </>
  );
}