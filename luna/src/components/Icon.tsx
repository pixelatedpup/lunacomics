import Card from "./Card"


interface IconProps {
    iconid?: number;
}
const Icon = ({iconid}:IconProps) => {
    return(
        <Card width="197px" height="209px" source="" round = {true} cardid = {iconid} />
    )
}

export default Icon;