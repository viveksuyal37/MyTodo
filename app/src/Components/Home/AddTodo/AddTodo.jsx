import axios from "axios";
import React, { useContext, useState } from "react";
import StateContext from "../../../Context/StateContext";
import AlertContext from "../../../Context/AlertContext";

const AddTodo = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [showAddMenu, setAddMenu] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [link, setLink] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [appState, setAppState] = useContext(StateContext);
  const [alert, setAlert] = useContext(AlertContext);

  const addTodoHandler = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5500/user/add-todo",
        {
          title,
          note,
          link,
          iconUrl,
        },
        { headers: { Authorization: `bearer ${token}` } }
      )
      .then((res) => {
        setIconUrl("");
        setTitle("");
        setNote("");
        setLink("");
        setAddMenu(false);

        axios
          .get(`http://localhost:5500/user/view-todos`, {
            headers: { Authorization: `bearer ${token}` },
          })
          .then((res) => {
            //setting data in state context after adding todo.
            setAppState(res.data);
            //showing alert via toast
            setAlert({ msg: "Added Sucessfully.", error: null });
            setTimeout(() => {
              setAlert({ msg: null, error: null });
            }, 5000);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        setAlert({ msg: null, error: err.response.data.message });
      });
  };

  return (
    <section className="add-todo-section">
      {!showAddMenu && (
        <div className="add-todo-container">
          <i
            className="fa-solid fa-plus add-todo-icon"
            title="Add note"
            onClick={() => {
              setAddMenu(true);
            }}
          ></i>
          <span>Click on the icon above to add a new todo.</span>
        </div>
      )}
      {showAddMenu && (
        <div className="add-todo-container add-todo-menu">
          <h2>Add Todo</h2>
          <form className="add-todo-form" onSubmit={addTodoHandler}>
            <label htmlFor="title">
              Title<span> *</span>
            </label>
            <input
              type="text"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            />
            <label htmlFor="note">
              Note<span> *</span>
            </label>
            <input
              type="text"
              name="note"
              onChange={(e) => {
                setNote(e.target.value);
              }}
              value={note}
            />
            <label htmlFor="link">URL</label>
            <input
              type="text"
              name="link"
              onChange={(e) => {
                setLink(e.target.value);
              }}
              value={link}
            />
            <label htmlFor="icon">Icon Url</label>
            <input
              type="text"
              name="icon"
              onChange={(e) => {
                setIconUrl(e.target.value);
              }}
              value={iconUrl}
            />
            <button type="submit" className="addTodo-btn">
              Add
            </button>
            <i className="fa-solid fa-person-circle-check add-todo-image"></i>
            <i
              className="fa-solid fa-close add-todo-close"
              title="Close window"
              onClick={() => {
                setAddMenu(false);
              }}
            ></i>
          </form>
        </div>
      )}
    </section>
  );
};

export default AddTodo;
