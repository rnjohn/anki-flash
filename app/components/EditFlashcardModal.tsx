import { useEffect, useRef, useState } from 'react';
import { editFlashcard, deleteFlashcard } from '@/app/actions/flashcardActions';
import flashcard from '@/app/types/flashcard';

function EditFlashcardModal({
  visible,
  onClose,
  currentEditFlashcard,
  handleEditFlashcard,
  handleDeleteFlashcard,
}: {
  visible: boolean;
  onClose: Function;
  currentEditFlashcard: flashcard;
  handleEditFlashcard: Function;
  handleDeleteFlashcard: Function;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [frontValue, setFrontValue] = useState(currentEditFlashcard.front);
  const [backValue, setBackValue] = useState(currentEditFlashcard.back);

  const handleEditButton = (e: any) => {
    e.preventDefault();
    setFrontValue('');
    setBackValue('');
    editFlashcard(currentEditFlashcard._id, frontValue, backValue).then(
      (flashcard) => {
        handleEditFlashcard(flashcard._id, flashcard.front, flashcard.back);
      },
    );
  };

  useEffect(() => {
    setFrontValue(currentEditFlashcard.front);
    setBackValue(currentEditFlashcard.back);
  }, [setFrontValue, setBackValue, currentEditFlashcard]);

  const handleDeleteButton = () => {
    setFrontValue('');
    setBackValue('');
    deleteFlashcard(currentEditFlashcard._id).then((deletedId) => {
      handleDeleteFlashcard(deletedId);
    });
    onClose();
  };

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }
    visible ? modalRef.current.showModal() : modalRef.current.close();
  }, [visible]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleFrontChange = (e: any) => {
    setFrontValue(e.target.value);
  };

  const handleBackChange = (e: any) => {
    setBackValue(e.target.value);
  };

  return (
    <dialog ref={modalRef} id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog w-min p-4 space-y-4">
          <input
            className="input input-bordered block"
            type="text"
            placeholder="Front value"
            onChange={handleFrontChange}
            name={'front'}
            value={frontValue}
          ></input>
          <input
            className="input input-bordered block"
            type="text"
            placeholder="Back value"
            onChange={handleBackChange}
            name={'back'}
            value={backValue}
          ></input>
          <button className="btn" onClick={handleEditButton} type="button">
            Edit card
          </button>
          <button className="btn" onClick={handleDeleteButton} type="button">
            Delete card
          </button>
        </form>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleClose}
        >
          ✕
        </button>
      </div>
    </dialog>
  );
}

export default EditFlashcardModal;
