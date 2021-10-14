import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./AddTodayTask.css";
import Dropdown from "react-bootstrap/Dropdown";
import FlagIcon from "@material-ui/icons/Flag";
import Button from "@material-ui/core/Button";
import { todoAxios } from "../../AxiosConfig";
import {
  selectTodoList,
  initializeTodoList,
} from "./../../Redux/UserSlice";
import { useSelector, useDispatch } from "react-redux";

const UpdateTodayTodo = ({ show, handleClose, todoId }) => {
  const [priority, setPriority] = useState(4);
  const [todo, setTodo] = useState(null);
  const todo_message = useRef();
  const todo_description = useRef();
  const dispatch = useDispatch();
  const selectTodo = useSelector(selectTodoList);

  useEffect(() => {
    const fetchTodo = async () => {
      const res = await todoAxios({
        method: "get",
        url: `/getTodo/${todoId}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          "Access-Control-Allow-Credentials": true,
          Secure: true,
          HttpOnly: true,
        },
      });
      setTodo(res.data.todo);
      setPriority(res.data.todo.priority);
    };
    fetchTodo();
  }, [todoId]);

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

  const editTodoList = async (e) => {
    e.preventDefault();

    if (todo_message.current.value) {
      const res = await todoAxios({
        method: "patch",
        url: `/updateTodo/${todoId}`,
        data: {
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
      const newArray = selectTodo.slice();
      newArray.forEach((element, index) => {
        if (element._id === res.data.updatedTodo._id) {
          newArray[index] = res.data.updatedTodo;
        }
      });

      dispatch(
        initializeTodoList({
          todo: newArray,
        })
      );
    }
    handleClose();
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
        <Modal.Title>Update a Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          placeholder="eg. Get Burger at 6 #Family"
          ref={todo_message}
          defaultValue={todo?.todo}
        />
        <input
          placeholder="Description"
          ref={todo_description}
          defaultValue={todo?.description}
        />
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
        <Button variant="contained" color="primary" onClick={editTodoList}>
          Update a task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateTodayTodo;
