import React from "react";
import RightTodo from "./RightTodo";
import RightNotes from "./RightNotes";
import { selectShowTodo, selectLeftBox } from "./../../Redux/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import "./../../CssFiles/MainTodo/RightOptionBox.css"

const RightOptionBox = () => {
  const showTodo = useSelector(selectShowTodo);
  const showLeftBox = useSelector(selectLeftBox);
  return (
    <div
      className={`${!showLeftBox && "right_optionBox_full "} right_optionBox `}
     
    >
      {showTodo ? <RightTodo /> : <RightNotes />}
    </div>
  );
};

export default RightOptionBox;
