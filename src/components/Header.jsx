
import {  useSelector } from "react-redux"
import Theme_toggle from "./Theme_toggle"
import { Link } from "react-router-dom"

export default function Header() {

    const {logo_path} = useSelector(state => state)

return <header className="w-full flex justify-between items-center sticky top-0
pl-5 pr-6 bg-white dark:bg-slate-800 border-b-4 h-13 border-slate-700 dark:border-white 
" >

<Link to="/">
<div className="flex h-12 items-center">
<p className="text-xl font-sans font-bold dark:text-white ml-1">منصة</p>
<p className="text-3xl font-serif font-bold dark:text-white ml-1">QT4</p> 
</div >
</Link>
<div className="h-13 w-fit flex items-center">
        <p className="font-sans text-sm ml-2 font-bold dark:text-white">فاتح</p>
    <Theme_toggle/>
        <p className="font-sans text-sm mr-2 font-bold dark:text-white">مظلم</p>
    </div>
</header>

    
}