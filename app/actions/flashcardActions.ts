'use server'

import Flashcard from '@/app/models/flashcard';

const addFlashcard = async (frontValue: string, backValue: string) => {
    const newCard = new Flashcard({ front: frontValue, back: backValue });
    const savedCard = await newCard.save();
    const parsedId = JSON.parse(JSON.stringify(savedCard))._id;
    return parsedId;
}

const getFlashcards = async () => {
    const flashcards = await Flashcard.find();
    const parsedFlashcards = JSON.parse(JSON.stringify(flashcards));
    return parsedFlashcards;
}

const deleteFlashcard = async (index: string) => {
    await Flashcard.deleteOne({ _id: index });
}

export { addFlashcard, getFlashcards, deleteFlashcard }