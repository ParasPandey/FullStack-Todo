import React from "react";
import LeftOptionBox from "./LeftOptionBox";
import RightNotesBox from "./RightNotesBox";
import "./../../CssFiles/MainTodo/MainBox.css"

const MainBox = () => {
  return (
    <div className="main_todo_box">
      <LeftOptionBox />
      <RightNotesBox />
    </div>
  );
};

export default MainBox;
