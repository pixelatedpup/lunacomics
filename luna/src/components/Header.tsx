import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import Symbol from "./Symbol";
const Header = () => {
  return (
    
    <section className="fixed  right-0 px-[20px] w-full bg-white flex flex-row items-center border-b-[2px]  h-[100px] z-50">
      <article className="flex flex-1 justify-start items-center h-full ">
        <NavLink to="/"><h1 className="text-[68px] text-[var(--primary)] m-0 leading-none">Luna</h1></NavLink>
      </article>
      <article className="flex flex-1 justify-center items-center h-full  ">
        <Navigation />
      </article>
      <article className="flex flex-1 justify-end gap-6 items-center h-full ">
        <div className="">
        <NavLink to="/notifications"><p className="m-0">Notification</p></NavLink>
        </div >
        {/* <NavLink to="/library"><p className="m-0">Profile</p></NavLink> */}
        <div className="">
        <NavLink to="/library"><Symbol/></NavLink>
        </div>
      </article>
    </section>
  );
};

export default Header;
