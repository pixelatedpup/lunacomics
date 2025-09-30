import NavBar from "./NavBar";
import { UserContext } from "../context/UserContext";
import { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";


const SectionBar = () => {
        const navigate = useNavigate();
        const userContext = useContext(UserContext);
        if (!userContext){
            throw new Error("Sign out component must be used within a UserProvider");
        }
        const {logout} = userContext;
        const [showModal, setShowModal] = useState(false);

        const handleLogout = () => {
            logout();
            navigate("/")
        }

        const links  = [
        {id: 1 , name: "Library" , route:"/library"},
        {id: 2 , name: "Notifications", route:"/notifications"},
        {id: 3 , name: "Wishlist" , route:"/wishlist"},
        {id: 4 , name: "Settings", route:"/settings"},
        {id: 5 , name: "Logout", onClick: () => setShowModal(true)},

    ]
    return(
        <>
            <NavBar links={links}/>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[300px]"> 
                        <h2 className="text-lg font-semibold mb-4 text-center">
                            Are you sure you want to <br/>Log out?
                        </h2>
                        <div className="flex flex-row gap-4 justify-between">
                            <button 
                                onClick={() => setShowModal(false)}
                                className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100">
                                    Cancel
                                </button>

                            <button 
                                onClick={handleLogout}
                                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                                    Logout
                                </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SectionBar;