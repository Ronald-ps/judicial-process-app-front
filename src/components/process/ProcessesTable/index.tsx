import type { DetailedProcess } from "@services/client/types";
import { Table } from "@mantine/core";
import { formatDate } from "@/helpers/dateUtils";

interface ProcessesTableProps {
  processes: DetailedProcess[];
}
export const ProcessesTable = (props: ProcessesTableProps) => {
  return (
    <Table striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Nº</Table.Th>
          <Table.Th>Data de início</Table.Th>
          <Table.Th>Serviço</Table.Th>
          {/* <Table.Th>Última observação</Table.Th> */}
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {props.processes.map((process, i) => (
          <Table.Tr key={i}>
            <Table.Td>{process.code}</Table.Td>
            <Table.Td>{formatDate({ date: process.start_date })}</Table.Td>
            <Table.Td>{process.type}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
