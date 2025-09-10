import { Button, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../enums/Routes';

export const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(Routes.About);
  };

  return (
    <>
      <h1>Home</h1>
      <HStack>
        <Button onClick={handleNavigate}>Navigate to About page</Button>
      </HStack>
    </>
  );
};
