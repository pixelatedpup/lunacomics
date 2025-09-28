import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import Symbol from "./Symbol";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import { useNotifications } from "../context/NotificationContext";
const Header = () => {
    const {isLoggedIn} = useUser();
    const[ring, setRing] = useState(false);
    const {notifications, removeNotification} = useNotifications();
    const [open, setOpen] = useState(false);
  return (
    

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
                <div className="absolute right-0 bg-[white] shadow p-2 w-[400px]">
                  <div className="flex flex-col gap-2">
                    {notifications.map((n) => (
                      <div key={n.id} className="flex justify-between items-center bg-[var(--light)] text-[var(--accent)] p-[10px] border rounded-xl">
                        <span>{n.message}</span>
                        <button onClick={() => removeNotification(n.id)}>x</button>
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
         <NavLink to="/library">
          <Symbol/>
          </NavLink>:
        <NavLink to="/signin">
         <h3>Login</h3>
        </NavLink>

         
         }
        </div>
      </article>
    </section>
  );
};

export default Header;
