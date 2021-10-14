import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { noteAxios } from "./../../AxiosConfig";
import {
  selectuser,
  selectNotes,
  initializeNotes,
} from "./../../Redux/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import "./../../CssFiles/MainTodo/ShowNotes.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import UpdateNote from "./../Modal/UpdateNote";

const ShowNotes = () => {
  const [updateNote, SetUpdateNote] = useState(false);
  const [updateNoteId, SetUpdateNoteId] = useState(null);
  const user = useSelector(selectuser);
  const allNotes = useSelector(selectNotes);
  const dispatch = useDispatch();

  const handleClose = () => SetUpdateNote(false);

  const editNote = (e) => {
    const noteId = e.target?.nearestViewportElement?.id || e.target.id;
    SetUpdateNoteId(noteId);
    SetUpdateNote(true);
  };

  useEffect(() => {
    const getTodos = async () => {
      const res = await noteAxios({
        method: "post",
        url: "/getUserNotes",
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
      console.log(res.data);
      dispatch(
        initializeNotes({
          notes: res.data.notes,
        })
      );
    };
    getTodos();
  }, [dispatch, user.id]);
  const deleteNote = async (e) => {
    const noteId = e.target?.nearestViewportElement?.id || e.target.id;
    await noteAxios({
      method: "delete",
      url: `/deleteNote/${noteId}`,
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
    let newArray = allNotes.slice();
    newArray = newArray.filter((e) => e._id !== noteId);

    dispatch(
      initializeNotes({
        notes: newArray,
      })
    );
  };
  return (
    <Container className="notes_container">
      {updateNote && (
        <UpdateNote
          show={updateNote}
          handleClose={handleClose}
          noteId={updateNoteId}
        />
      )}
      {allNotes.map((item, i) => {
        return (
          <div className="each_note_box" key={i}>
            <div className="note_data">
              <div className="note_title">
                <strong>{item.title}</strong> 
              </div>
              <div className="note_message">
                <p>{item.message}</p>
              </div>
            </div>

            <div className="options_box">
              <IconButton id={item._id} onClick={editNote}>
                <EditIcon id={item._id} />
              </IconButton>
              <IconButton onClick={deleteNote} id={item._id}>
                <DeleteIcon id={item._id} />
              </IconButton>
            </div>
          </div>
        );
      })}
    </Container>
  );
};

export default ShowNotes;
