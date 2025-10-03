import { HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useLoader } from './Loader';
import { Product } from '@/models/product.interface';

export const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const [products, setProducts] = useState<Product[]>([]);
  const { startLoading, stopLoading } = useLoader();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        startLoading();
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        stopLoading();
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <HStack>
        <h1>{t('user.header', { id })}</h1>
      </HStack>

      <div>
        <h1>{t('user.products.header')}</h1>

        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.id}. {product.name} {product.brand}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
