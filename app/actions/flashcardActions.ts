'use server'

import Flashcard from '@/app/models/flashcard';

const addFlashcard = async (frontValue: string, backValue: string) => {
    const newCard = new Flashcard({ front: frontValue, back: backValue });
    const savedCard = await newCard.save();
    const parsedId = JSON.parse(JSON.stringify(savedCard));
    return parsedId;
}

const getFlashcards = async () => {
    const flashcards = await Flashcard.find();
    const parsedFlashcards = JSON.parse(JSON.stringify(flashcards));
    return parsedFlashcards;
}

const editFlashcard = async (id: string, frontValue: string, backValue: string) => {
    const flashcard = await Flashcard.findById(id);
    flashcard.front = frontValue;
    flashcard.back = backValue;
    await flashcard.save();
    return JSON.parse(JSON.stringify(flashcard));
}

const deleteFlashcard = async (id: string) => {
    const deleted = await Flashcard.findByIdAndDelete(id);
    const parsedDeleted = JSON.parse(JSON.stringify(deleted));
    return parsedDeleted._id;
}

export { addFlashcard, getFlashcards, editFlashcard, deleteFlashcard }