import { HStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export const UserDetails = () => {
  const { id } = useParams<{ id: string }>(); // Alternative way to define the type

  return (
    <>
      <HStack>
        <h1>User ID: {id}</h1>
      </HStack>
    </>
  );
};
