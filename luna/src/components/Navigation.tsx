import { NavLink } from "react-router-dom";
const Navigation = () =>{
    return(
        <>
            <ul>
                <NavLink to="/home"
                className={({isActive})=> isActive? "nav-link active": "nav-link"}> 
                <p>Home</p>
                </NavLink>

                <NavLink to="/comics"
                className={({isActive})=> isActive? "nav-link active": "nav-link"}> 
                <p>Comics</p>
                </NavLink>
                
                <NavLink to="/creators"
                className={({isActive})=> isActive? "nav-link active": "nav-link"}> 
                <p>Creators</p> 
                </NavLink>

                <NavLink to="/community"
                className={({isActive})=> isActive? "nav-link active": "nav-link"}> 
                <p>Community</p>
                </NavLink>
            </ul>
        </>
    )
}

export default Navigation;