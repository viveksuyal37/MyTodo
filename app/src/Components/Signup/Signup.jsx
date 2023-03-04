import React, { useState, useContext } from "react";
import "../Login/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../Context/AlertContext";

const Signup = () => {
  const [alert, setAlert] = useContext(AlertContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  const SignUpHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      setAlert({ msg: null, error: "Password does not match." });
      return;
    }

    axios
      .post("http://localhost:5500/user/register", {
        name,
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
        } else {
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
        <h2>Sign up</h2>
        <form onSubmit={SignUpHandler}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
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
          <label htmlFor="cpassword">Confirm password</label>
          <input
            type="password"
            name="cpassword"
            onChange={(e) => {
              setConfirmPass(e.target.value);
            }}
            value={confirmPass}
          />
          <button type="submit" className="login-btn">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
