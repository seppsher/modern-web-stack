import { Button, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../enums/Routes';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(Routes.About);
  };

  const { t } = useTranslation();

  return (
    <>
      <h1>{t('home.header')}</h1>
      <HStack>
        <Button onClick={handleNavigate}>{t('home.button')}</Button>
      </HStack>
    </>
  );
};
