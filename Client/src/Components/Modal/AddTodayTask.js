import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import CloseIcon from "@material-ui/icons/Close";
import "./AddTodayTask.css";
import Dropdown from "react-bootstrap/Dropdown";
import FlagIcon from "@material-ui/icons/Flag";
import Button from "@material-ui/core/Button";

const AddTodayTask = ({ show, handleClose }) => {
  const [priority, setPriority] = useState(4);
  const todo_message = useRef();
  const todo_description = useRef();

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

  const addTodo = (e) => {
    e.preventDefault();
    console.log(priority);
    console.log(todo_message.current.value);
    console.log(todo_description.current.value);
  };
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
        </div>
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
