export default function About(){

const frontend = [
        {
        img : "js.png" ,
        name : "javscript" ,
        href : "/"
    } , 
    {
        img : "react.svg" ,
        name : "React" ,
        href : "https://react.dev/"
    } , 
    {
        img : "tailwindcss.png" ,
        name : "Tailwind" ,
        href : "https://tailwindcss.com/"
    } ,
    {
        img : "matrial-tailwindcss.png" ,
        name : "Material-tc" ,
        href : "https://www.material-tailwind.com/"
    },
    { 
        img : "vite.svg" ,
        name : "Vite" ,
        href : "https://vitejs.dev/"
    } ,
    {
        img : "redux.png" ,
        name : "Redux" ,
        href : "https://redux.js.org/"
    } ,
    {
        img : "axios.svg" ,
        name : "Axios" ,
        href : "https://axios-http.com/"
    } ,
    {
        img : "react-router.png" ,
        name : "React Router" ,
        href : "https://reactrouter.com/"
    } ,
        {
        img : "github.png" ,
        name : "Github-Repo" ,
        href : "https://github.com/Awadyking/qt4"
    } ,

]
const backend = [
    {
        img : "python.png" ,
        name : "Python" ,
        href : "https://www.python.org/"
    } , 
    {
        img : "fastapi.png" ,
        name : "FastAPI" ,
        href : "https://fastapi.tiangolo.com/"
    } , 
    {
        img : "swagger.svg" ,
        name : "Swagger" ,
        href : "https://swagger.io/"
    } , 
    {
        img : "mysql.svg" ,
        name : "MySQL" ,
        href : "https://www.mysql.com/"
    }
]


return (<>
<div className="flex flex-col mt-6 w-full items-center">
<p className="font-sans text-2xl  w-full text-center dark:text-white">Thank You for Your Trust</p>
<div className="flex  w-11/12  justify-end">
<p className="font-bold text-xl dark:text-white mt-5 text-left ml-2">(Zaxm2@)</p>
<p className="font-bold  text-xl underline text-teal-500 mt-5 text-left ml-1">Mahmoud Elawady</p>
<p className="font-bold text-xl dark:text-white mt-5 text-left">Backend Server Developed By </p>
</div>
<p className="font-bold w-10/12 text-xl dark:text-white mt-5 text-left"> : We Used The Following Technologies (Backend)</p>
<div className="w-10/12 min-h-32 mt-2 flex flex-wrap items-center dark:bg-white rounded-xl bg-slate-700 " dir="ltr">
{backend.map((i , index)=>{
    return(
<a href={i.href} target="_blank">
    <div className="w-28 h-28 flex flex-col items-center m-2  bg-amber-300 pt-1" key={index}>
        <img src={`/img/about/${i.img}`} className="w-20 h-20"/>
        <p className="font-bold text-sm w-full text-center">{i.name}</p>
    </div>
</a>
    )
})}
</div>

{/* Front-end */}
<div className="flex  w-11/12  justify-end">
<p className="font-bold text-xl dark:text-white mt-5 text-left ml-2">(Awadyking@)</p>
<p className="font-bold  text-xl underline text-teal-500 mt-5 text-left ml-1">Ali Elawady</p>
<p className="font-bold text-xl dark:text-white mt-5 text-left">Front-end Developed By </p>
</div>
<p className="font-bold w-10/12 text-xl dark:text-white mt-5 text-left"> : We Used The Following Technologies (Front-end)</p>
<div className="w-10/12 min-h-32 mt-2 flex flex-wrap items-center dark:bg-white rounded-xl bg-slate-700 " dir="ltr">
{frontend.map((i , index)=>{
    return(
<a href={i.href} target="_blank">
    <div className="w-28 h-28 flex flex-col items-center m-2  bg-amber-300 pt-1" key={index}>
        <img src={`/img/about/${i.img}`} className="w-20 h-20"/>
        <p className="font-bold text-sm w-full text-center">{i.name}</p>
    </div>
</a>
    )
})}
</div>


<p className="font-sans text-2xl w-full text-center dark:text-white mt-10 mb-2">Made With Love ❤️ By</p>
{
    localStorage.getItem("theme") == "dark" ? <img src="/img/about/sfc-dark.png" className="w-28 h-fit "/> : <img src="/img/about/sfc-white.png" className="w-28 h-fit "/>
}
<p className="font-sans text-lg w-full text-center dark:text-white mb-10 mt-2">All Copy Right Reserved © 2025</p>

</div>
</>)


}