interface InputProps{
    custom?:string;
    label?:string;
    typeUse?:string;
    value?: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const Input = ({label ="", custom="", typeUse, value, onChange,
}:InputProps) =>{
    
    return(
        <div>
            <p>{label}</p>
            {custom === null ? 
            (
            <input 
            type={typeUse}
            value={value}
            onChange={onChange}
            className="w-[383px] h-[35px] p-[20px] rounded-2xl border border-black"/>
            ):(
                <input 
                type={typeUse}
                value={value}
                onChange={onChange}
                className= {`${custom}  p-[20px] rounded-2xl border border-black`}/>
            )
            }
            
        </div>
    );
}

export default Input;