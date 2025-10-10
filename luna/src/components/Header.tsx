import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import Symbol from "./Symbol";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import { useNotifications } from "../context/NotificationContext";
const Header = () => {
    const {isLoggedIn} = useUser();
    const {notifications, removeNotification, clearNotifications} = useNotifications();
    const [open, setOpen] = useState(false);
    // const [openNav, setOpenNav] = useState(false);

    // const handleNav = () => {
    //   if (openNav){
    //     setOpenNav(false);
    //   }else{
    //     setOpenNav(true)
    //   }
    // }
  return (
    
  
<section className="flex flex-col">
    <section className="fixed  right-0 px-[20px] w-full bg-white flex flex-row items-center border-b-[2px]  h-[100px] z-50">
      <article className="flex flex-1 justify-start items-center h-full ">
        <NavLink to="/"><h1 className="text-[var(--primary)] m-0 leading-none">Luna</h1></NavLink>
      </article>
      <article className="flex flex-1 justify-center items-center h-full  ">
        <Navigation />
      </article>

      <article className="flex flex-1 justify-end gap-6 items-center h-full ">
        <div className="">
        {isLoggedIn ?

          // <NavLink to="/library">
          (
            <div className="relative">
              <button onClick={() => setOpen(!open)}>
                <div className="flex flex-row gap-1">
                  <Symbol symbol="bell" />
                  {notifications.length > 0 && <span className="badge text-[white] bg-[var(--accent)] p-[3px] rounded-[50%] h-[25px] w-[25px] text-[14px]">{notifications.length}</span>}
                </div>
              </button>

              {open && (
                <div className="absolute right-0 bg-[white] shadow drop-shadow-xl p-2 w-[400px]">
                  <div className="flex flex-col gap-2">
                    <div className="flex  justify-end w-full">
                      <button onClick={clearNotifications} className="flex border bg-[var(--dark)] rounded-2xl 
                                        px-[28px] 
                                        text-[white] text-center
                                        hover:bg-[var(--light)] hover:text-[var(--dark)] transition-all duration-2s">Clear all</button>
                    </div>
                    {notifications.map((n) => (
                      <div key={n.id} className="flex justify-between items-center bg-[var(--light)] text-[var(--dark)] p-[10px] border border-[2px] rounded-xl">
                        <span className="">{n.message}</span>
                        <button className="flex items-center justify-center bg-[var(--accent)] text-white rounded-full h-[24px] w-[24px]" onClick={() => removeNotification(n.id)}>x</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            )
          // </NavLink>
          :
        <NavLink to="/signup">
         <h3>Sign Up</h3>
        </NavLink>

         
         }
        </div >
        {/* <NavLink to="/library"><p className="m-0">Profile</p></NavLink> */}
        <div className="">
        {isLoggedIn ?
         <NavLink to="/profile">
          <Symbol/>
          </NavLink>:
        <NavLink to="/signin">
         <h3>Login</h3>
        </NavLink> }
        </div>
      </article>


    </section>
    
    {/* <section className="z-50 fixed right-0 mt-[70px]">
      <article>
        <div className="bg-[black] p-[10px] text-white text-[10px]">
          <button onClick={handleNav}>Nav</button>
        </div>
      </article>
      {openNav &&
      <article>
          <ul className="flex flex-col">
            <li>Home</li>
            <li>Comics</li>
            <li></li>
            <li></li>
          </ul>
      </article>}
    </section> */}
    
    
    </section>
  );
};

export default Header;
