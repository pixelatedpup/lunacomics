import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    
        <ul className="flex justify-center items-center h-full gap-4">
        <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "pr-[15px]"}>
            Home
            </NavLink>
        </li>
        <li>
            <NavLink to="/comics" className={({ isActive }) => isActive ? "nav-link active" : "pr-[15px]"}>
            Comics
            </NavLink>
        </li>
        <li>
            <NavLink to="/creators" className={({ isActive }) => isActive ? "nav-link active" : "pr-[15px]"}>
            Creators
            </NavLink>
        </li>
        <li>
            <NavLink to="/community" className={({ isActive }) => isActive ? "nav-link active" : "pr-[15px]"}>
            Community
            </NavLink>
        </li>
        </ul>
  );
};

export default Navigation;
