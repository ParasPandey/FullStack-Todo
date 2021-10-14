import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./AddTodayTask.css";
import Button from "@material-ui/core/Button";
import { noteAxios } from "../../AxiosConfig";
import { selectNotes, initializeNotes } from "./../../Redux/UserSlice";
import { useSelector, useDispatch } from "react-redux";

const UpdateNote = ({ show, handleClose, noteId }) => {
  const [note, setNote] = useState(null);
  const note_message = useRef();
  const note_title = useRef();
  const dispatch = useDispatch();
  const selectNote = useSelector(selectNotes);

  useEffect(() => {
    const fetchNote = async () => {
      const res = await noteAxios({
        method: "get",
        url: `/getNote/${noteId}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          "Access-Control-Allow-Credentials": true,
          Secure: true,
          HttpOnly: true,
        },
      });
      setNote(res.data.note);
    };
    fetchNote();
  }, [noteId]);

  const editTodoList = async (e) => {
    e.preventDefault();
    console.log(note_message.current.value, note_title.current.value);

    if (note_message.current.value) {
      const res = await noteAxios({
        method: "patch",
        url: `/updateNote/${noteId}`,
        data: {
          message: note_message.current.value,
          title: note_title.current.value,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          "Access-Control-Allow-Credentials": true,
          Secure: true,
          HttpOnly: true,
        },
      });
      const newArray = selectNote.slice();
      newArray.forEach((element, index) => {
        if (element._id === res.data.updatedNote._id) {
          newArray[index] = res.data.updatedNote;
        }
      });

      dispatch(
        initializeNotes({
          notes: newArray,
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
        <Modal.Title>Update Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          placeholder="Title"
          ref={note_title}
          defaultValue={note?.title}
        />
        <input
          placeholder="Description"
          ref={note_message}
          defaultValue={note?.message}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="contained" color="primary" onClick={editTodoList}>
          Update Note
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateNote;
