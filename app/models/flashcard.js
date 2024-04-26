import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
  front: String,
  back: String,
});

export default flashcardSchema;
