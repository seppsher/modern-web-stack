import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useCounter } from '../Counter';

export const Fifth = () => {
  const { t } = useTranslation();
  const { increment } = useCounter();

  return (
    <>
      <h5>Fifth</h5>

      <Button variant="outline" size="sm" onClick={increment}>
        {t('counter.button')}
      </Button>
    </>
  );
};
