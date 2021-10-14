import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { todoAxios } from "./../../AxiosConfig";
import {
  selectuser,
  selectTodoList,
  initializeTodoList,
} from "./../../Redux/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import "./../../CssFiles/MainTodo/ShowTodoList.css";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateTodayTodo from "../Modal/UpdateTodayTodo";
import AlarmIcon from "@material-ui/icons/Alarm";
import FlagIcon from "@material-ui/icons/Flag";

const ShowTodoList = () => {
  const [updateTask, SetUpdateTask] = useState(false);
  const [updateTodoId, SetUpdateTodoId] = useState(null);
  const user = useSelector(selectuser);
  const selectTodo = useSelector(selectTodoList);
  const dispatch = useDispatch();

  const handleClose = () => SetUpdateTask(false);

  const openAddTaskModal = (e) => {
    console.log("had")
    const todoId = e.target?.nearestViewportElement?.id || e.target.id;
    SetUpdateTodoId(todoId);
    SetUpdateTask(true);
  };

  useEffect(() => {
    const getTodos = async () => {
      const res = await todoAxios({
        method: "post",
        url: "/getTodo",
        data: {
          userId: user.id,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          "Access-Control-Allow-Credentials": true,
          //   Secure: true,
          HttpOnly: true,
        },
      });
      //   console.log(res.data.todos);
      dispatch(
        initializeTodoList({
          todo: res.data.todos,
        })
      );
    };
    getTodos();
  }, [dispatch, user.id]);
  const handleChange = async (e) => {
    const res = await todoAxios({
      method: "patch",
      url: `/updateTodoFlag/${e.target.id}`,
      data: {
        userId: user.id,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        "Access-Control-Allow-Credentials": true,
        //   Secure: true,
        HttpOnly: true,
      },
    });

    // update todoList array in state

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
  };
  const deleteTodo = async (e) => {
    const todoId = e.target?.nearestViewportElement?.id || e.target.id;
    await todoAxios({
      method: "delete",
      url: `/deleteTodo/${todoId}`,
      data: {
        userId: user.id,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        "Access-Control-Allow-Credentials": true,
        //   Secure: true,
        HttpOnly: true,
      },
    });
    let newArray = selectTodo.slice();
    newArray = newArray.filter((e) => e._id !== todoId);

    dispatch(
      initializeTodoList({
        todo: newArray,
      })
    );
  };

  return (
    <Container className="list_container">
      {updateTask && (
        <UpdateTodayTodo
          show={updateTask}
          handleClose={handleClose}
          todoId={updateTodoId}
        />
      )}
      {selectTodo?.map((todo, i) => {
        return (
          <Row className="each_todo_item" key={i}>
            <Col xs={6} md={9} className="todo_message">
              <Checkbox
                checked={todo?.isDone ? true : false}
                onChange={handleChange}
                inputProps={{ "aria-label": "primary checkbox" }}
                id={todo._id}
              />
              <div className="message_box">
                <p className={todo?.isDone && "task_completed"}>{todo.todo}</p>
                <p className={todo?.isDone && "task_completed description"}>
                  {todo?.description}
                </p>
              </div>
            </Col>
            <Col xs={6} md={3} className="todo_options">
              <IconButton
                id={todo._id}
                className={todo?.isDone && "options_task_completed"}
                onClick={openAddTaskModal}
              >
                <EditIcon id={todo._id} />
              </IconButton>
              <IconButton id={todo._id} onClick={deleteTodo}>
                <DeleteIcon id={todo._id} />
              </IconButton>
              <IconButton id={todo._id}>
                <FlagIcon className={`priority_${todo.priority}`} />
              </IconButton>
              <IconButton id={todo._id}>
                <AlarmIcon />
              </IconButton>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default ShowTodoList;
