import axios from "axios";
import React, { useContext, useState } from "react";
import StateContext from "../../../Context/StateContext";
import AlertContext from "../../../Context/AlertContext";
import editPng from "../../../Assets/edit.png";

const EditTodo = (props) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const { todo, setEditMenu } = props;
  //prefilling todo via props
  const [title, setTitle] = useState(todo.title);
  const [note, setNote] = useState(todo.note);
  const [link, setLink] = useState(todo.link);
  const [iconUrl, setIconUrl] = useState(todo.iconUrl);

  const [appState, setAppState] = useContext(StateContext);
  const [alert, setAlert] = useContext(AlertContext);

  const editTodoHandler = (e, id) => {
    e.preventDefault();

    axios
      .put(
        `http://localhost:5500/user/todo/${id}`,
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
        setEditMenu(false);
        setAlert({ msg: "Changes saved.", error: null });
        setTimeout(() => {
          setAlert({ msg: null, error: null });
        }, 5000);

        axios
          .get(`http://localhost:5500/user/view-todos`, {
            headers: { Authorization: `bearer ${token}` },
          })
          .then((res) => {
            //setting data in state context after editing todo.
            setAppState(res.data);
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
    <section className="edit-todo-section">
      <div className="add-todo-container add-todo-menu">
        <h2>Edit Todo</h2>
        <form
          className="add-todo-form"
          onSubmit={(e) => {
            editTodoHandler(e, todo._id);
          }}
        >
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
          <button type="submit" className="addTodo-btn" title="Save changes">
            Save
          </button>

          <img src={editPng} className="add-todo-image edit-todo-png" alt="" />
          <i
            className="fa-solid fa-close add-todo-close"
            title="Close window"
            onClick={() => {
              setEditMenu(false);
            }}
          ></i>
        </form>
      </div>
    </section>
  );
};

export default EditTodo;
