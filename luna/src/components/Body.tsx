import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Creators from "./pages/Creators"
import Library from "./pages/Library"
import Comics from "./pages/Comics"
import Community from "./pages/Communtiy"
import Creator from "./pages/Creator"
import Notifications from "./pages/Notifications"
import Preview from "./pages/Preview"
import Reading from "./pages/Reading"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import ScrollToTop from "./ScrollToTop";
import Settings from "./pages/Settings";
import Wishlist from "./pages/Wishlist";

const Body = () => {
    return(
        <>
        <ScrollToTop/>
        <Routes>
            
            <Route path="/" element={<Home/>}></Route>
            <Route path="/creators" element={<Creators/>}></Route>
            <Route path="/library" element={<Library/>}></Route>
            <Route path="/comics" element={<Comics/>}></Route>
            <Route path="/community" element={<Community/>}></Route>
            <Route path="/creator/:cardId" element={<Creator/>}></Route>
            <Route path="/notifications" element={<Notifications/>}></Route>
            <Route path="/preview/:comicId" element={<Preview/>}></Route>
            <Route path="/reading" element={<Reading/>}></Route>
            <Route path="/signin" element={<SignIn/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/settings" element={<Settings/>}></Route>
            <Route path="/wishlist" element={<Wishlist/>}></Route>
        </Routes>
        </>
    );

}

export default Body;