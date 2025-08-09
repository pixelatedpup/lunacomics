const Input = ({label =""}) =>{
    
    return(
        <div>
            <p>{label}</p>
            <input className="w-[383px] h-[35px] rounded-2xl border border-black"/>
        </div>
    );
}

export default Input;