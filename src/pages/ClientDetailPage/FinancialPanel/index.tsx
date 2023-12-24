import { formatDate } from "@/helpers/dateUtils";
import { Honorary } from "@/services/client/types";
import { Stack, Table } from "@mantine/core";

interface FinancialPanelProps {
  honoraries: Honorary[];
}
export const FinancialPanel = (props: FinancialPanelProps) => {
  return (
    <Stack>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Td>Data</Table.Td>
            <Table.Td>Histórico</Table.Td>
            <Table.Td>Valor da Ação</Table.Td>
            <Table.Td>Valor pago</Table.Td>
            <Table.Td>Valor restante</Table.Td>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {props.honoraries.map((honor) => (
            <Table.Tr key={honor.id}>
              <Table.Td>{formatDate({ date: honor.date })}</Table.Td>
              <Table.Td>{honor.description}</Table.Td>
              <Table.Td>{honor.value}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
};
