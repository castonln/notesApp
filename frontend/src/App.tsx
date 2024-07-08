import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialogue from './components/AddNoteDialogue';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialogue, setShowAddNoteDialogue] = useState(false);

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

  return (
    <Container>

      <Button 
      className={`mb-4 ${stylesUtils.blockCenter}`}
      onClick={() => setShowAddNoteDialogue(true)}>
        Add new note
      </Button>

      <Row xs={1} md={2} xl={3} className='g-4'>
        {notes.map(note => (

          <Col key={note._id}>
            <Note note={note} className={styles.note} />
          </Col>

        ))}
      </Row>

      { showAddNoteDialogue && 
      <AddNoteDialogue 
      onDismiss={() => setShowAddNoteDialogue(false)}
      onNoteSaved={(newNote) => {
        setNotes([...notes, newNote]);
        setShowAddNoteDialogue(false);
      }}/> } 
      {/* If you passed showAddNoteDialogue as a prop, you would maintain state after closing. */}

    </Container>
  );
}

export default App;
