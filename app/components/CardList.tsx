import flashcard from '../types/flashcard';
import Card from './Card';

function CardList({
  flashcards,
  handleEditModal,
}: {
  flashcards: flashcard[];
  handleEditModal: Function;
}) {
  return (
    <div className="flex space-x-4">
      {flashcards.length > 0 &&
        flashcards.map((flashcard) => (
          <Card
            key={flashcard._id}
            id={flashcard._id}
            front={flashcard.front}
            back={flashcard.back}
            handleEditModal={handleEditModal}
          />
        ))}
    </div>
  );
}

export default CardList;
