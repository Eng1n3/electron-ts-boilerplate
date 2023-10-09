import { ContactEditForm, DefaultTable } from "@/components";
import { useRefetchContacts } from "@/utils";
import { ActionIcon, Group, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";

type Props = {};

export function ContactBook({}: Props) {
  const [opened, { close, open }] = useDisclosure();
  const [contactId, setContactId] = React.useState();
  const foo = useRefetchContacts((state) => state);
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
        console.log(res);
        setContacts(res?.data);
      })
      // make sure to catch any error
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    if (foo?.isRefetch) {
      fetchData()
        .then((res) => {
          setContacts(res?.data);
        })
        // make sure to catch any error
        .catch(console.error);
    }

    foo?.killRefetch();
  }, [foo?.isRefetch]);

  return (
    <>
      <DefaultTable
        minWidth={340}
        sameWidthColumns
        columns={[
          { accessor: "name", title: "Name" },
          { accessor: "email", title: "Email" },
          {
            accessor: "action",
            title: "Action",
            render: (row) => (
              <Group spacing={8}>
                <ActionIcon
                  title="Edit"
                  onClick={() => {
                    setContactId(row.id);
                    open();
                  }}
                  size={16}
                >
                  <IconEdit />
                </ActionIcon>
                <ActionIcon
                  title="Delete"
                  onClick={() => {
                    deleteContact(row.id);
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
      <Modal opened={opened} onClose={close} radius="lg">
        <Title order={2} className="heading3" mb="sm">
          Edit Contact
        </Title>
        <ContactEditForm contactId={contactId ?? ""} />
      </Modal>
    </>
  );
}
