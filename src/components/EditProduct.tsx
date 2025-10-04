import { Button, Field, HStack, Input, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useLoader } from './Loader';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toaster } from './ui/toaster';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const EditProduct = () => {
  type FormData = z.infer<typeof formSchema>;
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { startLoading, stopLoading } = useLoader();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        startLoading();
        const response = await fetch(`/api/product/${id}`);
        const data = await response.json();
        form.setValue('name', data.name);
        form.setValue('brand', data.brand);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        stopLoading();
      }
    };

    fetchProductDetails();
  }, []);

  const formSchema = z.object({
    name: z.string().min(1, t('validations.required')),
    brand: z.string().min(1, t('validations.required')),
  });

  const form = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: { name: string; brand: string }) => {
    startLoading();
    try {
      await fetch(`/api/product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      toaster.create({
        // description: t('product.form.submit.success'),
        description: 'Produkt zaktualizowany pomyślnie',
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={6} align="stretch" width={600} m="0 auto">
          <HStack>
            {/* <h1>{t('product.header')}</h1> */}
            <h1>Edycja produktu</h1>
          </HStack>

          <Field.Root invalid={!!errors.name}>
            <Field.Label>{t('product.name.label')}</Field.Label>
            <Input
              {...register('name')}
              placeholder={t('product.name.placeholder')}
            />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.brand}>
            <Field.Label>{t('product.brand.label')}</Field.Label>
            <Input
              {...register('brand')}
              placeholder={t('product.brand.placeholder')}
            />
            <Field.ErrorText>{errors.brand?.message}</Field.ErrorText>
          </Field.Root>

          <Button onClick={handleSubmit(onSubmit)}>Edytuj produkt</Button>
        </VStack>
      </form>
    </>
  );
};
