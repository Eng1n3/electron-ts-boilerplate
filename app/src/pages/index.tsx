import {
  ContactForm,
  DefaultLayout,
  ContactBook,
  ContactCreateForm,
} from "@/components";
import { PrefillButton } from "@/components/features/sync/PrefillButton";
import { SyncButton } from "@/components/features/sync/SyncButton";
import { Button, Flex, Grid, Group, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconRecycle, IconSend } from "@tabler/icons-react";
export default function HomePage() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <DefaultLayout>
      <Group position="right" spacing="xs">
        <PrefillButton />
        <SyncButton />
        <Button
          leftIcon={<IconPlus size={18} />}
          size="xs"
          onClick={toggle}
          radius="md"
        >
          Add Contact
        </Button>
      </Group>
      <Title order={2} className="heading4">
        Contact List
      </Title>
      <ContactBook />
      <Modal
        opened={opened}
        onClose={toggle}
        radius="lg"
        padding="lg"
        size="md"
        withCloseButton
        title="Add New Contact"
        classNames={{
          title: "heading3",
        }}
      >
        <ContactCreateForm onSuccess={toggle} />
      </Modal>
    </DefaultLayout>
  );
}
