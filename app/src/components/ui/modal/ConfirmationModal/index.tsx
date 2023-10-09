import {
  Alert,
  Button,
  Group,
  MantineColor,
  Modal,
  ModalProps,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";
type Props = Omit<Omit<ModalProps, "children">, "title"> & {
  onConfirm: () => void;
  themeColor?: MantineColor;
  confirmationTitle: string;
  confirmationDesc?: string;
};
export function ConfirmationModal({
  onConfirm,
  themeColor,
  confirmationTitle,
  confirmationDesc,
  ...modalProps
}: Props) {
  return (
    <Modal
      {...modalProps}
      size="md"
      radius="lg"
      padding="lg"
      withCloseButton
      title={confirmationTitle}
      classNames={{
        title: "heading4",
      }}
    >
      {confirmationDesc && (
        <Alert color={themeColor} left={1}>
          {confirmationDesc}
        </Alert>
      )}
      <Group position="center" mt="md">
        <Button variant="subtle" color="gray" onClick={modalProps.onClose}>
          Batalkan
        </Button>
        <Button color={themeColor} variant="filled" onClick={onConfirm}>
          Hapus
        </Button>
      </Group>
    </Modal>
  );
}
