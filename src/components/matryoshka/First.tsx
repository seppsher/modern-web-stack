import { Second } from './Second';

export const First = ({ setCounter }) => {
  return (
    <>
      <h1>First</h1>
      <Second setCounter={setCounter} />
    </>
  );
};
