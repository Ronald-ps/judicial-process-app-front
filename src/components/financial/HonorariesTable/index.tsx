import { formatDate } from "@/helpers/dateUtils";
import { Honorary } from "@/services/client/types";
import { Table, Text } from "@mantine/core";

interface HonorariesTableProps {
  honoraries: Honorary[];
}
export const HonorariesTable = (props: HonorariesTableProps) => {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Processo</Table.Th>
          <Table.Th>Data</Table.Th>
          <Table.Th>Histórico</Table.Th>
          <Table.Th>Valor da Ação</Table.Th>
          <Table.Th>Valor pago</Table.Th>
          <Table.Th>Valor restante</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {props.honoraries.map((honor) => (
          <Table.Tr key={honor.id}>
            <Table.Td>{honor.process_code}</Table.Td>
            <Table.Td>{formatDate({ date: honor.date })}</Table.Td>
            <Table.Td>
              <Text lineClamp={1}>{honor.description}</Text>
            </Table.Td>
            <Table.Td>{honor.value}</Table.Td>
            <Table.Td>{honor.paid_value}</Table.Td>
            <Table.Td>{honor.value - honor.paid_value}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
      {props.honoraries.length === 0 && (
        <Table.Caption>
          <Text size="xl">Nenhum honorário</Text>
        </Table.Caption>
      )}
    </Table>
  );
};
