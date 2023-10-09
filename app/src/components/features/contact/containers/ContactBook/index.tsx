import { ContactEditForm, DefaultTable } from "@/components";
import { useRefetchContacts } from "@/utils";
import { ActionIcon, Group, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";
import { DeleteConfirmModal } from "../DeleteConfirmModal";

type Props = {};

export function ContactBook({}: Props) {
  const [editModalOpened, { toggle: editModalToggle }] = useDisclosure();
  const [deleteModalOpened, { toggle: deleteModalToggle }] = useDisclosure();
  const [contactId, setContactId] = React.useState();
  const { isRefetch, killRefetch } = useRefetchContacts((state) => state);
  const [contacts, setContacts] = React.useState<any[]>([]);

  const fetchData = async () => {
    return await (global as any).contact.getContact();
  };

  const deleteContact = async (id: string) => {
    return await (global as any).contact.deleteContact({ id });
  };

  React.useEffect(() => {
    fetchData()
      .then((res) => {
        console.log("CONTACTS", res);
        setContacts(res.data.data);
      })
      // make sure to catch any error
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    if (isRefetch) {
      fetchData()
        .then((res) => {
          setContacts(res?.data);
        })
        // make sure to catch any error
        .catch(console.error);
    }

    killRefetch();
  }, [isRefetch, killRefetch]);

  return (
    <>
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
        records={contacts ?? []}
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
    </>
  );
}
