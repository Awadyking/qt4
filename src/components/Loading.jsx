import { useSelector } from "react-redux"

export default function Loading() {

const isLoading = useSelector(state => state.isLoading)
if(isLoading){
    return(<div className="flex justify-center items-center w-full h-screen fixed top-0 bg-slate-500 opacity-60">
        <div className="lds-ripple"><div></div><div></div></div>
    </div>)
}

}