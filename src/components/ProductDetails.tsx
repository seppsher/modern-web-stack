import { HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useLoader } from './Loader';
import { Product } from '@/models/product.interface';

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const [product, setProduct] = useState<Product | null>(null);
  const { startLoading, stopLoading } = useLoader();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        startLoading();
        const response = await fetch(`/api/product/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        stopLoading();
      }
    };

    fetchProductDetails();
  }, []);

  return (
    <>
      <HStack>
        <h1>{t('productDetails.header')}</h1>

        <h2>{product?.name}</h2>
        <h2>{product?.brand}</h2>
      </HStack>
    </>
  );
};
