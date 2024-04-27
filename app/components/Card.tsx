import { useState } from 'react';

export default function Card({ front, back }: { front: string; back: string }) {
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(front);

  const handleClick = (e: any) => {
    setValue(clicked ? front : back);
    setClicked(!clicked);
  };

  return (
    <div className="card card-bordered w-fit p-8" onClick={handleClick}>
      <h1 className="select-none">{value}</h1>
    </div>
  );
}
