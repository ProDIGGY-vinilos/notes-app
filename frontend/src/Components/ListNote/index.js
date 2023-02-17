import styles from "Components/ListNote/listNotes.module.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import {
  BiEdit,
  BiArchiveIn,
  BiArchiveOut,
  BiTrash,
  BiNote,
} from "react-icons/bi";

const ListNotes = () => {
  const [noteList, setNoteList] = useState([]);
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [path, setPath] = useState(window.location.pathname); // ["/notes", "/archived"
  const [emptyText, setEmptyText] = useState("No notes");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState();
  const [toastMessage, setToastMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleToastClose = () => setShowToast(false);
  const handleToastOpen = () => setShowToast(true);

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  const getNotes = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/notes`);
    const data = await response.json();
    setNoteList(data.data);
  };

  const getArchivedNotes = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/notes/archived`
    );
    const data = await response.json();
    setNoteList(data.data);
  };

  const archiveIn = async (note) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/notes/${note.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: note.title,
          description: note.description,
          archived: 1,
        }),
      }
    );
    const data = await response.json();
    filter(data.data.id);
    setToastMessage("Note archived successfully");
    handleToastOpen();
  };

  const archiveOut = async (note) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/notes/${note.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: note.title,
          description: note.description,
          archived: 0,
        }),
      }
    );
    const data = await response.json();
    filter(data.data.id);
    setToastMessage("Note unarchived successfully");
    setShowToast(true);
  };

  const handleModal = async (id) => {
    setDeleteId(id);
    handleShow();
  };

  const deleteNote = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/notes/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    filter(data.data.id);
    handleClose();
    setToastMessage("Note deleted successfully");
    setShowToast(true);
  };

  const filter = (id) => {
    setLoading(true);
    const filtered = noteList.filter((note) => note.id !== id);
    setNoteList(filtered);
  };

  useEffect(() => {
    if (noteList.length === 0) {
      if (path === "/notes") {
        getNotes();
        if (noteList.length === 0) {
          setEmptyText("No notes");
        }
      } else if (path === "/archived") {
        getArchivedNotes();
        if (noteList.length === 0) {
          setEmptyText("No archived notes");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (noteList === undefined) {
    } else {
      if (noteList.length !== 0) {
        setLoading(false);
      }
    }
  }, [noteList]);

  return (
    <div className={styles.container}>
      <Toast
        onClose={() => handleToastClose()}
        show={showToast}
        delay={2000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Congrats</strong>
          <small>close</small>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this note?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => deleteNote(deleteId)}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
      {!loading ? (
        <div className={styles.notesContainer}>
          <ul>
            {noteList.map((note) => (
              <li key={note.id} className={styles.notes}>
                <div className={styles.noteIconText}>
                  <div className={styles.noteIcon}>
                    <BiNote size={85} />
                  </div>
                  <div className={styles.noteText}>
                    <p>{note.title}</p>
                    <p>{note.description}</p>
                  </div>
                </div>
                <div className={styles.noteBtn}>
                  {path === "/notes" ? (
                    <button onClick={() => archiveIn(note)}>
                      {" "}
                      <BiArchiveIn />
                    </button>
                  ) : (
                    <button onClick={() => archiveOut(note)}>
                      {" "}
                      <BiArchiveOut />
                    </button>
                  )}
                  <a href={`/notesForm/${note.id}`}>
                    <BiEdit />
                    {""}
                  </a>
                  <button onClick={() => handleModal(note.id)}>
                    <BiTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{emptyText}</p>
      )}
    </div>
  );
};

export default ListNotes;
