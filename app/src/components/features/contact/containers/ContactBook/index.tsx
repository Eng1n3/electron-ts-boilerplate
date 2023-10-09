import { ContactEditForm, DefaultTable } from "@/components";
import { useRefetchContacts } from "@/utils";
import { ActionIcon, Box, Button, Group, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconRefresh, IconTrash } from "@tabler/icons-react";
import React from "react";
import { DeleteConfirmModal } from "../DeleteConfirmModal";
import { useQuery } from "@tanstack/react-query";
import { CResponse, GResponse } from "@/types/connection/global";

type ContactRowValues = {
  id: string;
  name: string;
  phoneNumber: number;
  photo: File | null;
  gender: string;
};

export function ContactBook() {
  const [editModalOpened, { toggle: editModalToggle }] = useDisclosure();
  const [deleteModalOpened, { toggle: deleteModalToggle }] = useDisclosure();
  const [contactId, setContactId] = React.useState<string>();

  const fetchData = async () => {
    return await (global as any).contact.getContact();
  };

  // Queries
  const { isFetching, isLoading, data } = useQuery<
    any,
    any,
    GResponse<CResponse<ContactRowValues>>
  >({
    queryKey: ["get-all-contact"],
    queryFn: fetchData,
    onSuccess: () => {
      console.log("Sukses get all contact");
    },
  });

  return (
    <Box>
      <DefaultTable
        minWidth={340}
        sameWidthColumns
        columns={[
          { accessor: "name", title: "Name" },
          { accessor: "email", title: "Email" },
          { accessor: "phoneNumber", title: "Phone Number" },
          { accessor: "photo", title: "Photo" },
          { accessor: "gender", title: "Gender" },
          {
            accessor: "action",
            title: "Action",
            render: (row) => (
              <Group spacing={8}>
                <ActionIcon
                  title="Edit"
                  onClick={() => {
                    setContactId(row.id);
                    editModalToggle();
                  }}
                  size={16}
                >
                  <IconEdit />
                </ActionIcon>
                <ActionIcon
                  title="Delete"
                  onClick={() => {
                    setContactId(row.id);
                    deleteModalToggle();
                  }}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        fetching={isLoading || isFetching}
        records={data?.data?.data ?? []}
      />
      <Modal
        opened={editModalOpened}
        onClose={editModalToggle}
        radius="lg"
        padding="lg"
        size="md"
        withCloseButton
        title="Edit Contact"
        classNames={{
          title: "heading3",
        }}
      >
        <ContactEditForm contactId={contactId ?? ""} />
      </Modal>

      <DeleteConfirmModal
        contactId={contactId ?? ""}
        onClose={deleteModalToggle}
        opened={deleteModalOpened}
      />
    </Box>
  );
}
