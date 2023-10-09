import { ConfirmationModal } from "@/components/ui/modal";
import { useRefetchContacts } from "@/utils";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
type Props = {
  contactId: string;
  opened: boolean;
  onClose: () => void;
};
export function DeleteConfirmModal(props: Props) {
  const { isRefetch, refetch } = useRefetchContacts((state) => state);

  const deleteContact = async () => {
    console.log("delete contact with id", props.contactId);
    if (props.contactId) {
      await global.contact.deleteContact({ id: props.contactId });
      console.log("update contact success");
      refetch();
      props.onClose();
    }
  };

  return (
    <>
      <ConfirmationModal
        opened={props.opened}
        onClose={props.onClose}
        confirmationTitle="Yakin ingin menghapus data ini?"
        confirmationDesc="Data Anda akan terhapus tetapi masih bisa dipulihkan dengan cara menghubungi Admin"
        onConfirm={() => deleteContact()}
        themeColor="red"
      />
    </>
  );
}
