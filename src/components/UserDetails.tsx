import { HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoader } from './Loader';
import { Product } from '@/models/product.interface';
import { Routes } from '@/enums/Routes';
import { Button } from '@chakra-ui/react';

export const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const showDetails = (id) => {
    navigate(Routes.ProductDetails.replace(':id', id));
  };
  const edit = (id) => {
    navigate(Routes.EditProduct.replace(':id', id));
  };

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
              <HStack>
                <Button onClick={() => showDetails(product.id)}>
                  Show details
                </Button>
                <Button onClick={() => edit(product.id)}>Edit</Button>
              </HStack>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
