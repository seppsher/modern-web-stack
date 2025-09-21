import { Button, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('about.header')}</h1>
      <HStack>
        <Button>{t('about.button')}</Button>
      </HStack>
    </>
  );
};
