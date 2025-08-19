import Card from "./Card";
import { allComics } from "../assets/AllComics";

const Banner = ({cardid = 0}) =>{
    return(
        <Card custom="h-[431px] w-[166px] " cardid={cardid} cardType="banner"/>
    )
}

export default Banner;