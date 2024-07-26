import { Card } from "react-bootstrap";
import styles from "../styles/NotesPage.module.css";
import { FaPlus } from "react-icons/fa";

interface AddNoteProps {
    onAddNoteClicked: () => void,
    className?: string,
}

const AddNote = ({ onAddNoteClicked, className }: AddNoteProps) => {

    return ( 
        <Card 
        className={`${styles.note}`}
        onClick={onAddNoteClicked}>
            <Card.Body className="d-flex justify-content-center align-items-center flex-wrap">
                <div className="w-100">
                <FaPlus size={50} className="w-100" />
                </div>
                <div>
                    Add new note
                </div>
            </Card.Body>
        </Card>
    );
}
 
export default AddNote;