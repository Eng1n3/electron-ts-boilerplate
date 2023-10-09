import { Box, Container, Group, Paper, Title } from "@mantine/core";

import { useForm } from "@/components/ui";

import { contactFormControllers } from "@/utils/form-controllers/contact";
import { contactFormSchema } from "@/utils/form-validation/contact";
import { ContactFormValues } from "@/types/form-values/contact";

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export function ContactForm() {
  const [Form, methods] = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      gender: "",
      phoneNumber: null,
      photo: null,
    },
    schema: contactFormSchema,
    controllers: contactFormControllers,
    onSubmit: async (values, ctx) => {
      console.log(values); // eslint-disable-line no-console
      await sleep(1000);
      ctx.setError(
        "phoneNumber",
        { message: "Invalid phone number" },
        { shouldFocus: false }
      );
    },
  });

  const {
    formState: { isSubmitting },
  } = methods;

  return Form;

  return (
    <Container size={1200} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} mb={20} align="center">
          Contact Form
        </Title>
        <Form grid={{ gutter: "xs" }} />
        <Box mt={25}>
          <Form.Button fullWidth mt="xl" loading={isSubmitting} type="submit">
            {isSubmitting ? "Submitting..." : "Submit"}
          </Form.Button>
        </Box>
      </Paper>
    </Container>
  );
}
