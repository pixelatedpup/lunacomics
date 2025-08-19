import Card from "./Card"


interface IconProps {
    iconid?: number;
}
const Icon = ({iconid}:IconProps) => {
    return(
        <Card width="140px" height="140px" source="" round = {true} cardid = {iconid} cardType="icon"/>
    )
}

export default Icon;