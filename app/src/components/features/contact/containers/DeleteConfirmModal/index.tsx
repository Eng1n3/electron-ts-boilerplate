import { ConfirmationModal } from "@/components/ui/modal";
import { useRefetchContacts } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
type Props = {
  contactId: string;
  opened: boolean;
  onClose: () => void;
};
export function DeleteConfirmModal(props: Props) {
  const deleteContact = async () => {
    if (props.contactId) {
      await global.contact.deleteContact({ id: props.contactId });
    }
  };

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(
    ["delete-contact"],
    deleteContact,
    {
      onSuccess: () => {
        console.log("Success update data");
        queryClient.refetchQueries(["get-all-contact"]);
      },
    }
  );

  return (
    <>
      <ConfirmationModal
        opened={props.opened}
        onClose={props.onClose}
        confirmationTitle="Yakin ingin menghapus data ini?"
        confirmationDesc="Data Anda akan terhapus tetapi masih bisa dipulihkan dengan cara menghubungi Admin"
        onConfirm={() => mutateAsync()}
        themeColor="red"
        isLoading={isLoading}
      />
    </>
  );
}
