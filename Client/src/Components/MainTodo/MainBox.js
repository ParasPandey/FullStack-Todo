import React from "react";
import LeftOptionBox from "./LeftOptionBox";
import "./../../CssFiles/MainTodo/MainBox.css";
import RightOptionBox from "./RightOptionBox";
import { setLeftBox, selectLeftBox } from "./../../Redux/UserSlice";
import { useSelector, useDispatch } from "react-redux";

const MainBox = () => {
  // const user = useSelector(selectuser);
  const showLeftBox = useSelector(selectLeftBox);
  return (
    <div className="main_todo_box">
      {showLeftBox && <LeftOptionBox />}

      <RightOptionBox />
    </div>
  );
};

export default MainBox;
