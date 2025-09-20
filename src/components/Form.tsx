'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import {
  Accordion,
  Box,
  Button,
  Checkbox,
  CloseButton,
  createListCollection,
  Dialog,
  Field,
  FileUpload,
  HStack,
  Icon,
  Input,
  NumberInput,
  Portal,
  RadioGroup,
  Select,
  Switch,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { toaster } from './ui/toaster';
import { LuUpload } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@/enums/Routes';

export const Form = () => {
  type FormData = z.infer<typeof formSchema>;

  const formSchema = z.object({
    username: z.string().min(3, 'Name is required').max(20, 'Name is too long'),
    framework: z.string({ message: 'Framework is required' }).array(),
    checkbox: z.boolean().refine((value) => value === true, {
      message: 'Checkbox must be checked',
    }),
    switch: z.boolean().refine((value) => value === true, {
      message: 'Switch must be toggled on',
    }),
    number: z.number().gte(10),
    textarea: z
      .string()
      .max(10, 'Textarea must be max 10 characters long')
      .optional(),
    radio: z.string().refine((value) => value != null, {
      message: 'Radio must be selected',
    }),
    // eslint-disable-next-line no-undef
    files: z.array(z.instanceof(File)).min(1, 'At least one file is required'),
  });

  const form = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: 10,
    },
  });

  const navigate = useNavigate();

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
      description: 'Form saved successfully',
      type: 'success',
    });
  };

  const radioItems = [
    { label: 'Value 1', value: 'value1' },
    { label: 'Value 2', value: 'value2' },
    { label: 'Value 3', value: 'value3' },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={6} align="stretch" width={600} m="0 auto">
          <Field.Root invalid={!!errors.username}>
            <Field.Label>Username</Field.Label>
            <Input
              {...register('username')}
              placeholder="Enter your username"
            />
            {errors.username && (
              <Field.ErrorText>{errors.username.message}</Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.framework}>
            <Field.Label>Framework</Field.Label>
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
                  <Checkbox.Label>Testowy label checkbox</Checkbox.Label>
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
                  <Switch.Label>Testowy label switch</Switch.Label>
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
            <Field.Label>Testowy label number</Field.Label>

            <NumberInput.Root>
              <NumberInput.Control />
              <NumberInput.Input
                {...register('number', { valueAsNumber: true })}
              />
            </NumberInput.Root>
            <Field.ErrorText>{errors.number?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.radio}>
            <Field.Label>Radio label</Field.Label>
            <Controller
              name="radio"
              control={control}
              render={({ field }) => (
                <RadioGroup.Root
                  key="solid"
                  variant="solid"
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => {
                    field.onChange(value);
                  }}
                >
                  <HStack gap="6">
                    {radioItems.map((item) => (
                      <RadioGroup.Item key={item.value} value={item.value}>
                        <RadioGroup.ItemHiddenInput onBlur={field.onBlur} />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    ))}
                  </HStack>
                </RadioGroup.Root>
              )}
            />
            <Field.ErrorText>{errors.radio?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.files}>
            <Field.Label>Upload file zone</Field.Label>

            <Controller
              name="files"
              control={control}
              render={() => (
                <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={10}>
                  <FileUpload.HiddenInput />
                  <FileUpload.Dropzone>
                    <Icon size="md" color="fg.muted">
                      <LuUpload />
                    </Icon>
                    <FileUpload.DropzoneContent>
                      <Box>Drag and drop files here</Box>
                      <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                    </FileUpload.DropzoneContent>
                  </FileUpload.Dropzone>
                  <FileUpload.List />

                  <FileUpload.ClearTrigger asChild>
                    <CloseButton
                      me="-1"
                      size="xs"
                      variant="plain"
                      focusVisibleRing="inside"
                      focusRingWidth="2px"
                      pointerEvents="auto"
                    />
                  </FileUpload.ClearTrigger>
                </FileUpload.Root>
              )}
            />

            <Field.ErrorText>{errors.files?.message}</Field.ErrorText>
          </Field.Root>

          <Accordion.Root collapsible defaultValue={['b']}>
            <Accordion.Item value="a">
              <Accordion.ItemTrigger>
                <h1>Expand item to show dialog</h1>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  <div>Lorem ipsum dolor sit amet</div>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <Button variant="outline" size="sm">
                        Open Dialog
                      </Button>
                    </Dialog.Trigger>

                    <Portal>
                      <Dialog.Backdrop />
                      <Dialog.Positioner>
                        <Dialog.Content>
                          <Dialog.Context>
                            {(store) => (
                              <Dialog.Body pt="6" spaceY="3">
                                <p>
                                  Dialog is open:{' '}
                                  {store.open ? 'true' : 'false'}
                                </p>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua.
                                </p>
                              </Dialog.Body>
                            )}
                          </Dialog.Context>

                          <Dialog.Footer>
                            <Button
                              colorPalette="red"
                              onClick={() => {
                                navigate(Routes.About);
                              }}
                            >
                              Redirect to Home Page
                            </Button>

                            <Dialog.ActionTrigger asChild>
                              <Button colorPalette="green">Save changes</Button>
                            </Dialog.ActionTrigger>
                          </Dialog.Footer>

                          <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                          </Dialog.CloseTrigger>
                        </Dialog.Content>
                      </Dialog.Positioner>
                    </Portal>
                  </Dialog.Root>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>

          <Button onClick={handleSubmit(onSubmit)}>Wyślij</Button>
        </VStack>
      </form>
    </>
  );
};
