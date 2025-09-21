import { HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

export const UserDetails = () => {
  const { id } = useParams<{ id: string }>(); // Alternative way to define the type
  const { t } = useTranslation();

  return (
    <>
      <HStack>
        <h1>{t('user.header', { id })}</h1>
      </HStack>
    </>
  );
};
