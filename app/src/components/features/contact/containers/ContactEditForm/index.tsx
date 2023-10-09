import { Box, Container, Group, Paper, Title } from "@mantine/core";

import { useForm } from "@/components/ui";

import { contactFormControllers } from "@/utils/form-controllers/contact";
import { contactFormSchema } from "@/utils/form-validation/contact";
import { ContactFormValues } from "@/types/form-values/contact";
import { useRefetchContacts } from "@/utils";
import React from "react";

type Props = {
  contactId: string;
  onSuccess?: () => void;
};

export function ContactEditForm(props: Props) {
  const [initialContact, setInitialContact] = React.useState<ContactFormValues>(
    {
      name: "",
      email: "",
      gender: "",
      phoneNumber: 0,
      photo: null,
    }
  );

  const foo = useRefetchContacts((state) => state);
  const updateContact = async (values?: ContactFormValues) => {
    console.log("update contact with input values", values);
    if (values) {
      await global.contact.updateContact({ ...values, id: props.contactId });
      console.log("update contact success");
      foo?.refetch();
      props.onSuccess?.();
    }
  };

  const getOneContact = async () => {
    return await global.contact.getOneContact({ id: props.contactId });
  };

  React.useEffect(() => {
    getOneContact()
      .then((res) => {
        console.log("get one contact result", res);
        methods.setValue("name", res.data.name);
        methods.setValue("email", res.data.email);
        methods.setValue("gender", res.data.gender);
        methods.setValue("phoneNumber", Number(res.data.phoneNumber));
        methods.setValue("photo", res.data.photo);
      })
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const [Form, methods] = useForm<ContactFormValues>({
    defaultValues: initialContact,
    schema: contactFormSchema,
    controllers: contactFormControllers,
    onSubmit: async (values, ctx) => {
      console.log(values); // eslint-disable-line no-console
      await updateContact(values);
    },
  });

  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <Box maw={500} w="100%">
      <Form grid={{ gutter: "xs" }} />
      <Box mt={25}>
        <Form.Button fullWidth mt="xs" loading={isSubmitting} type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Form.Button>
      </Box>
    </Box>
  );
}
