'use server'

import Flashcard from '@/app/models/flashcard';

const addFlashcard = async (card: any) => {
    const front = card.get('front')
    const back = card.get('back')

    const newCard = new Flashcard({ front, back });
    await newCard.save();
}

const getFlashcards = async () => {
    return Flashcard.find()
}

export { addFlashcard, getFlashcards }