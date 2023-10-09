// import { useRefetchContacts } from "@/utils";
// import React from "react";
// import { ContactForm, ContactFormValues } from "../../presentations";

// type Props = {};

// export function ContactCreateForm({}: Props) {
//   const foo = useRefetchContacts((state) => state);
//   const createForm = async (values?: ContactFormValues) => {
//     console.log("create contact with values:", values);
//     if (values) {
//       await global.contact.createContact(values);
//       console.log("create contact success");
//       foo?.refetch();
//     }
//   };

//   return <ContactForm onSubmit={createForm} />;
// }

import { useRefetchContacts } from "@/utils";
import { Box, Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";
import { ContactForm } from "../..";

export type ContactFormValues = {
  name: string;
  email: string;
};

type Props = {};

export function ContactCreateForm(props: Props) {
  const submitHandle = async () => {
    await global.contact.createContact(methods.values);
    console.log("Submit Handle");
  };

  const methods = useForm<ContactFormValues>({
    initialValues: {
      email: "",
      name: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Box maw={340}>
      <ContactForm methods={methods} onSubmit={submitHandle} />
    </Box>
  );
}
