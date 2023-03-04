import React from "react";
import AddTodo from "./AddTodo/AddTodo";
import Chart from "./Chart/Chart";
import MyTodos from "./MyTodos/MyTodos";
import "./Home.css";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const username = JSON.parse(localStorage.getItem("user"));

const Home = () => {
  return (
    <>
    <div>
    <h1 className="welcome-title">
        Welcome <span>{username}</span>
      </h1>
    </div>
      <Chart />
      <AddTodo />
      <DndProvider backend={HTML5Backend}>
        <MyTodos />
      </DndProvider>
    </>
  );
};

export default Home;
