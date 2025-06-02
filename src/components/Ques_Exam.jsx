export default function Ques_Exam({id , ques , choices , Change_Answer , index}){

    return(<>
    <div className="w-full flex flex-col h-fit mt-8 dark:bg-gray-300 rounded-xl bg-orange-300 items-center pb-3">
        <p className="font-sans pr-4 text-xl mt-2 w-full text-right text-wrap h-fit text-black">السؤال {index + 1} : {ques}</p>
        {choices.length > 0 ? <>
        {choices.map((i , ind)=>{
            return (<div id={"q" + id + "_cc" + ind} 
                        
                         className="w-10/12 h-9 flex text-center border-2 dark:border-black border-white
                                    mt-2 cursor-pointer pr-2 text-black " 
                                    key={ind}
                     onClick={()=>{
                        document.getElementById("q" + id + "_c" + ind).click(); 

                        choices.forEach((_, index) => {
                            const elem = document.getElementById("q" + id + "_cc" + index);
                            if (elem) elem.style.border = "solid 2px";
                        });

                        document.getElementById("q" + id + "_cc" + ind).style.border = "dotted 3px blue";
                        
                        }}>
                    <input type="radio" className="ml-3 cursor-pointer"
                    onClick={()=>{Change_Answer({question_id : id ,answer: i})}}
                     name={"q" + id} id={"q" + id + "_c" + ind}/>

                        {i}
                        </div>)
        })}
        </> : <>
        <textarea className="w-10/12 min-h-20 mb-4 bg-white pr-2 mt-2" placeholder="أدخل إجابتك هنا" onChange={(e)=>{Change_Answer({question_id : id ,answer: e.target.value});}}></textarea >
        </>}
</div>

    </>)

}