import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Container from "react-bootstrap/Container";
import "./../../CssFiles/MainTodo/RightTodo.css";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import AddTodayTask from "../Modal/AddTodayTask";
import ShowTodoList from "./ShowTodoList";

const RightTodo = () => {
  const [radioValue, setRadioValue] = useState("Today");
  const [addTask, SetAddTask] = useState(false);
  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };
  const handleClose = () => SetAddTask(false);

  const openAddTaskModal = () => {
    SetAddTask(true);
  };
  return (
    <Container  className="right_todoBox">
      {addTask && <AddTodayTask show={addTask} handleClose={handleClose} />}
      {/* <div className="today_upcoming_options">
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="gender1"
            className="today_upcoming_radio_buttons"
            value={radioValue}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="Today" control={<Radio />} label="Today" />
            <FormControlLabel
              value="Upcoming"
              control={<Radio />}
              label="Upcoming"
            />
          </RadioGroup>
        </FormControl>
      </div> */}
      <Container className="shows_todo">
        <div className="todo_main_header">
          <div className="left_header">
            <h3>Today</h3>
            <p>{new Date().toISOString().slice(0, 10)}</p>
          </div>
          <div className="right_header">
            <IconButton>
              <ImportExportIcon />
            </IconButton>

            <p>Sort</p>
          </div>
        </div>
      </Container>
      <Container className="add_task" onClick={openAddTaskModal}>
        <AddIcon />
        Add Task
      </Container>
      <ShowTodoList />
    </Container>
  );
};

export default RightTodo;
