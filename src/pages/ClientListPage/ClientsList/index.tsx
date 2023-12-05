import { type Client } from "@services/client";
import { ScrollAreaAutosize, Table } from "@mantine/core";
import { Box, Paper, Text } from "@mantine/core";

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
  const rows = props.clients.map((client, i) => (
    <Table.Tr key={client.id}>
      <Table.Td>
        <Text opacity="0.7" px="10px">
          {i}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text opacity="0.7" px="10px">
          {client.first_name} {client.last_name}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <ScrollAreaAutosize h="100%">
      <Table striped>
        <Table.Tbody>{rows}</Table.Tbody>
        {rows.length === 0 && (
          <Table.Caption>
            <Text>Nenhum cliente encontrado para esses filtros</Text>
          </Table.Caption>
        )}
      </Table>
    </ScrollAreaAutosize>
  );
};
