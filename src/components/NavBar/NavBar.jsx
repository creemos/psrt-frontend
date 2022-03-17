import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex flex-col">
      <div className="m-5 text-xl w-36">
        <NavLink
          to="/teachers"
          className={({ isActive }) =>
            isActive ? "bg-lime-200 font-bold" : ""
          }
        >
          Учительский состав
        </NavLink>
      </div>
      <div className="m-5 text-xl w-36">
        <NavLink
          to="/students"
          className={({ isActive }) =>
            isActive ? "bg-lime-200 font-bold" : ""
          }
        >
          Студенческий состав
        </NavLink>
      </div>
      <div className="m-5 text-xl w-36">
        <NavLink
          to="/classes"
          className={({ isActive }) =>
            isActive ? "bg-lime-200 font-bold" : ""
          }
        >
          Классы
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
