import { First } from './matryoshka/First';
import { useState } from 'react';

export const Counter = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <h1>Counter: {counter}</h1>
      <First setCounter={setCounter} />
    </>
  );
};
