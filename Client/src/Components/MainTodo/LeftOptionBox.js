import React from "react";
import "./../../CssFiles/MainTodo/LeftOptionBox.css";
import { selectShowTodo, setShowTodo } from "./../../Redux/UserSlice";
import { useSelector, useDispatch } from "react-redux";

const LeftOptionBox = () => {
  const showTodo = useSelector(selectShowTodo);
  const dispatch = useDispatch();

  const changeShowTodo = () => {
    localStorage.setItem("showTodo", JSON.stringify(!showTodo));
    dispatch(
      setShowTodo({
        showTodo: !showTodo,
      })
    );
  };
  return (
    <div className="left_optionBox">
      <div
        className={`${showTodo && "show_left_optionbox"}    options`}
        onClick={changeShowTodo}
      >
        Todo List
      </div>
      <div
        className={`${!showTodo && "show_left_optionbox"}   options`}
        onClick={changeShowTodo}
      >
        Notes
      </div>
    </div>
  );
};

export default LeftOptionBox;
