'use server'

import Flashcard from '@/app/models/flashcard';

const addFlashcard = async (frontValue: string, backValue: string) => {
    const newCard = new Flashcard({ front: frontValue, back: backValue });
    await newCard.save();
}

const getFlashcards = async () => {
    const flashcards = await Flashcard.find();

    return JSON.parse(JSON.stringify(flashcards))
}

export { addFlashcard, getFlashcards }