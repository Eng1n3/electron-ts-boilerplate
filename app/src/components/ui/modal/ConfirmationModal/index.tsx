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
export function ConfirmationModal(props: Props) {
  return (
    <Modal
      {...props}
      size="md"
      radius="lg"
      padding="lg"
      withCloseButton
      title={props.confirmationTitle}
      classNames={{
        title: "heading4",
      }}
    >
      {props.confirmationDesc && (
        <Alert color={props.themeColor} left={1}>
          {props.confirmationDesc}
        </Alert>
      )}
      <Group position="center" mt="md">
        <Button variant="subtle" color="gray" onClick={props.onClose}>
          Batalkan
        </Button>
        <Button
          color={props.themeColor}
          variant="filled"
          onClick={props.onConfirm}
        >
          Hapus
        </Button>
      </Group>
    </Modal>
  );
}
