
import user from '../assets/images/user.png'
const Symbol = ({symbol =""}) => {
    return(
        <img src = {user} className="h-[25px] w-[25px] hover:scale-[112%] transition-all duration-[0.3s]"/>
    )
}

export default Symbol;