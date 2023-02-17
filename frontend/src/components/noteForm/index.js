import { useForm } from "react-hook-form";
import styles from "components/noteForm/noteForm.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";

const NoteForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const noteID = useParams().id;
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleToastClose = () => setShowToast(false);
  const handleToastOpen = () => setShowToast(true);

  let note = {
    title: "",
    description: "",
    archived: false,
  };

  useEffect(() => {
    if (noteID) {
      getOneNote(noteID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOneNote = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/notes/${noteID}`
    );
    const data = await response.json();
    note = data;
    reset(note.data);
  };

  const createNote = async (body) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: body.title,
        description: body.description,
      }),
    });
    const data = await response.json();
    setToastMessage(data.message);
    console.log(toastMessage);
    handleToastOpen();
    setTimeout(() => {
      goBack();
    }, 2100);
  };

  const editNote = async (body) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/notes/${noteID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: body.title,
          description: body.description,
        }),
      }
    );
    const data = await response.json();
    setToastMessage(data.message);
    handleToastOpen();
    handleToastOpen();
    setTimeout(() => {
      goBack();
    }, 2100);
  };

  const goBack = () => {
    window.history.back();
  };

  const onSubmit = (data) => {
    if (noteID) {
      editNote(data);
    } else {
      createNote(data);
    }
  };

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
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className={styles.title}
            {...register("title", { required: true })}
            name={"title"}
            type={"text"}
            placeholder={"Insert title"}
          />
          {errors.title && (
            <p className={styles.textColor}>This field is required</p>
          )}
          <textarea
            className={styles.description}
            {...register("description", { required: true })}
            name={"description"}
            type={"text"}
            placeholder={"Insert description"}
          />
          {errors.description && (
            <p className={styles.textColor}>This field is required</p>
          )}
          <div className={styles.btns}>
            <button
              type="button"
              class="btn btn-outline-danger"
              onClick={() => goBack()}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-outline-primary"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
