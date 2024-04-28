import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <ul className="navbar pb-10">
      {localStorage.getItem("user_token") !== null ? (
        <>
          <li className="navbar__item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/records/new"}
            >
              New Record!
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/records"}
            >
              Records
            </NavLink>
          </li>
          <li className="navbar_item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/my-records"}
            >
              My Records!
            </NavLink>
          </li>
          <li className="navbar__item">
            <button
              className="underline text-blue-600 hover:text-purple-700"
              onClick={() => {
                localStorage.removeItem("user_token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className="navbar__item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/login"}
            >
              Login
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/register"}
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};
