import {
  Alert,
  Box,
  Button,
  Group,
  LoadingOverlay,
  MantineColor,
  Modal,
  ModalProps,
} from "@mantine/core";
import React from "react";
type Props = Omit<Omit<ModalProps, "children">, "title"> & {
  onConfirm: () => void;
  themeColor?: MantineColor;
  confirmationTitle: string;
  confirmationDesc?: string;
  isLoading?: boolean;
};
export function ConfirmationModal({
  onConfirm,
  themeColor,
  confirmationTitle,
  confirmationDesc,
  isLoading,
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
      <Box pos="relative">
        <LoadingOverlay visible={!!isLoading} />
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
      </Box>
    </Modal>
  );
}
