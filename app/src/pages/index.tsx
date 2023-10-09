import {
  ContactForm,
  DefaultLayout,
  ContactBook,
  ContactCreateForm,
} from "@/components";
import { Flex, Grid, Title } from "@mantine/core";

export default function HomePage() {
  return (
    <DefaultLayout>
      <Grid gutter={64}>
        <Grid.Col span={12} sm={6} md={5}>
          <Title order={2} className="heading3" mb="sm">
            Add New Contact
          </Title>
          <ContactCreateForm />
        </Grid.Col>
        <Grid.Col span={12} sm={6}>
          <Title order={2} className="heading3" mb="sm">
            Contact List
          </Title>
          <ContactBook />
        </Grid.Col>
      </Grid>
    </DefaultLayout>
  );
}
