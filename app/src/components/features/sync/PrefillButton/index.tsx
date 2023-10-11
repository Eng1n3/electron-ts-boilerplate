import { Button } from "@mantine/core";
import { IconFile, IconSend } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";
type Props = {};
export function PrefillButton(props: Props) {
  const queryClient = useQueryClient();

  const prefill = useCallback(async () => {
    console.log("prefill");
    const foo = await (global as any).contact.importContact();
    console.log(foo);
  }, []);

  const { isLoading, mutateAsync } = useMutation(["prefill"], prefill, {
    onSuccess: () => {
      queryClient.refetchQueries(["get-all-contact"]);
    },
  });
  return (
    <Button
      leftIcon={<IconFile size={18} />}
      size="xs"
      radius="md"
      color="lime"
      onClick={() => mutateAsync()}
      loading={isLoading}
    >
      Prefill
    </Button>
  );
}
