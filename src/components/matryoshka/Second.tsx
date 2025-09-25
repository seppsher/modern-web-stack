// import { useTranslation } from 'react-i18next';

import { Third } from './Third';

export const Second = ({ setCounter }) => {
  // const { t } = useTranslation();

  return (
    <>
      <h2>Second</h2>
      <Third setCounter={setCounter} />
    </>
  );
};
