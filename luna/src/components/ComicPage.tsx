import Card from "./Card"

type Size = "tiny"|"sm"| "md"| "lg";
const Comics = ({source="" , size = "md" } : {source?:string ; size?:Size;}) =>{

    const sizeClasses = {
        tiny: "w-[162px] h-[261px]",
        sm: "w-[162px] h-[261px]",
        md: "w-[207px] h-[333px]",
        lg: "w-[516px] h-[829px]"
    }

    const downgradeMap: Record<Size, Size> = {
        lg: "md",
        md: "sm",
        sm: "tiny",
        tiny: "tiny", // can't go smaller
    };

    return(
        <div>
            <Card custom={`${sizeClasses[size]}`} width="207px" height="333px" source={source}/>
        </div>
    );
}

export default Comics;