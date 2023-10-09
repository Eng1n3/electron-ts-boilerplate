import { Button } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";
type Props = {};
export function SyncButton(props: Props) {
  const queryClient = useQueryClient();

  const sync = useCallback(async () => {
    console.log("syc");
    const foo = await (global as any).contact.synchronizeContact();
    console.log(foo);
  }, []);

  const { isLoading, mutateAsync } = useMutation(["sync"], sync, {
    onSuccess: () => {
      queryClient.refetchQueries(["get-all-contact"]);
    },
  });
  return (
    <Button
      leftIcon={<IconSend size={18} />}
      size="xs"
      radius="md"
      color="indigo"
      onClick={() => mutateAsync()}
      loading={isLoading}
    >
      Synchronize
    </Button>
  );
}
