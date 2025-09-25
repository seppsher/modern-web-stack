import { Fourth } from './Fourth';

export const Third = ({ setCounter }) => {
  return (
    <>
      <h3>Third</h3>
      <Fourth setCounter={setCounter} />
    </>
  );
};
