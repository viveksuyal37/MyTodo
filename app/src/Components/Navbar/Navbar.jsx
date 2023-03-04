import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const isLoggedin = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const path =useLocation().pathname;

  const logout = () => {
    localStorage.clear("user", "token");
    navigate("/login");
    navigate(0)
  };

  return (
    <nav id="navbar">
      <div className="nav-logo">MyTodo</div>
      <div className="navlist-container">
        <ul className="navlist">
          {isLoggedin ? (
            <Link onClick={logout}>Logout</Link>
          ) : (
            <>
              <Link to="/login" className={path==="/login"?"active-btn":""}>Login</Link>
              <Link to="/signup" className={path==="/signup"?"active-btn":""}>Signup</Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
