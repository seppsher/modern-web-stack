import { Friend } from '@/models/friend.interface';
import { HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useLoader } from './Loader';

export const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const [friends, setFriends] = useState<Friend[]>([]);
  const { startLoading, stopLoading } = useLoader();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        startLoading();
        const response = await fetch('/api/friends');
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      } finally {
        stopLoading();
      }
    };

    fetchFriends();
  }, []);

  return (
    <>
      <HStack>
        <h1>{t('user.header', { id })}</h1>
      </HStack>

      <div>
        <h1>{t('user.friends.header')}</h1>

        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>
              {friend.name} - {friend.email}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
