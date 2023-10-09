import {
  Box,
  Container,
  Group,
  LoadingOverlay,
  Paper,
  Title,
} from "@mantine/core";

import { useForm } from "@/components/ui";

import { contactFormControllers } from "@/utils/form-controllers/contact";
import { contactFormSchema } from "@/utils/form-validation/contact";
import { ContactFormValues } from "@/types/form-values/contact";
import { useRefetchContacts } from "@/utils";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GResponse } from "@/types/connection/global";

type Props = {
  contactId: string;
  onSuccess?: () => void;
};

export function ContactEditForm(props: Props) {
  const updateContact = async (values?: ContactFormValues) => {
    console.log("update contact with input values", values);
    if (values) {
      await global.contact.updateContact({ ...values, id: props.contactId });
      console.log("update contact success");
      props.onSuccess?.();
    }
  };

  const getOneContact = async () => {
    return await global.contact.getOneContact({ id: props.contactId });
  };

  const queryClient = useQueryClient();
  const { isLoading: updateLoading, mutateAsync } = useMutation(
    ["update-contact"],
    updateContact,
    {
      onSuccess: () => {
        console.log("Success update data");
        queryClient.refetchQueries(["get-all-contact"]);
      },
    }
  );
  const { isLoading: getOneContactLoading } = useQuery<
    GResponse<ContactFormValues>
  >(["get-one-contact"], getOneContact, {
    onSuccess: (res) => {
      console.log("Success get one contact", res);
      console.log("get one contact result", res);
      methods.setValue("name", res.data.name);
      methods.setValue("email", res.data.email);
      methods.setValue("gender", res.data.gender);
      methods.setValue("phoneNumber", Number(res.data.phoneNumber));
      methods.setValue("photo", res.data.photo);
    },
    enabled: !!props.contactId,
  });

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
      await mutateAsync(values);
    },
  });

  return (
    <Box maw={500} w="100%" pos="relative">
      <LoadingOverlay visible={getOneContactLoading} />
      <Form grid={{ gutter: "xs" }} />
      <Box mt={25}>
        <Form.Button fullWidth mt="xs" loading={updateLoading} type="submit">
          {updateLoading ? "Submitting..." : "Submit"}
        </Form.Button>
      </Box>
    </Box>
  );
}
