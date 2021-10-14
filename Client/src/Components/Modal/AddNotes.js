import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import "./AddNotes.css";
import Button from "@material-ui/core/Button";
import { noteAxios } from "../../AxiosConfig";
import { selectuser, addNotes } from "./../../Redux/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";

const AddNotes = ({ show, handleClose }) => {
  const note_message = useRef();
  const note_title = useRef();
  const user = useSelector(selectuser);
  const dispatch = useDispatch();

  const addTodo = async (e) => {
    e.preventDefault();
    const notes = {
      userId: user.id,
      title: note_title.current.value,
      message: note_message.current.value,
    };
    if (note_message.current.value) {
      const res = await noteAxios({
        method: "post",
        url: "/addNote",
        data: notes,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          "Access-Control-Allow-Credentials": true,
          Secure: true,
          HttpOnly: true,
        },
      });
      dispatch(
        addNotes({
          newNotes: res.data.data.addNote,
        })
      );
      console.log(res.data);
    }
    handleClose();
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={true}
      size="lg"
      className="add_notes_modal"
    >
      <Modal.Header>
        <Modal.Title>Take a Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input placeholder="Title" ref={note_title} />
        <textarea placeholder="Take a note.." ref={note_message} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="contained" color="primary" onClick={addTodo}>
          Add a Note
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNotes;
