'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Checkbox,
  createListCollection,
  Field,
  Input,
  NumberInput,
  Portal,
  Select,
  Switch,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { toaster } from './ui/toaster';
import { useTranslation } from 'react-i18next';

export const Form = () => {
  type FormData = z.infer<typeof formSchema>;

  const { t } = useTranslation();

  const formSchema = z.object({
    username: z
      .string()
      .min(3, t('validations.required'))
      .max(20, t('validations.maxLength')),
    framework: z.string({ message: t('validations.required') }).array(),
    checkbox: z.boolean().refine((value) => value === true, {
      message: t('validations.checkbox.error'),
    }),
    switch: z.boolean().refine((value) => value === true, {
      message: t('validations.switch.error'),
    }),
    number: z.number().gte(10),
    textarea: z.string().max(10, t('validations.maxLength')).optional(),
  });

  const form = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: 10,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const frameworks = createListCollection({
    items: [
      { label: 'React.js', value: 'react' },
      { label: 'Vue.js', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Svelte', value: 'svelte' },
    ],
  });

  const onSubmit = () => {
    toaster.create({
      description: t('form.submit.success'),
      type: 'success',
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={6} align="stretch" width={600} m="0 auto">
          <Field.Root invalid={!!errors.username}>
            <Field.Label>{t('form.username.label')}</Field.Label>
            <Input
              {...register('username')}
              placeholder={t('form.username.placeholder')}
            />
            {errors.username && (
              <Field.ErrorText>{errors.username.message}</Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.framework}>
            <Field.Label>{t('form.framework.label')}</Field.Label>
            <Controller
              control={control}
              name="framework"
              render={({ field }) => (
                <Select.Root
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
                  collection={frameworks}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {frameworks.items.map((framework) => (
                          <Select.Item item={framework} key={framework.value}>
                            {framework.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              )}
            />
            <Field.ErrorText>{errors.framework?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.checkbox}>
            <Controller
              control={control}
              name="checkbox"
              render={({ field }) => (
                <Checkbox.Root
                  invalid={!!errors.checkbox}
                  checked={field.value}
                  onCheckedChange={({ checked }) => field.onChange(checked)}
                  variant="outline"
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label>{t('form.checkbox.label')}</Checkbox.Label>
                </Checkbox.Root>
              )}
            ></Controller>

            <Field.ErrorText>{errors.checkbox?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.switch}>
            <Controller
              control={control}
              name="switch"
              render={({ field }) => (
                <Switch.Root
                  checked={field.value}
                  onCheckedChange={({ checked }) => field.onChange(checked)}
                >
                  <Switch.HiddenInput />
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.Label>{t('form.switch.label')}</Switch.Label>
                </Switch.Root>
              )}
            ></Controller>

            <Field.ErrorText>{errors.switch?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.textarea}>
            <Textarea
              variant="subtle"
              placeholder="Tralalala"
              {...register('textarea')}
            />
            <Field.ErrorText>{errors.textarea?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.number}>
            <Field.Label>{t('form.number.label')}</Field.Label>

            <NumberInput.Root>
              <NumberInput.Control />
              <NumberInput.Input
                {...register('number', { valueAsNumber: true })}
              />
            </NumberInput.Root>
            <Field.ErrorText>{errors.number?.message}</Field.ErrorText>
          </Field.Root>

          <Button onClick={handleSubmit(onSubmit)}>
            {t('form.button.label')}
          </Button>
        </VStack>
      </form>
    </>
  );
};
