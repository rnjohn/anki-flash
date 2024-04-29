import { useState } from 'react';

export default function Card({
  index,
  front,
  back,
  handleRemoval,
}: {
  index: number;
  front: string;
  back: string;
  handleRemoval: Function;
}) {
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(front);

  const handleClick = (e: any) => {
    setValue(clicked ? front : back);
    setClicked(!clicked);
  };

  return (
    <div className="card card-bordered w-fit p-8 outline" onClick={handleClick}>
      <button
        className="btn btn-square outline"
        onClick={() => handleRemoval(index, front, back)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h1 className="select-none">{value}</h1>
    </div>
  );
}
