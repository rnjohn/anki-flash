'use client';
import { useState, useEffect } from 'react';
import Card from '@/app/components/Card';
import {
  addFlashcard,
  getFlashcards,
  deleteFlashcard,
} from './actions/flashcardActions';

type flashcard = {
  _id: string;
  front: string;
  back: string;
};

export default function Home() {
  const [flashcards, setFlashcards] = useState<flashcard[]>([]);
  const [frontValue, setFrontValue] = useState('');
  const [backValue, setBackValue] = useState('');

  useEffect(() => {
    try {
      getFlashcards().then((data) => {
        console.log('FETCHED FLASHCARDS');
        setFlashcards(data);
      });
    } catch (error: any) {
      console.log('Error when retrieving flashcards from db');
    }
  }, []);

  const handleButton = (e: any) => {
    e.preventDefault();
    setFrontValue('');
    setBackValue('');
    addFlashcard(frontValue, backValue).then((id) => {
      setFlashcards([
        ...flashcards,
        { _id: id, front: frontValue, back: backValue },
      ]);
    });
  };

  const handleFrontChange = (e: any) => {
    setFrontValue(e.target.value);
  };

  const handleBackChange = (e: any) => {
    setBackValue(e.target.value);
  };

  const handleRemoval = (id: string) => {
    deleteFlashcard(id).then(() => {
      setFlashcards(flashcards.filter((flashcard) => flashcard._id != id));
    });
  };

  return (
    <main className="flex flex-col p-8">
      <div>
        <h1>Add new card</h1>
        <form className="flex flex-col w-min p-4 space-y-4">
          <input
            className="input input-bordered"
            type="text"
            placeholder="Front value"
            onChange={handleFrontChange}
            name={'front'}
            value={frontValue}
          ></input>
          <input
            className="input input-bordered"
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
      </div>
      <h1 className="pb-4">Current cards</h1>
      <div className="flex space-x-4">
        {flashcards &&
          flashcards.map((flashcard, index) => (
            <Card
              key={flashcard._id || index}
              index={flashcard._id || index}
              front={flashcard.front}
              back={flashcard.back}
              handleRemoval={handleRemoval}
            ></Card>
          ))}
      </div>
    </main>
  );
}
