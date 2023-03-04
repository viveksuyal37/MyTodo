import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Todo from "./Todo";
import StateContext from "../../../Context/StateContext";
import AlertContext from "../../../Context/AlertContext";



const MyTodos = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [activeMenu, setActiveMenu] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const [appState, setAppState] = useContext(StateContext);
  // eslint-disable-next-line
  const [alert, setAlert] = useContext(AlertContext);

  let filter;

  //delete specific todo
  const deleteSingleTodo = (id, title) => {
    let confirmation = window.confirm(
      `This action will delete ${title} named todo. Are you sure?`
    );

    if (!confirmation) {
      setAlert({ msg: "You cancelled the deletion.", error: null });
      return;
    }

    axios
      .delete(`http://localhost:5500/user/todo/${id}`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then((res) => {
        // todo
        setIsDeleted(!isDeleted);

        setAlert({ msg: "Deleted Successfully.", error: null });
        setTimeout(() => {
          setAlert({ msg: null, error: null });
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //fetch data according to selected menu and save response in context.
  const fetchData = (Menu) => {
    if (Menu === 0) {
      filter = "";
    } else if (Menu === 1) {
      filter = "pending=true";
    } else {
      filter = "pending=false";
    }

    axios
      .get(`http://localhost:5500/user/view-todos?${filter}`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then((res) => {
        //setting data in state context
        setAppState(res.data);
      })
      .catch((err) => {
        setAlert({ msg: null, error: err.response.data.message });
      });
  };

  useEffect(() => {
    fetchData(activeMenu);
    // eslint-disable-next-line
  }, [activeMenu, isDeleted]);

  return (
    <section className="my-todos-section">
      <h1 className="section-title">My Todos</h1>
      <div className="my-todos-menu">
        <button
          className={activeMenu === 0 ? " active-btn" : ""}
          onClick={() => {
            setActiveMenu(0);
          }}
        >
          All
        </button>
        <button
          className={activeMenu === 1 ? " active-btn" : ""}
          onClick={() => {
            setActiveMenu(1);
          }}
        >
          Pending
        </button>
        <button
          className={activeMenu === 2 ? " active-btn" : ""}
          onClick={() => {
            setActiveMenu(2);
          }}
        >
          Completed
        </button>
      </div>

      <div className="todo-list-container">
        {appState.Todos &&
          appState.Todos.map((item, index) => {
            return (
             
                <Todo
                  key={index}
                  todo={item}
                  deleteTodo={deleteSingleTodo}
                  currentMenu={filter}
                />
            
            );
          })}
      </div>
    </section>
  );
};

export default MyTodos;
