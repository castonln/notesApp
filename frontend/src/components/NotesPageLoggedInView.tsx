import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from '../models/note';
import * as NotesApi from "../network/notes_api";
import stylesUtils from "../styles/utils.module.css";
import AddEditNoteDialogue from "./AddEditNoteDialogue";
import Note from './Note';
import styles from "../styles/NotesPage.module.css";
import AddNote from './AddNote';

const NotesPageLoggedInView = () => {
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [notesLoading, setNotesLoading] = useState(true);
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

    const [showAddNoteDialogue, setShowAddNoteDialogue] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

    useEffect(() => {
        async function loadNotes() {
            try {
                setShowNotesLoadingError(false);
                setNotesLoading(true);
                const notes = await NotesApi.fetchNotes();
                setNotes(notes);
            } catch (error) {
                console.error(error);
                setShowNotesLoadingError(true);
            } finally {
                setNotesLoading(false);
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

    const notesGrid =
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
            {notes.map(note => (

                <Col key={note._id}>
                    <Note
                        note={note}
                        className={styles.note}
                        onNoteClicked={setNoteToEdit}
                        onDeleteNoteClicked={deleteNote} />
                </Col>
            ))}
            <AddNote 
            className={styles.note}
            onAddNoteClicked={() => setShowAddNoteDialogue(true)} />
        </Row>

    return (
        <>
            {/*<Button
                className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
                onClick={() => setShowAddNoteDialogue(true)}>
                <FaPlus />
                Add new note
            </Button>*/}

            {notesLoading && <Spinner animation='border' variant='primary' />}
            {showNotesLoadingError && <p>Something went wrong. Refresh page.</p>}
            {!notesLoading && !showNotesLoadingError &&
                notesGrid
            }

            {showAddNoteDialogue &&
                <AddEditNoteDialogue
                    onDismiss={() => setShowAddNoteDialogue(false)}
                    onNoteSaved={(newNote) => {
                        setNotes([...notes, newNote]);
                        setShowAddNoteDialogue(false);
                    }} />}
            {/* If you passed showAddNoteDialogue as a prop, you would maintain state after closing. */}

            {noteToEdit &&
                <AddEditNoteDialogue
                    noteToEdit={noteToEdit}
                    onDismiss={() => setNoteToEdit(null)}
                    onNoteSaved={(updatedNote) => {
                        setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));
                        setNoteToEdit(null);
                    }} />}
        </>
    );
}

export default NotesPageLoggedInView;