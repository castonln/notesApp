import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import AddEditNoteDialogue from './components/AddEditNoteDialogue';
import { FaPlus } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialogue, setShowAddNoteDialogue] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);
  // array contains variables that reload the function, if empty execute once

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNote => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Container>

      <Button 
      className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
      onClick={() => setShowAddNoteDialogue(true)}>
        <FaPlus />
        Add new note
      </Button>

      <Row xs={1} md={2} xl={3} className='g-4'>
        {notes.map(note => (

          <Col key={note._id}>
            <Note 
            note={note} 
            className={styles.note} 
            onNoteClicked={setNoteToEdit}
            onDeleteNoteClicked={deleteNote} />
          </Col>

        ))}
      </Row>

      { showAddNoteDialogue && 
      <AddEditNoteDialogue 
      onDismiss={() => setShowAddNoteDialogue(false)}
      onNoteSaved={(newNote) => {
        setNotes([...notes, newNote]);
        setShowAddNoteDialogue(false);
      }}/> } 
      {/* If you passed showAddNoteDialogue as a prop, you would maintain state after closing. */}

      {noteToEdit &&
      <AddEditNoteDialogue 
      noteToEdit={noteToEdit}
      onDismiss={() => setNoteToEdit(null)}
      onNoteSaved={(updatedNote) => {
        setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));
        setNoteToEdit(null);
      }}/>}
    </Container>
  );
}

export default App;
