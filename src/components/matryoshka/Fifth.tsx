import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const Fifth = ({ setCounter }) => {
  const { t } = useTranslation();
  return (
    <>
      <h5>Fifth</h5>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setCounter((prev) => prev + 1)}
      >
        {t('counter.button')}
      </Button>
    </>
  );
};
