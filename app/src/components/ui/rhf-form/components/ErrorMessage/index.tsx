import { Group, Text, TextProps, useMantineTheme } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

const ErrorMessage = (props: TextProps & { children?: string }) => {
  const theme = useMantineTheme();
  const { children, ...rest } = props;
  if (!children?.length) return null;
  return (
    <Text
      mt={0}
      weight={500}
      size="xs"
      style={{
        wordBreak: "break-word",
        display: "block",
        position: "relative",
      }}
      {...rest}
    >
      <Group spacing={5} sx={{ position: "absolute" }}>
        <IconAlertCircle width={theme.fontSizes.lg} size={14} />
        {children}
      </Group>
    </Text>
  );
};

export default ErrorMessage;
