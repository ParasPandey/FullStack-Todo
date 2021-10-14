import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import "./../../CssFiles/MainTodo/RightNotes.css";
import IconButton from "@material-ui/core/IconButton";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import AddIcon from "@material-ui/icons/Add";
import AddNotes from "../Modal/AddNotes";
import ShowNotes from "./ShowNotes";

const RightNotes = () => {
  const [addNote, SetAddNote] = useState(false);
  const openAddNoteModal = () => {
    SetAddNote(true);
  };
  const handleClose = () => SetAddNote(false);
  const sortData = ()=>{
    console.log("sort")
  }
  return (
    <Container className="right_notes">
      <h1>Notes</h1>
      {addNote && <AddNotes show={addNote} handleClose={handleClose} />}
      <div className="today_upcoming_options">
        <Container className="shows_todo">
          <div className="todo_main_header">
            <div className="left_header">
              <h3>Today</h3>
              <p>{new Date().toISOString().slice(0, 10)}</p>
            </div>
            <div className="right_header">
              <IconButton onClick={sortData}>
                <ImportExportIcon />
              </IconButton>

              <p>Sort</p>
            </div>
          </div>
        </Container>
        <Container className="add_task" onClick={openAddNoteModal}>
          <AddIcon />
          Add Note
        </Container>
      </div>
      <ShowNotes />
    </Container>
  );
};

export default RightNotes;
