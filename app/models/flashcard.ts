import mongoose from 'mongoose';

interface IFlaschcard {
  front: string;
  back: string;
}

const flashcardSchema = new mongoose.Schema<IFlaschcard>({
  front: {
    type: String,
    required: true
  },
  back: {
    type: String,
    required: true
  },
}, { timestamps: true });

export default mongoose.models.Flashcard || mongoose.model<IFlaschcard>('Flashcard', flashcardSchema);