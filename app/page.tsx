'use client';
import { useState, useEffect } from 'react';
import Card from '@/app/components/Card';
import { getFlashcards, deleteFlashcard } from './actions/flashcardActions';
import NewFlashcardModal from './components/NewFlashcardModal';

type flashcard = {
  _id: string;
  front: string;
  back: string;
};

export default function Home() {
  const [flashcards, setFlashcards] = useState<flashcard[]>([]);
  const [visibleAddModal, setVisibleAddModal] = useState(false);

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

  const handleRemoval = (id: string) => {
    deleteFlashcard(id).then((deletedId) => {
      setFlashcards(
        flashcards.filter((flashcard) => flashcard._id != deletedId),
      );
    });
  };

  const handleModal = (e: any) => {
    e.preventDefault();
    setVisibleAddModal(true);
  };

  const onCloseModal = () => {
    setVisibleAddModal(false);
  };

  return (
    <main className="flex flex-col p-8">
      <div>
        <button className="btn" onClick={handleModal}>
          Add new card
        </button>
      </div>
      <h1 className="pb-4">Current cards</h1>
      <div className="flex space-x-4">
        {flashcards &&
          flashcards.map((flashcard) => (
            <Card
              key={flashcard._id}
              id={flashcard._id}
              front={flashcard.front}
              back={flashcard.back}
              handleRemoval={handleRemoval}
            ></Card>
          ))}
      </div>
      <NewFlashcardModal
        visible={visibleAddModal}
        onClose={onCloseModal}
        getNewFlashcard={getNewFlashcard}
      />
    </main>
  );
}
