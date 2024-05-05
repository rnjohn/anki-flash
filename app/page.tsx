'use client';
import { useState, useEffect } from 'react';
import Card from '@/app/components/Card';
import { getFlashcards, deleteFlashcard } from './actions/flashcardActions';
import NewFlashcardModal from './components/NewFlashcardModal';
import EditFlashcardModal from './components/EditFlashcardModal';
import flashcard from './types/flashcard';
import CardList from './components/CardList';

export default function Home() {
  const [flashcards, setFlashcards] = useState<flashcard[]>([]);
  const [visibleAddModal, setVisibleAddModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [currentEditFlashcard, setCurrentEditFlashcard] = useState<flashcard>({
    _id: '',
    front: '',
    back: '',
  });
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    try {
      getFlashcards().then((data) => {
        setFlashcards(data);
      });
    } catch (error: any) {
      console.log('Error when retrieving flashcards from db');
    }
  }, []);

  const getNewFlashcard = (newFlashcard: flashcard) => {
    setFlashcards([
      ...flashcards,
      {
        _id: newFlashcard._id,
        front: newFlashcard.front,
        back: newFlashcard.back,
      },
    ]);
  };

  const handleDeleteFlashcard = (id: string) => {
    setFlashcards(flashcards.filter((flashcard) => flashcard._id != id));
  };

  const handleAddModal = () => {
    setVisibleAddModal(true);
  };

  const onCloseAddModal = () => {
    setVisibleAddModal(false);
  };

  const handleEditModal = (id: string, front: string, back: string) => {
    setCurrentEditFlashcard({ _id: id, front, back });
    setVisibleEditModal(true);
  };

  const onCloseEditModal = () => {
    setCurrentEditFlashcard({ _id: '', front: '', back: '' });
    setVisibleEditModal(false);
  };

  const handleEditFlashcard = (id: string, front: string, back: string) => {
    let flashcardsCopy = [...flashcards];
    let flashcardToEditIdx = flashcardsCopy.findIndex(
      (flashcard) => flashcard._id == id,
    );
    flashcardsCopy[flashcardToEditIdx] = { _id: id, front, back };
    setFlashcards(flashcardsCopy);
    setCounter(counter + 1);
    onCloseEditModal();
  };

  return (
    <main className="flex flex-col p-8">
      <div>
        <button className="btn" onClick={handleAddModal}>
          Add new card
        </button>
      </div>
      <h1 className="pb-4">Current cards</h1>
      <CardList
        key={counter}
        flashcards={flashcards}
        handleEditModal={handleEditModal}
      />
      <NewFlashcardModal
        visible={visibleAddModal}
        onClose={onCloseAddModal}
        getNewFlashcard={getNewFlashcard}
      />
      <EditFlashcardModal
        visible={visibleEditModal}
        onClose={onCloseEditModal}
        currentEditFlashcard={currentEditFlashcard}
        handleEditFlashcard={handleEditFlashcard}
        handleDeleteFlashcard={handleDeleteFlashcard}
      />
    </main>
  );
}
