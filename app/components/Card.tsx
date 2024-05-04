import { useState } from 'react';

export default function Card({
  id,
  front,
  back,
  handleEditModal,
}: {
  id: string;
  front: string;
  back: string;
  handleEditModal: Function;
}) {
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(front);

  const handleClick = () => {
    setValue(clicked ? front : back);
    setClicked(!clicked);
  };

  const handleOpenEditModal = (e: any) => {
    e.preventDefault();
    handleEditModal(id, front, back);
  };

  return (
    <div className="card card-bordered w-fit p-8 outline" onClick={handleClick}>
      <button className="btn" onClick={handleOpenEditModal}>
        ...
      </button>
      <h1 className="select-none">{value}</h1>
    </div>
  );
}
