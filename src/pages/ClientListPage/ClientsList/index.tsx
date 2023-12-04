import { type Client } from "@services/client";
import { Flex, Stack } from "@mantine/core";
import { ScrollArea } from "@mantine/core";

import type { Client } from "@/services/client";
import { Box, Paper, Text } from "@mantine/core";

import classes from "./ClientItem.module.css";

interface ClientItemProps {
  client: Client;
}
export const ClientItem = (props: ClientItemProps) => {
  return (
    <Paper withBorder p="20px" shadow="xs" h="100%">
      <Box>
        <Text fw={700} mb="8px" opacity="0.8">
          {props.client.first_name} {props.client.last_name}
        </Text>
        <Text c="dimmed" mb="16px">
          {props.client.city}
        </Text>
      </Box>
      <Box>
        <Text lineClamp={3} c="dimmed">
          {props.client.cellphone || props.client.phone}
        </Text>
      </Box>
    </Paper>
  );
};

interface ClientsListProps {
  clients: Client[];
}
export const ClientsList = (props: ClientsListProps) => {
  return (
    <ScrollArea.Autosize mah="100%">
      <Flex gap="20px" wrap={"wrap"} justify="center">
        {props.clients.map((client) => (
          <Box key={client.id} className={classes.clientItemBox}>
            <ClientItem client={client} />
          </Box>
        ))}
      </Flex>
    </ScrollArea.Autosize>
  );
};
