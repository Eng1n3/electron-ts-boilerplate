import { useRefetchContacts } from "@/utils";
import { Box, Button, Group, Stack, TextInput } from "@mantine/core";
import { UseFormReturnType, useForm } from "@mantine/form";
import React, { useEffect } from "react";

export type ContactFormValues = {
  name: string;
  email: string;
};

type Props = {
  onSubmit?: () => void;
  methods: UseFormReturnType<
    ContactFormValues,
    (values: ContactFormValues) => ContactFormValues
  >;
  initialValues?: ContactFormValues;
  submitLabel?: string;
};

export function ContactForm(props: Props) {
  // const submitHandle = async () => {
  //   console.log("Submit Handle");
  //   props.onSubmit?.(form.values);
  // };

  // const form = useForm<ContactFormValues>({
  //   initialValues: props.initialValues,
  //   validate: {
  //     email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
  //   },
  // });

  return (
    <form onSubmit={props.onSubmit}>
      <Stack spacing={12}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Enter the contact email"
          radius="md"
          size="sm"
          {...props.methods.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label="Nama"
          placeholder="Enter the contact name"
          radius="md"
          size="sm"
          {...props.methods.getInputProps("name")}
        />

        <Group spacing="flex-end" mt={8}>
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              props.onSubmit?.();
            }}
          >
            {props.submitLabel ?? "Submit"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
