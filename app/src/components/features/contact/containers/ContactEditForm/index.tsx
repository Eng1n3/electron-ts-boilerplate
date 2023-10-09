// import { useRefetchContacts } from "@/utils";
// import React from "react";
// import { ContactForm, ContactFormValues } from "../../presentations";

// type Props = {
//   contactId: string;
// };

// export function ContactEditForm(props: Props) {
//   const foo = useRefetchContacts((state) => state);
//   const [initialContact, setInitialContact] = React.useState<ContactFormValues>(
//     {
//       email: "Slim",
//       name: "Shady",
//     }
//   );
//   const editContact = async (values?: ContactFormValues) => {
//     console.log("edit contact", values);
//     if (values) {
//       await global.contact.updateContact({ values, id: props.contactId });
//       foo?.refetch();
//     }
//   };

//   const getOneContact = async () => {
//     return await global.contact.getOneContact(props.contactId);
//   };

//   React.useEffect(() => {
//     getOneContact()
//       .then((res) => {
//         setInitialContact(res?.data);
//         console.log("get one cont", res);
//       })
//       // make sure to catch any error
//       .catch(console.error);
//   }, []);

//   return <ContactForm onSubmit={editContact} initialValues={initialContact} />;
// }

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

type Props = {
  contactId: string;
};

export function ContactEditForm(props: Props) {
  const submitHandle = async () => {
    await global.contact.updateContact({
      ...methods.values,
      id: props.contactId,
    });
    console.log("Submit Handle");
  };

  const getOneContact = async () => {
    return await global.contact.getOneContact({ id: props.contactId });
  };

  React.useEffect(() => {
    getOneContact()
      .then((res) => {
        methods.setValues({
          email: res.data?.email,
          name: res.data?.name,
        });
        console.log("get one cont", res);
      })
      // make sure to catch any error
      .catch(console.error);
  }, []);

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
      <ContactForm
        methods={methods}
        submitLabel="Edit"
        onSubmit={submitHandle}
      />
    </Box>
  );
}
