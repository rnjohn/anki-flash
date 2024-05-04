import { useEffect, useRef, useState } from 'react';
import { addFlashcard } from '@/app/actions/flashcardActions';

function NewFlashcardModal({
  visible,
  onClose,
  getNewFlashcard,
}: {
  visible: boolean;
  onClose: Function;
  getNewFlashcard: Function;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [frontValue, setFrontValue] = useState('');
  const [backValue, setBackValue] = useState('');

  const handleButton = (e: any) => {
    e.preventDefault();
    setFrontValue('');
    setBackValue('');
    addFlashcard(frontValue, backValue).then((flashcard) => {
      getNewFlashcard(flashcard);
    });
    onClose();
  };

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }
    visible ? modalRef.current.showModal() : modalRef.current.close();
  }, [visible]);

  const handleClose = (e: any) => {
    e.preventDefault();
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
          <button className="btn" onClick={handleButton}>
            Add card
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

export default NewFlashcardModal;
