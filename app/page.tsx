'use client';
import { useState } from 'react';
import Card from '@/app/components/Card';

type flashcard = {
  front: string;
  back: string;
};

export default function Home() {
  const [flashcards, setFlashcards] = useState<flashcard[]>([]);
  const [frontValue, setFrontValue] = useState('');
  const [backValue, setBackValue] = useState('');

  const handleButton = (e: any) => {
    setFlashcards([...flashcards, { front: frontValue, back: backValue }]);
    setFrontValue('');
    setBackValue('');
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
            value={frontValue}
          ></input>
          <input
            className="input input-bordered"
            type="text"
            placeholder="Back value"
            onChange={handleBackChange}
            value={backValue}
          ></input>
          <button className="btn" type="button" onClick={handleButton}>
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
