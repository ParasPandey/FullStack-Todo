import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import CloseIcon from "@material-ui/icons/Close";
import "./AddTodayTask.css";
import Dropdown from "react-bootstrap/Dropdown";
import FlagIcon from "@material-ui/icons/Flag";
import Button from "@material-ui/core/Button";
import { todoAxios } from "../../AxiosConfig";
import { selectuser, addToTodoList } from "./../../Redux/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const localizer = momentLocalizer(moment);

const AddTodayTask = ({ show, handleClose }) => {
  const [priority, setPriority] = useState(4);
  const [today, setToday] = useState(true);
  const todo_message = useRef();
  const todo_description = useRef();
  const user = useSelector(selectuser);
  const dispatch = useDispatch();
  const handleRadioChange = (e) => {
    setToday(!today);
  };
  const events = [
    {
      start: moment().toDate(),
      end: moment().add(0, "days").toDate(),
    },
  ];

  const changePriority = (e) => {
    if (e.target.id === "1") {
      setPriority(1);
    } else if (e.target.id === "2") {
      setPriority(2);
    } else if (e.target.id === "3") {
      setPriority(3);
    } else if (e.target.id === "4") {
      setPriority(4);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (todo_message.current.value) {
      const res = await todoAxios({
        method: "post",
        url: "/addTodo",
        data: {
          userId: user.id,
          todo: todo_message.current.value,
          description: todo_description.current.value,
          priority,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          "Access-Control-Allow-Credentials": true,
          Secure: true,
          HttpOnly: true,
        },
      });
      dispatch(
        addToTodoList({
          newTodo: res.data.data.addTodo,
        })
      );
      console.log(res.data);
    }
    handleClose();
  };
  // const setCalender = (e)=>{
  //   console.log(e)
  // }
  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={true}
      size="lg"
      className="add_today_task_modal"
    >
      <Modal.Header>
        <Modal.Title>Add a Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input placeholder="eg. Get Burger at 6 #Family" ref={todo_message} />
        <input placeholder="Description" ref={todo_description} />
        <div className="set_priority">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <FlagIcon className={`priority_${priority}`} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                id="1"
                value="1"
                onClick={(e) => changePriority(e)}
              >
                <FlagIcon className="priority_1" /> Priority 1
              </Dropdown.Item>
              <Dropdown.Item
                id="2"
                value="2"
                onClick={(e) => changePriority(e)}
              >
                <FlagIcon className="priority_2" /> Priority 2
              </Dropdown.Item>
              <Dropdown.Item
                id="3"
                value="3"
                onClick={(e) => changePriority(e)}
              >
                <FlagIcon className="priority_3" /> Priority 3
              </Dropdown.Item>
              <Dropdown.Item
                id="4"
                value="4"
                onClick={(e) => changePriority(e)}
              >
                <FlagIcon className="priority_4" /> Priority 4
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="today_future">
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                className="today_upcoming_radio_buttons"
                value={today}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="Today"
                  control={<Radio />}
                  label="Today"
                  checked={today}
                />
                <FormControlLabel
                  value="Upcoming"
                  control={<Radio />}
                  label="Upcoming"
                  checked={!today}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        {/* {!today && (
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 300 }}
            onClick={setCalender}
          />
        )} */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="contained" color="primary" onClick={addTodo}>
          Add a task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTodayTask;
