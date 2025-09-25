import { useCounter } from '../Counter';
import { Fourth } from './Fourth';

export const Third = () => {
  const { count } = useCounter();

  return (
    <>
      <h3>Third</h3>
      <h1>Counter: {count}</h1>
      <Fourth />
    </>
  );
};
