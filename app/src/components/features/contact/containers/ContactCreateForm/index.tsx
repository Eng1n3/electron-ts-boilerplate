import { Box } from "@mantine/core";

import { useForm } from "@/components/ui";

import { contactFormControllers } from "@/utils/form-controllers/contact";
import { contactFormSchema } from "@/utils/form-validation/contact";
import { ContactFormValues } from "@/types/form-values/contact";
import { useRefetchContacts } from "@/utils";

type Props = {
  onSuccess?: () => void;
};

export function ContactCreateForm(props: Props) {
  const foo = useRefetchContacts((state) => state);
  const createContact = async (values?: ContactFormValues) => {
    console.log("create contact with input values ", values);
    if (values) {
      await global.contact.createContact(values);
      console.log("create contact success");
      foo?.refetch();
      props.onSuccess?.();
    }
  };

  const [Form, methods] = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      gender: "",
      phoneNumber: 0,
      photo: null,
    },
    schema: contactFormSchema,
    controllers: contactFormControllers,
    onSubmit: async (values, ctx) => {
      console.log(values); // eslint-disable-line no-console
      await createContact(values);
    },
  });

  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <Box w="100%" maw={700}>
      <Form grid={{ gutter: "xs" }} p={0} />
      <Box mt={25}>
        <Form.Button fullWidth mt="xs" loading={isSubmitting} type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Form.Button>
      </Box>
    </Box>
  );
}
