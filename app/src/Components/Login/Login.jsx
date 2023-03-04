import React, { useState, useContext } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../Context/AlertContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useContext(AlertContext);
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5500/user/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem(
            "user",
            JSON.stringify(res.data.userinfo.username)
          );
          localStorage.setItem("token", JSON.stringify(res.data.token));
          navigate("/");
          setAlert({ msg: "Logged in", error: null });
        }else{
              //alert on validation errors
          setAlert({ msg: null, error: res.data.errors[0].msg });
        }
      })
      .catch((err) => {
         //alert on other errors
        setAlert({ msg: null, error: err.response.data.message });
      });
  };
  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={loginHandler}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
