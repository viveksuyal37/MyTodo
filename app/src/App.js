import "./App.css";
import { useContext, useEffect } from "react";
import AlertContext from "./Context/AlertContext";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [alert, setAlert] = useContext(AlertContext);

  const notify = () => {
    if (alert.msg) {
      return toast(alert.msg);
    } else {
      return toast.error(alert.error);
    }
  };

  useEffect(() => {
    notify();
  }, [alert]);

  return (
    <>
      <Navbar />
      {alert && <ToastContainer theme="dark" />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
