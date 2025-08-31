import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import {
  Checkbox,
  createListCollection,
  Field,
  HStack,
  Input,
  Portal,
  Select,
  Switch,
  Text,
} from "@chakra-ui/react";

export const Form = () => {
  type FormData = z.infer<typeof formSchema>;

  const formSchema = z.object({
    username: z.string().min(3, "Name is required").max(20, "Name is too long"),
    framework: z.string({ message: "Framework is required" }).array(),
    checkbox: z.boolean().refine((value) => value === true, {
      message: "Checkbox must be checked",
    }),
    switch: z.boolean().refine((value) => value === true, {
      message: "Switch must be toggled on",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const frameworks = createListCollection({
    items: [
      { label: "React.js", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("Formularz wysłany pomyślnie!");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field.Root invalid={!!errors.username}>
          <Field.Label>Username</Field.Label>
          <Input {...register("username")} placeholder="Enter your username" />
          {errors.username && (
            <Field.ErrorText>{errors.username.message}</Field.ErrorText>
          )}
        </Field.Root>

        <Field.Root invalid={!!errors.framework} width="320px">
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
                    <Select.ValueText placeholder="Select framework" />
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
          <HStack align="flex-start">
            <Checkbox.Root
              invalid={!!errors.checkbox}
              variant="outline"
              {...register("checkbox")}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Testowy label checkbox</Checkbox.Label>
            </Checkbox.Root>

            <Field.ErrorText>{errors.checkbox?.message}</Field.ErrorText>
          </HStack>
        </Field.Root>

        <Field.Root invalid={!!errors.switch}>
          <Switch.Root {...register("switch")}>
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Switch.Label>Testowy label switch</Switch.Label>
          </Switch.Root>
          <Field.ErrorText>{errors.switch?.message}</Field.ErrorText>
        </Field.Root>
      </form>
    </>
  );
};
