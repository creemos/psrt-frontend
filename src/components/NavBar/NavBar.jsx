import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex flex-col divide-y divide-lime-500">
      <NavLink
        to="/teachers"
        className={({ isActive }) => (isActive ? "bg-lime-200 font-bold border-r-8 border-lime-500" : "border-r-2 border-lime-500")}
      >
        <button className="m-5 text-xl w-36">Учительский состав</button>
      </NavLink>

      <NavLink
        to="/students"
        className={({ isActive }) => (isActive ? "bg-lime-200 font-bold border-r-8 border-lime-500" : "border-r-2 border-lime-500")}
      >
        <button className="m-5 text-xl w-36">Студенческий состав</button>
      </NavLink>

      <NavLink
        to="/classes"
        className={({ isActive }) => (isActive ? "bg-lime-200 font-bold border-r-8 border-lime-500" : "border-r-2 border-lime-500")}
      >
        <button className="m-5 text-xl w-36">Классы</button>
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "bg-lime-200 font-bold border-r-8 border-lime-500" : "border-r-2 border-lime-500")}
      >
        <button className="m-5 text-xl w-36">О приложении</button>
      </NavLink>
    </div>
  );
};

export default NavBar;
