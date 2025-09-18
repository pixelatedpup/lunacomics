import NavBar from "./NavBar";
import { UserContext } from "../context/Usercontext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const SectionBar = () => {
        const navigate = useNavigate();
        const userContext = useContext(UserContext);
        if (!userContext){
            throw new Error("Sign out component must be used within a UserProvider");
        }
        const {logout} = userContext;

        const handleLogout = () => {
            logout();
            navigate("/")
        }

        const links  = [
        {id: 1 , name: "Library" , route:"/library"},
        {id: 2 , name: "Notifications", route:"/notifications"},
        {id: 3 , name: "Wishlist" , route:"/wishlist"},
        {id: 4 , name: "Settings", route:"/settings"},
        {id: 5 , name: "Logout", onclick:handleLogout},

    ]
    return(
        <>
            <NavBar links={links}/>
        </>
    )
}

export default SectionBar;