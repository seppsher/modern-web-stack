import { Fifth } from './Fifth';

export const Fourth = ({ setCounter }) => {
  return (
    <>
      <h4>Fourth</h4>
      <Fifth setCounter={setCounter} />
    </>
  );
};
