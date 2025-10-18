import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useLoader } from './Loader';
import { Product } from '@/models/product.interface';
import { Field, Input, VStack } from '@chakra-ui/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useDebounce from '@/hooks/debounce.hook';
import { toaster } from './ui/toaster';

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const [product, setProduct] = useState<Product | null>(null);
  const { startLoading, stopLoading } = useLoader();

  const processChange = useDebounce((value) => saveData(value));

  type FormData = z.infer<typeof formSchema>;

  const formSchema = z.object({
    name: z.string().min(1, t('validations.required')),
  });

  const form = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    formState: { errors },
  } = form;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        startLoading();
        const response = await fetch(`/api/product/${id}`);
        const data = await response.json();

        form.setValue('name', data.name);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        stopLoading();
      }
    };

    fetchProductDetails();
  }, []);

  const saveData = async (value) => {
    try {
      await fetch(`/api/product/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: value }),
      });

      toaster.create({
        // description: t('product.form.submit.success'),
        description: 'Nazwa produktu zaktualizowana pomyślnie',
        type: 'success',
      });
    } catch (error) {
      console.error('Błąd:', error);
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      <VStack gap={6} align="stretch" width={600} m="0 auto">
        <h1>{t('productDetails.header')}</h1>

        <Field.Root invalid={!!errors.name}>
          <Field.Label>{t('product.name.label')}</Field.Label>
          <Input
            {...register('name')}
            onChange={(event) => processChange(event.target.value)}
            placeholder={t('product.name.placeholder')}
          />
          <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
        </Field.Root>
        <h2>{product?.brand}</h2>
      </VStack>
    </>
  );
};
