import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    
        <ul className="flex justify-center items-center h-full gap-4">
        <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active font-bold text-[--primary]" : "hover:font-bold transition-all duration-[0.5s]"}>
            <h3>Home</h3>
            </NavLink>
        </li>
        <li>
            <NavLink to="/comics" className={({ isActive }) => isActive ? "nav-link active font-bold text-[--primary]" : "hover:font-bold transition-all duration-[0.5s]"}>
            <h3>Comics</h3>
            </NavLink>
        </li>
        <li>
            <NavLink to="/creators" className={({ isActive }) => isActive ? "nav-link active font-bold text-[--primary]" : "hover:font-bold transition-all duration-[0.5s]"}>
            <h3>Creators</h3>
            </NavLink>
        </li>
        <li>
            <NavLink to="/community" className={({ isActive }) => isActive ? "nav-link active font-bold text-[--primary]" : "hover:font-bold transition-all duration-[0.5s]"}>
            <h3>Community</h3>
            </NavLink>
        </li>
        </ul>
  );
};

export default Navigation;
