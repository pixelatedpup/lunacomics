interface InputProps{
    custom?:string;
    label?:string;
    typeUse?:string;
}


const Input = ({label ="", custom="", typeUse}:InputProps) =>{
    
    return(
        <div>
            <p>{label}</p>
            {custom === null ? 
            (
            <input className="w-[383px] h-[35px] p-[20px] rounded-2xl border border-black"/>
            ):(
                <input className= {`${custom}  p-[20px] rounded-2xl border border-black`}/>
            )
            }
            
        </div>
    );
}

export default Input;