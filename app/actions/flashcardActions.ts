'use server'

import Flashcard from '@/app/models/flashcard';

const addFlashcard = async (frontValue: string, backValue: string) => {
    const newCard = new Flashcard({ front: frontValue, back: backValue });
    await newCard.save();
}

const getFlashcards = async () => {
    const flashcards = await Flashcard.find();

    if (!flashcards) return [];
    return JSON.parse(JSON.stringify(flashcards))
}

const deleteFlashcard = async (frontValue: string, backValue: string) => {
    console.log(frontValue, backValue)
    await Flashcard.deleteOne({ front: frontValue, back: backValue });
}

export { addFlashcard, getFlashcards, deleteFlashcard }