'use client'
import Image from "next/image";
import { useState, FormEvent } from 'react';

type flashcard = {
  front: string;
  back: string;
}

function Card({ front, back } : { front: string, back: string }) {
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(front);


  const handleClick = (e: any) => {
    setValue(clicked ? front : back);
    setClicked(!clicked);
  }

  return (
    <div className="border-4 border-black-100/100">
      <h1>{value}</h1>
      <button onClick={handleClick}>{clicked ? 'Show back' : 'Show front'}</button>
    </div>
  )
}

export default function Home() {
  const [flashcards, setFlashcards] = useState<flashcard[]>([]);
  const [frontValue, setFrontValue] = useState('');
  const [backValue, setBackValue] = useState('');

  const handleButton = (e: any) => {
    setFlashcards([...flashcards, {front: frontValue, back: backValue}])
    console.log(flashcards)
  }

  const handleFrontChange = (e: any) => {
    setFrontValue(e.target.value);
  }

  const handleBackChange = (e: any) => {
    setBackValue(e.target.value);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {flashcards.map(flashcard => (
        <Card front={flashcard.front} back={flashcard.back}></Card>
      ))}
      <form>
        <input type='text' placeholder='Front value' onChange={handleFrontChange} value={frontValue}></input>
        <input type='text' placeholder='Back value' onChange={handleBackChange} value={backValue}></input>
        <button type='button' onClick={handleButton}>Submit</button>
      </form>
    </main>
  );
}
