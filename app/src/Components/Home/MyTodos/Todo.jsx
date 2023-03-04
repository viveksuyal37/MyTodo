import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import EditTodo from "../EditTodo/EditTodo";
import AlertContext from "../../../Context/AlertContext";
import StateContext from "../../../Context/StateContext";

// react dnd imports
import { useDrag } from 'react-dnd'
import { ItemTypes } from './Constants'


const Todo = (props,{ isDragging, text }) => {
  const [alert, setAlert] = useContext(AlertContext);
  const [appState, setAppState] = useContext(StateContext);
  const token = JSON.parse(localStorage.getItem("token"));
  const { todo, deleteTodo } = props;
  const [showEditMenu, setEditMenu] = useState(false);

// react dnd 
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "CARD",
      item: { text },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )

  const setState = () => {
    axios
      .get(`http://localhost:5500/user/view-todos?${props.currentMenu}`, {
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

  const togglePending = async (id) => {
    const getHeaders = (token) => {
      const headers = {
        "content-type": "application/json",
      };

      if (token !== undefined) headers.Authorization = `Bearer ${token}`;
      return headers;
    };
    axios({
      url: `http://localhost:5500/user/toggle-pending/to-do/${id}`,
      method: "put",
      headers: getHeaders(token),
    })
      .then((res) => {
        let status;
        if (res.data.changednote.pending) {
          status = "Task marked as pending.";
        } else {
          status = "Task marked as completed.";
        }
        //showing alert
        setAlert({ msg: status, error: null });
        setState();
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <>
      <div ref={dragRef} style={{ opacity }} className="todo-card">
        {/* if url given make title hyperlink for visiting. */}
        {todo.link ? (
          <div className="card-title">
            <a className="hrefed-title" title="Tap to visit" href={todo.link}>
              {todo.title}
            </a>
          </div>
        ) : (
          <div className="card-title">{todo.title}</div>
        )}

        <div className="card-img-url">
          <img src={todo.iconUrl} alt="" />
        </div>
        <p className="card-note">{todo.note}</p>
        <h3 className="card-date">{todo.createdAt.split("T")[0]}</h3>
        <div className="card-icons">
          <i
            className="fa-regular fa-pen-to-square edit-icon"
            title="edit"
            onClick={() => {
              setEditMenu(!showEditMenu);
            }}
          ></i>
          <i
            className="fa-solid fa-trash delete-icon"
            title="delete"
            onClick={() => {
              deleteTodo(todo._id, todo.title);
            }}
          ></i>
        </div>
        <div className="pending-checkbox">
          <input
            title="Status"
            type="checkbox"
            name="pending"
            className="pending-box"
            onChange={() => {
              togglePending(todo._id);
            }}
            checked={!todo.pending}
          />
        </div>
      </div>
      {showEditMenu && <EditTodo todo={todo} setEditMenu={setEditMenu} />}
    </>
  );
};

export default Todo;
