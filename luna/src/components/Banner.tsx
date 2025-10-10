import Card from "./Card";


interface BannerProps {
    otherId:string;
    cardid:number;
}
const Banner = ({cardid = 0, otherId="" }:BannerProps) =>{
    return(
        <Card custom="h-[431px] w-[166px] " cardid={cardid} cardType="banner" otherId={otherId}/>
    )
}

export default Banner;