'use client';
import { useState, useEffect } from 'react';
import Card from '@/app/components/Card';
import { addFlashcard, getFlashcards } from './actions/flashcardActions';

type flashcard = {
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
        setFlashcards(data);
      });
    } catch (error: any) {}
  }, []);

  const handleButton = (e: any) => {
    e.preventDefault();
    setFlashcards([...flashcards, { front: frontValue, back: backValue }]);
    setFrontValue('');
    setBackValue('');
    addFlashcard(frontValue, backValue);
  };

  const handleFrontChange = (e: any) => {
    setFrontValue(e.target.value);
  };

  const handleBackChange = (e: any) => {
    setBackValue(e.target.value);
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
        {flashcards.map((flashcard, index) => (
          <Card
            key={index}
            front={flashcard.front}
            back={flashcard.back}
          ></Card>
        ))}
      </div>
    </main>
  );
}
