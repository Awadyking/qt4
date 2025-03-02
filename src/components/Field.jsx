export default function Field({label , place , value , type , bcolor , focus , disabled , setValue}){

const style = {borderBottom : `solid 4px ${bcolor}`}
    
return(<div className="w-full h-8 flex justify-between mt-5">
<label className="w-fit dark:text-white text-lg font-serif text-center">{label}</label>
<input className="w-44 h-8 pr-4 bg-white bg-opacity-65 dark:bg-opacity-80 outline-none rounded-md" 
placeholder={place}
type={type}
style={style}
onChange={(e)=>{setValue(e.target.value)}}
value={value}
autoFocus={focus}
disabled={disabled}
></input>

</div>)




}