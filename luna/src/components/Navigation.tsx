import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    
        <ul className="flex justify-center items-center h-full gap-4">
        <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active font-bold text-[--primary]" : "hover:font-bold transition-all duration-[0.5s]"}>
            Home
            </NavLink>
        </li>
        <li>
            <NavLink to="/comics" className={({ isActive }) => isActive ? "nav-link active font-bold text-[--primary]" : "hover:font-bold transition-all duration-[0.5s]"}>
            Comics
            </NavLink>
        </li>
        <li>
            <NavLink to="/creators" className={({ isActive }) => isActive ? "nav-link active font-bold text-[--primary]" : "hover:font-bold transition-all duration-[0.5s]"}>
            Creators
            </NavLink>
        </li>
        <li>
            <NavLink to="/community" className={({ isActive }) => isActive ? "nav-link active font-bold text-[--primary]" : "hover:font-bold transition-all duration-[0.5s]"}>
            Community
            </NavLink>
        </li>
        </ul>
  );
};

export default Navigation;
